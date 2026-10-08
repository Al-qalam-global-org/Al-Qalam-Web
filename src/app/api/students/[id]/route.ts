import { NextRequest, NextResponse } from "next/server";
import { studentService } from "@/server/services/student.service";
import { requireAuth, requireAdmin } from "@/lib/auth/permissions";
import { updateStudentSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Student can only view their own profile unless teacher/admin
    if (user.role === "STUDENT" && user.student?.id !== id) {
      throw new ForbiddenError("You can only view your own student profile");
    }

    const student = await studentService.getStudentById(id);

    return NextResponse.json({
      success: true,
      data: student,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Admin can edit anything, Student can edit basic personal details
    if (user.role === "STUDENT" && user.student?.id !== id) {
      throw new ForbiddenError("Unauthorized to update this profile");
    }

    const body = await req.json();
    const validated = updateStudentSchema.parse(body);

    const student = await studentService.updateStudent(id, validated, user.id);

    return NextResponse.json({
      success: true,
      data: student,
      message: "Student updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
