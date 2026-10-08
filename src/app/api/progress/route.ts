import { NextRequest, NextResponse } from "next/server";
import { progressService } from "@/server/services/progress.service";
import { requireAuth } from "@/lib/auth/permissions";
import { updateProgressSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    let studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId") || undefined;

    if (user.role === "STUDENT" && user.student) {
      studentId = user.student.id;
    }

    if (!studentId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const progress = await progressService.getStudentProgress(studentId, courseId);
    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role === "STUDENT") {
      throw new ForbiddenError("Students cannot modify progress metrics");
    }

    const body = await req.json();
    const validated = updateProgressSchema.parse(body);

    const updater =
      user.role === "TEACHER" && user.teacher
        ? `Ustadh ${user.teacher.firstName}`
        : "Admin";

    const progress = await progressService.updateProgress({
      ...validated,
      updatedBy: updater,
    });

    return NextResponse.json({
      success: true,
      data: progress,
      message: "Student progress updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
