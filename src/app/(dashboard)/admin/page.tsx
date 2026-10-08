import React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Award,
  Video,
  ExternalLink,
  MessageCircle,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { studentRepository } from "@/server/repositories/student.repository";
import { teacherRepository } from "@/server/repositories/teacher.repository";
import { courseRepository } from "@/server/repositories/course.repository";
import { classRepository } from "@/server/repositories/class.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { formatDate, formatTime } from "@/lib/utils";
import { whatsappService } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    studentsData,
    teachersData,
    coursesData,
    classesData,
    recentAudits,
  ] = await Promise.all([
    studentRepository.findAll({ take: 5 }),
    teacherRepository.findAll({ take: 5 }),
    courseRepository.findAll({ take: 10 }),
    classRepository.findAll({ take: 5 }),
    auditRepository.getRecent(5),
  ]);

  const stats = [
    {
      label: "Total Students",
      value: studentsData.total,
      icon: Users,
      color: "bg-green-50 text-green-800",
      href: "/admin/students",
    },
    {
      label: "Total Teachers",
      value: teachersData.total,
      icon: UserCheck,
      color: "bg-gold-100 text-gold-600",
      href: "/admin/teachers",
    },
    {
      label: "Active Courses",
      value: coursesData.total,
      icon: BookOpen,
      color: "bg-green-50 text-green-800",
      href: "/admin/courses",
    },
    {
      label: "Scheduled Classes",
      value: classesData.total,
      icon: Calendar,
      color: "bg-gold-100 text-gold-600",
      href: "/admin/classes",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <Header
        title="Admin Control Center"
        subtitle="Al-Qalam Global Academy Central Operations"
        role="ADMIN"
        actions={
          <div className="flex gap-2.5">
            <Link href="/admin/students">
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5" /> New Student
              </Button>
            </Link>
            <Link href="/admin/classes">
              <Button variant="primary" size="sm">
                <Plus className="h-3.5 w-3.5" /> Schedule Class
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}>
              <Card className="hover:border-green-700/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-charcoal-500">
                      {item.label}
                    </p>
                    <p className="mt-1 font-serif text-3xl font-bold text-green-950">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Scheduled Classes + Recent Students */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Scheduled Classes */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Upcoming &amp; Today&apos;s Classes</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Live classes with Zoom &amp; Google Meet links
                </p>
              </div>
              <Link href="/admin/classes">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {classesData.classes.length === 0 ? (
                <p className="text-sm text-charcoal-500 py-4 text-center">
                  No upcoming classes scheduled.
                </p>
              ) : (
                classesData.classes.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-charcoal-200 bg-ivory-50/50 p-4 gap-3 hover:border-green-700/30 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-green-950 text-sm">
                          {c.course.name}
                        </span>
                        <Badge variant="green" className="text-[10px]">
                          {c.classType}
                        </Badge>
                      </div>
                      <p className="text-xs text-charcoal-600 mt-1">
                        Teacher: Ustadh {c.teacher.firstName} {c.teacher.lastName}
                      </p>
                      <p className="text-[11px] text-charcoal-500 flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {formatDate(c.scheduledDate)} • {c.startTime} - {c.endTime} ({c.timezone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={c.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-green-900 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-green-800 transition"
                      >
                        <Video className="h-3.5 w-3.5" /> Join {c.meetingPlatform}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Recent Students & WhatsApp Actions */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Recent Students</CardTitle>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Direct WhatsApp &amp; profile access
                </p>
              </div>
              <Link href="/admin/students">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {studentsData.students.map((st) => {
                const waLink = st.phone
                  ? whatsappService.generateStudentContactLink(
                      st.phone,
                      st.firstName,
                      st.courses[0]?.course.name
                    )
                  : null;

                return (
                  <div
                    key={st.id}
                    className="flex items-center justify-between rounded-xl border border-charcoal-200 bg-white p-3.5 hover:border-green-700/30 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-900 font-bold text-sm">
                        {st.firstName[0]}
                      </div>
                      <div>
                        <p className="font-serif text-sm font-bold text-green-950">
                          {st.firstName} {st.lastName}
                        </p>
                        <p className="text-[11px] text-charcoal-500">
                          {st.user.email} • {st.level}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          title="Message on WhatsApp"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700 hover:bg-green-700 hover:text-white transition"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Audit Log / Activity Trail */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent System Audit Log</CardTitle>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Automated audit trail of student registrations, class schedules, and updates
            </p>
          </div>
        </CardHeader>

        <div className="divide-y divide-charcoal-200">
          {recentAudits.map((a) => (
            <div key={a.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Badge variant="gray" className="font-mono text-[10px]">
                  {a.action}
                </Badge>
                <span className="font-medium text-charcoal-700">
                  {a.entity} {a.entityId ? `(#${a.entityId.substring(0, 8)})` : ""}
                </span>
                {a.user && (
                  <span className="text-charcoal-500">by {a.user.email}</span>
                )}
              </div>
              <span className="text-[11px] text-charcoal-500">
                {formatDate(a.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
