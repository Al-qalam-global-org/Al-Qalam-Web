import React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Calendar,
  Video,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth/permissions";
import { studentRepository } from "@/server/repositories/student.repository";
import { classRepository } from "@/server/repositories/class.repository";
import { attendanceRepository } from "@/server/repositories/attendance.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  const student = user?.student
    ? await studentRepository.findById(user.student.id)
    : null;

  const classesData = user?.student
    ? await classRepository.findAll({ studentId: user.student.id, take: 3 })
    : { total: 0, classes: [] };

  const nextClass = classesData.classes[0] || null;

  const teacherNotes = user?.student
    ? await attendanceRepository.getTeacherNotesForStudent(user.student.id, true)
    : [];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <Header
        title={`Assalamu Alaikum, ${student?.firstName || "Student"}!`}
        subtitle="Welcome to your Islamic learning portal. Continue your journey with purpose."
        role="STUDENT"
      />

      {/* Security notice / Quick settings reminder */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-emerald-700 shrink-0" />
          <span>
            First time logging in with a temporary password? You can customize your password anytime.
          </span>
        </div>
        <Link
          href="/student/settings"
          className="font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 flex items-center gap-1 shrink-0"
        >
          Update Password &rarr;
        </Link>
      </div>

      {/* Hero: Next Class Highlight Card */}
      {nextClass ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-950 via-green-900 to-green-950 p-6 sm:p-8 text-ivory-50 shadow-xl border border-green-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="text-xs uppercase tracking-wider font-bold">
                  Next Scheduled Class
                </Badge>
                <span className="text-xs text-charcoal-300">
                  {nextClass.classType} Session
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white">
                {nextClass.course.name}
              </h2>

              <p className="mt-1 text-sm text-charcoal-200">
                Teacher: Ustadh {nextClass.teacher.firstName} {nextClass.teacher.lastName}
              </p>

              <p className="mt-2 text-xs text-gold-400 font-medium flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatDate(nextClass.scheduledDate)} • {nextClass.startTime} - {nextClass.endTime} ({nextClass.timezone})
              </p>
            </div>

            <div>
              <a
                href={nextClass.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-6 py-3.5 font-serif font-bold text-green-950 shadow-lg hover:bg-gold-400 transition"
              >
                <Video className="h-5 w-5 fill-current" /> Join {nextClass.meetingPlatform} Class
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* Grid: Course Progress + Teacher Feedback */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Course Progress */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>My Enrolled Courses &amp; Progress</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Track completed lessons, Tajweed rules, and topics
                </p>
              </div>
            </CardHeader>

            <div className="space-y-4">
              {!student?.courses || student.courses.length === 0 ? (
                <p className="text-sm text-charcoal-500 py-4 text-center">
                  No courses enrolled yet.
                </p>
              ) : (
                student.courses.map((sc: any) => {
                  const progressObj = student.progress?.find(
                    (p: any) => p.courseId === sc.courseId
                  );
                  const pct = progressObj?.progressPercentage || sc.currentProgress || 65;
                  const completed = progressObj?.completedTopics || 13;
                  const total = progressObj?.totalTopics || 20;

                  return (
                    <div
                      key={sc.id}
                      className="rounded-2xl border border-charcoal-200 bg-ivory-50/50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-green-950">
                            {sc.course.name}
                          </h4>
                          <p className="text-xs text-charcoal-500 mt-0.5">
                            {sc.course.category} • Level: {sc.currentLevel || "Intermediate"}
                          </p>
                        </div>
                        <span className="font-serif text-lg font-bold text-green-950">
                          {pct}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 h-2.5 w-full rounded-full bg-ivory-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-800 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-xs text-charcoal-600">
                        <span>{completed} of {total} topics completed</span>
                        <Badge variant="green" className="text-[10px]">
                          {sc.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Teacher Feedback & Notes */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Teacher Feedback &amp; Notes</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Guidance and remarks from your Ustadh
                </p>
              </div>
            </CardHeader>

            <div className="space-y-3">
              {teacherNotes.length === 0 ? (
                <p className="text-xs text-charcoal-500 py-6 text-center">
                  No feedback notes posted yet.
                </p>
              ) : (
                teacherNotes.map((n: any) => (
                  <div
                    key={n.id}
                    className="rounded-xl border border-charcoal-200 bg-white p-3.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-green-950">
                        Ustadh {n.teacher.firstName} {n.teacher.lastName}
                      </p>
                      <span className="text-[10px] text-charcoal-400">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs italic text-charcoal-700 leading-relaxed">
                      &ldquo;{n.note}&rdquo;
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
