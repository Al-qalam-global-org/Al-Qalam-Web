import prisma from "@/lib/db/prisma";

export class NotificationRepository {
  async findByUserId(userId: string, isRead?: boolean) {
    return prisma.notification.findMany({
      where: {
        userId,
        ...(typeof isRead === "boolean" ? { isRead } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type?: string;
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "GENERAL",
      },
    });
  }

  async markAsRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }
}

export const notificationRepository = new NotificationRepository();
