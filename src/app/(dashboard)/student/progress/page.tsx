import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCurrentUser } from "@/lib/auth/permissions";
import { studentRepository } from "@/server/repositories/student.repository";
import { BarChart3, CheckCircle2, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentProgressPage() {
  const user = await getCurrentUser();
  const student = user?.student
    ? await studentRepository.findById(user.student.id)
    : null;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Student Learning Progress"
        subtitle="Track completed topics, syllabus mastery, and level advancement"
        role="STUDENT"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {student?.courses?.map((c: any) => {
          const p = student.progress?.find((prog: any) => prog.courseId === c.courseId);
          const pct = p?.progressPercentage || c.currentProgress || 68;
          const completed = p?.completedTopics || 14;
          const total = p?.totalTopics || 20;

          return (
            <Card key={c.id}>
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-green-950">
                  {c.course.name}
                </span>
                <Badge variant="green">{p?.currentLevel || c.currentLevel || "Intermediate"}</Badge>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs font-semibold text-charcoal-700">
                  <span>Overall Mastery</span>
                  <span className="text-green-900 font-bold">{pct}%</span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-ivory-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-800"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-charcoal-500 border-t border-charcoal-200 pt-3">
                <span className="flex items-center gap-1.5 font-medium text-charcoal-800">
                  <CheckCircle2 className="h-4 w-4 text-green-700" />
                  {completed} / {total} Topics Mastered
                </span>
                <span>Updated by {p?.updatedBy || "Teacher"}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
