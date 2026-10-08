import prisma from "@/lib/db/prisma";
import type { Prisma, UserStatus } from "@prisma/client";

export class TeacherRepository {
  async findAll(params?: {
    search?: string;
    status?: UserStatus;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.TeacherWhereInput = {};

    if (params?.status) {
      where.status = params.status;
    }
    if (params?.search) {
      const s = params.search.trim();
      where.OR = [
        { firstName: { contains: s, mode: "insensitive" } },
        { lastName: { contains: s, mode: "insensitive" } },
        { specialization: { contains: s, mode: "insensitive" } },
        { user: { email: { contains: s, mode: "insensitive" } } },
      ];
    }

    const [total, teachers] = await Promise.all([
      prisma.teacher.count({ where }),
      prisma.teacher.findMany({
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
          assignedStudents: {
            include: {
              student: true,
              course: true,
            },
          },
          classes: {
            include: {
              course: true,
            },
            take: 5,
            orderBy: { scheduledDate: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, teachers };
  }

  async findById(id: string) {
    return prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        assignedStudents: {
          include: {
            student: true,
            course: true,
          },
        },
        classes: {
          include: {
            course: true,
            students: { include: { student: true } },
            attendance: true,
          },
          orderBy: { scheduledDate: "desc" },
        },
        assignments: {
          include: { course: true },
        },
        assessments: {
          include: { course: true },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.teacher.findUnique({
      where: { userId },
      include: {
        user: true,
        assignedStudents: {
          include: {
            student: {
              include: { user: true },
            },
            course: true,
          },
        },
      },
    });
  }

  async create(data: {
    userId: string;
    firstName: string;
    lastName: string;
    phone?: string;
    country?: string;
    timezone?: string;
    qualification?: string;
    experienceYears?: number;
    specialization?: string;
    bio?: string;
    status?: UserStatus;
  }) {
    return prisma.teacher.create({
      data: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        country: data.country,
        timezone: data.timezone || "UTC",
        qualification: data.qualification,
        experienceYears: data.experienceYears ?? 0,
        specialization: data.specialization,
        bio: data.bio,
        status: data.status || "ACTIVE",
      },
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: Prisma.TeacherUpdateInput) {
    return prisma.teacher.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.teacher.delete({
      where: { id },
    });
  }
}

export const teacherRepository = new TeacherRepository();
