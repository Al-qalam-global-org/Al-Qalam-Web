import { NextRequest, NextResponse } from "next/server";
import { classService } from "@/server/services/class.service";
import { requireAuth, requireAdmin } from "@/lib/auth/permissions";
import { createClassSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";
import type { ClassStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);

    let teacherId = searchParams.get("teacherId") || undefined;
    let studentId = searchParams.get("studentId") || undefined;

    // Filter by role automatically if not admin
    if (user.role === "TEACHER" && user.teacher) {
      teacherId = user.teacher.id;
    } else if (user.role === "STUDENT" && user.student) {
      studentId = user.student.id;
    }

    const courseId = searchParams.get("courseId") || undefined;
    const status = (searchParams.get("status") as ClassStatus) || undefined;
    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await classService.getClasses({
      teacherId,
      studentId,
      courseId,
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
    const validated = createClassSchema.parse(body);

    const newClass = await classService.scheduleClass(validated, admin.id);

    return NextResponse.json(
      {
        success: true,
        data: newClass,
        message: "Class scheduled successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
