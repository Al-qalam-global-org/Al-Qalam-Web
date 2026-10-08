import prisma from "@/lib/db/prisma";
import type {
  ClassStatus,
  ClassType,
  MeetingPlatform,
  Prisma,
} from "@prisma/client";

export class ClassRepository {
  async findAll(params?: {
    teacherId?: string;
    studentId?: string;
    courseId?: string;
    status?: ClassStatus;
    startDate?: Date;
    endDate?: Date;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.ClassWhereInput = {};

    if (params?.status) {
      where.status = params.status;
    }
    if (params?.teacherId) {
      where.teacherId = params.teacherId;
    }
    if (params?.courseId) {
      where.courseId = params.courseId;
    }
    if (params?.studentId) {
      where.students = {
        some: { studentId: params.studentId },
      };
    }
    if (params?.startDate || params?.endDate) {
      where.scheduledDate = {};
      if (params.startDate) where.scheduledDate.gte = params.startDate;
      if (params.endDate) where.scheduledDate.lte = params.endDate;
    }

    const [total, classes] = await Promise.all([
      prisma.class.count({ where }),
      prisma.class.findMany({
        where,
        include: {
          course: true,
          teacher: {
            include: { user: true },
          },
          students: {
            include: {
              student: { include: { user: true } },
            },
          },
          attendance: true,
          topics: true,
          notes: true,
        },
        orderBy: { scheduledDate: "asc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, classes };
  }

  async findById(id: string) {
    return prisma.class.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: {
          include: { user: true },
        },
        students: {
          include: {
            student: {
              include: { user: true },
            },
          },
        },
        attendance: {
          include: {
            student: true,
          },
        },
        topics: {
          include: { student: true },
        },
        notes: {
          include: { teacher: true, student: true },
        },
      },
    });
  }

  async create(data: {
    courseId: string;
    teacherId: string;
    scheduledDate: Date;
    startTime: string;
    endTime: string;
    timezone?: string;
    classType?: ClassType;
    meetingPlatform?: MeetingPlatform;
    meetingUrl: string;
    studentIds?: string[];
  }) {
    return prisma.class.create({
      data: {
        courseId: data.courseId,
        teacherId: data.teacherId,
        scheduledDate: data.scheduledDate,
        startTime: data.startTime,
        endTime: data.endTime,
        timezone: data.timezone || "UTC",
        classType: data.classType || "ONE_TO_ONE",
        meetingPlatform: data.meetingPlatform || "ZOOM",
        meetingUrl: data.meetingUrl,
        students: data.studentIds?.length
          ? {
              create: data.studentIds.map((studentId) => ({
                studentId,
              })),
            }
          : undefined,
      },
      include: {
        course: true,
        teacher: { include: { user: true } },
        students: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.ClassUpdateInput) {
    return prisma.class.update({
      where: { id },
      data,
      include: {
        course: true,
        teacher: true,
        students: { include: { student: true } },
      },
    });
  }

  async delete(id: string) {
    return prisma.class.delete({
      where: { id },
    });
  }
}

export const classRepository = new ClassRepository();
