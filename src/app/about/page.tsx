import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  GraduationCap,
  Award,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "About Us | Al-Qalam Global Academy",
  description:
    "Learn Islam. Live with Purpose. Discover the mission, faculty standards, and sacred educational values behind Al-Qalam Global Academy.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Authentic Sacred Knowledge (Ilm)",
      desc: "Rooted strictly in the Qur'an and authentic Sunnah according to the classical consensus of mainstream Islamic scholarship.",
      icon: BookOpen,
    },
    {
      title: "Nurturing Character (Tarbiyah & Akhlaq)",
      desc: "Knowledge is not merely memorized—it is embodied in gentle character, family respect, truthfulness, and civic responsibility.",
      icon: HeartHandshake,
    },
    {
      title: "Uncompromising Faculty Rigor (Sanad & Ijazah)",
      desc: "Every teacher holds verifiable credentials, Quranic Ijazah with continuous transmission chains, and extensive background checks.",
      icon: ShieldCheck,
    },
    {
      title: "Global Inclusivity & Personalization",
      desc: "Catering to students across Australia, UAE, UK, US, Canada, and India with flexible timezones and 1-on-1 personalized pacing.",
      icon: Globe2,
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Humble Beginnings",
      description: "Founded by traditional scholars in Sydney and Dubai to provide structured Quranic education for immigrant families.",
    },
    {
      year: "2020",
      title: "Digital Platform Launch",
      description: "Transitioned to a proprietary live interactive learning portal serving students across 14 countries.",
    },
    {
      year: "2022",
      title: "Curriculum Standardization",
      description: "Implemented standardized 4-tier Islamic curriculum spanning Noorani Qaida, Tajweed, Fiqh, Seerah, and Hadith.",
    },
    {
      year: "2026",
      title: "Global Academy Ecosystem",
      description: "Over 3,500 active students, 45+ Ijazah-certified male and female instructors, and 98% parent satisfaction rating.",
    },
  ];

  const leadershipTeam = [
    {
      name: "Sheikh Dr. Tariq Al-Hashimi",
      role: "Founder & Academic Director",
      bio: "Ph.D. in Usul al-Din from Al-Azhar University, holding 10 Qira'at Ijazah with 22 years of teaching across Australia and the Middle East.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Ustadha Fatima Al-Zahra",
      role: "Head of Women and Children Programs",
      bio: "Master's in Islamic Education, Hafidha of the Quran with Sanad linked to the Prophet (ﷺ), specializing in child psychology and pedagogy.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Ustadh Ibrahim Mansoor",
      role: "Head of Youth and Teen Leadership",
      bio: "Graduate of Islamic University of Madinah (Faculty of Hadith), youth mentor with extensive community leadership experience in the UK & GCC.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-charcoal-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="uppercase tracking-widest text-[11px] font-bold px-3 py-1">
            Our Heritage and Mission
          </Badge>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl">
            Learn Islam. Live with Purpose.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base text-charcoal-600 sm:text-xl leading-relaxed">
            Al-Qalam Global Academy is a premier international Islamic institution dedicated to cultivating grounded faith, Quranic mastery, and exemplary character through structured, teacher-led online education.
          </p>
        </div>
      </section>

      {/* Story & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">WHO WE ARE</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-950 leading-tight">
                Bridging Sacred Classical Tradition with Contemporary Academic Rigor
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                Founded with the vision of making authentic, high-quality Islamic education accessible to Muslim families worldwide, Al-Qalam Global Academy removes geographic barriers without compromising on classical scholarly integrity.
              </p>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                Whether you are a parent seeking a comprehensive Islamic foundation for your child, a teenager navigating complex cultural questions, or a working professional striving to master Quran recitation, our structured curriculum adapts to your journey.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-charcoal-200 shadow-xs">
                  <div className="text-3xl font-serif font-bold text-gold-600">3,500+</div>
                  <div className="text-xs font-semibold text-charcoal-600 mt-1">Active Global Learners</div>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-charcoal-200 shadow-xs">
                  <div className="text-3xl font-serif font-bold text-green-950">100%</div>
                  <div className="text-xs font-semibold text-charcoal-600 mt-1">Ijazah-Certified Scholars</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-charcoal-200 bg-white p-3 shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1000&auto=format&fit=crop&q=80"
                  alt="Islamic calligraphy and study"
                  className="rounded-2xl object-cover h-[440px] w-full"
                />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-green-950/90 p-5 text-ivory-50 backdrop-blur-md border border-green-800">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" /> The Al-Qalam Promise
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-charcoal-200 leading-relaxed">
                    Personalized 1-on-1 mentorship, continuous progress tracking, and transparent parent updates every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 md:py-24 border-y border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">OUR GUIDING PRINCIPLES</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-green-950">
              The Pillars of Our Educational Philosophy
            </h2>
            <p className="mt-3 text-sm text-charcoal-600">
              Every lesson, teacher selection, and syllabus design is anchored in these four unshakeable pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-charcoal-200 bg-ivory-50/50 p-6 hover:shadow-lift transition-all duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-950 text-gold-400 shadow-sm mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-green-950 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="py-16 md:py-24 bg-ivory-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">OUR JOURNEY</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-green-950">
              From Local Halaqas to an International Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="relative rounded-2xl border border-charcoal-200 bg-white p-6 shadow-xs"
              >
                <div className="font-serif text-2xl font-bold text-gold-600 mb-1">
                  {m.year}
                </div>
                <h3 className="text-base font-bold text-green-950 mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Faculty */}
      <section className="bg-white py-16 md:py-24 border-t border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">ACADEMIC LEADERSHIP</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-green-950">
              Guided by Scholarly Excellence
            </h2>
            <p className="mt-3 text-sm text-charcoal-600">
              Our academic board oversees curriculum standards, teacher certifications, and authentic student assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-charcoal-200 bg-ivory-50/50 p-6 text-center hover:shadow-card transition"
              >
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-green-950">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-gold-600 mt-0.5 mb-3">
                  {leader.role}
                </p>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-950 py-16 text-center text-ivory-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Begin Your Quranic & Islamic Journey Today
          </h2>
          <p className="mt-3 text-sm text-charcoal-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of students flourishing under certified scholars with tailored schedules designed for your household.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <Button variant="gold" size="lg" className="rounded-full">
                Browse Courses <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-full border-charcoal-400 text-white hover:bg-green-900">
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
