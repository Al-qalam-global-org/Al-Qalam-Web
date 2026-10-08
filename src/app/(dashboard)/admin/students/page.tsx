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
  Search,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Key,
  Copy,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import { whatsappService } from "@/lib/whatsapp";
import { formatDate } from "@/lib/utils";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // Success Confirmation Modal State
  const [onboardedResult, setOnboardedResult] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    courseName?: string;
  } | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // New Student Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: "UAE",
    grade: "Grade 6",
    level: "Beginner",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    courseId: "",
    teacherId: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    const randomSuffix = Array.from({ length: 4 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    const generated = `Qalam@${randomSuffix}`;
    setFormData((prev) => ({ ...prev, password: generated }));
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data.students);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const [cRes, tRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/teachers"),
      ]);
      const [cData, tData] = await Promise.all([cRes.json(), tRes.json()]);
      if (cData.success) setCourses(cData.data.courses);
      if (tData.success) setTeachers(tData.data.teachers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchMeta();
  }, [search]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const chosenPassword = formData.password.trim() || `Qalam@${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password: chosenPassword,
          courseIds: formData.courseId ? [formData.courseId] : [],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to create student");
      }

      const assignedCourse = courses.find((c) => c.id === formData.courseId)?.name;

      // Set Onboarded modal details for WhatsApp / Admin share
      setOnboardedResult({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: chosenPassword,
        phone: formData.phone,
        courseName: assignedCourse,
      });

      setIsCreateOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        country: "UAE",
        grade: "Grade 6",
        level: "Beginner",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        courseId: "",
        teacherId: "",
      });
      fetchStudents();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const getWhatsAppInvitationText = () => {
    if (!onboardedResult) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "https://al-qalam-global.com";
    return `Assalamu Alaikum *${onboardedResult.firstName}*,

Welcome to *Al-Qalam Global Academy*! 🎓
Your student portal account has been successfully created.

${onboardedResult.courseName ? `📚 *Course:* ${onboardedResult.courseName}\n` : ""}🔗 *Portal Login:* ${origin}/login
📧 *Email:* ${onboardedResult.email}
🔑 *Temporary Password:* ${onboardedResult.password}

_Please log in and update your password under your Profile Settings._

May Allah bless your learning journey!
*Al-Qalam Global Academy*`;
  };

  const handleCopyInvitation = async () => {
    const text = getWhatsAppInvitationText();
    await navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Student Management"
        subtitle="Manage student profiles, enrollments, and teacher assignments"
        role="ADMIN"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              generateRandomPassword();
              setIsCreateOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add New Student
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by student name, email, parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Students Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Contact &amp; Location</TableHead>
              <TableHead>Enrolled Course</TableHead>
              <TableHead>Parent Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  Loading students data...
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  No students found. Click &quot;Add New Student&quot; to enroll.
                </TableCell>
              </TableRow>
            ) : (
              students.map((st) => {
                const waLink = st.phone
                  ? whatsappService.generateStudentContactLink(
                      st.phone,
                      st.firstName,
                      st.courses[0]?.course?.name
                    )
                  : null;

                const parentWaLink = st.parentPhone
                  ? whatsappService.generateParentContactLink(
                      st.parentPhone,
                      st.parentName || "Parent",
                      st.firstName
                    )
                  : null;

                return (
                  <TableRow key={st.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-950 font-bold text-sm">
                          {st.firstName[0]}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-green-950">
                            {st.firstName} {st.lastName}
                          </p>
                          <p className="text-xs text-charcoal-500">{st.user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs text-charcoal-800">{st.phone || "—"}</p>
                      <p className="text-[11px] text-charcoal-500">{st.country || "Global"}</p>
                    </TableCell>

                    <TableCell>
                      {st.courses?.length > 0 ? (
                        <div className="space-y-1">
                          {st.courses.map((sc: any) => (
                            <Badge key={sc.id} variant="green" className="text-[11px]">
                              {sc.course.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-charcoal-400">Not enrolled</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <p className="text-xs font-medium text-charcoal-800">
                        {st.parentName || "—"}
                      </p>
                      <p className="text-[11px] text-charcoal-500">{st.parentPhone || "—"}</p>
                    </TableCell>

                    <TableCell>
                      <Badge variant={st.status === "ACTIVE" ? "green" : "gray"}>
                        {st.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Chat with Student"
                            className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg transition"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        )}
                        {parentWaLink && (
                          <a
                            href={parentWaLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Chat with Parent"
                            className="p-1.5 text-gold-600 hover:bg-gold-50 rounded-lg transition"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(st)}
                        >
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Create Student Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Enroll New Student (WhatsApp / Manual)"
        description="Create student account, assign temporary credentials, and register for courses."
        maxWidth="xl"
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Student Email"
              type="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Student Phone (WhatsApp Number)"
              placeholder="+971501234567"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* Account Password Setup Box */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-emerald-700" />
                Temporary Account Password
              </label>
              <button
                type="button"
                onClick={generateRandomPassword}
                className="text-xs font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline transition"
              >
                <Sparkles className="h-3 w-3" /> Generate Random
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Set temporary password (min 8 chars)"
                className="input pr-10 text-xs font-mono"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-emerald-800">
              The student can use this password to log in and will be able to update it from their profile.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
            <Input
              label="Grade / Level"
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
            />
            <Select
              label="Proficiency"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
              ]}
            />
          </div>

          <div className="border-t border-charcoal-200 pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
              Parent Details (Optional)
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Parent Name"
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
              />
              <Input
                label="Parent Phone"
                value={formData.parentPhone}
                onChange={(e) =>
                  setFormData({ ...formData, parentPhone: e.target.value })
                }
              />
              <Input
                label="Parent Email"
                type="email"
                value={formData.parentEmail}
                onChange={(e) =>
                  setFormData({ ...formData, parentEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="border-t border-charcoal-200 pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
              Course &amp; Teacher Assignment
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Assign Course"
                value={formData.courseId}
                onChange={(e) =>
                  setFormData({ ...formData, courseId: e.target.value })
                }
                options={[
                  { value: "", label: "Select course..." },
                  ...courses.map((c) => ({ value: c.id, label: c.name })),
                ]}
              />

              <Select
                label="Assign Teacher"
                value={formData.teacherId}
                onChange={(e) =>
                  setFormData({ ...formData, teacherId: e.target.value })
                }
                options={[
                  { value: "", label: "Select teacher..." },
                  ...teachers.map((t) => ({
                    value: t.id,
                    label: `Ustadh ${t.firstName} ${t.lastName} (${t.specialization})`,
                  })),
                ]}
              />
            </div>
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
              Create &amp; Enroll Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Onboarded Success & WhatsApp Share Modal */}
      {onboardedResult && (
        <Modal
          isOpen={true}
          onClose={() => setOnboardedResult(null)}
          title="🎉 Student Onboarded Successfully!"
          description="The student account has been created. Share their login details directly via WhatsApp or copy the message."
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                Account Details for {onboardedResult.firstName} {onboardedResult.lastName}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-emerald-100">
                <div>
                  <span className="text-charcoal-400 block text-[11px]">Email / Login:</span>
                  <span className="font-semibold text-charcoal-900 break-all">
                    {onboardedResult.email}
                  </span>
                </div>
                <div>
                  <span className="text-charcoal-400 block text-[11px]">Temporary Password:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    {onboardedResult.password}
                  </span>
                </div>
                {onboardedResult.courseName && (
                  <div className="col-span-2 pt-1 border-t border-charcoal-100">
                    <span className="text-charcoal-400 block text-[11px]">Enrolled Course:</span>
                    <span className="font-medium text-emerald-900">
                      {onboardedResult.courseName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Preview text box */}
            <div>
              <label className="text-xs font-semibold text-charcoal-700 mb-1.5 block">
                Ready-to-send WhatsApp Invitation:
              </label>
              <div className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-200 font-sans text-xs text-charcoal-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {getWhatsAppInvitationText()}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-charcoal-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyInvitation}
                className="gap-1.5"
              >
                {copiedMessage ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Message
                  </>
                )}
              </Button>

              <div className="flex gap-2">
                {onboardedResult.phone && (
                  <a
                    href={`https://wa.me/${onboardedResult.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      getWhatsAppInvitationText()
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition"
                  >
                    <Send className="h-3.5 w-3.5" /> Send on WhatsApp
                  </a>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setOnboardedResult(null)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Student Detail Drawer Modal */}
      {selectedStudent && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStudent(null)}
          title={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
          description={`Student Profile & Academic Overview (${selectedStudent.user.email})`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-charcoal-700">
            <div className="grid grid-cols-2 gap-3 bg-ivory-50 p-4 rounded-xl">
              <div>
                <p className="font-semibold text-charcoal-900">Phone</p>
                <p>{selectedStudent.phone || "—"}</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal-900">Country / Timezone</p>
                <p>{selectedStudent.country || "—"} ({selectedStudent.timezone})</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal-900">Grade / Level</p>
                <p>{selectedStudent.grade || "—"} • {selectedStudent.level}</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal-900">Parent Info</p>
                <p>{selectedStudent.parentName || "—"} ({selectedStudent.parentPhone || "—"})</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-green-950 uppercase tracking-wider text-[11px] mb-2">
                Enrolled Courses
              </p>
              <div className="space-y-1.5">
                {selectedStudent.courses?.map((c: any) => (
                  <div key={c.id} className="p-2.5 rounded-lg border border-charcoal-200 bg-white flex justify-between items-center">
                    <span className="font-medium text-green-950">{c.course.name}</span>
                    <Badge variant="green">Active</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
