import { NextRequest, NextResponse } from "next/server";
import { assignmentService } from "@/server/services/assignment.service";
import { requireAuth } from "@/lib/auth/permissions";
import { reviewSubmissionSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      throw new ForbiddenError("Only teachers and admins can review submissions");
    }

    const body = await req.json();
    const validated = reviewSubmissionSchema.parse(body);

    const submission = await assignmentService.reviewSubmission(
      validated.submissionId,
      {
        status: validated.status,
        teacherFeedback: validated.teacherFeedback,
      }
    );

    return NextResponse.json({
      success: true,
      data: submission,
      message: "Submission evaluated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
