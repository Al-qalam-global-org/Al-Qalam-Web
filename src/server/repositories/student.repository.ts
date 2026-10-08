import prisma from "@/lib/db/prisma";
import type { Prisma, UserStatus } from "@prisma/client";

export class StudentRepository {
  async findAll(params?: {
    search?: string;
    status?: UserStatus;
    level?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.StudentWhereInput = {};

    if (params?.status) {
      where.status = params.status;
    }
    if (params?.level) {
      where.level = params.level;
    }
    if (params?.search) {
      const s = params.search.trim();
      where.OR = [
        { firstName: { contains: s, mode: "insensitive" } },
        { lastName: { contains: s, mode: "insensitive" } },
        { parentName: { contains: s, mode: "insensitive" } },
        { user: { email: { contains: s, mode: "insensitive" } } },
      ];
    }

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              status: true,
              lastLoginAt: true,
            },
          },
          courses: {
            include: {
              course: true,
            },
          },
          assignments: {
            include: {
              teacher: true,
              course: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, students };
  }

  async findById(id: string) {
    return prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        courses: {
          include: {
            course: true,
          },
        },
        assignments: {
          include: {
            teacher: true,
            course: true,
          },
        },
        attendance: {
          include: {
            class: {
              include: { course: true },
            },
          },
          orderBy: { markedAt: "desc" },
        },
        progress: {
          include: { course: true },
        },
        notes: {
          include: { teacher: true },
          orderBy: { createdAt: "desc" },
        },
        certificates: {
          include: { course: true },
        },
        submissions: {
          include: { assignment: true },
        },
        results: {
          include: { assessment: { include: { course: true } } },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.student.findUnique({
      where: { userId },
      include: {
        user: true,
        courses: {
          include: { course: true },
        },
        assignments: {
          include: { teacher: true, course: true },
        },
        progress: {
          include: { course: true },
        },
      },
    });
  }

  async create(data: {
    userId: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    country?: string;
    timezone?: string;
    grade?: string;
    level?: string;
    parentName?: string;
    parentPhone?: string;
    parentEmail?: string;
    status?: UserStatus;
  }) {
    return prisma.student.create({
      data: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        timezone: data.timezone || "UTC",
        grade: data.grade,
        level: data.level || "Beginner",
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        parentEmail: data.parentEmail,
        status: data.status || "ACTIVE",
      },
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    return prisma.student.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.student.delete({
      where: { id },
    });
  }
}

export const studentRepository = new StudentRepository();
