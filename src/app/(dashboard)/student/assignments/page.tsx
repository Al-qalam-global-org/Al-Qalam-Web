"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubmit, setActiveSubmit] = useState<any | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/assignments");
      const data = await res.json();
      if (data.success) setAssignments(data.data.assignments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmit) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId: activeSubmit.id,
          submissionText,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to submit");

      setSuccess("Your assignment homework has been submitted to your teacher!");
      setActiveSubmit(null);
      setSubmissionText("");
      fetchAssignments();
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Course Homework &amp; Assignments"
        subtitle="Complete recitation tasks, homework questions, and review teacher feedback"
        role="STUDENT"
      />

      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-900 border border-green-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10 text-xs text-charcoal-500">
            Loading assignments...
          </p>
        ) : assignments.length === 0 ? (
          <Card className="text-center py-12 text-charcoal-500 text-xs">
            No active assignments at this time.
          </Card>
        ) : (
          assignments.map((a) => (
            <Card key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-green-950 text-base">
                    {a.title}
                  </span>
                  <Badge variant="green">{a.course.name}</Badge>
                </div>
                <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed max-w-xl">
                  {a.description}
                </p>
                <p className="text-xs text-charcoal-500 flex items-center gap-1.5 mt-2 font-medium">
                  <Clock className="h-3.5 w-3.5 text-gold-600" />
                  Due Date: {formatDate(a.dueDate)}
                </p>
              </div>

              <div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveSubmit(a)}
                >
                  <Upload className="h-3.5 w-3.5 mr-1" /> Submit Work
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Submission Modal */}
      {activeSubmit && (
        <Modal
          isOpen={true}
          onClose={() => setActiveSubmit(null)}
          title={`Submit Assignment: ${activeSubmit.title}`}
          description={`Course: ${activeSubmit.course.name}`}
          maxWidth="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Submission Text / Recitation Notes</label>
              <textarea
                rows={4}
                className="input"
                placeholder="Write your homework answers or provide recitation practice notes..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveSubmit(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={submitting}>
                Submit Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
