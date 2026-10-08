import prisma from "@/lib/db/prisma";
import type { Role, UserStatus } from "@prisma/client";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        student: true,
        teacher: true,
      },
    });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    role: Role;
    status?: UserStatus;
  }) {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash: data.passwordHash,
        role: data.role,
        status: data.status || "ACTIVE",
      },
    });
  }

  async updateLastLogin(id: string) {
    return prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  async createSession(userId: string, sessionToken: string, expiresAt: Date) {
    return prisma.session.create({
      data: {
        userId,
        sessionToken,
        expiresAt,
      },
    });
  }

  async findSessionByToken(sessionToken: string) {
    return prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          include: {
            student: true,
            teacher: true,
          },
        },
      },
    });
  }

  async deleteSession(sessionToken: string) {
    return prisma.session.deleteMany({
      where: { sessionToken },
    });
  }

  async deleteExpiredSessions() {
    return prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date
  ) {
    return prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async findValidResetToken(tokenHash: string) {
    return prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });
  }

  async markResetTokenUsed(id: string) {
    return prisma.passwordResetToken.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }
}

export const userRepository = new UserRepository();
