"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
  Award,
  BookOpen,
  Calendar,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { whatsappService } from "@/lib/whatsapp";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "UAE",
    qualification: "",
    experienceYears: 5,
    specialization: "Qur'an & Tajweed",
    bio: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/teachers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setTeachers(data.data.teachers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [search]);

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to create teacher");
      }

      setIsCreateOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "UAE",
        qualification: "",
        experienceYears: 5,
        specialization: "Qur'an & Tajweed",
        bio: "",
      });
      fetchTeachers();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Teacher &amp; Faculty Management"
        subtitle="Manage Islamic scholars, Ijazah holders, and teaching schedules"
        role="ADMIN"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4" /> Add New Teacher
          </Button>
        }
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search teachers by name, specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher / Scholar</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience &amp; Qualification</TableHead>
              <TableHead>Assigned Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  Loading teachers data...
                </TableCell>
              </TableRow>
            ) : teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  No teachers found. Click &quot;Add New Teacher&quot; to invite faculty.
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((t) => {
                const waLink = t.phone
                  ? whatsappService.generateTeacherContactLink(t.phone, t.firstName)
                  : null;

                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700 font-serif font-bold text-sm">
                          {t.firstName[0]}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-green-950">
                            Ustadh {t.firstName} {t.lastName}
                          </p>
                          <p className="text-xs text-charcoal-500">{t.user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="gold" className="text-[11px]">
                        {t.specialization || "Islamic Studies"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs text-charcoal-800">
                        {t.experienceYears} Years Experience
                      </p>
                      <p className="text-[11px] text-charcoal-500 truncate max-w-xs">
                        {t.qualification || "Certified Educator"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-semibold text-green-900">
                        {t.assignedStudents?.length || 0} Students
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge variant={t.status === "ACTIVE" ? "green" : "gray"}>
                        {t.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          title="Message on WhatsApp"
                          className="p-2 text-green-700 hover:bg-green-50 rounded-lg inline-flex items-center gap-1 text-xs font-medium"
                        >
                          <MessageCircle className="h-4 w-4" /> WhatsApp
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Create Teacher Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Faculty Teacher"
        description="Create teacher account with specialized Islamic credentials."
        maxWidth="lg"
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleCreateTeacher} className="space-y-4">
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
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Phone (WhatsApp)"
              placeholder="+971..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Specialization"
              placeholder="e.g. Qur'an &amp; Tajweed, Tafseer"
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
            />
            <Input
              label="Experience (Years)"
              type="number"
              value={formData.experienceYears}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experienceYears: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <Input
            label="Qualification / Ijazah"
            placeholder="e.g. Ijazah in Hafs, Al-Azhar / Madinah Graduate"
            value={formData.qualification}
            onChange={(e) =>
              setFormData({ ...formData, qualification: e.target.value })
            }
          />

          <div>
            <label className="label">Short Biography</label>
            <textarea
              rows={3}
              className="input"
              placeholder="Brief summary of teaching philosophy and background..."
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
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
              Create Teacher Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
