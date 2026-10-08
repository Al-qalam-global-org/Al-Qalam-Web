import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashPassword } from "../src/lib/auth/password";
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

async function main() {
  console.log("🌱 Starting Al-Qalam Global Academy database seed...");

  // Clean existing tables (safe reset)
  await prisma.testimonial.deleteMany().catch(() => {});
  await prisma.cmsSection.deleteMany().catch(() => {});
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.assessmentResult.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.courseMaterial.deleteMany();
  await prisma.studentProgress.deleteMany();
  await prisma.teacherNote.deleteMany();
  await prisma.topicCovered.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.classStudent.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacherStudentAssignment.deleteMany();
  await prisma.studentCourse.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.session.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // 1. ADMIN USER
  const adminPassword = await hashPassword("AdminPass123!");
  const admin = await prisma.user.create({
    data: {
      email: "admin@alqalamglobal.com",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
  console.log("✓ Created Admin: admin@alqalamglobal.com (Password: AdminPass123!)");

  // 2. TEACHERS
  const teacherPassword = await hashPassword("TeacherPass123!");

  const teacher1User = await prisma.user.create({
    data: {
      email: "ustadh.ahmed@alqalamglobal.com",
      passwordHash: teacherPassword,
      role: "TEACHER",
      status: "ACTIVE",
    },
  });

  const teacher1 = await prisma.teacher.create({
    data: {
      userId: teacher1User.id,
      firstName: "Ahmed",
      lastName: "Al-Misri",
      phone: "+971501234567",
      country: "UAE",
      timezone: "Asia/Dubai",
      qualification: "Ijazah in Ten Qira'at, Al-Azhar University Graduate",
      experienceYears: 12,
      specialization: "Qur'an & Tajweed, Tafseer",
      bio: "Over 12 years of experience teaching Qur'an recitation with authentic Tajweed rules across communities in Australia and the UAE.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      status: "ACTIVE",
    },
  });

  const teacher2User = await prisma.user.create({
    data: {
      email: "ustadh.faisal@alqalamglobal.com",
      passwordHash: teacherPassword,
      role: "TEACHER",
      status: "ACTIVE",
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      userId: teacher2User.id,
      firstName: "Faisal",
      lastName: "Rahman",
      phone: "+61412345678",
      country: "Australia",
      timezone: "Australia/Sydney",
      qualification: "MA in Islamic Studies, Madinah Islamic University",
      experienceYears: 10,
      specialization: "Tafseer & Hadith, Fiqh",
      bio: "Dedicated scholar focusing on contextual Islamic jurisprudence and Prophetic traditions for modern youth and families.",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      status: "ACTIVE",
    },
  });
  console.log("✓ Created 2 Teachers (Password: TeacherPass123!)");

  // 3. COURSES
  const coursesData = [
    {
      name: "Online Madrassa (Grades 1–12)",
      slug: "online-madrassa",
      description:
        "Complete structured Islamic education programme for children and youth covering Aqeedah, Fiqh, Seerah, and Islamic manners.",
      category: "Foundation",
      ageGroup: "Children (Grades 1-12)",
      level: "All Levels",
      duration: "1 Year / Multi-term",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Qur'an Reading & Recitation",
      slug: "quran-reading-recitation",
      description:
        "Build a strong foundation in Noorani Qaida, Tajweed rules, and fluent Qur'anic recitation under certified Ijazah holders.",
      category: "Qur'an Studies",
      ageGroup: "All Ages",
      level: "Beginner to Advanced",
      duration: "6 Months",
      imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tafseer: Understanding the Qur'an",
      slug: "tafseer-understanding-quran",
      description:
        "Discover the meanings, historical contexts, and practical life guidance from the holy verses of the Qur'an.",
      category: "Qur'an Studies",
      ageGroup: "Teens & Adults",
      level: "Intermediate",
      duration: "4 Months",
      imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Hadith: Prophetic Guidance",
      slug: "hadith-prophetic-guidance",
      description:
        "Learn from the profound teachings, actions, and traditions of Prophet Muhammad (ﷺ) to enrich daily character.",
      category: "Prophetic Traditions",
      ageGroup: "Teens & Adults",
      level: "Intermediate",
      duration: "3 Months",
      imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Fiqh: Islamic Practice & Law",
      slug: "fiqh-islamic-practice",
      description:
        "Understand essential rulings for purification, prayer, fasting, zakah, and everyday ethical financial transactions.",
      category: "Jurisprudence",
      ageGroup: "All Ages",
      level: "Beginner to Intermediate",
      duration: "4 Months",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Akhlaq: Character & Etiquette",
      slug: "akhlaq-character-etiquette",
      description:
        "Instilling Islamic morals, empathy, family values, and digital ethics in everyday contemporary living.",
      category: "Character Building",
      ageGroup: "Children & Teens",
      level: "Beginner",
      duration: "3 Months",
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Seerah: The Prophet's Life",
      slug: "seerah-prophets-life",
      description:
        "An inspiring, chronological study of the life, leadership, and compassion of the Messenger of Allah (ﷺ).",
      category: "Islamic History",
      ageGroup: "All Ages",
      level: "All Levels",
      duration: "4 Months",
      imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tarikh: Islamic History & Civilization",
      slug: "tarikh-islamic-civilization",
      description:
        "Explore the Golden Age of Islam, the Rightly Guided Caliphs, and scientific contributions to human civilization.",
      category: "Islamic History",
      ageGroup: "Teens & Adults",
      level: "Intermediate",
      duration: "3 Months",
      imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const createdCourses = [];
  for (const c of coursesData) {
    const course = await prisma.course.create({ data: c });
    createdCourses.push(course);
  }
  console.log(`✓ Created ${createdCourses.length} Courses`);

  // 4. STUDENTS
  const studentPassword = await hashPassword("StudentPass123!");
  const studentsRaw = [
    {
      email: "ahmed.ali@example.com",
      firstName: "Ahmed",
      lastName: "Ali",
      phone: "+971520112233",
      country: "UAE",
      grade: "Grade 6",
      level: "Intermediate",
      parentName: "Ali Al-Maktoum",
      parentPhone: "+971520112200",
      parentEmail: "parent.ali@example.com",
    },
    {
      email: "fatima.zahra@example.com",
      firstName: "Fatima",
      lastName: "Zahra",
      phone: "+61499887766",
      country: "Australia",
      grade: "Grade 4",
      level: "Beginner",
      parentName: "Rehman K.",
      parentPhone: "+61499887700",
      parentEmail: "rehman.k@example.com",
    },
    {
      email: "yusuf.khan@example.com",
      firstName: "Yusuf",
      lastName: "Khan",
      phone: "+447123456789",
      country: "United Kingdom",
      grade: "Grade 9",
      level: "Intermediate",
      parentName: "Tariq Khan",
      parentPhone: "+447123456700",
      parentEmail: "tariq.khan@example.com",
    },
    {
      email: "maryam.s@example.com",
      firstName: "Maryam",
      lastName: "Siddiqui",
      phone: "+919876543210",
      country: "India",
      grade: "Adult Professional",
      level: "Advanced",
      parentName: "Self",
      parentPhone: "+919876543210",
      parentEmail: "maryam.s@example.com",
    },
    {
      email: "ibrahim.r@example.com",
      firstName: "Ibrahim",
      lastName: "Razi",
      phone: "+97455123456",
      country: "Qatar",
      grade: "Grade 7",
      level: "Beginner",
      parentName: "Rashid Razi",
      parentPhone: "+97455123400",
      parentEmail: "rashid.r@example.com",
    },
  ];

  const createdStudents = [];
  for (const s of studentsRaw) {
    const u = await prisma.user.create({
      data: {
        email: s.email,
        passwordHash: studentPassword,
        role: "STUDENT",
        status: "ACTIVE",
      },
    });

    const st = await prisma.student.create({
      data: {
        userId: u.id,
        firstName: s.firstName,
        lastName: s.lastName,
        phone: s.phone,
        country: s.country,
        grade: s.grade,
        level: s.level,
        parentName: s.parentName,
        parentPhone: s.parentPhone,
        parentEmail: s.parentEmail,
      },
    });
    createdStudents.push(st);
  }
  console.log(`✓ Created ${createdStudents.length} Students (Password: StudentPass123!)`);

  // 5. ENROLLMENTS & TEACHER ASSIGNMENTS
  const quranCourse = createdCourses[1];
  const madrassaCourse = createdCourses[0];
  const tafseerCourse = createdCourses[2];

  for (const st of createdStudents) {
    // Enroll in Quran course
    await prisma.studentCourse.create({
      data: {
        studentId: st.id,
        courseId: quranCourse.id,
        currentProgress: 65,
        currentLevel: "Intermediate",
      },
    });

    await prisma.teacherStudentAssignment.create({
      data: {
        teacherId: teacher1.id,
        studentId: st.id,
        courseId: quranCourse.id,
      },
    });

    // Create progress record
    await prisma.studentProgress.create({
      data: {
        studentId: st.id,
        courseId: quranCourse.id,
        progressPercentage: 68,
        currentLevel: "Intermediate",
        completedTopics: 14,
        totalTopics: 20,
        updatedBy: teacher1.firstName,
      },
    });
  }

  // Also enroll Ahmed & Fatima in Tafseer with Teacher 2
  await prisma.studentCourse.create({
    data: {
      studentId: createdStudents[0].id,
      courseId: tafseerCourse.id,
      currentProgress: 40,
    },
  });
  await prisma.teacherStudentAssignment.create({
    data: {
      teacherId: teacher2.id,
      studentId: createdStudents[0].id,
      courseId: tafseerCourse.id,
    },
  });

  // 6. SAMPLE CLASSES
  const today = new Date();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const class1 = await prisma.class.create({
    data: {
      courseId: quranCourse.id,
      teacherId: teacher1.id,
      scheduledDate: today,
      startTime: "17:00",
      endTime: "18:00",
      timezone: "Asia/Dubai",
      classType: "ONE_TO_ONE",
      meetingPlatform: "ZOOM",
      meetingUrl: "https://zoom.us/j/9876543210?pwd=alqalamdemo",
      status: "SCHEDULED",
      students: {
        create: [{ studentId: createdStudents[0].id }],
      },
    },
  });

  const class2 = await prisma.class.create({
    data: {
      courseId: tafseerCourse.id,
      teacherId: teacher2.id,
      scheduledDate: tomorrow,
      startTime: "18:30",
      endTime: "19:30",
      timezone: "Asia/Dubai",
      classType: "GROUP",
      meetingPlatform: "GOOGLE_MEET",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      status: "SCHEDULED",
      students: {
        create: [
          { studentId: createdStudents[0].id },
          { studentId: createdStudents[1].id },
          { studentId: createdStudents[2].id },
        ],
      },
    },
  });
  console.log("✓ Created scheduled classes with Zoom & Meet links");

  // 7. ATTENDANCE & TOPIC & NOTES
  await prisma.attendance.create({
    data: {
      classId: class1.id,
      studentId: createdStudents[0].id,
      status: "PRESENT",
      markedBy: "Ustadh Ahmed",
      note: "Participated enthusiastically with clear Makhaarij.",
    },
  });

  await prisma.topicCovered.create({
    data: {
      classId: class1.id,
      studentId: createdStudents[0].id,
      title: "Surah Al-Baqarah — Ayah 1 to 10",
      description: "Reviewed rules of Madd and Idgham with Ghunnah.",
      createdBy: "Ustadh Ahmed",
    },
  });

  await prisma.teacherNote.create({
    data: {
      studentId: createdStudents[0].id,
      teacherId: teacher1.id,
      classId: class1.id,
      note: "Ahmed is improving his pronunciation and reading fluency with steady Tajweed application.",
      visibility: "STUDENT_VISIBLE",
    },
  });

  // 8. MATERIALS
  await prisma.courseMaterial.create({
    data: {
      courseId: quranCourse.id,
      title: "Tajweed Rules Reference Chart",
      description: "Quick guide to rules of Noon Sakinah, Meem Sakinah, and Madd.",
      type: "PDF",
      fileUrl: "https://example.com/materials/tajweed-chart.pdf",
    },
  });

  // 9. ASSIGNMENTS & SUBMISSION
  const assignment1 = await prisma.assignment.create({
    data: {
      courseId: quranCourse.id,
      teacherId: teacher1.id,
      title: "Surah Al-Mulk: Verses 1–5 Recitation Practice",
      description: "Record audio or prepare oral recitation focusing on Ghunnah rules.",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: createdStudents[0].id,
      submissionText: "Recitation practice completed with Ustadh notes reviewed.",
      status: "REVIEWED",
      teacherFeedback: "MashaAllah, great attention to the Noon Sakinah rules!",
      reviewedAt: new Date(),
    },
  });

  // 10. ASSESSMENTS & RESULTS
  const assessment1 = await prisma.assessment.create({
    data: {
      courseId: quranCourse.id,
      teacherId: teacher1.id,
      title: "Mid-Term Tajweed & Reading Evaluation",
      description: "Oral examination of Surah Al-Fajr and theoretical Tajweed questions.",
      totalMarks: 100,
    },
  });

  await prisma.assessmentResult.create({
    data: {
      assessmentId: assessment1.id,
      studentId: createdStudents[0].id,
      obtainedMarks: 94,
      remarks: "Excellent fluency and articulation. Keep up the high standard!",
      gradedBy: "Ustadh Ahmed",
    },
  });

  // 11. CERTIFICATES
  await prisma.certificate.create({
    data: {
      studentId: createdStudents[3].id, // Maryam Siddiqui
      courseId: quranCourse.id,
      certificateNumber: "AQG-2026-QRN01",
      completionDate: new Date(),
      issuedBy: "Al-Qalam Global Academy",
    },
  });
  console.log("✓ Created sample certificate (AQG-2026-QRN01)");

  // 12. NOTIFICATIONS
  await prisma.notification.create({
    data: {
      userId: createdStudents[0].userId,
      title: "Class Scheduled",
      message: `Your class for ${quranCourse.name} is scheduled for today at 17:00.`,
      type: "CLASS_SCHEDULED",
    },
  });

  // 13. CMS SECTIONS
  await prisma.cmsSection.upsert({
    where: { key: "learning_paths" },
    create: {
      key: "learning_paths",
      page: "HOME",
      sectionName: "Learning for Every Generation",
      content: {
        sectionTitle: "Find the Right Learning Path for You",
        sectionSubtitle: "Structured, age-appropriate programmes designed for every stage of life.",
        paths: [
          {
            id: "children",
            title: "Children",
            tag: "Grades 1 – 12",
            description:
              "Build a strong Islamic foundation with engaging and structured learning designed for young hearts and minds.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
            cta: "Explore Children's Program",
            link: "/programs#children",
          },
          {
            id: "teenagers",
            title: "Teenagers",
            tag: "Ages 13 – 18",
            description:
              "Develop Islamic identity, confidence and deep understanding for the modern world with relatable guidance.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
            cta: "Explore Teen Program",
            link: "/programs#teenagers",
          },
          {
            id: "adults",
            title: "Adults and Professionals",
            tag: "Flexible Schedules",
            description:
              "Strengthen your knowledge with flexible learning tailored around your career, busy routine, and family.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            cta: "Explore Adult Learning",
            link: "/programs#adults",
          },
          {
            id: "lifelong",
            title: "Lifelong Learners",
            tag: "Any Age",
            description:
              "It is never too late to learn. Reconnect with the Qur'an and deepen your spiritual journey and understanding.",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
            cta: "Explore Lifelong Learning",
            link: "/programs#lifelong",
          },
        ],
      },
    },
    update: {},
  });

  await prisma.cmsSection.upsert({
    where: { key: "home_hero" },
    create: {
      key: "home_hero",
      page: "HOME",
      sectionName: "Hero & Banner Section",
      content: {
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
      },
    },
    update: {},
  });
  console.log("✓ Created CMS Sections (learning_paths, home_hero)");
  console.log("🎉 SEED COMPLETED SUCCESSFULLY");
  console.log("==========================================");
  console.log("Development Logins:");
  console.log("👑 ADMIN:   admin@alqalamglobal.com / AdminPass123!");
  console.log("👨‍🏫 TEACHER: ustadh.ahmed@alqalamglobal.com / TeacherPass123!");
  console.log("👨‍🏫 TEACHER: ustadh.faisal@alqalamglobal.com / TeacherPass123!");
  console.log("🎓 STUDENT: ahmed.ali@example.com / StudentPass123!");
  console.log("🎓 STUDENT: fatima.zahra@example.com / StudentPass123!");
  console.log("==========================================\n");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
