import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";
import { ExternalServiceError } from "@/lib/errors";

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  bytes: number;
}

export class CloudinaryService {
  private isConfigured(): boolean {
    return Boolean(
      env.CLOUDINARY_CLOUD_NAME &&
        env.CLOUDINARY_API_KEY &&
        env.CLOUDINARY_API_SECRET
    );
  }

  async uploadFile(
    base64DataUri: string,
    folder = "alqalam/materials"
  ): Promise<CloudinaryUploadResult> {
    if (!this.isConfigured()) {
      // Return safe mock representation if keys are not configured in local development
      const dummyId = `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      return {
        url: base64DataUri.startsWith("data:") ? base64DataUri : "/mock-file.pdf",
        secureUrl: base64DataUri.startsWith("data:") ? base64DataUri : "/mock-file.pdf",
        publicId: dummyId,
        format: "pdf",
        bytes: 1024,
      };
    }

    try {
      const result = await cloudinary.uploader.upload(base64DataUri, {
        folder,
        resource_type: "auto",
      });

      return {
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      };
    } catch (error) {
      console.error("[Cloudinary Upload Error]", error);
      throw new ExternalServiceError("Cloudinary", "Failed to upload file");
    }
  }

  async deleteFile(publicId: string): Promise<boolean> {
    if (!this.isConfigured()) return true;

    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      console.error("[Cloudinary Delete Error]", error);
      return false;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
