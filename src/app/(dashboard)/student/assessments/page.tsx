import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCurrentUser } from "@/lib/auth/permissions";
import { studentRepository } from "@/server/repositories/student.repository";
import { formatDate } from "@/lib/utils";
import { Award, BookCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentAssessmentsPage() {
  const user = await getCurrentUser();
  const student = user?.student
    ? await studentRepository.findById(user.student.id)
    : null;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Assessments &amp; Results"
        subtitle="Review evaluation marks, Tajweed exam outcomes, and examiner feedback"
        role="STUDENT"
      />

      <div className="space-y-4">
        {!student?.results || student.results.length === 0 ? (
          <Card className="text-center py-10 text-xs text-charcoal-500">
            No assessment results published yet.
          </Card>
        ) : (
          student.results.map((r: any) => (
            <Card key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-green-950 text-base">
                    {r.assessment.title}
                  </span>
                  <Badge variant="green">{r.assessment.course.name}</Badge>
                </div>
                <p className="text-xs text-charcoal-600 mt-1">
                  Examiner Remarks: &ldquo;{r.remarks || "Well done!"}&rdquo;
                </p>
                <p className="text-[11px] text-charcoal-400 mt-1">
                  Graded on {formatDate(r.gradedAt)} by {r.gradedBy}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-charcoal-500">Score</p>
                  <p className="font-serif text-2xl font-bold text-green-900">
                    {r.obtainedMarks} / {r.assessment.totalMarks}
                  </p>
                </div>
                <Badge variant={r.obtainedMarks >= 80 ? "gold" : "green"}>
                  {r.obtainedMarks >= 80 ? "Distinction" : "Passed"}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
