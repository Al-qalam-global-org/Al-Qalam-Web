import { courseRepository } from "@/server/repositories/course.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { NotFoundError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export class CourseService {
  async getCourses(params?: {
    search?: string;
    category?: string;
    level?: string;
    status?: UserStatus;
    skip?: number;
    take?: number;
  }) {
    return courseRepository.findAll(params);
  }

  async getCourseById(id: string) {
    const course = await courseRepository.findById(id);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async getCourseBySlug(slug: string) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async createCourse(
    data: {
      name: string;
      slug: string;
      description: string;
      category?: string;
      ageGroup?: string;
      level?: string;
      duration?: string;
    },
    adminUserId?: string
  ) {
    const course = await courseRepository.create(data);

    await auditRepository.log({
      userId: adminUserId,
      action: "COURSE_CREATED",
      entity: "Course",
      entityId: course.id,
      metadata: { name: course.name },
    });

    return course;
  }

  async updateCourse(
    id: string,
    data: {
      name?: string;
      description?: string;
      category?: string;
      ageGroup?: string;
      level?: string;
      duration?: string;
      status?: UserStatus;
    },
    adminUserId?: string
  ) {
    const course = await courseRepository.update(id, data);

    await auditRepository.log({
      userId: adminUserId,
      action: "COURSE_UPDATED",
      entity: "Course",
      entityId: id,
    });

    return course;
  }

  async assignTeacherAndStudent(
    teacherId: string,
    studentId: string,
    courseId: string,
    adminUserId?: string
  ) {
    const assignment = await courseRepository.assignTeacher(
      teacherId,
      studentId,
      courseId
    );

    await auditRepository.log({
      userId: adminUserId,
      action: "TEACHER_STUDENT_ASSIGNED",
      entity: "TeacherStudentAssignment",
      entityId: assignment.id,
      metadata: { teacherId, studentId, courseId },
    });

    return assignment;
  }

  async deleteCourse(id: string, adminUserId?: string) {
    const course = await courseRepository.delete(id);

    await auditRepository.log({
      userId: adminUserId,
      action: "COURSE_DELETED",
      entity: "Course",
      entityId: id,
      metadata: { name: course.name },
    });

    return course;
  }
}

export const courseService = new CourseService();
