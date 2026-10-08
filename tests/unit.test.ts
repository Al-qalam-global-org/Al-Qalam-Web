import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { whatsappService } from "@/lib/whatsapp";
import { generateCertificateNumber } from "@/lib/utils";
import {
  loginSchema,
  createCourseSchema,
  markAttendanceSchema,
} from "@/lib/validation";

describe("Password Hashing (Argon2id)", () => {
  it("hashes password and successfully verifies correct password", async () => {
    const raw = "SecureAlQalam123!";
    const hashed = await hashPassword(raw);
    expect(hashed).toBeDefined();
    expect(hashed).not.toBe(raw);

    const isValid = await verifyPassword(raw, hashed);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword("WrongPassword", hashed);
    expect(isInvalid).toBe(false);
  });
});

describe("WhatsApp URL Formatting", () => {
  it("formats click-to-chat link with cleaned phone digits and encoded URI text", () => {
    const link = whatsappService.generateStudentContactLink(
      "+971 (50) 123-4567",
      "Ahmed",
      "Qur'an Reading"
    );
    expect(link).toContain("https://wa.me/971501234567?text=");
    expect(link).toContain(encodeURIComponent("Ahmed"));
    expect(link).toContain(encodeURIComponent("Qur'an Reading"));
  });
});

describe("Certificate Number Generator", () => {
  it("generates formatted unique certificate identifier", () => {
    const currentYear = new Date().getFullYear();
    const certNum = generateCertificateNumber();
    expect(certNum).toMatch(new RegExp(`^AQG-${currentYear}-[A-Z0-9]+$`));
  });
});

describe("Zod Validation Schemas", () => {
  it("validates login credentials schema", () => {
    const valid = loginSchema.safeParse({
      email: "student@example.com",
      password: "password123",
    });
    expect(valid.success).toBe(true);

    const invalidEmail = loginSchema.safeParse({
      email: "invalid-email",
      password: "123",
    });
    expect(invalidEmail.success).toBe(false);
  });

  it("validates course creation schema", () => {
    const valid = createCourseSchema.safeParse({
      name: "Tafseer of Surah Al-Baqarah",
      slug: "tafseer-al-baqarah",
      description: "Comprehensive commentary and moral guidance from the Quran.",
      category: "Qur'an Studies",
    });
    expect(valid.success).toBe(true);
  });

  it("validates attendance schema", () => {
    const valid = markAttendanceSchema.safeParse({
      classId: "cls_123",
      studentId: "st_456",
      status: "PRESENT",
      note: "Participated fluently",
    });
    expect(valid.success).toBe(true);
  });
});
