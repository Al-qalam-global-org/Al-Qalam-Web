"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  BookOpen,
  Search,
  Play,
  Clock,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function CoursesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreview, setActivePreview] = useState<{
    title: string;
    description: string;
    syllabus: string[];
  } | null>(null);

  const categories = [
    "All",
    "Qur'an Studies",
    "Jurisprudence",
    "Prophetic Traditions",
    "Character Building",
    "Islamic History",
    "Foundation",
  ];

  const allCourses = [
    {
      id: "online-madrassa",
      name: "Online Madrassa",
      category: "Foundation",
      ageGroup: "Children (Grades 1 – 12)",
      level: "All Levels",
      duration: "1 Year / Multi-term",
      description:
        "Complete structured Islamic education programme for children covering Aqeedah, Fiqh, Seerah, Duas, and Islamic values.",
      image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Noorani Qaida & Quranic Reading Fluency",
        "Module 2: Practical Salah (Prayer) & Taharah (Cleanliness)",
        "Module 3: 30 Daily Prophetic Duas & Surah Memorization",
        "Module 4: Stories of the 25 Prophets in the Quran",
      ],
    },
    {
      id: "quran-reading-recitation",
      name: "Qur'an Reading and Recitation",
      category: "Qur'an Studies",
      ageGroup: "All Ages",
      level: "Beginner to Advanced",
      duration: "6 Months",
      description:
        "Build a strong foundation in correct pronunciation (Makharij), Tajweed rules, and fluent recitation under certified Ijazah holders.",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Correct Makhaarij (Articulation Points of Letters)",
        "Module 2: Rules of Noon Sakinah, Tanween & Meem Sakinah",
        "Module 3: Rules of Madd (Prolongation) & Waqf (Stopping)",
        "Module 4: Fluent Recitation of Juz 28, 29, and 30",
      ],
    },
    {
      id: "tafseer-understanding-quran",
      name: "Tafseer: Understanding the Qur'an",
      category: "Qur'an Studies",
      ageGroup: "Teens and Adults",
      level: "Intermediate",
      duration: "4 Months",
      description:
        "Discover the meanings, historical contexts, linguistic depth, and practical life guidance from the holy verses of the Qur'an.",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Introduction to Quranic Sciences (Usool at-Tafseer)",
        "Module 2: Tafseer of Surah Al-Fatihah & Selected Short Surahs",
        "Module 3: Thematic Study of Surah Al-Kahf & Surah Al-Hujurat",
        "Module 4: Deriving Practical Lessons for Contemporary Daily Life",
      ],
    },
    {
      id: "hadith-prophetic-guidance",
      name: "Hadith: Prophetic Guidance",
      category: "Prophetic Traditions",
      ageGroup: "Teens and Adults",
      level: "Intermediate",
      duration: "3 Months",
      description:
        "Learn from the authentic teachings, actions, and character of Prophet Muhammad (ﷺ) to enrich personal morals and spiritual focus.",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: The Forty Hadith of Imam An-Nawawi",
        "Module 2: Understanding Hadith Terminology (Mustalah al-Hadith)",
        "Module 3: Prophetic Etiquette in Family, Speech, and Transactions",
        "Module 4: Character Building Through Sunnah Practices",
      ],
    },
    {
      id: "fiqh-islamic-practice",
      name: "Fiqh: Islamic Practice and Rulings",
      category: "Jurisprudence",
      ageGroup: "All Ages",
      level: "Beginner to Intermediate",
      duration: "4 Months",
      description:
        "Understand essential rulings for purification, prayer, fasting, zakah, family relations, and ethical modern financial dealings.",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Fiqh of Taharah (Wudu, Ghusl, Cleanliness)",
        "Module 2: Fiqh of Salah (Conditions, Pillars, Nullifiers & Sunnahs)",
        "Module 3: Fiqh of Sawm (Fasting) & Zakat (Purification of Wealth)",
        "Module 4: Everyday Ethics & Halal/Haram in Food & Finance",
      ],
    },
    {
      id: "akhlaq-character-etiquette",
      name: "Akhlaq: Character and Etiquette",
      category: "Character Building",
      ageGroup: "Children and Teens",
      level: "Beginner",
      duration: "3 Months",
      description:
        "Instilling Islamic morals, kindness, empathy, respect for parents and teachers, and digital ethics in everyday contemporary living.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Honesty, Humility, and Kindness to Parents",
        "Module 2: Controlling Anger and Good Speech (Adab al-Lisan)",
        "Module 3: Social Media Ethics, Privacy & Digital Consciousness",
        "Module 4: Islamic Empathy, Community Responsibility & Charity",
      ],
    },
    {
      id: "seerah-prophets-life",
      name: "Seerah: The Prophet's Life",
      category: "Islamic History",
      ageGroup: "All Ages",
      level: "All Levels",
      duration: "4 Months",
      description:
        "An inspiring, chronological study of the life, leadership, resilience, and compassion of the final Messenger of Allah (ﷺ).",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: Pre-Islamic Arabia & Early Life in Makkah",
        "Module 2: The Call to Prophethood & Early Companions' Sacrifices",
        "Module 3: The Migration (Hijrah) & Establishing the Madinan Society",
        "Module 4: The Conquest of Makkah, Farewell Pilgrimage & Legacy",
      ],
    },
    {
      id: "tarikh-islamic-civilization",
      name: "Tarikh: Islamic History and Civilization",
      category: "Islamic History",
      ageGroup: "Teens and Adults",
      level: "Intermediate",
      duration: "3 Months",
      description:
        "Explore the Golden Age of Islam, the Rightly Guided Caliphs, Islamic scientific innovations, and historical legacy.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
      syllabus: [
        "Module 1: The Era of the Four Rightly Guided Caliphs",
        "Module 2: The Umayyad & Abbasid Golden Age of Science & Learning",
        "Module 3: Islamic Andalusia (Spain) and Cultural Contributions",
        "Module 4: Lessons of History for the Modern Muslim Ummah",
      ],
    },
  ];

  const filteredCourses = allCourses.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-charcoal-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">ACADEMIC CURRICULUM</span>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl">
            Explore Our Islamic Courses
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-charcoal-600 sm:text-lg leading-relaxed">
            From Noorani Qaida and Tajweed to Tafseer, Fiqh, and Islamic History — learn with qualified teachers in live 1-to-1 and group formats.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by course name, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-11 py-3 text-sm rounded-full shadow-xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-green-950 text-gold-400 shadow-xs"
                    : "bg-ivory-200/80 text-charcoal-700 hover:bg-ivory-200 hover:text-green-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-3xl border border-charcoal-200 bg-white p-5 shadow-card hover:shadow-lift transition-all duration-200"
              >
                <div>
                  <div className="relative h-52 overflow-hidden rounded-2xl">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-lg bg-green-950/90 px-3 py-1 text-xs font-semibold text-gold-400 backdrop-blur-xs">
                        {course.category}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setActivePreview({
                          title: course.name,
                          description: course.description,
                          syllabus: course.syllabus,
                        })
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition"
                      aria-label={`Preview ${course.name}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-950 shadow-xl group-hover:scale-110 transition">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-gold-600 font-semibold">
                      <span>{course.ageGroup}</span>
                      <span>{course.duration}</span>
                    </div>

                    <h2 className="mt-2 font-serif text-xl font-bold text-green-950 group-hover:text-green-900 transition">
                      {course.name}
                    </h2>

                    <p className="mt-2 text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal-200/70 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      setActivePreview({
                        title: course.name,
                        description: course.description,
                        syllabus: course.syllabus,
                      })
                    }
                    className="text-xs font-semibold text-charcoal-600 hover:text-green-950 transition flex items-center gap-1"
                  >
                    <Play className="h-3 w-3 fill-current text-gold-500" /> Watch Preview
                  </button>

                  <Link href="/contact">
                    <Button variant="primary" size="sm" className="rounded-xl">
                      Enroll Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail / Video Preview Modal */}
      {activePreview && (
        <Modal
          isOpen={true}
          onClose={() => setActivePreview(null)}
          title={activePreview.title}
          description="Sample lesson preview and syllabus breakdown."
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Video Mockup */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-charcoal-900 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-green-950 mb-3 shadow-lg animate-pulse">
                <Play className="h-8 w-8 fill-current ml-1" />
              </div>
              <p className="font-serif text-base font-bold">
                Interactive Classroom Demonstration
              </p>
              <p className="text-xs text-charcoal-300 max-w-sm mt-1">
                Live recitation demonstration with Makhaarij guidance and Ustadh interactive corrections.
              </p>
            </div>

            {/* Syllabus */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-green-950 mb-3">
                Course Syllabus Outline
              </h4>
              <div className="space-y-2">
                {activePreview.syllabus.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg bg-ivory-50 p-2.5 border border-charcoal-200 text-xs text-charcoal-800"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-charcoal-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePreview(null)}
              >
                Close Preview
              </Button>
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Enroll in This Course <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
