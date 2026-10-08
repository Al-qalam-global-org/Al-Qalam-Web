import { NextRequest, NextResponse } from "next/server";
import { assessmentService } from "@/server/services/assessment.service";
import { requireAuth } from "@/lib/auth/permissions";
import { createAssessmentSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId") || undefined;
    const teacherId = searchParams.get("teacherId") || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await assessmentService.getAssessments({
      courseId,
      teacherId,
      skip,
      take,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      throw new ForbiddenError("Only teachers and admins can create assessments");
    }

    const teacherId = user.teacher?.id;
    if (!teacherId && user.role === "TEACHER") {
      throw new ForbiddenError("Teacher profile missing");
    }

    const body = await req.json();
    const validated = createAssessmentSchema.parse(body);

    const assessment = await assessmentService.createAssessment({
      courseId: validated.courseId,
      teacherId: teacherId || "admin",
      title: validated.title,
      description: validated.description,
      assessmentDate: validated.assessmentDate,
      totalMarks: validated.totalMarks,
    });

    return NextResponse.json(
      {
        success: true,
        data: assessment,
        message: "Assessment published successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
