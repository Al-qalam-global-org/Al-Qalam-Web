import { materialRepository } from "@/server/repositories/material.repository";
import { cloudinaryService } from "@/lib/cloudinary";
import { NotFoundError } from "@/lib/errors";
import type { MaterialType } from "@prisma/client";

export class MaterialService {
  async getMaterialsByCourseId(courseId: string) {
    return materialRepository.findByCourseId(courseId);
  }

  async createMaterial(data: {
    courseId: string;
    title: string;
    description?: string;
    type?: MaterialType;
    fileUrl: string;
    cloudinaryPublicId?: string;
    externalUrl?: string;
    uploadedBy?: string;
  }) {
    return materialRepository.create(data);
  }

  async deleteMaterial(id: string) {
    const material = await materialRepository.findById(id);
    if (!material) throw new NotFoundError("Material not found");

    if (material.cloudinaryPublicId) {
      await cloudinaryService.deleteFile(material.cloudinaryPublicId);
    }

    return materialRepository.delete(id);
  }
}

export const materialService = new MaterialService();
