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
  Plus,
  Calendar,
  Video,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    courseId: "",
    teacherId: "",
    scheduledDate: new Date().toISOString().split("T")[0],
    startTime: "17:00",
    endTime: "18:00",
    timezone: "Asia/Dubai",
    classType: "ONE_TO_ONE",
    meetingPlatform: "ZOOM",
    meetingUrl: "https://zoom.us/j/1234567890",
    selectedStudentId: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/classes");
      const data = await res.json();
      if (data.success) setClasses(data.data.classes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const [cRes, tRes, sRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/teachers"),
        fetch("/api/students"),
      ]);
      const [cData, tData, sData] = await Promise.all([
        cRes.json(),
        tRes.json(),
        sRes.json(),
      ]);
      if (cData.success) setCourses(cData.data.courses);
      if (tData.success) setTeachers(tData.data.teachers);
      if (sData.success) setStudents(sData.data.students);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchMeta();
  }, []);

  const handleScheduleClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      if (!formData.selectedStudentId) {
        throw new Error("Please select at least one student for the class");
      }

      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          studentIds: [formData.selectedStudentId],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to schedule class");
      }

      setIsCreateOpen(false);
      fetchClasses();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Class Scheduling &amp; Live Sessions"
        subtitle="Manage scheduled live classes, Zoom / Google Meet links, and attendee rosters"
        role="ADMIN"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4" /> Schedule Live Class
          </Button>
        }
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course &amp; Type</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Enrolled Students</TableHead>
              <TableHead>Meeting Link</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  Loading scheduled classes...
                </TableCell>
              </TableRow>
            ) : classes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  No classes scheduled. Click &quot;Schedule Live Class&quot; to begin.
                </TableCell>
              </TableRow>
            ) : (
              classes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-green-950">
                        {c.course.name}
                      </span>
                      <Badge variant="green" className="text-[10px]">
                        {c.classType}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs font-semibold text-charcoal-900">
                      {formatDate(c.scheduledDate)}
                    </p>
                    <p className="text-[11px] text-charcoal-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {c.startTime} - {c.endTime} ({c.timezone})
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs font-medium text-green-900">
                      Ustadh {c.teacher.firstName} {c.teacher.lastName}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {c.students?.map((s: any) => (
                        <span
                          key={s.id}
                          className="rounded-md bg-ivory-200 px-2 py-0.5 text-[11px] font-medium text-charcoal-800"
                        >
                          {s.student.firstName} {s.student.lastName}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <a
                      href={c.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-green-800 transition"
                    >
                      <Video className="h-3.5 w-3.5" /> Join {c.meetingPlatform}
                    </a>
                  </TableCell>

                  <TableCell>
                    <Badge variant={c.status === "SCHEDULED" ? "gold" : "green"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Schedule Class Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Schedule Live Class Session"
        description="Connect teacher and students with external Zoom or Google Meet link."
        maxWidth="lg"
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleScheduleClass} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: e.target.value })
              }
              required
              options={[
                { value: "", label: "Select course..." },
                ...courses.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />

            <Select
              label="Teacher"
              value={formData.teacherId}
              onChange={(e) =>
                setFormData({ ...formData, teacherId: e.target.value })
              }
              required
              options={[
                { value: "", label: "Select teacher..." },
                ...teachers.map((t) => ({
                  value: t.id,
                  label: `Ustadh ${t.firstName} ${t.lastName}`,
                })),
              ]}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Date"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) =>
                setFormData({ ...formData, scheduledDate: e.target.value })
              }
              required
            />
            <Input
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              required
            />
            <Input
              label="End Time"
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Class Format"
              value={formData.classType}
              onChange={(e) =>
                setFormData({ ...formData, classType: e.target.value })
              }
              options={[
                { value: "ONE_TO_ONE", label: "One-to-One" },
                { value: "GROUP", label: "Group Class" },
              ]}
            />

            <Select
              label="Meeting Platform"
              value={formData.meetingPlatform}
              onChange={(e) =>
                setFormData({ ...formData, meetingPlatform: e.target.value })
              }
              options={[
                { value: "ZOOM", label: "Zoom" },
                { value: "GOOGLE_MEET", label: "Google Meet" },
              ]}
            />
          </div>

          <Input
            label="Live Meeting URL"
            placeholder="https://zoom.us/j/... or https://meet.google.com/..."
            value={formData.meetingUrl}
            onChange={(e) =>
              setFormData({ ...formData, meetingUrl: e.target.value })
            }
            required
          />

          <Select
            label="Assign Student"
            value={formData.selectedStudentId}
            onChange={(e) =>
              setFormData({ ...formData, selectedStudentId: e.target.value })
            }
            required
            options={[
              { value: "", label: "Select student..." },
              ...students.map((s) => ({
                value: s.id,
                label: `${s.firstName} ${s.lastName} (${s.user.email})`,
              })),
            ]}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={formLoading}>
              Confirm &amp; Notify Attendees
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
