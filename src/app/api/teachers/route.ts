import { NextRequest, NextResponse } from "next/server";
import { teacherService } from "@/server/services/teacher.service";
import { requireAuth, requireAdmin } from "@/lib/auth/permissions";
import { createTeacherSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    const status = (searchParams.get("status") as UserStatus) || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await teacherService.getTeachers({
      search,
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
    const validated = createTeacherSchema.parse(body);

    const teacher = await teacherService.createTeacher(validated, admin.id);

    return NextResponse.json(
      {
        success: true,
        data: teacher,
        message: "Teacher created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
