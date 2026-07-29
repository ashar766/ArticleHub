import { prisma } from "../config/prisma.js";
import createHttpError from "http-errors";

export class NotificationService {
  async getMyNotifications(userId: string) {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      message: "Notifications fetched successfully",
      notifications,
    };
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      throw new createHttpError.NotFound("Notification not found");
    }

    if (notification.userId !== userId) {
      throw new createHttpError.Forbidden(
        "You are not allowed to access this notification",
      );
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });

    return {
      message: "Notification marked as read",
      notification: updatedNotification,
    };
  }
}
