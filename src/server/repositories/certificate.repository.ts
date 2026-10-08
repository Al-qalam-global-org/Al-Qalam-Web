import prisma from "@/lib/db/prisma";

export class CertificateRepository {
  async findAll(params?: {
    studentId?: string;
    courseId?: string;
    skip?: number;
    take?: number;
  }) {
    const where: { studentId?: string; courseId?: string } = {};
    if (params?.studentId) where.studentId = params.studentId;
    if (params?.courseId) where.courseId = params.courseId;

    const [total, certificates] = await Promise.all([
      prisma.certificate.count({ where }),
      prisma.certificate.findMany({
        where,
        include: {
          student: { include: { user: true } },
          course: true,
        },
        orderBy: { completionDate: "desc" },
        skip: params?.skip ?? 0,
        take: params?.take ?? 50,
      }),
    ]);

    return { total, certificates };
  }

  async findById(id: string) {
    return prisma.certificate.findUnique({
      where: { id },
      include: {
        student: { include: { user: true } },
        course: true,
      },
    });
  }

  async findByNumber(certificateNumber: string) {
    return prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        student: { include: { user: true } },
        course: true,
      },
    });
  }

  async create(data: {
    studentId: string;
    courseId: string;
    certificateNumber: string;
    completionDate?: Date;
    issuedBy?: string;
    certificateUrl?: string;
  }) {
    return prisma.certificate.create({
      data: {
        studentId: data.studentId,
        courseId: data.courseId,
        certificateNumber: data.certificateNumber,
        completionDate: data.completionDate || new Date(),
        issuedBy: data.issuedBy || "Al-Qalam Global Academy",
        certificateUrl: data.certificateUrl,
      },
      include: {
        student: { include: { user: true } },
        course: true,
      },
    });
  }
}

export const certificateRepository = new CertificateRepository();
