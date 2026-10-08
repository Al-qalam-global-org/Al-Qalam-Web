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

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/courses?take=100");
        const json = await res.json();
        if (json.success && json.data?.courses) {
          setCourses(json.data.courses);
        } else {
          setCourses([]);
        }
      } catch (e) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
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
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-3xl bg-ivory-200/60 animate-pulse border border-charcoal-200" />
              ))
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-charcoal-300 mb-3" />
                <h3 className="font-serif text-xl font-bold text-green-950">No Courses Found</h3>
                <p className="mt-1 text-sm text-charcoal-500 max-w-md mx-auto">
                  {searchQuery || selectedCategory !== "All"
                    ? "No courses match your filter criteria. Try clearing filters or searching for another term."
                    : "No courses are currently published in the catalog."}
                </p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group flex flex-col justify-between rounded-3xl border border-charcoal-200 bg-white p-5 shadow-card hover:shadow-lift transition-all duration-200"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden rounded-2xl bg-green-950/10 flex items-center justify-center">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt={course.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-900 text-gold-400 mb-2 shadow-sm">
                            <BookOpen className="h-7 w-7" />
                          </div>
                          <span className="text-xs font-semibold text-green-900 line-clamp-1">{course.name}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="rounded-lg bg-green-950/90 px-3 py-1 text-xs font-semibold text-gold-400 backdrop-blur-xs">
                          {course.category || "General"}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          setActivePreview({
                            title: course.name,
                            description: course.description,
                            syllabus: course.syllabus || [],
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
                        <span>{course.ageGroup || "All Ages"}</span>
                        <span>{course.duration || "Self-Paced"}</span>
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
                          syllabus: course.syllabus || [],
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
              ))
            )}
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
