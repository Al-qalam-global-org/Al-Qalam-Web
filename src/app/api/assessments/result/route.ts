import { NextRequest, NextResponse } from "next/server";
import { assessmentService } from "@/server/services/assessment.service";
import { requireAuth } from "@/lib/auth/permissions";
import { recordAssessmentResultSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      throw new ForbiddenError("Only teachers and admins can record marks");
    }

    const body = await req.json();
    const validated = recordAssessmentResultSchema.parse(body);

    const graderName =
      user.role === "TEACHER" && user.teacher
        ? `Ustadh ${user.teacher.firstName}`
        : "Admin";

    const result = await assessmentService.recordResult({
      assessmentId: validated.assessmentId,
      studentId: validated.studentId,
      obtainedMarks: validated.obtainedMarks,
      remarks: validated.remarks,
      gradedBy: graderName,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: "Assessment result recorded successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
