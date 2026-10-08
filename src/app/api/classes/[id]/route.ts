import { NextRequest, NextResponse } from "next/server";
import { classService } from "@/server/services/class.service";
import { requireAuth } from "@/lib/auth/permissions";
import { handleApiError } from "@/lib/errors";
import type { ClassStatus } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const cls = await classService.getClassById(id);

    return NextResponse.json({
      success: true,
      data: cls,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const body = await req.json();

    const updated = await classService.updateClassStatus(
      id,
      body.status as ClassStatus,
      user.id
    );

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Class status updated",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
