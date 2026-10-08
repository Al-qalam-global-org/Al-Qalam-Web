import { z } from "zod";

export const heroContentSchema = z.object({
  eyebrow: z.string().default("ISLAMIC EDUCATION FOR EVERY GENERATION"),
  headline: z.string().default("Learn Islam. Live with Purpose."),
  subheadline: z.string().default(
    "Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice."
  ),
  primaryCtaText: z.string().default("Watch Free Course Preview"),
  secondaryCtaText: z.string().default("Explore Learning Paths"),
  videoPreviewUrl: z.string().optional(),
  heroImageUrl: z
    .string()
    .default(
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
    ),
  quoteBadgeText: z
    .string()
    .default("Read. Learn. Understand. Live."),
  captionTitle: z
    .string()
    .default("Empowering Homes With Sacred Knowledge"),
  stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        subtext: z.string().optional(),
      })
    )
    .default([
      { label: "Teaching Experience", value: "10+ Years", subtext: "Certified Ustadhs" },
      { label: "Certified Teachers", value: "Qualified", subtext: "Ijazah Holders" },
      { label: "Online Classes", value: "Flexible", subtext: "1-on-1 & Groups" },
      { label: "Global Reach", value: "India, GCC, Australia", subtext: "Worldwide" },
    ]),
});

export const learningPathsContentSchema = z.object({
  sectionTitle: z.string().default("Find the Right Learning Path for You"),
  sectionSubtitle: z.string().default(
    "Programs tailored for every age, stage, and learning goal"
  ),
  paths: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      tag: z.string(),
      description: z.string(),
      image: z.string(),
      cta: z.string(),
      link: z.string().default("/programs"),
    })
  ),
});

export const contactInfoContentSchema = z.object({
  whatsappNumber: z.string().default("+971 50 123 4567"),
  whatsappLink: z.string().default("https://wa.me/971501234567"),
  phone: z.string().default("+971 4 123 4567"),
  email: z.string().email().default("admissions@alqalamglobal.com"),
  supportEmail: z.string().email().default("support@alqalamglobal.com"),
  officeAddress: z.string().default("Dubai Knowledge Park, Dubai, UAE"),
  operatingHours: z.string().default("Mon - Sat: 8:00 AM - 10:00 PM (GST)"),
});

export const aboutPageContentSchema = z.object({
  missionTitle: z.string().default("Our Mission"),
  missionText: z.string().default(
    "To provide accessible, structured, and authentic Islamic education to families across the globe, connecting classical tradition with modern online classrooms."
  ),
  visionTitle: z.string().default("Our Vision"),
  visionText: z.string().default(
    "To nurture confident Muslims grounded in sacred knowledge, high moral character, and purposeful living."
  ),
  values: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ).default([
    { title: "Authenticity", description: "Rooted in authentic Quran and Sunnah teachings with certified scholars." },
    { title: "Excellence (Ihsan)", description: "Dedicated teachers, engaging methodology, and modern interactive tools." },
    { title: "Flexibility", description: "Personalized scheduling for students, busy parents, and working professionals." },
  ]),
});

export const upsertCmsSectionSchema = z.object({
  key: z.string().min(2, "Section key is required"),
  page: z.string().default("HOME"),
  sectionName: z.string().min(2, "Section name is required"),
  content: z.record(z.string(), z.any()),
});

export const createTestimonialSchema = z.object({
  authorName: z.string().min(2, "Author name is required"),
  roleOrLocation: z.string().optional(),
  quote: z.string().min(5, "Quote is required"),
  avatarUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
