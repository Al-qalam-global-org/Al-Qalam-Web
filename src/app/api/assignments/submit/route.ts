import { NextRequest, NextResponse } from "next/server";
import { assignmentService } from "@/server/services/assignment.service";
import { requireStudent } from "@/lib/auth/permissions";
import { submitAssignmentSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await requireStudent();
    if (!user.student) {
      throw new ForbiddenError("Student profile not found");
    }

    const body = await req.json();
    const validated = submitAssignmentSchema.parse(body);

    const submission = await assignmentService.submitAssignment({
      assignmentId: validated.assignmentId,
      studentId: user.student.id,
      submissionText: validated.submissionText,
      attachmentUrl: validated.attachmentUrl,
    });

    return NextResponse.json({
      success: true,
      data: submission,
      message: "Assignment submitted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
