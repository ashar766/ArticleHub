import { Notification } from "../generated/prisma/client.js";
import { NotificationResponseDto } from "@articlehub/shared";

export const toNotificationResponseDto = (
  notification: Notification,
): NotificationResponseDto => ({
  id: notification.id,
  title: notification.title,
  message: notification.message,
  isRead: notification.isRead,
  userId: notification.userId,
  createdAt: notification.createdAt,
});
