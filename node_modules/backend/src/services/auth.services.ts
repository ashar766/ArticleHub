import bcrypt from "bcryptjs";
import {prisma} from "../config/prisma.js";
import { TokenService } from "./token.services.js";

export class AuthService {
  private tokenService = new TokenService();

  async signup(data: any) {
    console.log("Data received:", data);
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
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

    const {password, ...userwithoutPassword} = user;

    return {
      message: "User created successfully",
      user: userwithoutPassword,
    };
  }

  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) { 
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const {password, ...userWithoutPassword} = user;

    return {
      message: "Login successful",
      accessToken,
      user: userWithoutPassword,
    };

    
  }
}