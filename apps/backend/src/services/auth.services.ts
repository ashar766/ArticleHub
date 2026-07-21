import bcrypt from "bcryptjs";
import {prisma} from "../config/prisma.js";

export class AuthService {
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

    return {
      message: "User created successfully",
      user,
    };
  }
}