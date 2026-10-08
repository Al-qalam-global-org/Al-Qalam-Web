import { NextRequest, NextResponse } from "next/server";
import { courseService } from "@/server/services/course.service";
import { requireAdmin } from "@/lib/auth/permissions";
import { createCourseSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const level = searchParams.get("level") || undefined;
    const status = (searchParams.get("status") as UserStatus) || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await courseService.getCourses({
      search,
      category,
      level,
      status,
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
    const admin = await requireAdmin();
    const body = await req.json();
    const validated = createCourseSchema.parse(body);

    const course = await courseService.createCourse(validated, admin.id);

    return NextResponse.json(
      {
        success: true,
        data: course,
        message: "Course created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
