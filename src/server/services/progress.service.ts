import { progressRepository } from "@/server/repositories/progress.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { studentRepository } from "@/server/repositories/student.repository";

export class ProgressService {
  async getStudentProgress(studentId: string, courseId?: string) {
    return progressRepository.getStudentProgress(studentId, courseId);
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
    const progress = await progressRepository.updateProgress(data);

    const student = await studentRepository.findById(data.studentId);
    if (student?.userId) {
      await notificationRepository.create({
        userId: student.userId,
        title: "Progress Updated",
        message: `Your progress for ${progress.course.name} is now ${data.progressPercentage}% (${data.completedTopics}/${data.totalTopics} topics).`,
        type: "PROGRESS_UPDATED",
      });
    }

    return progress;
  }
}

export const progressService = new ProgressService();
