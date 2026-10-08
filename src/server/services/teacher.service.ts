import { userRepository } from "@/server/repositories/user.repository";
import { teacherRepository } from "@/server/repositories/teacher.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { brevoEmailService } from "@/lib/brevo";
import { hashPassword } from "@/lib/auth/password";
import { ConflictError, NotFoundError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export class TeacherService {
  async getTeachers(params?: {
    search?: string;
    status?: UserStatus;
    skip?: number;
    take?: number;
  }) {
    return teacherRepository.findAll(params);
  }

  async getTeacherById(id: string) {
    const teacher = await teacherRepository.findById(id);
    if (!teacher) throw new NotFoundError("Teacher not found");
    return teacher;
  }

  async getTeacherByUserId(userId: string) {
    const teacher = await teacherRepository.findByUserId(userId);
    if (!teacher) throw new NotFoundError("Teacher profile not found");
    return teacher;
  }

  async createTeacher(
    data: {
      email: string;
      password?: string;
      firstName: string;
      lastName: string;
      phone?: string;
      country?: string;
      timezone?: string;
      qualification?: string;
      experienceYears?: number;
      specialization?: string;
      bio?: string;
    },
    adminUserId?: string
  ) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("A user with this email address already exists");
    }

    const defaultPassword = data.password || "TeacherPass123!";
    const passwordHash = await hashPassword(defaultPassword);

    const user = await userRepository.create({
      email: data.email,
      passwordHash,
      role: "TEACHER",
    });

    const teacher = await teacherRepository.create({
      userId: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      country: data.country,
      timezone: data.timezone || "UTC",
      qualification: data.qualification,
      experienceYears: data.experienceYears ?? 0,
      specialization: data.specialization,
      bio: data.bio,
    });

    await auditRepository.log({
      userId: adminUserId,
      action: "TEACHER_CREATED",
      entity: "Teacher",
      entityId: teacher.id,
      metadata: { email: data.email, name: `${data.firstName} ${data.lastName}` },
    });

    brevoEmailService.sendWelcomeEmail(
      data.email,
      `${data.firstName} ${data.lastName}`,
      "Teacher"
    );

    return teacher;
  }

  async updateTeacher(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      country?: string;
      timezone?: string;
      qualification?: string;
      experienceYears?: number;
      specialization?: string;
      bio?: string;
      status?: UserStatus;
    },
    adminUserId?: string
  ) {
    const teacher = await teacherRepository.update(id, data);

    await auditRepository.log({
      userId: adminUserId,
      action: "TEACHER_UPDATED",
      entity: "Teacher",
      entityId: id,
    });

    return teacher;
  }
}

export const teacherService = new TeacherService();
