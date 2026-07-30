import { Request, Response } from "express";
import { HttpStatus, Message } from "@articlehub/shared";

export class HealthController {
  getHealth(req: Request, res: Response) {
    res.status(HttpStatus.OK).json({
      success: true,
      message: Message.API_IS_RUNNING,
    });
  }
}
