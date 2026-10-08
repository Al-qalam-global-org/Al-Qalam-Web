import prisma from "@/lib/db/prisma";
import type { MaterialType } from "@prisma/client";

export class MaterialRepository {
  async findByCourseId(courseId: string) {
    return prisma.courseMaterial.findMany({
      where: { courseId },
      include: {
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.courseMaterial.findUnique({
      where: { id },
      include: { course: true },
    });
  }

  async create(data: {
    courseId: string;
    title: string;
    description?: string;
    type?: MaterialType;
    fileUrl: string;
    cloudinaryPublicId?: string;
    externalUrl?: string;
    uploadedBy?: string;
  }) {
    return prisma.courseMaterial.create({
      data: {
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        type: data.type || "PDF",
        fileUrl: data.fileUrl,
        cloudinaryPublicId: data.cloudinaryPublicId,
        externalUrl: data.externalUrl,
        uploadedBy: data.uploadedBy,
      },
      include: { course: true },
    });
  }

  async delete(id: string) {
    return prisma.courseMaterial.delete({
      where: { id },
    });
  }
}

export const materialRepository = new MaterialRepository();
