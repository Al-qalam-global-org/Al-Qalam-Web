import { NextRequest, NextResponse } from "next/server";
import { attendanceService } from "@/server/services/attendance.service";
import { requireAuth } from "@/lib/auth/permissions";
import { addTopicCoveredSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role === "STUDENT") {
      throw new ForbiddenError("Students cannot record topics covered");
    }

    const body = await req.json();
    const validated = addTopicCoveredSchema.parse(body);

    const creatorName =
      user.role === "TEACHER" && user.teacher
        ? `Ustadh ${user.teacher.firstName}`
        : "Admin";

    const topic = await attendanceService.addTopicCovered({
      classId: validated.classId,
      studentId: validated.studentId,
      title: validated.title,
      description: validated.description,
      createdBy: creatorName,
    });

    return NextResponse.json({
      success: true,
      data: topic,
      message: "Topic covered logged successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
