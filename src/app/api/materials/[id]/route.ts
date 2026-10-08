import { NextRequest, NextResponse } from "next/server";
import { materialService } from "@/server/services/material.service";
import { requireAuth } from "@/lib/auth/permissions";
import { handleApiError, ForbiddenError } from "@/lib/errors";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    if (user.role === "STUDENT") {
      throw new ForbiddenError("Unauthorized to delete course materials");
    }

    const { id } = await params;
    await materialService.deleteMaterial(id);

    return NextResponse.json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
