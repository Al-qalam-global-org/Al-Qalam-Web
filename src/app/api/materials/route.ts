import { NextRequest, NextResponse } from "next/server";
import { materialService } from "@/server/services/material.service";
import { requireAuth } from "@/lib/auth/permissions";
import { handleApiError, ForbiddenError } from "@/lib/errors";
import { z } from "zod";

const createMaterialSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(2),
  description: z.string().optional(),
  type: z.enum(["PDF", "IMAGE", "DOCUMENT", "LINK"]).default("PDF"),
  fileUrl: z.string().min(1),
  cloudinaryPublicId: z.string().optional(),
  externalUrl: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const materials = await materialService.getMaterialsByCourseId(courseId);
    return NextResponse.json({ success: true, data: materials });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role === "STUDENT") {
      throw new ForbiddenError("Students cannot upload course materials");
    }

    const body = await req.json();
    const validated = createMaterialSchema.parse(body);

    const material = await materialService.createMaterial({
      ...validated,
      uploadedBy: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        data: material,
        message: "Material added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
