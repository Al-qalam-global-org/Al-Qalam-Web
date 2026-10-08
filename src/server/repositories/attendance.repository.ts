import prisma from "@/lib/db/prisma";
import type { AttendanceStatus, Prisma } from "@prisma/client";

export class AttendanceRepository {
  async findByClassId(classId: string) {
    return prisma.attendance.findMany({
      where: { classId },
      include: {
        student: {
          include: { user: true },
        },
      },
      orderBy: { student: { firstName: "asc" } },
    });
  }

  async findByStudentId(studentId: string, params?: { skip?: number; take?: number }) {
    return prisma.attendance.findMany({
      where: { studentId },
      include: {
        class: {
          include: {
            course: true,
            teacher: true,
          },
        },
      },
      orderBy: { markedAt: "desc" },
      skip: params?.skip ?? 0,
      take: params?.take ?? 50,
    });
  }

  async markAttendance(data: {
    classId: string;
    studentId: string;
    status: AttendanceStatus;
    markedBy?: string;
    note?: string;
  }) {
    return prisma.attendance.upsert({
      where: {
        classId_studentId: {
          classId: data.classId,
          studentId: data.studentId,
        },
      },
      update: {
        status: data.status,
        markedBy: data.markedBy,
        markedAt: new Date(),
        note: data.note,
      },
      create: {
        classId: data.classId,
        studentId: data.studentId,
        status: data.status,
        markedBy: data.markedBy,
        note: data.note,
      },
      include: {
        student: true,
      },
    });
  }

  async addTopicCovered(data: {
    classId: string;
    studentId: string;
    title: string;
    description?: string;
    createdBy?: string;
  }) {
    return prisma.topicCovered.create({
      data: {
        classId: data.classId,
        studentId: data.studentId,
        title: data.title,
        description: data.description,
        createdBy: data.createdBy,
      },
    });
  }

  async addTeacherNote(data: {
    studentId: string;
    teacherId: string;
    classId?: string;
    note: string;
    visibility?: "STUDENT_VISIBLE" | "INTERNAL";
  }) {
    return prisma.teacherNote.create({
      data: {
        studentId: data.studentId,
        teacherId: data.teacherId,
        classId: data.classId,
        note: data.note,
        visibility: data.visibility || "STUDENT_VISIBLE",
      },
      include: {
        teacher: true,
        student: true,
      },
    });
  }

  async getTeacherNotesForStudent(studentId: string, isStudentView = false) {
    const where: Prisma.TeacherNoteWhereInput = { studentId };
    if (isStudentView) {
      where.visibility = "STUDENT_VISIBLE";
    }

    return prisma.teacherNote.findMany({
      where,
      include: {
        teacher: true,
        class: { include: { course: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const attendanceRepository = new AttendanceRepository();
