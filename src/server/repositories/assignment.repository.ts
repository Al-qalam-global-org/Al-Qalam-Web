import prisma from "@/lib/db/prisma";
import type { Prisma, SubmissionStatus } from "@prisma/client";

export class AssignmentRepository {
  async findAll(params?: {
    courseId?: string;
    teacherId?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.AssignmentWhereInput = {};
    if (params?.courseId) where.courseId = params.courseId;
    if (params?.teacherId) where.teacherId = params.teacherId;

    const [total, assignments] = await Promise.all([
      prisma.assignment.count({ where }),
      prisma.assignment.findMany({
        where,
        include: {
          course: true,
          teacher: { include: { user: true } },
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, assignments };
  }

  async findById(id: string) {
    return prisma.assignment.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: true,
        submissions: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
    });
  }

  async create(data: {
    courseId: string;
    teacherId: string;
    title: string;
    description: string;
    dueDate?: Date;
    attachmentUrl?: string;
    cloudinaryPublicId?: string;
  }) {
    return prisma.assignment.create({
      data: {
        courseId: data.courseId,
        teacherId: data.teacherId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        attachmentUrl: data.attachmentUrl,
        cloudinaryPublicId: data.cloudinaryPublicId,
      },
      include: {
        course: true,
        teacher: true,
      },
    });
  }

  async update(id: string, data: Prisma.AssignmentUpdateInput) {
    return prisma.assignment.update({
      where: { id },
      data,
    });
  }

  async submitAssignment(data: {
    assignmentId: string;
    studentId: string;
    submissionText?: string;
    attachmentUrl?: string;
    cloudinaryPublicId?: string;
  }) {
    return prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId: data.assignmentId,
          studentId: data.studentId,
        },
      },
      update: {
        submissionText: data.submissionText,
        attachmentUrl: data.attachmentUrl,
        cloudinaryPublicId: data.cloudinaryPublicId,
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
      create: {
        assignmentId: data.assignmentId,
        studentId: data.studentId,
        submissionText: data.submissionText,
        attachmentUrl: data.attachmentUrl,
        cloudinaryPublicId: data.cloudinaryPublicId,
        status: "SUBMITTED",
      },
      include: {
        assignment: true,
      },
    });
  }

  async reviewSubmission(
    submissionId: string,
    data: {
      status: SubmissionStatus;
      teacherFeedback?: string;
    }
  ) {
    return prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        status: data.status,
        teacherFeedback: data.teacherFeedback,
        reviewedAt: new Date(),
      },
      include: {
        student: { include: { user: true } },
        assignment: true,
      },
    });
  }
}

export const assignmentRepository = new AssignmentRepository();
