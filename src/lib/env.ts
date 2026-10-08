import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .default(
      process.env.DATABASE_URL ||
        "postgresql://postgres:postgres@localhost:5432/alqalam_db"
    ),
  AUTH_SECRET: z
    .string()
    .min(16, "AUTH_SECRET must be at least 16 chars")
    .default(
      process.env.AUTH_SECRET || "alqalam_super_secret_production_key_32bytes_min"
    ),
  APP_URL: z
    .string()
    .url()
    .default(process.env.APP_URL || "http://localhost:3000"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(process.env.CLOUDINARY_CLOUD_NAME || ""),
  CLOUDINARY_API_KEY: z.string().optional().default(process.env.CLOUDINARY_API_KEY || ""),
  CLOUDINARY_API_SECRET: z.string().optional().default(process.env.CLOUDINARY_API_SECRET || ""),
  BREVO_API_KEY: z.string().optional().default(process.env.BREVO_API_KEY || ""),
  BREVO_SENDER_EMAIL: z
    .string()
    .email()
    .optional()
    .default(process.env.BREVO_SENDER_EMAIL || "admissions@alqalamglobal.com"),
  BREVO_SENDER_NAME: z
    .string()
    .optional()
    .default(process.env.BREVO_SENDER_NAME || "Al-Qalam Global Academy"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default((process.env.NODE_ENV as "development" | "test" | "production") || "development"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  APP_URL: process.env.APP_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME,
  NODE_ENV: process.env.NODE_ENV,
});
