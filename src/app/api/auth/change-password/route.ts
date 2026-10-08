import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import { requireAuth } from "@/lib/auth/permissions";
import { changePasswordSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const validated = changePasswordSchema.parse(body);

    const result = await authService.changePassword(
      user.id,
      validated.currentPassword,
      validated.newPassword
    );

    return NextResponse.json({
      success: true,
      data: result,
      message: "Password updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
