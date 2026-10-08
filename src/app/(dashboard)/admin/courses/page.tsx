"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Plus, BookOpen, Users, Calendar, FileText, AlertCircle } from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Qur'an Studies",
    ageGroup: "All Ages",
    level: "Beginner to Intermediate",
    duration: "4 Months",
    description: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.success) setCourses(data.data.courses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, name, slug });
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to create course");
      }

      setIsCreateOpen(false);
      setFormData({
        name: "",
        slug: "",
        category: "Qur'an Studies",
        ageGroup: "All Ages",
        level: "Beginner to Intermediate",
        duration: "4 Months",
        description: "",
      });
      fetchCourses();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Course Curriculum &amp; Programs"
        subtitle="Manage Islamic educational subjects, levels, and age-appropriate tracks"
        role="ADMIN"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4" /> Create New Course
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-charcoal-500 py-8 col-span-3 text-center">
            Loading courses...
          </p>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-900 border border-green-200">
                    {course.category}
                  </span>
                  <Badge variant={course.status === "ACTIVE" ? "green" : "gray"}>
                    {course.status}
                  </Badge>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold text-green-950">
                  {course.name}
                </h3>
                <p className="text-xs text-gold-600 font-semibold mt-1">
                  {course.ageGroup} • {course.level}
                </p>
                <p className="mt-2 text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 border-t border-charcoal-200 pt-4 flex items-center justify-between text-xs text-charcoal-500">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {course._count?.students || 0} Students
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {course._count?.classes || 0} Classes
                </span>
                <span className="font-semibold text-green-950">
                  {course.duration}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Create Course Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Course"
        description="Add a new structured Islamic study program to the academy."
        maxWidth="lg"
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleCreateCourse} className="space-y-4">
          <Input
            label="Course Name"
            placeholder="e.g. Tafseer of Surah Al-Kahf"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />

          <Input
            label="URL Slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              options={[
                { value: "Qur'an Studies", label: "Qur'an Studies" },
                { value: "Prophetic Traditions", label: "Prophetic Traditions" },
                { value: "Jurisprudence", label: "Jurisprudence" },
                { value: "Character Building", label: "Character Building" },
                { value: "Islamic History", label: "Islamic History" },
                { value: "Foundation", label: "Foundation" },
              ]}
            />

            <Input
              label="Age Group"
              placeholder="e.g. Teens &amp; Adults"
              value={formData.ageGroup}
              onChange={(e) =>
                setFormData({ ...formData, ageGroup: e.target.value })
              }
            />

            <Input
              label="Duration"
              placeholder="e.g. 4 Months"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">Course Description</label>
            <textarea
              rows={3}
              className="input"
              placeholder="Detailed overview of syllabus and outcomes..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={formLoading}>
              Save Course
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
