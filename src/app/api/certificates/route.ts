import { NextRequest, NextResponse } from "next/server";
import { certificateService } from "@/server/services/certificate.service";
import { requireAuth, requireAdmin } from "@/lib/auth/permissions";
import { createCertificateSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);

    let studentId = searchParams.get("studentId") || undefined;
    const courseId = searchParams.get("courseId") || undefined;
    const number = searchParams.get("number") || undefined;

    if (number) {
      const cert = await certificateService.getCertificateByNumber(number);
      return NextResponse.json({ success: true, data: cert });
    }

    if (user.role === "STUDENT" && user.student) {
      studentId = user.student.id;
    }

    const skip = searchParams.get("skip") ? parseInt(searchParams.get("skip")!) : 0;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 50;

    const result = await certificateService.getCertificates({
      studentId,
      courseId,
      skip,
      take,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const validated = createCertificateSchema.parse(body);

    const certificate = await certificateService.issueCertificate(
      validated,
      admin.id
    );

    return NextResponse.json(
      {
        success: true,
        data: certificate,
        message: "Certificate issued successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
