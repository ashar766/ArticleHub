import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { TokenService } from "./token.services.js";
import { EmailService } from "./email.service.js";
import crypto from "node:crypto";
import { SignupSchema, LoginSchema, Message } from "@articlehub/shared";
import { z } from "zod";
import createHttpError from "http-errors";

type SignupDto = z.infer<typeof SignupSchema>;
type LoginDto = z.infer<typeof LoginSchema>;

export class AuthService {
  private tokenService = new TokenService();
  private emailService = new EmailService();

  async signup(data: SignupDto) {
    console.log("Data received:", data);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new createHttpError.Conflict(Message.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user; //when output dto will be created no need for this

    return {
      message: Message.USER_CREATED_SUCCESSFULLY,
      user: userWithoutPassword,
    };
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new createHttpError.Unauthorized(Message.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new createHttpError.Unauthorized(Message.INVALID_CREDENTIALS);
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);

    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return {
      message: Message.LOGIN_SUCCESSFUL,
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new createHttpError.Unauthorized(Message.REFRESH_TOKEN_REQUIRED);
    }

    let decoded: any;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch (error) {
      throw new createHttpError.Unauthorized(Message.INVALID_REFRESH_TOKEN);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new createHttpError.Unauthorized(Message.USER_NOT_FOUND);
    }

    if (user.refreshToken !== refreshToken) {
      throw new createHttpError.Unauthorized(Message.REFRESH_TOKEN_MISMATCH);
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: Message.ACCESS_TOKEN_REFRESHED,
      accessToken: newAccessToken,
    };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new createHttpError.NotFound(Message.USER_NOT_FOUND);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    await this.emailService.sendResetPasswordEmail(user.email, resetToken);

    return {
      message: Message.PASSWORD_RESET_EMAIL_SENT_SUCCESSFULLY,
    };
  }

  async resetPassword(token: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      throw new createHttpError.BadRequest(Message.INVALID_RESET_TOKEN);
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new createHttpError.BadRequest(Message.RESET_TOKEN_EXPIRED);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      message: Message.PASSWORD_RESET_SUCCESSFULLY,
    };
  }
}
