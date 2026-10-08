import prisma from "@/lib/db/prisma";
import type { Prisma, UserStatus } from "@prisma/client";

export class CourseRepository {
  async findAll(params?: {
    search?: string;
    category?: string;
    level?: string;
    status?: UserStatus;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.CourseWhereInput = {};

    if (params?.status) {
      where.status = params.status;
    }
    if (params?.category) {
      where.category = params.category;
    }
    if (params?.level) {
      where.level = params.level;
    }
    if (params?.search) {
      const s = params.search.trim();
      where.OR = [
        { name: { contains: s, mode: "insensitive" } },
        { description: { contains: s, mode: "insensitive" } },
        { category: { contains: s, mode: "insensitive" } },
      ];
    }

    const [total, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              students: true,
              classes: true,
              materials: true,
              assignments: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, courses };
  }

  async findById(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        materials: { orderBy: { createdAt: "desc" } },
        courseAssignments: { orderBy: { createdAt: "desc" } },
        assessments: { orderBy: { createdAt: "desc" } },
        students: {
          include: { student: { include: { user: true } } },
        },
        assignments: {
          include: {
            teacher: true,
            student: true,
          },
        },
        classes: {
          include: { teacher: true },
          take: 10,
          orderBy: { scheduledDate: "desc" },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        materials: true,
        _count: {
          select: { students: true },
        },
      },
    });
  }

  async create(data: {
    name: string;
    slug: string;
    description: string;
    category?: string;
    ageGroup?: string;
    level?: string;
    duration?: string;
    status?: UserStatus;
  }) {
    return prisma.course.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category || "General",
        ageGroup: data.ageGroup || "All Ages",
        level: data.level || "Beginner",
        duration: data.duration || "3 Months",
        status: data.status || "ACTIVE",
      },
    });
  }

  async update(id: string, data: Prisma.CourseUpdateInput) {
    return prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.course.delete({
      where: { id },
    });
  }

  async enrollStudent(studentId: string, courseId: string) {
    return prisma.studentCourse.upsert({
      where: {
        studentId_courseId: { studentId, courseId },
      },
      update: {
        status: "ACTIVE",
      },
      create: {
        studentId,
        courseId,
        status: "ACTIVE",
      },
    });
  }

  async assignTeacher(teacherId: string, studentId: string, courseId: string) {
    return prisma.teacherStudentAssignment.upsert({
      where: {
        teacherId_studentId_courseId: {
          teacherId,
          studentId,
          courseId,
        },
      },
      update: {
        status: "ACTIVE",
      },
      create: {
        teacherId,
        studentId,
        courseId,
        status: "ACTIVE",
      },
    });
  }
}

export const courseRepository = new CourseRepository();
