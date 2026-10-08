import { certificateRepository } from "@/server/repositories/certificate.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { studentRepository } from "@/server/repositories/student.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { generateCertificateNumber } from "@/lib/utils";
import { NotFoundError } from "@/lib/errors";

export class CertificateService {
  async getCertificates(params?: {
    studentId?: string;
    courseId?: string;
    skip?: number;
    take?: number;
  }) {
    return certificateRepository.findAll(params);
  }

  async getCertificateById(id: string) {
    const cert = await certificateRepository.findById(id);
    if (!cert) throw new NotFoundError("Certificate not found");
    return cert;
  }

  async getCertificateByNumber(certNumber: string) {
    const cert = await certificateRepository.findByNumber(certNumber);
    if (!cert) throw new NotFoundError("Certificate not found");
    return cert;
  }

  async issueCertificate(
    data: {
      studentId: string;
      courseId: string;
      completionDate?: string;
      issuedBy?: string;
    },
    adminUserId?: string
  ) {
    const certificateNumber = generateCertificateNumber();

    const cert = await certificateRepository.create({
      studentId: data.studentId,
      courseId: data.courseId,
      certificateNumber,
      completionDate: data.completionDate ? new Date(data.completionDate) : new Date(),
      issuedBy: data.issuedBy || "Al-Qalam Global Academy",
    });

    await auditRepository.log({
      userId: adminUserId,
      action: "CERTIFICATE_ISSUED",
      entity: "Certificate",
      entityId: cert.id,
      metadata: { certificateNumber, studentId: data.studentId, courseId: data.courseId },
    });

    const student = await studentRepository.findById(data.studentId);
    if (student?.userId) {
      await notificationRepository.create({
        userId: student.userId,
        title: "Certificate Issued!",
        message: `Mabrook! Your course completion certificate (${certificateNumber}) for ${cert.course.name} is now available.`,
        type: "CERTIFICATE_ISSUED",
      });
    }

    return cert;
  }
}

export const certificateService = new CertificateService();
