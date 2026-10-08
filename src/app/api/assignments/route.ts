import { NextRequest, NextResponse } from "next/server";
import { assignmentService } from "@/server/services/assignment.service";
import { requireAuth } from "@/lib/auth/permissions";
import { createAssignmentSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId") || undefined;
    const teacherId = searchParams.get("teacherId") || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await assignmentService.getAssignments({
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
      throw new ForbiddenError("Only teachers and admins can create assignments");
    }

    const teacherId = user.teacher?.id;
    if (!teacherId && user.role === "TEACHER") {
      throw new ForbiddenError("Teacher profile missing");
    }

    const body = await req.json();
    const validated = createAssignmentSchema.parse(body);

    const assignment = await assignmentService.createAssignment({
      courseId: validated.courseId,
      teacherId: teacherId || "admin",
      title: validated.title,
      description: validated.description,
      dueDate: validated.dueDate,
      attachmentUrl: validated.attachmentUrl,
    });

    return NextResponse.json(
      {
        success: true,
        data: assignment,
        message: "Assignment created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
