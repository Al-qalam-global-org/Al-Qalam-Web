import { assignmentRepository } from "@/server/repositories/assignment.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { courseRepository } from "@/server/repositories/course.repository";
import { NotFoundError } from "@/lib/errors";
import type { SubmissionStatus } from "@prisma/client";

export class AssignmentService {
  async getAssignments(params?: {
    courseId?: string;
    teacherId?: string;
    skip?: number;
    take?: number;
  }) {
    return assignmentRepository.findAll(params);
  }

  async getAssignmentById(id: string) {
    const assignment = await assignmentRepository.findById(id);
    if (!assignment) throw new NotFoundError("Assignment not found");
    return assignment;
  }

  async createAssignment(data: {
    courseId: string;
    teacherId: string;
    title: string;
    description: string;
    dueDate?: string;
    attachmentUrl?: string;
    cloudinaryPublicId?: string;
  }) {
    const assignment = await assignmentRepository.create({
      courseId: data.courseId,
      teacherId: data.teacherId,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      attachmentUrl: data.attachmentUrl,
      cloudinaryPublicId: data.cloudinaryPublicId,
    });

    const course = await courseRepository.findById(data.courseId);
    if (course?.students) {
      for (const enrollment of course.students) {
        if (enrollment.student?.user?.id) {
          await notificationRepository.create({
            userId: enrollment.student.user.id,
            title: "New Assignment",
            message: `A new assignment "${data.title}" was added for ${course.name}.`,
            type: "ASSIGNMENT_ADDED",
          });
        }
      }
    }

    return assignment;
  }

  async submitAssignment(data: {
    assignmentId: string;
    studentId: string;
    submissionText?: string;
    attachmentUrl?: string;
    cloudinaryPublicId?: string;
  }) {
    return assignmentRepository.submitAssignment(data);
  }

  async reviewSubmission(
    submissionId: string,
    data: {
      status: SubmissionStatus;
      teacherFeedback?: string;
    }
  ) {
    const reviewed = await assignmentRepository.reviewSubmission(submissionId, data);
    if (reviewed.student?.user?.id) {
      await notificationRepository.create({
        userId: reviewed.student.user.id,
        title: "Assignment Reviewed",
        message: `Your assignment submission for "${reviewed.assignment.title}" has been reviewed.`,
        type: "ASSIGNMENT_REVIEWED",
      });
    }
    return reviewed;
  }
}

export const assignmentService = new AssignmentService();
