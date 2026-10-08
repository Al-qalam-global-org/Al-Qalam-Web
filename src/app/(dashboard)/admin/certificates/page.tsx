"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { CertificateView } from "@/components/shared/CertificateView";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Award, Plus, Printer, CheckCircle2, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    issuedBy: "Al-Qalam Global Academy",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.success) setCertificates(data.data.certificates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/courses"),
      ]);
      const [sData, cData] = await Promise.all([sRes.json(), cRes.json()]);
      if (sData.success) setStudents(sData.data.students);
      if (cData.success) setCourses(cData.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchMeta();
  }, []);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to issue certificate");
      }

      setIsIssueOpen(false);
      fetchCertificates();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Certificates of Completion"
        subtitle="Issue, verify, and print official graduation certificates"
        role="ADMIN"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsIssueOpen(true)}
          >
            <Plus className="h-4 w-4" /> Issue Certificate
          </Button>
        }
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate No.</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Completed Course</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  Loading certificates...
                </TableCell>
              </TableRow>
            ) : certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  No certificates issued yet. Click &quot;Issue Certificate&quot; to award a student.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-green-950">
                      {cert.certificateNumber}
                    </span>
                  </TableCell>

                  <TableCell>
                    <p className="font-serif font-bold text-green-950">
                      {cert.student.firstName} {cert.student.lastName}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge variant="green">{cert.course.name}</Badge>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-charcoal-600">
                      {formatDate(cert.completionDate)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-charcoal-500">{cert.issuedBy}</p>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewCert(cert)}
                    >
                      <Award className="h-3.5 w-3.5" /> View &amp; Print
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Issue Certificate Modal */}
      <Modal
        isOpen={isIssueOpen}
        onClose={() => setIsIssueOpen(false)}
        title="Issue Course Certificate"
        description="Generate a unique certified completion credential for a student."
        maxWidth="md"
      >
        {formError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleIssueCertificate} className="space-y-4">
          <Select
            label="Student"
            value={formData.studentId}
            onChange={(e) =>
              setFormData({ ...formData, studentId: e.target.value })
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

          <Select
            label="Course"
            value={formData.courseId}
            onChange={(e) =>
              setFormData({ ...formData, courseId: e.target.value })
            }
            required
            options={[
              { value: "", label: "Select completed course..." },
              ...courses.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />

          <Input
            label="Issuing Authority"
            value={formData.issuedBy}
            onChange={(e) =>
              setFormData({ ...formData, issuedBy: e.target.value })
            }
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsIssueOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={formLoading}>
              Generate &amp; Issue
            </Button>
          </div>
        </form>
      </Modal>

      {/* Certificate Viewer Modal */}
      {previewCert && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewCert(null)}
          title="Certificate Preview &amp; Print"
          maxWidth="2xl"
        >
          <CertificateView certificate={previewCert} />
        </Modal>
      )}
    </div>
  );
}
