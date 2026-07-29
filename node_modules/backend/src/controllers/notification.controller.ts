import { Request, Response } from "express";

import { NotificationService } from "../services/notification.service.js";

export class NotificationController {
  private notificationService = new NotificationService();

  async getMyNotifications(req: Request, res: Response) {
    const result = await this.notificationService.getMyNotifications(
      req.user!.id,
    );

    return res.json(result);
  }

  async markAsRead(req: Request<{ id: string }>, res: Response) {
    const result = await this.notificationService.markAsRead(
      req.params.id,
      req.user!.id,
    );

    return res.json(result);
  }
}
