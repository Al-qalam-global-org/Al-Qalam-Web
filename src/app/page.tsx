"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  Globe2,
  CheckCircle2,
  UserCheck,
  Video,
  Quote,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  ExploreStepIcon,
  ProgramStepIcon,
  ScheduleStepIcon,
  LearningStepIcon,
} from "@/components/shared/StepIcons";

export default function LandingPage() {
  const [activePreview, setActivePreview] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const [hero, setHero] = useState({
    eyebrow: "ISLAMIC EDUCATION FOR EVERY GENERATION",
    headline: "Learn Islam. Live with Purpose.",
    subheadline:
      "Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice.",
    primaryCtaText: "Watch Free Course Preview",
    secondaryCtaText: "Explore Learning Paths",
    heroImageUrl:
      "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&auto=format&fit=crop&q=80",
    quoteBadgeText: "Read. Learn. Understand. Live.",
    captionTitle: "Empowering Homes With Sacred Knowledge",
    stats: [
      { label: "Teaching Exp.", value: "10+ Years" },
      { label: "Certified Teachers", value: "Qualified" },
      { label: "Online Classes", value: "Flexible" },
      { label: "India, GCC, Australia", value: "Global" },
    ],
  });

  const defaultTeachers = [
    {
      name: "Ustadh Ahmed",
      specialization: "Qur'an and Tajweed",
      experience: "12+ years experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Ustadh Faisal",
      specialization: "Tafseer and Hadith",
      experience: "10+ years experience",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Ustadh Hamza",
      specialization: "Fiqh and Islamic Studies",
      experience: "8+ years experience",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const [teacherList, setTeacherList] = useState(defaultTeachers);
  const [teacherIndex, setTeacherIndex] = useState(0);
  const [isTeacherPaused, setIsTeacherPaused] = useState(false);

  React.useEffect(() => {
    async function fetchCmsHero() {
      try {
        const res = await fetch("/api/cms?key=home_hero");
        const json = await res.json();
        if (json.success && json.data) {
          setHero((prev) => ({ ...prev, ...json.data }));
        }
      } catch (err) {
        // Safe fallback
      }
    }

    async function fetchLiveTeachers() {
      try {
        const res = await fetch("/api/teachers?take=20");
        const json = await res.json();
        if (json.success && json.data?.teachers && json.data.teachers.length > 0) {
          const mapped = json.data.teachers.map((t: any) => ({
            name: `${t.firstName} ${t.lastName}`,
            specialization: t.specialization || "Islamic Studies & Quran",
            experience: t.experienceYears ? `${t.experienceYears}+ years experience` : "Certified Educator",
            image: t.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
          }));
          setTeacherList(mapped);
        }
      } catch (err) {
        // Fallback to defaultTeachers
      }
    }

    fetchCmsHero();
    fetchLiveTeachers();
  }, []);

  // Auto-slide teacher carousel if more than 3 teachers exist
  React.useEffect(() => {
    if (teacherList.length <= 3 || isTeacherPaused) return;
    const timer = setInterval(() => {
      setTeacherIndex((prev) => (prev + 1) % teacherList.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [teacherList.length, isTeacherPaused]);

  const visibleTeachers = React.useMemo(() => {
    if (teacherList.length <= 3) return teacherList;
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(teacherList[(teacherIndex + i) % teacherList.length]);
    }
    return items;
  }, [teacherList, teacherIndex]);

  const learningPaths = [
    {
      id: "children",
      title: "Children",
      tag: "Grades 1 – 12",
      description:
        "Build a strong Islamic foundation with engaging and structured learning designed for young hearts and minds.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80",
      cta: "Explore Children's Program",
    },
    {
      id: "teenagers",
      title: "Teenagers",
      tag: "Ages 13 – 18",
      description:
        "Develop Islamic identity, confidence and deep understanding for the modern world with relatable guidance.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
      cta: "Explore Teen Program",
    },
    {
      id: "adults",
      title: "Adults and Professionals",
      tag: "Flexible Schedules",
      description:
        "Strengthen your knowledge with flexible learning tailored around your career, busy routine, and family.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      cta: "Explore Adult Learning",
    },
    {
      id: "lifelong",
      title: "Lifelong Learners",
      tag: "Any Age",
      description:
        "It is never too late to learn. Reconnect with the Qur'an and deepen your spiritual journey and understanding.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      cta: "Explore Lifelong Learning",
    },
  ];

  const courses = [
    {
      id: "madrassa",
      name: "Online Madrassa",
      levelTag: "Grades 1 – 12",
      description:
        "Complete Islamic education programme for students covering Aqeedah, Fiqh, Seerah, and Islamic manners.",
      image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "quran",
      name: "Qur'an Reading and Recitation",
      levelTag: "All Levels",
      description:
        "Build a strong foundation with Tajweed and correct recitation under certified Ijazah holders.",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "tafseer",
      name: "Tafseer",
      levelTag: "Understanding the Qur'an",
      description:
        "Discover the meanings, contextual background, and practical guidance from the verses of the Qur'an.",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "hadith",
      name: "Hadith",
      levelTag: "Prophetic Guidance",
      description:
        "Learn from the authentic teachings, actions, and noble character of Prophet Muhammad (ﷺ).",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "fiqh",
      name: "Fiqh",
      levelTag: "Islamic Practice",
      description:
        "Understand essential rulings for daily prayer, purification, fasting, and everyday ethics.",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const steps = [
    {
      num: "01",
      highlight: "Free Video Preview",
      title: "Explore a Course",
      desc: "Browse our structured courses and watch free introductory video lessons at your pace.",
      icon: ExploreStepIcon,
    },
    {
      num: "02",
      highlight: "Custom Fit",
      title: "Choose Your Program",
      desc: "Select the right course, 1-to-1 or group class format based on your goals and schedule.",
      icon: ProgramStepIcon,
    },
    {
      num: "03",
      highlight: "Within 3 Days",
      title: "Get Matched & Schedule",
      desc: "We'll match you with a certified qualified teacher and confirm class timings smoothly.",
      icon: ScheduleStepIcon,
    },
    {
      num: "04",
      highlight: "Live LMS Portal",
      title: "Start Learning",
      desc: "Begin your live classes, receive teacher feedback, and track your progress on your portal.",
      icon: LearningStepIcon,
    },
  ];



  const testimonials = [
    {
      id: "t1",
      name: "Aisha M.",
      initials: "AM",
      role: "Parent of 2 Students",
      location: "Dubai, UAE",
      rating: 5,
      program: "Online Madrassa & Tajweed",
      quote:
        "Al Qalam Global has been a true blessing for our family. My children look forward to every class. Their Qur'an reading and tajweed have improved remarkably, and the Ustadh is exceptionally patient and encouraging.",
    },
    {
      id: "t2",
      name: "Rehman K.",
      initials: "RK",
      role: "Parent",
      location: "Melbourne, Australia",
      rating: 5,
      program: "Children's Islamic Studies",
      quote:
        "Finding authentic, structured Islamic education outside Muslim-majority countries was always difficult for us until we joined Al Qalam. The syllabus is well-structured, clear, and easy to follow from home.",
    },
    {
      id: "t3",
      name: "Sami J.",
      initials: "SJ",
      role: "Adult Learner & Professional",
      location: "Bengaluru, India",
      rating: 5,
      program: "Tafseer & Hadith Program",
      quote:
        "As a busy working professional, the flexible 1-to-1 scheduling makes it possible to continue my lifelong learning. The Tafseer sessions have given me a far deeper connection with the Qur'an and daily practice.",
    },
    {
      id: "t4",
      name: "Fatima & Omar",
      initials: "FO",
      role: "Parents",
      location: "London, UK",
      rating: 5,
      program: "Qur'an Recitation & Seerah",
      quote:
        "The personalized attention and regular feedback on the student portal give us complete peace of mind. Our daughter has gained tremendous confidence in reciting and understanding the Sunnah.",
    },
    {
      id: "t5",
      name: "Dr. Tariq N.",
      initials: "TN",
      role: "Parent",
      location: "Riyadh, Saudi Arabia",
      rating: 5,
      program: "Advanced Tajweed Track",
      quote:
        "The teachers are certified scholars who genuinely care about the moral character and spiritual growth of the students, not just academic memorization. Highly recommended to any family.",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  React.useEffect(() => {
    if (isTestimonialPaused) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isTestimonialPaused, testimonials.length]);

  const visibleTestimonials = React.useMemo(() => {
    const total = testimonials.length;
    return [
      { ...testimonials[(activeTestimonial - 1 + total) % total], position: "prev" },
      { ...testimonials[activeTestimonial % total], position: "center" },
      { ...testimonials[(activeTestimonial + 1) % total], position: "next" },
    ];
  }, [activeTestimonial, testimonials]);

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
        {/* Subtle background Islamic geometric wash */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-green-900/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="eyebrow">
                {hero.eyebrow}
              </span>

              <h1 className="mt-4 font-hero text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl lg:leading-[1.15] whitespace-pre-line">
                {hero.headline}
              </h1>

              <p className="mt-6 max-w-xl text-base text-charcoal-700 sm:text-lg leading-relaxed">
                {hero.subheadline}
              </p>

              {/* Dual Hero CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    setActivePreview({
                      title: "Al-Qalam Global Academy Overview",
                      description:
                        "Experience our structured online classrooms and live teacher methodology.",
                    })
                  }
                  className="rounded-full gap-3 shadow-md"
                >
                  <Play className="h-4 w-4 fill-current text-gold-400" />
                  {hero.primaryCtaText}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>

                <Link href="#programs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    {hero.secondaryCtaText}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* 4 Trust Indicators Grid */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-charcoal-200/70 pt-8">
                {hero.stats && hero.stats.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100/70 text-gold-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-950">{st.value}</p>
                      <p className="text-[11px] text-charcoal-500">{st.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative lg:col-span-5 flex">
              <div className="relative w-full h-full min-h-[320px] overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={hero.heroImageUrl}
                  alt="Islamic Quran Education at Al Qalam"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEARNING FOR EVERY GENERATION */}
      <section id="programs" className="border-t border-charcoal-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="eyebrow">LEARNING FOR EVERY GENERATION</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-green-950 sm:text-4xl">
                Find the Right Learning Path for You
              </h2>
              <p className="mt-2 text-sm text-charcoal-500 max-w-xl">
                Structured, age-appropriate programmes designed for every stage of life.
              </p>
            </div>
            <div className="mt-4 flex gap-2 md:mt-0">
              <button
                aria-label="Previous path"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 hover:bg-ivory-100 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next path"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 hover:bg-ivory-100 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="group flex flex-col justify-between rounded-2xl border border-charcoal-200 bg-ivory-50/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-green-700/30 hover:shadow-lift"
              >
                <div>
                  <div className="relative h-44 overflow-hidden rounded-xl">
                    <img
                      src={path.image}
                      alt={path.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-lg bg-green-950/80 px-2.5 py-1 text-[11px] font-semibold text-gold-400 backdrop-blur-xs">
                        {path.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold text-green-950">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-xs text-charcoal-600 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-charcoal-200/60">
                  <Link
                    href="/programs"
                    className="inline-flex items-center text-xs font-bold text-green-900 hover:text-gold-600 transition gap-1"
                  >
                    {path.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR COURSES (With Preview Video Triggers) */}
      <section id="courses" className="bg-green-950 py-16 text-ivory-50 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-400">
                OUR COURSES
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
                Explore Our Courses
              </h2>
              <p className="mt-2 text-sm text-charcoal-300 max-w-xl">
                From Qur&apos;an reading to Tafseer, Fiqh, Seerah and more — learn with qualified teachers and a clear learning structure.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 md:mt-0">
              <Link
                href="/courses"
                className="text-xs font-semibold text-gold-400 hover:text-gold-300 transition flex items-center gap-1"
              >
                View All Courses <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex gap-2">
                <button
                  aria-label="Previous course"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-green-800 text-gold-400 hover:bg-green-900 transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Next course"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-green-800 text-gold-400 hover:bg-green-900 transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-green-800/80 bg-green-900/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-gold-500/50 hover:bg-green-900/90"
              >
                <div>
                  <div className="relative h-40 overflow-hidden rounded-xl">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                    />
                    <button
                      onClick={() =>
                        setActivePreview({
                          title: course.name,
                          description: course.description,
                        })
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition"
                      aria-label={`Watch preview of ${course.name}`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-green-950 shadow-lg group-hover:scale-110 transition">
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </div>
                    </button>
                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-white">
                    {course.name}
                  </h3>
                  <p className="text-[11px] font-medium text-gold-400">
                    {course.levelTag}
                  </p>
                  <p className="mt-2 text-xs text-charcoal-300 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-green-800">
                  <button
                    onClick={() =>
                      setActivePreview({
                        title: course.name,
                        description: course.description,
                      })
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-950/80 py-2 text-xs font-semibold text-gold-400 hover:bg-green-950 hover:text-gold-300 transition"
                  >
                    <Play className="h-3 w-3 fill-current" /> Watch Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW AL QALAM WORKS (4 Simple Steps) */}
      <section className="bg-ivory-50 py-16 md:py-24 border-b border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">HOW AL QALAM GLOBAL WORKS</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-green-950 sm:text-4xl">
              Start Your Learning Journey in 4 Simple Steps
            </h2>
            <p className="mt-3 text-sm text-charcoal-600">
              From exploring a free preview to starting live classes — we make the process simple, personalized and smooth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.num}
                  className="group relative flex flex-col justify-between rounded-2xl border border-charcoal-200/80 bg-white p-6 shadow-card hover:shadow-lift transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top Row: SVG Illustration & Step Number Badge */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="transition-transform duration-300 group-hover:scale-105 drop-shadow-sm">
                        <IconComponent className="w-16 h-16 shrink-0" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-gold-100/70 text-gold-700 border border-gold-300/50">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-green-950 group-hover:text-green-900 transition">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-charcoal-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Milestone Tag */}
                  <div className="mt-6 pt-3.5 border-t border-charcoal-200/70 flex items-center justify-between text-[11px] font-semibold text-charcoal-500">
                    <span className="inline-flex items-center gap-1.5 text-green-900">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-500" />
                      {step.highlight}
                    </span>
                    {idx < 3 && (
                      <ArrowRight className="hidden lg:block h-3.5 w-3.5 text-charcoal-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MEET THE EDUCATOR & TEACHERS */}
      <section id="teachers" className="bg-white py-16 md:py-24 border-b border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            {/* Left: Founder Story */}
            <div className="rounded-3xl bg-green-950 p-8 text-ivory-50 lg:col-span-5 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                OUR VISION
              </span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                Meet the Educator Behind Al Qalam Global
              </h2>
              <p className="mt-4 text-xs text-charcoal-300 leading-relaxed">
                With over 10 years of experience in Islamic teaching, including working with communities in Australia and the UAE, our founder established Al Qalam Global to make authentic Islamic education accessible to families worldwide.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-lg bg-green-900 px-2.5 py-1 text-[11px] text-gold-400 font-medium">
                  10+ Years Experience
                </span>
                <span className="rounded-lg bg-green-900 px-2.5 py-1 text-[11px] text-gold-400 font-medium">
                  Australia & GCC
                </span>
                <span className="rounded-lg bg-green-900 px-2.5 py-1 text-[11px] text-gold-400 font-medium">
                  International Work
                </span>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button variant="gold" size="sm" className="rounded-full">
                    Our Story <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Qualified & Dedicated Teachers */}
            <div
              className="lg:col-span-7"
              onMouseEnter={() => setIsTeacherPaused(true)}
              onMouseLeave={() => setIsTeacherPaused(false)}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-green-950">
                    Qualified and Dedicated Teachers
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Learn from experienced and certified educators who are passionate about Islamic education.
                  </p>
                </div>

                {/* Arrows if more than 3 teachers */}
                {teacherList.length > 3 && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setTeacherIndex((prev) =>
                          prev === 0 ? teacherList.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous teacher"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-700 hover:border-gold-500 hover:text-gold-600 transition shadow-xs"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setTeacherIndex((prev) => (prev + 1) % teacherList.length)
                      }
                      aria-label="Next teacher"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-700 hover:border-gold-500 hover:text-gold-600 transition shadow-xs"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* 3-card display with smooth transition */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {visibleTeachers.map((t, idx) => (
                  <div
                    key={`${t.name}-${idx}`}
                    className="group rounded-2xl border border-charcoal-200/80 bg-ivory-50 p-4 text-center shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative inline-block mx-auto">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="mx-auto h-24 w-24 rounded-full object-cover border-2 border-gold-500/40 group-hover:border-gold-500 transition"
                      />
                      <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-600 border-2 border-white shadow-xs" title="Active Educator" />
                    </div>
                    <h4 className="mt-3 font-serif text-base font-bold text-green-950 group-hover:text-green-900 transition">
                      {t.name}
                    </h4>
                    <p className="text-xs font-semibold text-green-800 mt-0.5">
                      {t.specialization}
                    </p>
                    <p className="text-[11px] text-charcoal-500 mt-1">
                      {t.experience}
                    </p>
                  </div>
                ))}
              </div>

              {/* Carousel Indicator Dots when more than 3 teachers */}
              {teacherList.length > 3 && (
                <div className="mt-4 flex justify-center items-center gap-1.5">
                  {teacherList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTeacherIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        teacherIndex === i
                          ? "w-6 bg-gold-500"
                          : "w-1.5 bg-charcoal-300 hover:bg-charcoal-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT PORTAL & PROGRESS TRACKING MOCKUP */}
      <section className="bg-ivory-100 py-16 md:py-24 border-b border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Feature checklist */}
            <div className="lg:col-span-5">
              <span className="eyebrow">PORTAL EXPERIENCE</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-green-950 sm:text-4xl">
                Student Portal and Progress Tracking
              </h2>
              <p className="mt-4 text-sm text-charcoal-600 leading-relaxed">
                Stay informed with teacher feedback, lesson progress, attendance records, and upcoming live classes — all in one unified place.
              </p>

              <div className="mt-8 space-y-3.5">
                {[
                  "View learning progress and completed Surahs",
                  "Receive personalized teacher feedback after every class",
                  "Track completed lessons and attendance records",
                  "Understand next learning milestones clearly",
                  "Stay connected with your Ustadh through live links",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-charcoal-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/login">
                  <Button variant="primary" size="md">
                    See How It Works <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Student Dashboard Image Showcase */}
            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-charcoal-200/90 bg-white p-2 md:p-3 shadow-xl shadow-green-950/5 transition-all duration-300 hover:shadow-2xl hover:shadow-green-950/10">
                <Image
                  src="/images/young-muslim-student-dashboard.webp"
                  alt="Young Muslim Student's Learning Dashboard - Al-Qalam Global Academy"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto rounded-xl md:rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL STORIES & PARENTS TESTIMONIALS */}
      <section className="bg-white py-16 md:py-24 border-b border-charcoal-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            {/* Left: Testimonials Introduction & Rating Score */}
            <div className="lg:col-span-4">
              <span className="eyebrow">TESTIMONIALS</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-green-950 sm:text-4xl leading-tight">
                What the Parents <br className="hidden sm:inline" />
                Have To Say
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                At the heart of every student&apos;s growth is the support and trust of their parents. We take immense pride in hearing from families who have experienced the positive impact of our online Islamic education.
              </p>

              {/* Overall Satisfaction Badge */}
              <div className="mt-6 rounded-2xl bg-ivory-50 border border-charcoal-200/80 p-3.5 inline-flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-950 text-gold-400 font-serif font-bold text-base shadow-sm">
                  4.9
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold text-green-950 mt-0.5">
                    500+ Happy Families Across 15+ Countries
                  </p>
                </div>
              </div>

              {/* CTA Action */}
              <div className="mt-8 flex items-center gap-4">
                <Link href="/contact">
                  <Button variant="primary" className="rounded-full gap-2 shadow-md text-xs">
                    Book Free Demo Class <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: 3 Reviews Display (Center Active + Translucent Prev & Next) */}
            <div
              className="lg:col-span-8 flex flex-col justify-center"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-center">
                {visibleTestimonials.map((item, idx) => {
                  const isCenter = item.position === "center";
                  const isPrev = item.position === "prev";
                  const isNext = item.position === "next";

                  return (
                    <div
                      key={`${item.id}-${activeTestimonial}-${idx}`}
                      onClick={() => {
                        if (isPrev) {
                          setActiveTestimonial((prev) =>
                            prev === 0 ? testimonials.length - 1 : prev - 1
                          );
                        } else if (isNext) {
                          setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
                        }
                      }}
                      className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-500 ${
                        isCenter
                          ? "bg-white border-2 border-gold-500 shadow-2xl shadow-green-950/10 scale-100 md:scale-105 z-10 opacity-100 ring-4 ring-gold-500/15"
                          : "bg-ivory-50/80 border border-charcoal-200/80 shadow-xs opacity-40 hover:opacity-75 scale-95 cursor-pointer hidden md:flex"
                      }`}
                      style={{ minHeight: isCenter ? "320px" : "290px" }}
                    >
                      <div>
                        {/* Top: 5 Stars Rating & Program Tag */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <div className="flex items-center gap-0.5 text-gold-500">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold border ${
                              isCenter
                                ? "bg-gold-100/90 text-gold-800 border-gold-300/60"
                                : "bg-charcoal-100 text-charcoal-600 border-charcoal-200"
                            }`}
                          >
                            {item.program}
                          </span>
                        </div>

                        {/* Quote Text */}
                        <p
                          className={`text-xs leading-relaxed italic ${
                            isCenter ? "text-charcoal-800 font-medium" : "text-charcoal-600"
                          }`}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      {/* Bottom Author Info (No photo, privacy-focused initial badge) */}
                      <div className="mt-5 pt-3.5 border-t border-charcoal-200/60 flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif font-bold text-xs shadow-xs ${
                            isCenter
                              ? "bg-green-950 text-gold-400"
                              : "bg-charcoal-200 text-charcoal-700"
                          }`}
                        >
                          {item.initials}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-serif text-xs font-bold text-green-950 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-charcoal-500 truncate">
                            {item.role} • {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress & Navigation Bar Below Cards */}
              <div className="mt-6 flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeTestimonial === i
                          ? "w-8 bg-gold-500"
                          : "w-2 bg-charcoal-300 hover:bg-charcoal-400"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-charcoal-400 ml-2 font-mono">
                    0{activeTestimonial + 1} / 0{testimonials.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveTestimonial((prev) =>
                        prev === 0 ? testimonials.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous testimonial"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-200 bg-white text-charcoal-700 hover:border-gold-500 hover:text-gold-600 transition shadow-xs"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
                    }
                    aria-label="Next testimonial"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-200 bg-white text-charcoal-700 hover:border-gold-500 hover:text-gold-600 transition shadow-xs"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-b from-green-950 to-charcoal-900 py-16 md:py-24 text-center text-ivory-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Ready to Begin Your Islamic Learning Journey?
          </h2>
          <p className="mt-4 text-sm text-charcoal-300 sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore a course, watch a free preview and start live classes with qualified teachers today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={() =>
                setActivePreview({
                  title: "Al-Qalam Global Course Preview",
                  description:
                    "Watch introductory lesson and student portal demonstration.",
                })
              }
              className="rounded-full gap-2 shadow-lg"
            >
              <Play className="h-4 w-4 fill-current" /> Watch Free Course Preview
            </Button>
            <Link href="/programs">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-white border-charcoal-500 hover:bg-white/10"
              >
                Explore Programs <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-charcoal-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold-400" /> Online Learning
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold-400" /> One-to-One and Group Classes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-gold-400" /> Flexible Schedules
            </span>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Preview Modal */}
      {activePreview && (
        <Modal
          isOpen={true}
          onClose={() => setActivePreview(null)}
          title={activePreview.title}
          description={activePreview.description}
          maxWidth="2xl"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-charcoal-900 flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-green-950 mb-4 shadow-lg animate-pulse">
              <Play className="h-8 w-8 fill-current ml-1" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white">
              Course Video Preview
            </h4>
            <p className="text-xs text-charcoal-300 max-w-md mt-2">
              Sample video lesson demonstrating interactive Quranic tajweed instruction, student participation, and Ustadh feedback.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/contact">
                <Button variant="gold" size="sm">
                  Enroll Now
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-charcoal-600"
                onClick={() => setActivePreview(null)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
