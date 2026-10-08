import React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Users,
  Video,
  FileText,
  ClipboardCheck,
  ArrowRight,
  Clock,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth/permissions";
import { classRepository } from "@/server/repositories/class.repository";
import { teacherRepository } from "@/server/repositories/teacher.repository";
import { formatDate } from "@/lib/utils";
import { whatsappService } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  const teacher = user?.teacher
    ? await teacherRepository.findById(user.teacher.id)
    : null;

  const classesData = user?.teacher
    ? await classRepository.findAll({ teacherId: user.teacher.id, take: 5 })
    : { total: 0, classes: [] };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <Header
        title={`Assalamu Alaikum, Ustadh ${teacher?.firstName || ""}`}
        subtitle="Manage your daily live classes, student attendance, and feedback notes"
        role="TEACHER"
        actions={
          <Link href="/teacher/attendance">
            <Button variant="primary" size="sm">
              <ClipboardCheck className="h-4 w-4" /> Conduct Class &amp; Feedback
            </Button>
          </Link>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-500">
                Assigned Students
              </p>
              <p className="mt-1 font-serif text-3xl font-bold text-green-950">
                {teacher?.assignedStudents?.length || 0}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-800">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-500">
                Scheduled Classes
              </p>
              <p className="mt-1 font-serif text-3xl font-bold text-green-950">
                {classesData.total}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-charcoal-500">
                Specialization
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-green-950">
                {teacher?.specialization || "Islamic Studies"}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-800">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Today's Classes + Assigned Students */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Classes List */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>My Upcoming Classes</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Launch external Zoom / Google Meet and conduct sessions
                </p>
              </div>
              <Link href="/teacher/schedule">
                <Button variant="ghost" size="sm">
                  View Full Schedule <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {classesData.classes.length === 0 ? (
                <p className="text-sm text-charcoal-500 py-6 text-center">
                  No classes scheduled for today.
                </p>
              ) : (
                classesData.classes.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-charcoal-200 bg-ivory-50/60 p-4 gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-green-950 text-sm">
                          {c.course.name}
                        </span>
                        <Badge variant="green">{c.classType}</Badge>
                      </div>
                      <p className="text-xs text-charcoal-600 mt-1">
                        Student(s):{" "}
                        {c.students
                          .map((s: any) => `${s.student.firstName} ${s.student.lastName}`)
                          .join(", ")}
                      </p>
                      <p className="text-[11px] text-charcoal-500 flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {formatDate(c.scheduledDate)} • {c.startTime} - {c.endTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={c.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-green-900 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-green-800 transition"
                      >
                        <Video className="h-3.5 w-3.5" /> Start {c.meetingPlatform}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Assigned Students */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>My Assigned Students</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Direct WhatsApp parent &amp; student links
                </p>
              </div>
              <Link href="/teacher/students">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {teacher?.assignedStudents?.map((assignment: any) => {
                const st = assignment.student;
                const waLink = st.phone
                  ? whatsappService.generateStudentContactLink(
                      st.phone,
                      st.firstName,
                      assignment.course.name
                    )
                  : null;

                return (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between rounded-xl border border-charcoal-200 bg-white p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-900 font-bold text-xs">
                        {st.firstName[0]}
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-green-950">
                          {st.firstName} {st.lastName}
                        </p>
                        <p className="text-[11px] text-charcoal-500">
                          {assignment.course.name}
                        </p>
                      </div>
                    </div>

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
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
