import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export class AssessmentRepository {
  async findAll(params?: {
    courseId?: string;
    teacherId?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.AssessmentWhereInput = {};
    if (params?.courseId) where.courseId = params.courseId;
    if (params?.teacherId) where.teacherId = params.teacherId;

    const [total, assessments] = await Promise.all([
      prisma.assessment.count({ where }),
      prisma.assessment.findMany({
        where,
        include: {
          course: true,
          teacher: { include: { user: true } },
          _count: {
            select: { results: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, assessments };
  }

  async findById(id: string) {
    return prisma.assessment.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: true,
        results: {
          include: {
            student: { include: { user: true } },
          },
          orderBy: { obtainedMarks: "desc" },
        },
      },
    });
  }

  async create(data: {
    courseId: string;
    teacherId: string;
    title: string;
    description?: string;
    assessmentDate?: Date;
    totalMarks?: number;
  }) {
    return prisma.assessment.create({
      data: {
        courseId: data.courseId,
        teacherId: data.teacherId,
        title: data.title,
        description: data.description,
        assessmentDate: data.assessmentDate,
        totalMarks: data.totalMarks ?? 100,
      },
      include: {
        course: true,
        teacher: true,
      },
    });
  }

  async recordResult(data: {
    assessmentId: string;
    studentId: string;
    obtainedMarks: number;
    remarks?: string;
    gradedBy?: string;
  }) {
    return prisma.assessmentResult.upsert({
      where: {
        assessmentId_studentId: {
          assessmentId: data.assessmentId,
          studentId: data.studentId,
        },
      },
      update: {
        obtainedMarks: data.obtainedMarks,
        remarks: data.remarks,
        gradedBy: data.gradedBy,
        gradedAt: new Date(),
      },
      create: {
        assessmentId: data.assessmentId,
        studentId: data.studentId,
        obtainedMarks: data.obtainedMarks,
        remarks: data.remarks,
        gradedBy: data.gradedBy,
      },
      include: {
        student: { include: { user: true } },
        assessment: { include: { course: true } },
      },
    });
  }
}

export const assessmentRepository = new AssessmentRepository();
