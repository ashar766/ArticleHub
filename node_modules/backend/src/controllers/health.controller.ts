import { Request, Response } from "express";

export class HealthController {
  getHealth(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: "ArticleHub API is running",
    });
  }
}
