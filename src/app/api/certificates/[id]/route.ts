import { NextRequest, NextResponse } from "next/server";
import { certificateService } from "@/server/services/certificate.service";
import { handleApiError } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cert = await certificateService.getCertificateById(id);

    return NextResponse.json({
      success: true,
      data: cert,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
