import { cmsRepository } from "@/server/repositories/cms.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import type { Prisma } from "@prisma/client";

export class CmsService {
  async getSection(key: string) {
    return cmsRepository.getSectionByKey(key);
  }

  async getPageSections(page: string) {
    const sections = await cmsRepository.getSectionsByPage(page);
    const map: Record<string, any> = {};
    for (const sec of sections) {
      map[sec.key] = sec.content;
    }
    return map;
  }

  async getAllSections() {
    return cmsRepository.getAllSections();
  }

  async upsertSection(
    data: {
      key: string;
      page: string;
      sectionName: string;
      content: any;
    },
    adminUserId?: string
  ) {
    const section = await cmsRepository.upsertSection({
      ...data,
      updatedBy: adminUserId,
    });

    await auditRepository.log({
      userId: adminUserId,
      action: "CMS_SECTION_UPDATED",
      entity: "CmsSection",
      entityId: section.id,
      metadata: { key: data.key, page: data.page },
    });

    return section;
  }

  // Testimonials
  async getTestimonials(onlyPublished = true) {
    return cmsRepository.getTestimonials(onlyPublished);
  }

  async createTestimonial(data: Prisma.TestimonialCreateInput, adminUserId?: string) {
    const testimonial = await cmsRepository.createTestimonial(data);
    await auditRepository.log({
      userId: adminUserId,
      action: "TESTIMONIAL_CREATED",
      entity: "Testimonial",
      entityId: testimonial.id,
    });
    return testimonial;
  }

  async updateTestimonial(
    id: string,
    data: Prisma.TestimonialUpdateInput,
    adminUserId?: string
  ) {
    const testimonial = await cmsRepository.updateTestimonial(id, data);
    await auditRepository.log({
      userId: adminUserId,
      action: "TESTIMONIAL_UPDATED",
      entity: "Testimonial",
      entityId: id,
    });
    return testimonial;
  }

  async deleteTestimonial(id: string, adminUserId?: string) {
    const testimonial = await cmsRepository.deleteTestimonial(id);
    await auditRepository.log({
      userId: adminUserId,
      action: "TESTIMONIAL_DELETED",
      entity: "Testimonial",
      entityId: id,
    });
    return testimonial;
  }
}

export const cmsService = new CmsService();
