import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export class AuditRepository {
  async log(data: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    try {
      return await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          metadata: data.metadata,
        },
      });
    } catch (error) {
      console.error("[AuditLog Error]", error);
      return null;
    }
  }

  async getRecent(limit = 20) {
    return prisma.auditLog.findMany({
      include: {
        user: { select: { id: true, email: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}

export const auditRepository = new AuditRepository();
