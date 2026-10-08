import { NextRequest, NextResponse } from "next/server";
import { teacherService } from "@/server/services/teacher.service";
import { requireAuth } from "@/lib/auth/permissions";
import { updateTeacherSchema } from "@/lib/validation";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const teacher = await teacherService.getTeacherById(id);

    return NextResponse.json({
      success: true,
      data: teacher,
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

    if (user.role === "TEACHER" && user.teacher?.id !== id) {
      throw new ForbiddenError("Unauthorized to modify this teacher profile");
    }

    const body = await req.json();
    const validated = updateTeacherSchema.parse(body);

    const teacher = await teacherService.updateTeacher(id, validated, user.id);

    return NextResponse.json({
      success: true,
      data: teacher,
      message: "Teacher updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
