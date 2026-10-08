import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  HeartHandshake,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "Learning Programs and Pathways",
  description:
    "Explore age-appropriate Islamic learning tracks designed for children, teenagers, adults, and lifelong seekers.",
};

export default function ProgramsPage() {
  const programs = [
    {
      id: "children",
      title: "Children's Islamic Foundation Program",
      target: "Grades 1 – 12 (Ages 6 – 14)",
      tagline: "Cultivating love for Allah, the Qur'an, and good character in young hearts.",
      icon: GraduationCap,
      features: [
        "Noorani Qaida & step-by-step Quranic reading fluency",
        "Essential daily Duas, Kalimahs, and Salah (Prayer) practical training",
        "Engaging stories of the Prophets and Islamic morals (Akhlaq)",
        "Weekly progress reports sent directly to parents on WhatsApp",
        "Safe, interactive online 1-to-1 or small group classes",
      ],
      curriculum: [
        "Term 1: Quranic Alphabet, Pronunciation & Basic Salah",
        "Term 2: Surah Memorization (Juz Amma) & Daily Duas",
        "Term 3: Seerah for Kids & Islamic Manners",
        "Term 4: Fiqh of Purification & Islamic History basics",
      ],
      schedule: "2 to 4 sessions per week (30 to 45 mins each)",
    },
    {
      id: "teenagers",
      title: "Teen Identity and Islamic Leadership Program",
      target: "Teens (Ages 13 – 19)",
      tagline: "Empowering youth with authentic knowledge and confident identity in the modern world.",
      icon: Compass,
      features: [
        "Intermediate & Advanced Tajweed rules with theoretical understanding",
        "Understanding contemporary ethical dilemmas and Islamic worldview",
        "Hadith studies focused on personal development and character",
        "Interactive Q&A discussions with approachable scholars",
        "Mentorship from certified educators experienced with Western/GCC youth",
      ],
      curriculum: [
        "Module 1: Deep Tajweed Application & Quran Reflection",
        "Module 2: Building Unshakable Faith (Aqeedah in the Modern Era)",
        "Module 3: 40 Hadith of Imam Nawawi & Life Application",
        "Module 4: Islamic Etiquette, Peer Pressure & Digital Ethics",
      ],
      schedule: "2 to 3 sessions per week (45 to 60 mins each)",
    },
    {
      id: "adults",
      title: "Adults and Professionals Evening and Weekend Track",
      target: "Working Professionals and University Students",
      tagline: "Flexible, structured Islamic learning tailored for busy professional and family life.",
      icon: Clock,
      features: [
        "Personalized 1-on-1 pacing matching your work hours and time zone",
        "Tafseer of key Surahs (Surah Al-Kahf, Surah Al-Mulk, Surah Yasin)",
        "Practical Fiqh for everyday life, family, and ethical business",
        "Direct access to your Ustadh for questions between classes",
        "Recorded summaries and notes available in your student portal",
      ],
      curriculum: [
        "Stream A: Correct Recitation & Memorization from Scratch",
        "Stream B: Quranic Arabic & Tafseer Comprehension",
        "Stream C: Fiqh of Financial Transactions & Family Life",
        "Stream D: Prophetic Biography & Spiritual Purification (Tazkiyah)",
      ],
      schedule: "Flexible scheduling: Early morning, evening, or weekend slots",
    },
    {
      id: "lifelong",
      title: "Lifelong Learners and Quran Mastery Program",
      target: "Adults, Seniors and Lifelong Seekers",
      tagline: "It is never too late to learn. Reconnect with the words of Allah at your own peaceful pace.",
      icon: BookOpen,
      features: [
        "Patient, supportive teachers dedicated to adult beginners",
        "Slow-paced, thorough pronunciation correction without pressure",
        "Deep reflection on the wisdom and meanings of the verses",
        "Warm, respectful learning environment",
        "Certified completion certificate upon completing each Juz/Level",
      ],
      curriculum: [
        "Level 1: Letter recognition, vowels and fluent reading",
        "Level 2: Rhythms of Tajweed & correct articulation points",
        "Level 3: Full Quran Recitation under Ijazah scholar supervision",
        "Level 4: Tafseer & contemplative Quranic living",
      ],
      schedule: "Customizable frequency (1 to 3 classes per week)",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      {/* Page Hero Header */}
      <section className="border-b border-charcoal-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">STRUCTURED PATHWAYS</span>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl">
            Islamic Education for Every Generation
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-charcoal-600 sm:text-lg leading-relaxed">
            Choose a tailored educational program designed specifically for your age group, background, and personal learning schedule.
          </p>
        </div>
      </section>

      {/* Main Program Tracks */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {programs.map((prog, idx) => (
            <div
              key={prog.id}
              className={`rounded-3xl border border-charcoal-200 bg-white p-6 sm:p-10 shadow-card hover:shadow-lift transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image & Quick Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative h-72 sm:h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-green-950 via-green-900 to-charcoal-900 p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-gold-500/20 px-3 py-1 text-xs font-semibold text-gold-400 border border-gold-400/30">
                      {prog.target}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gold-400 shadow-inner">
                      <prog.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-gold-400/80 uppercase">
                      Curriculum Track
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      {prog.title}
                    </h3>
                  </div>
                </div>

                <div className="rounded-xl bg-ivory-50 p-4 border border-charcoal-200 text-xs text-charcoal-700 space-y-1.5">
                  <p className="font-semibold text-green-950 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-600" />
                    Recommended Schedule:
                  </p>
                  <p>{prog.schedule}</p>
                </div>
              </div>

              {/* Details, Features & Curriculum */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <Badge variant="gold" className="text-xs uppercase">
                    {prog.target}
                  </Badge>
                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-green-950">
                    {prog.title}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal-600 leading-relaxed italic">
                    &ldquo;{prog.tagline}&rdquo;
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-green-950 mb-3">
                    Program Highlights
                  </h3>
                  <div className="space-y-2">
                    {prog.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                        <CheckCircle2 className="h-4 w-4 text-green-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Curriculum */}
                <div className="border-t border-charcoal-200 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-green-950 mb-3">
                    Syllabus Outline
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prog.curriculum.map((item) => (
                      <div
                        key={item}
                        className="rounded-lg bg-green-50/60 p-2.5 border border-green-100 text-xs font-medium text-green-950"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="md">
                      Enroll in This Program <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" size="md">
                      View Individual Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-green-950 py-16 text-center text-ivory-50 border-t border-green-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Need Guidance Choosing the Right Program?
          </h2>
          <p className="mt-3 text-sm text-charcoal-300 max-w-xl mx-auto leading-relaxed">
            Our academic advisors can assess your current reading level and recommend the best teacher and timetable for you or your children.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="gold" size="lg" className="rounded-full">
                Schedule a Free Academic Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
