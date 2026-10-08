import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import { loginSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    const result = await authService.login(validated.email, validated.password);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Logged in successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
