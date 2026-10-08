import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import {
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
} from "@/lib/validation";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if ("token" in body) {
      const validated = passwordResetConfirmSchema.parse(body);
      const result = await authService.resetPassword(
        validated.token,
        validated.newPassword
      );
      return NextResponse.json({
        success: true,
        data: result,
        message: "Password reset successful",
      });
    }

    const validated = passwordResetRequestSchema.parse(body);
    const result = await authService.requestPasswordReset(validated.email);

    return NextResponse.json({
      success: true,
      data: result,
      message: "If an account exists, a reset link has been dispatched.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
