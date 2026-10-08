"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import {
  Globe,
  Sparkles,
  LayoutTemplate,
  BookOpen,
  UserCheck,
  Compass,
  MessageSquareQuote,
  PhoneCall,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "hero" | "programs" | "courses" | "teachers" | "testimonials" | "contact";

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Hero State
  const [heroData, setHeroData] = useState({
    eyebrow: "ISLAMIC EDUCATION FOR EVERY GENERATION",
    headline: "Learn Islam. Live with Purpose.",
    subheadline:
      "Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice.",
    primaryCtaText: "Watch Free Course Preview",
    secondaryCtaText: "Explore Learning Paths",
    videoPreviewUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    heroImageUrl: "",
    quoteBadgeText: "Read. Learn. Understand. Live.",
    captionTitle: "Empowering Homes With Sacred Knowledge",
    stats: [
      { label: "Teaching Experience", value: "10+ Years", subtext: "Certified Ustadhs" },
      { label: "Certified Teachers", value: "Qualified", subtext: "Ijazah Holders" },
      { label: "Online Classes", value: "Flexible", subtext: "1-on-1 & Groups" },
      { label: "Global Reach", value: "India, GCC, Australia", subtext: "Worldwide" },
    ],
  });

  // 2. Learning Paths State
  const [programsData, setProgramsData] = useState({
    sectionTitle: "Find the Right Learning Path for You",
    sectionSubtitle: "Programs tailored for every age, stage, and learning goal",
    paths: [
      {
        id: "children",
        title: "Children",
        tag: "Grades 1 – 12",
        description:
          "Build a strong Islamic foundation with engaging and structured learning designed for young hearts and minds.",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80",
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
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
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
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
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
          "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
        cta: "Explore Lifelong Learning",
        link: "/programs#lifelong",
      },
    ],
  });

  // 3. Contact & Academy Info State
  const [contactData, setContactData] = useState({
    whatsappNumber: "+971 50 123 4567",
    whatsappLink: "https://wa.me/971501234567",
    phone: "+971 4 123 4567",
    email: "admissions@alqalamglobal.com",
    supportEmail: "support@alqalamglobal.com",
    officeAddress: "Dubai Knowledge Park, Dubai, UAE",
    operatingHours: "Mon - Sat: 8:00 AM - 10:00 PM (GST)",
  });

  // Courses & Teachers & Testimonials collections
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Course Modal state
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [courseForm, setCourseForm] = useState({
    name: "",
    slug: "",
    category: "Qur'an Studies",
    ageGroup: "All Ages",
    level: "Beginner to Intermediate",
    duration: "4 Months",
    description: "",
    imageUrl: "",
  });

  // Testimonial Modal state
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    authorName: "",
    roleOrLocation: "",
    quote: "",
    avatarUrl: "",
    rating: 5,
    isPublished: true,
  });

  const loadAllCmsData = async () => {
    try {
      setLoading(true);
      const [cmsRes, coursesRes, teachersRes, testimonialsRes] = await Promise.all([
        fetch("/api/cms"),
        fetch("/api/courses"),
        fetch("/api/teachers"),
        fetch("/api/cms/testimonials?all=true"),
      ]);

      const [cmsData, coursesData, teachersData, testimonialsData] = await Promise.all([
        cmsRes.json(),
        coursesRes.json(),
        teachersRes.json(),
        testimonialsRes.json(),
      ]);

      if (cmsData.success && Array.isArray(cmsData.data)) {
        cmsData.data.forEach((item: any) => {
          if (item.key === "home_hero" && item.content) {
            setHeroData((prev) => ({ ...prev, ...item.content }));
          }
          if (item.key === "learning_paths" && item.content) {
            setProgramsData((prev) => ({ ...prev, ...item.content }));
          }
          if (item.key === "site_contact" && item.content) {
            setContactData((prev) => ({ ...prev, ...item.content }));
          }
        });
      }

      if (coursesData.success) setCourses(coursesData.data.courses || []);
      if (teachersData.success) setTeachers(teachersData.data.teachers || []);
      if (testimonialsData.success) setTestimonials(testimonialsData.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllCmsData();
  }, []);

  const handleSaveSection = async (
    key: string,
    sectionName: string,
    page: string,
    content: any
  ) => {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          page,
          sectionName,
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to save section");
      }

      setSuccessMsg(`✓ ${sectionName} successfully updated and published!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Course handlers
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      if (editingCourse) {
        // Update
        const res = await fetch(`/api/courses/${editingCourse.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to update");
      } else {
        // Create
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to create");
      }

      setIsCourseModalOpen(false);
      setEditingCourse(null);
      loadAllCmsData();
      setSuccessMsg("✓ Course list updated!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from courses?`)) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to delete");
      loadAllCmsData();
      setSuccessMsg("✓ Course removed successfully");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Testimonial handlers
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      if (editingTestimonial) {
        const res = await fetch(`/api/cms/testimonials/${editingTestimonial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialForm),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to update");
      } else {
        const res = await fetch("/api/cms/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialForm),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to create");
      }

      setIsTestimonialModalOpen(false);
      setEditingTestimonial(null);
      loadAllCmsData();
      setSuccessMsg("✓ Testimonial saved!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/cms/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed to delete");
      loadAllCmsData();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero & Banner", icon: LayoutTemplate },
    { id: "programs", label: "Learning Paths", icon: Compass },
    { id: "courses", label: "Courses Catalog", icon: BookOpen },
    { id: "teachers", label: "Instructors Showcase", icon: UserCheck },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "contact", label: "Contact & Academy Info", icon: PhoneCall },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <Header
        title="Website Content Management (CMS)"
        subtitle="Live control over public pages, hero content, course offerings, and academy contact information"
        role="ADMIN"
        actions={
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-charcoal-200 bg-white hover:bg-ivory-100 text-green-950 shadow-xs transition"
          >
            <ExternalLink className="h-3.5 w-3.5 text-gold-600" />
            View Live Site
          </a>
        }
      />

      {/* Notification feedback alerts */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 border border-emerald-200 shadow-xs animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-xs font-semibold text-danger border border-red-200 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Sub-Section Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-charcoal-200 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                isActive
                  ? "bg-green-950 text-gold-400 shadow-sm"
                  : "bg-white text-charcoal-700 hover:bg-ivory-100 hover:text-green-950 border border-charcoal-200/80"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-gold-400" : "text-charcoal-500")} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO & BANNER */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Hero Section &amp; Trust Statistics
              </h3>
              <p className="text-xs text-charcoal-500">
                Modify the primary title, subtitle, badges, hero imagery, and 4 trust indicators.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              isLoading={saving}
              onClick={() =>
                handleSaveSection("home_hero", "Hero & Banner Section", "HOME", heroData)
              }
              className="gap-1.5"
            >
              <Save className="h-4 w-4" /> Save Hero Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Content Inputs */}
            <Card className="lg:col-span-7 space-y-4 p-6">
              <Input
                label="Eyebrow Badge Text"
                value={heroData.eyebrow}
                onChange={(e) => setHeroData({ ...heroData, eyebrow: e.target.value })}
              />

              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Main Headline (H1)
                </label>
                <input
                  type="text"
                  value={heroData.headline}
                  onChange={(e) => setHeroData({ ...heroData, headline: e.target.value })}
                  className="input font-serif font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Subheadline / Descriptive Paragraph
                </label>
                <textarea
                  rows={3}
                  value={heroData.subheadline}
                  onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                  className="input text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Primary Button Text"
                  value={heroData.primaryCtaText}
                  onChange={(e) =>
                    setHeroData({ ...heroData, primaryCtaText: e.target.value })
                  }
                />
                <Input
                  label="Secondary Button Text"
                  value={heroData.secondaryCtaText}
                  onChange={(e) =>
                    setHeroData({ ...heroData, secondaryCtaText: e.target.value })
                  }
                />
              </div>

              <div className="pt-2 border-t border-charcoal-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                  4 Trust Statistics
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {heroData.stats.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-charcoal-200 bg-ivory-50/50 space-y-1.5">
                      <Input
                        label={`Stat #${idx + 1} Big Value`}
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...heroData.stats];
                          updated[idx].value = e.target.value;
                          setHeroData({ ...heroData, stats: updated });
                        }}
                      />
                      <Input
                        label="Label"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...heroData.stats];
                          updated[idx].label = e.target.value;
                          setHeroData({ ...heroData, stats: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Right Media & Live Preview */}
            <Card className="lg:col-span-5 space-y-4 p-6 bg-ivory-50/50">
              <h4 className="font-bold text-xs uppercase tracking-wider text-green-950 flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-gold-600" />
                Hero Image &amp; Card Badges
              </h4>

              <Input
                label="Hero Image URL (Cloudinary / Unsplash)"
                value={heroData.heroImageUrl}
                onChange={(e) =>
                  setHeroData({ ...heroData, heroImageUrl: e.target.value })
                }
              />

              <Input
                label="Floating Quote Badge"
                value={heroData.quoteBadgeText}
                onChange={(e) =>
                  setHeroData({ ...heroData, quoteBadgeText: e.target.value })
                }
              />

              <Input
                label="Bottom Card Caption Title"
                value={heroData.captionTitle}
                onChange={(e) =>
                  setHeroData({ ...heroData, captionTitle: e.target.value })
                }
              />

              {/* Live Preview Box */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-charcoal-500 block mb-1.5">
                  Live Thumbnail Preview:
                </span>
                <div className="relative overflow-hidden rounded-2xl border border-charcoal-200 aspect-video bg-charcoal-100 group">
                  <img
                    src={heroData.heroImageUrl}
                    alt="Hero Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 rounded-lg bg-white/90 backdrop-blur-xs p-2 text-[10px] font-serif font-bold text-green-950 shadow-sm">
                    &ldquo;{heroData.quoteBadgeText}&rdquo;
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-lg bg-green-950/90 text-white p-2 text-[11px] font-medium truncate">
                    {heroData.captionTitle}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: LEARNING PATHS */}
      {activeTab === "programs" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Learning Paths &amp; Age Programs
              </h3>
              <p className="text-xs text-charcoal-500">
                Edit the 4 target demographic tracks shown on the homepage and programs section.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              isLoading={saving}
              onClick={() =>
                handleSaveSection(
                  "learning_paths",
                  "Learning Paths Section",
                  "PROGRAMS",
                  programsData
                )
              }
              className="gap-1.5"
            >
              <Save className="h-4 w-4" /> Save Programs Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programsData.paths.map((p, idx) => (
              <Card key={p.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
                  <span className="font-serif font-bold text-sm text-green-950">
                    Track #{idx + 1}: {p.title}
                  </span>
                  <Badge variant="gold">{p.tag}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Track Title"
                    value={p.title}
                    onChange={(e) => {
                      const updated = [...programsData.paths];
                      updated[idx].title = e.target.value;
                      setProgramsData({ ...programsData, paths: updated });
                    }}
                  />
                  <Input
                    label="Age / Grade Tag"
                    value={p.tag}
                    onChange={(e) => {
                      const updated = [...programsData.paths];
                      updated[idx].tag = e.target.value;
                      setProgramsData({ ...programsData, paths: updated });
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={p.description}
                    onChange={(e) => {
                      const updated = [...programsData.paths];
                      updated[idx].description = e.target.value;
                      setProgramsData({ ...programsData, paths: updated });
                    }}
                    className="input text-xs"
                  />
                </div>

                <Input
                  label="Card Image URL"
                  value={p.image}
                  onChange={(e) => {
                    const updated = [...programsData.paths];
                    updated[idx].image = e.target.value;
                    setProgramsData({ ...programsData, paths: updated });
                  }}
                />

                <Input
                  label="CTA Button Label"
                  value={p.cta}
                  onChange={(e) => {
                    const updated = [...programsData.paths];
                    updated[idx].cta = e.target.value;
                    setProgramsData({ ...programsData, paths: updated });
                  }}
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COURSES CATALOG */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Courses Curriculum &amp; Catalog
              </h3>
              <p className="text-xs text-charcoal-500">
                Add, edit, or delete public courses and subjects offered by Al-Qalam.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingCourse(null);
                setCourseForm({
                  name: "",
                  slug: "",
                  category: "Qur'an Studies",
                  ageGroup: "All Ages",
                  level: "Beginner to Intermediate",
                  duration: "4 Months",
                  description: "",
                  imageUrl:
                    "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
                });
                setIsCourseModalOpen(true);
              }}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" /> Add New Course
            </Button>
          </div>

          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level / Age</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-charcoal-500">
                      No courses found. Click &quot;Add New Course&quot; to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900 font-bold">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-green-950">{c.name}</p>
                            <p className="text-xs text-charcoal-500 font-mono">/{c.slug}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="gold">{c.category}</Badge>
                      </TableCell>

                      <TableCell>
                        <p className="text-xs text-charcoal-800">{c.level}</p>
                        <p className="text-[11px] text-charcoal-500">{c.ageGroup}</p>
                      </TableCell>

                      <TableCell>
                        <span className="text-xs font-medium text-charcoal-700">
                          {c.duration}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingCourse(c);
                              setCourseForm({
                                name: c.name,
                                slug: c.slug,
                                category: c.category,
                                ageGroup: c.ageGroup,
                                level: c.level,
                                duration: c.duration,
                                description: c.description,
                                imageUrl: c.imageUrl || "",
                              });
                              setIsCourseModalOpen(true);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCourse(c.id, c.name)}
                            className="text-danger hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* TAB 4: TEACHERS SHOWCASE */}
      {activeTab === "teachers" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Instructors Showcase on Website
              </h3>
              <p className="text-xs text-charcoal-500">
                Teachers currently listed on the platform. Manage credentials and specializations.
              </p>
            </div>
            <a href="/admin/teachers">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" /> Manage All Instructors
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachers.map((t) => (
              <Card key={t.id} className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gold-100 text-gold-900 font-bold flex items-center justify-center text-base shrink-0 overflow-hidden">
                    {t.profileImage ? (
                      <img
                        src={t.profileImage}
                        alt={t.firstName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      t.firstName[0]
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-green-950 text-sm">
                      Ustadh {t.firstName} {t.lastName}
                    </h4>
                    <p className="text-xs text-gold-600 font-medium">{t.specialization}</p>
                  </div>
                </div>

                <div className="text-xs text-charcoal-600 space-y-1 bg-ivory-50/70 p-3 rounded-xl">
                  <p><strong>Experience:</strong> {t.experienceYears} Years</p>
                  <p><strong>Qualification:</strong> {t.qualification || "Ijazah Holder"}</p>
                  <p><strong>Country:</strong> {t.country || "Global"}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TESTIMONIALS */}
      {activeTab === "testimonials" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Parent &amp; Student Testimonials
              </h3>
              <p className="text-xs text-charcoal-500">
                Manage reviews, student stories, and parent feedback displayed on the website.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingTestimonial(null);
                setTestimonialForm({
                  authorName: "",
                  roleOrLocation: "Parent, UAE",
                  quote: "",
                  avatarUrl:
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
                  rating: 5,
                  isPublished: true,
                });
                setIsTestimonialModalOpen(true);
              }}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <Card key={test.id} className="p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-green-950">
                      {test.authorName}
                    </span>
                    <Badge variant={test.isPublished ? "green" : "gray"}>
                      {test.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gold-600">{test.roleOrLocation}</p>
                  <p className="text-xs text-charcoal-700 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-charcoal-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingTestimonial(test);
                      setTestimonialForm({
                        authorName: test.authorName,
                        roleOrLocation: test.roleOrLocation || "",
                        quote: test.quote,
                        avatarUrl: test.avatarUrl || "",
                        rating: test.rating || 5,
                        isPublished: test.isPublished,
                      });
                      setIsTestimonialModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(test.id)}
                    className="text-danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CONTACT & ACADEMY INFO */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-green-950">
                Official Contact &amp; Academy Info
              </h3>
              <p className="text-xs text-charcoal-500">
                Update WhatsApp admission numbers, helpdesk email, office location, and operating hours.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              isLoading={saving}
              onClick={() =>
                handleSaveSection(
                  "site_contact",
                  "Official Contact Information",
                  "CONTACT",
                  contactData
                )
              }
              className="gap-1.5"
            >
              <Save className="h-4 w-4" /> Save Contact Details
            </Button>
          </div>

          <Card className="p-6 max-w-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="WhatsApp Number (Public Display)"
                value={contactData.whatsappNumber}
                onChange={(e) =>
                  setContactData({ ...contactData, whatsappNumber: e.target.value })
                }
              />
              <Input
                label="Direct WhatsApp Link (https://wa.me/...)"
                value={contactData.whatsappLink}
                onChange={(e) =>
                  setContactData({ ...contactData, whatsappLink: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Admissions Email"
                type="email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
              />
              <Input
                label="Support / Helpdesk Email"
                type="email"
                value={contactData.supportEmail}
                onChange={(e) =>
                  setContactData({ ...contactData, supportEmail: e.target.value })
                }
              />
            </div>

            <Input
              label="Academy Office Phone"
              value={contactData.phone}
              onChange={(e) =>
                setContactData({ ...contactData, phone: e.target.value })
              }
            />

            <Input
              label="Physical Campus / Headquarters Address"
              value={contactData.officeAddress}
              onChange={(e) =>
                setContactData({ ...contactData, officeAddress: e.target.value })
              }
            />

            <Input
              label="Student Support Operating Hours"
              value={contactData.operatingHours}
              onChange={(e) =>
                setContactData({ ...contactData, operatingHours: e.target.value })
              }
            />
          </Card>
        </div>
      )}

      {/* Course Create/Edit Modal */}
      <Modal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        title={editingCourse ? "Edit Course Details" : "Create New Course"}
        description="Public course information shown on website curriculum and enrollment page."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveCourse} className="space-y-4">
          <Input
            label="Course Name"
            value={courseForm.name}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              setCourseForm({ ...courseForm, name, slug: editingCourse ? courseForm.slug : slug });
            }}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="URL Slug"
              value={courseForm.slug}
              onChange={(e) =>
                setCourseForm({ ...courseForm, slug: e.target.value })
              }
              required
            />
            <Input
              label="Category"
              value={courseForm.category}
              onChange={(e) =>
                setCourseForm({ ...courseForm, category: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Level"
              value={courseForm.level}
              onChange={(e) =>
                setCourseForm({ ...courseForm, level: e.target.value })
              }
            />
            <Input
              label="Duration"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />
          </div>

          <Input
            label="Thumbnail Image URL"
            value={courseForm.imageUrl}
            onChange={(e) =>
              setCourseForm({ ...courseForm, imageUrl: e.target.value })
            }
          />

          <div>
            <label className="text-xs font-semibold text-charcoal-700 block mb-1">
              Course Description
            </label>
            <textarea
              rows={3}
              required
              value={courseForm.description}
              onChange={(e) =>
                setCourseForm({ ...courseForm, description: e.target.value })
              }
              className="input text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCourseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={saving}>
              {editingCourse ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Testimonial Create/Edit Modal */}
      <Modal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        title={editingTestimonial ? "Edit Testimonial" : "Add Student/Parent Review"}
        description="Public testimonial shown on landing page."
        maxWidth="md"
      >
        <form onSubmit={handleSaveTestimonial} className="space-y-4">
          <Input
            label="Author Name"
            value={testimonialForm.authorName}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, authorName: e.target.value })
            }
            required
          />

          <Input
            label="Role or Location (e.g. 'Parent, UAE' or 'Adult Learner, UK')"
            value={testimonialForm.roleOrLocation}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, roleOrLocation: e.target.value })
            }
          />

          <Input
            label="Avatar Image URL"
            value={testimonialForm.avatarUrl}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, avatarUrl: e.target.value })
            }
          />

          <div>
            <label className="text-xs font-semibold text-charcoal-700 block mb-1">
              Quote
            </label>
            <textarea
              rows={3}
              required
              value={testimonialForm.quote}
              onChange={(e) =>
                setTestimonialForm({ ...testimonialForm, quote: e.target.value })
              }
              className="input text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTestimonialModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
