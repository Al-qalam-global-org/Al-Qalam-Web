import { NextRequest, NextResponse } from "next/server";
import { cmsService } from "@/server/services/cms.service";
import { requireAdmin } from "@/lib/auth/permissions";
import { upsertCmsSectionSchema } from "@/lib/validation/cms";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const page = searchParams.get("page");

    if (key) {
      const section = await cmsService.getSection(key);
      return NextResponse.json({
        success: true,
        data: section ? section.content : null,
      });
    }

    if (page) {
      const sections = await cmsService.getPageSections(page);
      return NextResponse.json({
        success: true,
        data: sections,
      });
    }

    const all = await cmsService.getAllSections();
    return NextResponse.json({
      success: true,
      data: all,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const validated = upsertCmsSectionSchema.parse(body);

    const section = await cmsService.upsertSection(validated, admin.id);

    return NextResponse.json({
      success: true,
      data: section,
      message: `${validated.sectionName} updated successfully`,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
