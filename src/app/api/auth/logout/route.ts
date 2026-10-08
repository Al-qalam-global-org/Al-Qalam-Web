import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import { getSessionCookie } from "@/lib/auth/cookies";
import { handleApiError } from "@/lib/errors";

export async function POST(_req: NextRequest) {
  try {
    const token = await getSessionCookie();
    await authService.logout(token);

    return NextResponse.json({
      success: true,
      data: null,
      message: "Logged out successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
