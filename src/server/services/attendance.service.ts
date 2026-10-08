import { attendanceRepository } from "@/server/repositories/attendance.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { studentRepository } from "@/server/repositories/student.repository";
import type { AttendanceStatus } from "@prisma/client";

export class AttendanceService {
  async getAttendanceForClass(classId: string) {
    return attendanceRepository.findByClassId(classId);
  }

  async getAttendanceForStudent(studentId: string, params?: { skip?: number; take?: number }) {
    return attendanceRepository.findByStudentId(studentId, params);
  }

  async markAttendance(data: {
    classId: string;
    studentId: string;
    status: AttendanceStatus;
    markedBy?: string;
    note?: string;
  }) {
    return attendanceRepository.markAttendance(data);
  }

  async addTopicCovered(data: {
    classId: string;
    studentId: string;
    title: string;
    description?: string;
    createdBy?: string;
  }) {
    return attendanceRepository.addTopicCovered(data);
  }

  async addTeacherNote(data: {
    studentId: string;
    teacherId: string;
    classId?: string;
    note: string;
    visibility?: "STUDENT_VISIBLE" | "INTERNAL";
  }) {
    const note = await attendanceRepository.addTeacherNote(data);

    if (data.visibility === "STUDENT_VISIBLE") {
      const student = await studentRepository.findById(data.studentId);
      if (student?.userId) {
        await notificationRepository.create({
          userId: student.userId,
          title: "New Teacher Feedback",
          message: "Your teacher has posted new feedback on your progress.",
          type: "TEACHER_FEEDBACK",
        });
      }
    }

    return note;
  }

  async getTeacherNotes(studentId: string, isStudentView = false) {
    return attendanceRepository.getTeacherNotesForStudent(studentId, isStudentView);
  }
}

export const attendanceService = new AttendanceService();
