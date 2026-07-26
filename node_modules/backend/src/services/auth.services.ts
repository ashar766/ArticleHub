import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { TokenService } from "./token.services.js";
import { EmailService } from "./email.service.js";
import crypto from "node:crypto";
import { SignupSchema, LoginSchema } from "@articlehub/shared";
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
      throw new createHttpError.Conflict("User already exists");
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

    const { password, ...userWithoutPassword } = user;

    return {
      message: "User created successfully",
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
      throw new createHttpError.Unauthorized(
        "Invalid email or password"
      );
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isMatch) {
      throw new createHttpError.Unauthorized(
        "Invalid email or password"
      );
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password, ...userWithoutPassword } = user;

    return {
      message: "Login successful",
      accessToken,
      user: userWithoutPassword,
    };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new createHttpError.NotFound("User not found");
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    const resetTokenExpiry = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    await this.emailService.sendResetPasswordEmail(
      user.email,
      resetToken
    );

    return {
      message: "Password reset email sent successfully",
    };
  }

  async resetPassword(
    token: string,
    password: string
  ) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      throw new createHttpError.BadRequest(
        "Invalid reset token"
      );
    }

    if (
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < new Date()
    ) {
      throw new createHttpError.BadRequest(
        "Reset token has expired"
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

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
      message: "Password reset successfully",
    };
  }
}