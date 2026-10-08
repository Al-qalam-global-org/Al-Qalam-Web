import { assessmentRepository } from "@/server/repositories/assessment.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { courseRepository } from "@/server/repositories/course.repository";
import { NotFoundError } from "@/lib/errors";

export class AssessmentService {
  async getAssessments(params?: {
    courseId?: string;
    teacherId?: string;
    skip?: number;
    take?: number;
  }) {
    return assessmentRepository.findAll(params);
  }

  async getAssessmentById(id: string) {
    const assessment = await assessmentRepository.findById(id);
    if (!assessment) throw new NotFoundError("Assessment not found");
    return assessment;
  }

  async createAssessment(data: {
    courseId: string;
    teacherId: string;
    title: string;
    description?: string;
    assessmentDate?: string;
    totalMarks?: number;
  }) {
    const assessment = await assessmentRepository.create({
      courseId: data.courseId,
      teacherId: data.teacherId,
      title: data.title,
      description: data.description,
      assessmentDate: data.assessmentDate ? new Date(data.assessmentDate) : undefined,
      totalMarks: data.totalMarks,
    });

    const course = await courseRepository.findById(data.courseId);
    if (course?.students) {
      for (const enrollment of course.students) {
        if (enrollment.student?.user?.id) {
          await notificationRepository.create({
            userId: enrollment.student.user.id,
            title: "Assessment Announced",
            message: `A new assessment "${data.title}" has been scheduled for ${course.name}.`,
            type: "ASSESSMENT_PUBLISHED",
          });
        }
      }
    }

    return assessment;
  }

  async recordResult(data: {
    assessmentId: string;
    studentId: string;
    obtainedMarks: number;
    remarks?: string;
    gradedBy?: string;
  }) {
    const result = await assessmentRepository.recordResult(data);

    if (result.student?.user?.id) {
      await notificationRepository.create({
        userId: result.student.user.id,
        title: "Assessment Result Published",
        message: `Your result for "${result.assessment.title}": ${data.obtainedMarks} / ${result.assessment.totalMarks} marks.`,
        type: "ASSESSMENT_RESULT",
      });
    }

    return result;
  }
}

export const assessmentService = new AssessmentService();
