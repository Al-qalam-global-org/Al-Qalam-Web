"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import {
  Video,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  MessageSquare,
  BarChart3,
  Calendar,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function TeacherAttendanceWorkflowPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Workflow Form States
  const [attendanceStatus, setAttendanceStatus] = useState<"PRESENT" | "ABSENT" | "LATE">("PRESENT");
  const [attendanceNote, setAttendanceNote] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [teacherNote, setTeacherNote] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(70);
  const [completedTopics, setCompletedTopics] = useState(14);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/classes");
      const data = await res.json();
      if (data.success) {
        setClasses(data.data.classes);
        if (data.data.classes.length > 0) {
          setSelectedClass(data.data.classes[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCompleteClassWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !selectedClass.students?.[0]) return;

    setSaving(true);
    setSuccessMessage(null);
    setError(null);

    const studentId = selectedClass.students[0].studentId;
    const courseId = selectedClass.courseId;

    try {
      // 1. Mark Attendance
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClass.id,
          studentId,
          status: attendanceStatus,
          note: attendanceNote,
        }),
      });

      // 2. Add Topic Covered if title present
      if (topicTitle) {
        await fetch("/api/attendance/topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            classId: selectedClass.id,
            studentId,
            title: topicTitle,
            description: topicDesc,
          }),
        });
      }

      // 3. Add Teacher Feedback Note if present
      if (teacherNote) {
        await fetch("/api/attendance/note", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            classId: selectedClass.id,
            note: teacherNote,
            visibility: "STUDENT_VISIBLE",
          }),
        });
      }

      // 4. Update Progress
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          courseId,
          progressPercentage: Number(progressPercentage),
          completedTopics: Number(completedTopics),
          totalTopics: 20,
        }),
      });

      setSuccessMessage(
        "MashaAllah! Class attendance, topic covered, feedback note, and progress metrics successfully updated."
      );
      setTopicTitle("");
      setTopicDesc("");
      setTeacherNote("");
      fetchClasses();
    } catch (err: any) {
      setError(err.message || "Failed to save feedback");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Class Session &amp; Feedback Workflow"
        subtitle="Follow the step-by-step post-class process: Attendance → Topic Covered → Notes → Progress"
        role="TEACHER"
      />

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-900 border border-green-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-danger border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Class Selection List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-serif text-lg font-bold text-green-950">
            Select Live Session
          </h3>

          {loading ? (
            <p className="text-xs text-charcoal-500 py-4">Loading sessions...</p>
          ) : classes.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-4">No classes found.</p>
          ) : (
            classes.map((c) => {
              const isSelected = selectedClass?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedClass(c)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    isSelected
                      ? "border-green-800 bg-white shadow-lift ring-2 ring-green-800/10"
                      : "border-charcoal-200 bg-ivory-50/60 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-green-950">
                      {c.course.name}
                    </span>
                    <Badge variant={isSelected ? "green" : "gray"}>
                      {c.classType}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Student:{" "}
                    {c.students
                      ?.map((s: any) => `${s.student.firstName} ${s.student.lastName}`)
                      .join(", ")}
                  </p>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">
                    {formatDate(c.scheduledDate)} • {c.startTime}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* 4-Step Interactive Form */}
        <div className="lg:col-span-8">
          {selectedClass ? (
            <Card>
              {/* Meeting Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-green-950 p-4 text-ivory-50 mb-6 gap-3">
                <div>
                  <p className="font-serif font-bold text-base text-white">
                    {selectedClass.course.name}
                  </p>
                  <p className="text-xs text-charcoal-300">
                    Student:{" "}
                    {selectedClass.students
                      ?.map((s: any) => `${s.student.firstName} ${s.student.lastName}`)
                      .join(", ")}
                  </p>
                </div>
                <a
                  href={selectedClass.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-green-950 hover:bg-gold-400 transition"
                >
                  <Video className="h-4 w-4" /> Open {selectedClass.meetingPlatform}
                </a>
              </div>

              <form onSubmit={handleCompleteClassWorkflow} className="space-y-6">
                {/* Step 1: Attendance */}
                <div className="border-b border-charcoal-200 pb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-900 text-xs font-bold">
                      1
                    </span>
                    <h4 className="font-serif font-bold text-sm text-green-950">
                      Mark Student Attendance
                    </h4>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["PRESENT", "LATE", "ABSENT"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAttendanceStatus(st as any)}
                        className={`rounded-xl border p-2.5 text-xs font-bold transition ${
                          attendanceStatus === st
                            ? "border-green-800 bg-green-50 text-green-950"
                            : "border-charcoal-200 bg-white text-charcoal-700 hover:bg-ivory-100"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Topic Covered */}
                <div className="border-b border-charcoal-200 pb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-900 text-xs font-bold">
                      2
                    </span>
                    <h4 className="font-serif font-bold text-sm text-green-950">
                      Topic &amp; Surah Covered
                    </h4>
                  </div>

                  <Input
                    label="Topic Title"
                    placeholder="e.g. Surah Al-Baqarah — Ayah 1–10"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                  />
                  <div className="mt-2">
                    <Input
                      label="Key Focus / Rules"
                      placeholder="e.g. Practiced rules of Noon Sakinah and clear pronunciation."
                      value={topicDesc}
                      onChange={(e) => setTopicDesc(e.target.value)}
                    />
                  </div>
                </div>

                {/* Step 3: Teacher Feedback Note */}
                <div className="border-b border-charcoal-200 pb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-900 text-xs font-bold">
                      3
                    </span>
                    <h4 className="font-serif font-bold text-sm text-green-950">
                      Teacher Note &amp; Feedback (Visible to Student &amp; Parent)
                    </h4>
                  </div>

                  <textarea
                    rows={3}
                    className="input"
                    placeholder="e.g. Ahmed is improving his recitation fluency and demonstrated great effort with Tajweed."
                    value={teacherNote}
                    onChange={(e) => setTeacherNote(e.target.value)}
                  />
                </div>

                {/* Step 4: Progress Tracker */}
                <div className="pb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-900 text-xs font-bold">
                      4
                    </span>
                    <h4 className="font-serif font-bold text-sm text-green-950">
                      Update Course Progress
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Progress Percentage (%)"
                      type="number"
                      min={0}
                      max={100}
                      value={progressPercentage}
                      onChange={(e) =>
                        setProgressPercentage(parseInt(e.target.value) || 0)
                      }
                    />
                    <Input
                      label="Topics Completed (out of 20)"
                      type="number"
                      min={0}
                      max={20}
                      value={completedTopics}
                      onChange={(e) =>
                        setCompletedTopics(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-charcoal-200">
                  <Button type="submit" variant="primary" isLoading={saving} size="lg">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Save &amp; Complete Session
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="text-center py-12 text-charcoal-500">
              Please select a class session to begin feedback workflow.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
