import { NextRequest, NextResponse } from "next/server";
import { courseService } from "@/server/services/course.service";
import { requireAdmin } from "@/lib/auth/permissions";
import { updateCourseSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await courseService.getCourseById(id);

    return NextResponse.json({
      success: true,
      data: course,
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
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const validated = updateCourseSchema.parse(body);

    const course = await courseService.updateCourse(id, validated, admin.id);

    return NextResponse.json({
      success: true,
      data: course,
      message: "Course updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const course = await courseService.deleteCourse(id, admin.id);

    return NextResponse.json({
      success: true,
      data: course,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
