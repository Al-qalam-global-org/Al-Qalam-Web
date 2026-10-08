import { NextRequest, NextResponse } from "next/server";
import { attendanceService } from "@/server/services/attendance.service";
import { requireAuth } from "@/lib/auth/permissions";
import { addTeacherNoteSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const isStudent = user.role === "STUDENT";
    const notes = await attendanceService.getTeacherNotes(studentId, isStudent);

    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      throw new ForbiddenError("Only teachers and admins can add feedback notes");
    }

    const teacherId = user.teacher?.id;
    if (!teacherId && user.role === "TEACHER") {
      throw new ForbiddenError("Teacher profile missing");
    }

    const body = await req.json();
    const validated = addTeacherNoteSchema.parse(body);

    const note = await attendanceService.addTeacherNote({
      studentId: validated.studentId,
      teacherId: teacherId || "admin",
      classId: validated.classId,
      note: validated.note,
      visibility: validated.visibility,
    });

    return NextResponse.json({
      success: true,
      data: note,
      message: "Teacher feedback added successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
