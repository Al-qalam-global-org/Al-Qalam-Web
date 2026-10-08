import prisma from "@/lib/db/prisma";

export class ProgressRepository {
  async getStudentProgress(studentId: string, courseId?: string) {
    return prisma.studentProgress.findMany({
      where: {
        studentId,
        ...(courseId ? { courseId } : {}),
      },
      include: {
        course: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  async updateProgress(data: {
    studentId: string;
    courseId: string;
    progressPercentage: number;
    currentLevel?: string;
    completedTopics?: number;
    totalTopics?: number;
    updatedBy?: string;
  }) {
    return prisma.studentProgress.upsert({
      where: {
        studentId_courseId: {
          studentId: data.studentId,
          courseId: data.courseId,
        },
      },
      update: {
        progressPercentage: data.progressPercentage,
        currentLevel: data.currentLevel ?? "Intermediate",
        completedTopics: data.completedTopics ?? 0,
        totalTopics: data.totalTopics ?? 20,
        updatedBy: data.updatedBy,
      },
      create: {
        studentId: data.studentId,
        courseId: data.courseId,
        progressPercentage: data.progressPercentage,
        currentLevel: data.currentLevel ?? "Beginner",
        completedTopics: data.completedTopics ?? 0,
        totalTopics: data.totalTopics ?? 20,
        updatedBy: data.updatedBy,
      },
      include: {
        course: true,
        student: { include: { user: true } },
      },
    });
  }
}

export const progressRepository = new ProgressRepository();
