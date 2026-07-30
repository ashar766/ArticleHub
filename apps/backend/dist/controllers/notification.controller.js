import { NotificationService } from "../services/notification.service.js";
export class NotificationController {
    notificationService = new NotificationService();
    async getMyNotifications(req, res) {
        const result = await this.notificationService.getMyNotifications(req.user.id);
        return res.json(result);
    }
    async markAsRead(req, res) {
        const result = await this.notificationService.markAsRead(req.params.id, req.user.id);
        return res.json(result);
    }
}
