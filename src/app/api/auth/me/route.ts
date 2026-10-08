import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/permissions";
import { handleApiError } from "@/lib/errors";

export async function GET(_req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({
        success: true,
        data: { user: null },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          student: user.student,
          teacher: user.teacher,
        },
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
