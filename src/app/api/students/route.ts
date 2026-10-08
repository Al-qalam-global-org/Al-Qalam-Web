import { NextRequest, NextResponse } from "next/server";
import { studentService } from "@/server/services/student.service";
import { requireAuth, requireAdmin } from "@/lib/auth/permissions";
import { createStudentSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";
import type { UserStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);

    // If teacher, they can view their assigned students or all students
    const search = searchParams.get("search") || undefined;
    const status = (searchParams.get("status") as UserStatus) || undefined;
    const level = searchParams.get("level") || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await studentService.getStudents({
      search,
      status,
      level,
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
    const validated = createStudentSchema.parse(body);

    const student = await studentService.createStudent(validated, admin.id);

    return NextResponse.json(
      {
        success: true,
        data: student,
        message: "Student created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
