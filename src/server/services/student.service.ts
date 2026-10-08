import { userRepository } from "@/server/repositories/user.repository";
import { studentRepository } from "@/server/repositories/student.repository";
import { courseRepository } from "@/server/repositories/course.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { brevoEmailService } from "@/lib/brevo";
import { hashPassword } from "@/lib/auth/password";
import { ConflictError, NotFoundError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export class StudentService {
  async getStudents(params?: {
    search?: string;
    status?: UserStatus;
    level?: string;
    skip?: number;
    take?: number;
  }) {
    return studentRepository.findAll(params);
  }

  async getStudentById(id: string) {
    const student = await studentRepository.findById(id);
    if (!student) throw new NotFoundError("Student not found");
    return student;
  }

  async getStudentByUserId(userId: string) {
    const student = await studentRepository.findByUserId(userId);
    if (!student) throw new NotFoundError("Student profile not found");
    return student;
  }

  async createStudent(
    data: {
      email: string;
      password?: string;
      firstName: string;
      lastName: string;
      phone?: string;
      dateOfBirth?: string;
      country?: string;
      timezone?: string;
      grade?: string;
      level?: string;
      parentName?: string;
      parentPhone?: string;
      parentEmail?: string;
      courseIds?: string[];
      teacherId?: string;
    },
    adminUserId?: string
  ) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("A user with this email address already exists");
    }

    const defaultPassword = data.password || "StudentPass123!";
    const passwordHash = await hashPassword(defaultPassword);

    const user = await userRepository.create({
      email: data.email,
      passwordHash,
      role: "STUDENT",
    });

    const student = await studentRepository.create({
      userId: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      country: data.country,
      timezone: data.timezone || "UTC",
      grade: data.grade,
      level: data.level || "Beginner",
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      parentEmail: data.parentEmail,
    });

    // Handle course enrollments
    if (data.courseIds && data.courseIds.length > 0) {
      for (const courseId of data.courseIds) {
        await courseRepository.enrollStudent(student.id, courseId);
        if (data.teacherId) {
          await courseRepository.assignTeacher(data.teacherId, student.id, courseId);
        }
      }
    }

    await auditRepository.log({
      userId: adminUserId,
      action: "STUDENT_CREATED",
      entity: "Student",
      entityId: student.id,
      metadata: { email: data.email, name: `${data.firstName} ${data.lastName}` },
    });

    // Send welcome email asynchronously
    brevoEmailService.sendWelcomeEmail(
      data.email,
      `${data.firstName} ${data.lastName}`,
      "Student"
    );

    return {
      ...student,
      user,
      initialPassword: defaultPassword,
    };
  }

  async updateStudent(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      country?: string;
      timezone?: string;
      grade?: string;
      level?: string;
      parentName?: string;
      parentPhone?: string;
      parentEmail?: string;
      status?: UserStatus;
    },
    adminUserId?: string
  ) {
    const student = await studentRepository.update(id, data);

    await auditRepository.log({
      userId: adminUserId,
      action: "STUDENT_UPDATED",
      entity: "Student",
      entityId: id,
    });

    return student;
  }
}

export const studentService = new StudentService();
