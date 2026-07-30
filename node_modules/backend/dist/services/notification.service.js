import { prisma } from "../config/prisma.js";
import createHttpError from "http-errors";
import { Message } from "@articlehub/shared";
export class NotificationService {
    async getMyNotifications(userId) {
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
            message: Message.NOTIFICATIONS_FETCHED_SUCCESSFULLY,
            notifications,
        };
    }
    async markAsRead(notificationId, userId) {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId,
            },
        });
        if (!notification) {
            throw new createHttpError.NotFound(Message.NOTIFICATION_NOT_FOUND);
        }
        if (notification.userId !== userId) {
            throw new createHttpError.Forbidden(Message.NOTIFICATION_NOT_FOUND);
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
            message: Message.NOTIFICATION_MARKED_AS_READ,
            notification: updatedNotification,
        };
    }
}
