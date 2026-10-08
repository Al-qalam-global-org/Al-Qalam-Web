import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "@/server/services/cms.service";
import { requireAdmin } from "@/lib/auth/permissions";
import { createTestimonialSchema } from "@/lib/validation/cms";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const testimonials = await cmsService.getTestimonials(!all);

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const validated = createTestimonialSchema.parse(body);

    const testimonial = await cmsService.createTestimonial(validated, admin.id);

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
        message: "Testimonial created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
