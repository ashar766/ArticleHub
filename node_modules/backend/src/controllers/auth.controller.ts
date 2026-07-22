console.log("📦 AuthController file loaded");
import { Request, Response } from "express";
import { AuthService } from "../services/auth.services.js";

export class AuthController {
  private authService = new AuthService();

  async signup(req: Request, res: Response) {
  console.log("Controller:", req.body);

  const result = await this.authService.signup(req.body);

  return res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
  const result = await this.authService.login(req.body);

  return res.json(result);
  }

  async profile(req: Request, res: Response) {
    return res.json({
      user: req.user,
    });
  }
}