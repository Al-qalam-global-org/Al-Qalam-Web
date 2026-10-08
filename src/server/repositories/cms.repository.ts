import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export class CmsRepository {
  async getSectionByKey(key: string) {
    return prisma.cmsSection.findUnique({
      where: { key },
    });
  }

  async getSectionsByPage(page: string) {
    return prisma.cmsSection.findMany({
      where: { page },
    });
  }

  async getAllSections() {
    return prisma.cmsSection.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async upsertSection(data: {
    key: string;
    page: string;
    sectionName: string;
    content: any;
    updatedBy?: string;
  }) {
    return prisma.cmsSection.upsert({
      where: { key: data.key },
      update: {
        page: data.page,
        sectionName: data.sectionName,
        content: data.content,
        updatedBy: data.updatedBy,
      },
      create: {
        key: data.key,
        page: data.page,
        sectionName: data.sectionName,
        content: data.content,
        updatedBy: data.updatedBy,
      },
    });
  }

  // Testimonial helpers
  async getTestimonials(onlyPublished = true) {
    return prisma.testimonial.findMany({
      where: onlyPublished ? { isPublished: true } : undefined,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  }

  async createTestimonial(data: Prisma.TestimonialCreateInput) {
    return prisma.testimonial.create({ data });
  }

  async updateTestimonial(id: string, data: Prisma.TestimonialUpdateInput) {
    return prisma.testimonial.update({
      where: { id },
      data,
    });
  }

  async deleteTestimonial(id: string) {
    return prisma.testimonial.delete({
      where: { id },
    });
  }
}

export const cmsRepository = new CmsRepository();
