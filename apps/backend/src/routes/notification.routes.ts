import { Router } from "express";

import { NotificationController } from "../controllers/notification.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

const notificationController = new NotificationController();

router.get(
  "/",
  authenticate,
  notificationController.getMyNotifications.bind(notificationController),
);

router.patch(
  "/:id/read",
  authenticate,
  notificationController.markAsRead.bind(notificationController),
);

export default router;
