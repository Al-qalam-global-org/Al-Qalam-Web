import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "@/server/services/cms.service";
import { requireAdmin } from "@/lib/auth/permissions";
import { updateTestimonialSchema } from "@/lib/validation/cms";
import { handleApiError } from "@/lib/errors";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const validated = updateTestimonialSchema.parse(body);

    const testimonial = await cmsService.updateTestimonial(id, validated, admin.id);

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const testimonial = await cmsService.deleteTestimonial(id, admin.id);

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
