import { notificationRepository } from "@/server/repositories/notification.repository";

export class NotificationService {
  async getUserNotifications(userId: string, isRead?: boolean) {
    return notificationRepository.findByUserId(userId, isRead);
  }

  async markAsRead(id: string, userId: string) {
    return notificationRepository.markAsRead(id, userId);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  }
}

export const notificationService = new NotificationService();
