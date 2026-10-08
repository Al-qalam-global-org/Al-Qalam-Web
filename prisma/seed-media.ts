import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/alqalam_db?schema=public";

const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

const pool = new Pool({
  connectionString,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedMedia() {
  console.log("🌱 Updating media assets in database...");

  // 1. Update Course Images
  const courseImageMap: Record<string, string> = {
    "online-madrassa": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    "quran-reading-recitation": "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    "tafseer-understanding-quran": "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
    "hadith-prophetic-guidance": "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
    "fiqh-islamic-practice": "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    "akhlaq-character-etiquette": "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    "seerah-prophets-life": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    "tarikh-islamic-civilization": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
  };

  for (const [slug, imageUrl] of Object.entries(courseImageMap)) {
    const updated = await prisma.course.updateMany({
      where: { slug },
      data: { imageUrl },
    });
    console.log(`Updated course [${slug}]: ${updated.count} record(s)`);
  }

  // 2. Update Teacher Images
  const teachers = await prisma.teacher.findMany();
  for (const t of teachers) {
    let profileImage = "";
    if (t.lastName.toLowerCase().includes("misri")) {
      profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
    } else if (t.lastName.toLowerCase().includes("rahman")) {
      profileImage = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80";
    } else {
      profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80";
    }

    await prisma.teacher.update({
      where: { id: t.id },
      data: { profileImage },
    });
    console.log(`Updated teacher [${t.firstName} ${t.lastName}] profileImage`);
  }

  // 3. Upsert CMS Section: learning_paths
  const learningPathsData = {
    sectionTitle: "Find the Right Learning Path for You",
    sectionSubtitle: "Structured, age-appropriate programmes designed for every stage of life.",
    paths: [
      {
        id: "children",
        title: "Children",
        tag: "Grades 1 – 12",
        description:
          "Build a strong Islamic foundation with engaging and structured learning designed for young hearts and minds.",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        cta: "Explore Children's Program",
        link: "/programs#children",
      },
      {
        id: "teenagers",
        title: "Teenagers",
        tag: "Ages 13 – 18",
        description:
          "Develop Islamic identity, confidence and deep understanding for the modern world with relatable guidance.",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        cta: "Explore Teen Program",
        link: "/programs#teenagers",
      },
      {
        id: "adults",
        title: "Adults and Professionals",
        tag: "Flexible Schedules",
        description:
          "Strengthen your knowledge with flexible learning tailored around your career, busy routine, and family.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        cta: "Explore Adult Learning",
        link: "/programs#adults",
      },
      {
        id: "lifelong",
        title: "Lifelong Learners",
        tag: "Any Age",
        description:
          "It is never too late to learn. Reconnect with the Qur'an and deepen your spiritual journey and understanding.",
        image:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        cta: "Explore Lifelong Learning",
        link: "/programs#lifelong",
      },
    ],
  };

  await prisma.cmsSection.upsert({
    where: { key: "learning_paths" },
    create: {
      key: "learning_paths",
      page: "HOME",
      sectionName: "Learning for Every Generation",
      content: learningPathsData,
    },
    update: {
      content: learningPathsData,
    },
  });
  console.log("✓ Upserted CMS Section: learning_paths");

  // 4. Upsert CMS Section: home_hero (ensuring heroImageUrl is set to real local asset)
  const heroData = {
    eyebrow: "ISLAMIC EDUCATION FOR EVERY GENERATION",
    headline: "Learn Islam. Live with Purpose.",
    subheadline:
      "Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice.",
    primaryCtaText: "Watch Free Course Preview",
    secondaryCtaText: "Explore Learning Paths",
    videoPreviewUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    heroImageUrl: "/images/young-muslim-student-dashboard.webp",
    quoteBadgeText: "Read. Learn. Understand. Live.",
    captionTitle: "Empowering Homes With Sacred Knowledge",
    stats: [
      { label: "Teaching Experience", value: "10+ Years", subtext: "Certified Ustadhs" },
      { label: "Certified Teachers", value: "Qualified", subtext: "Ijazah Holders" },
      { label: "Online Classes", value: "Flexible", subtext: "1-on-1 & Groups" },
      { label: "Global Reach", value: "India, GCC, Australia", subtext: "Worldwide" },
    ],
  };

  await prisma.cmsSection.upsert({
    where: { key: "home_hero" },
    create: {
      key: "home_hero",
      page: "HOME",
      sectionName: "Hero & Banner Section",
      content: heroData,
    },
    update: {
      content: heroData,
    },
  });
  console.log("✓ Upserted CMS Section: home_hero");

  console.log("✅ All media successfully seeded to database!");
}

seedMedia()
  .catch((e) => {
    console.error("Error seeding media:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
