import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/async-handler.middleware.js";
const router = Router();
const notificationController = new NotificationController();
router.get("/", authenticate, asyncHandler(notificationController.getMyNotifications.bind(notificationController)));
router.patch("/:id/read", authenticate, asyncHandler(notificationController.markAsRead.bind(notificationController)));
export default router;
