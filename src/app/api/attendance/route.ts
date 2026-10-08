import { NextRequest, NextResponse } from "next/server";
import { attendanceService } from "@/server/services/attendance.service";
import { requireAuth } from "@/lib/auth/permissions";
import { markAttendanceSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");

    if (classId) {
      const records = await attendanceService.getAttendanceForClass(classId);
      return NextResponse.json({ success: true, data: records });
    }

    if (studentId) {
      if (user.role === "STUDENT" && user.student?.id !== studentId) {
        throw new ForbiddenError("You cannot view another student's attendance");
      }
      const records = await attendanceService.getAttendanceForStudent(studentId);
      return NextResponse.json({ success: true, data: records });
    }

    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role === "STUDENT") {
      throw new ForbiddenError("Students cannot mark attendance");
    }

    const body = await req.json();
    const validated = markAttendanceSchema.parse(body);

    const markerName =
      user.role === "TEACHER" && user.teacher
        ? `Ustadh ${user.teacher.firstName}`
        : "Admin";

    const record = await attendanceService.markAttendance({
      classId: validated.classId,
      studentId: validated.studentId,
      status: validated.status,
      markedBy: markerName,
      note: validated.note,
    });

    return NextResponse.json({
      success: true,
      data: record,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
