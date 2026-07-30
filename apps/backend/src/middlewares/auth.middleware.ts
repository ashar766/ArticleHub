import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus, Message } from "@articlehub/shared";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: Message.UNAUTHORIZED,
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: Message.UNAUTHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: Message.INVALID_TOKEN,
    });
  }
};
