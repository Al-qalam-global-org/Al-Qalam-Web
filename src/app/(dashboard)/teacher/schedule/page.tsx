import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/auth/permissions";
import { classRepository } from "@/server/repositories/class.repository";
import { formatDate } from "@/lib/utils";
import { Calendar, Video, Clock, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TeacherSchedulePage() {
  const user = await getCurrentUser();
  const classesData = user?.teacher
    ? await classRepository.findAll({ teacherId: user.teacher.id })
    : { total: 0, classes: [] };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Class Schedule"
        subtitle="Your scheduled teaching sessions with direct meeting launch links"
        role="TEACHER"
      />

      <div className="space-y-4">
        {classesData.classes.length === 0 ? (
          <Card className="text-center py-10 text-charcoal-500 text-sm">
            No live classes on your schedule yet.
          </Card>
        ) : (
          classesData.classes.map((c) => (
            <Card key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-bold text-green-950 text-lg">
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

                <p className="text-xs text-charcoal-500 flex items-center gap-1.5 mt-1 font-medium">
                  <Clock className="h-3.5 w-3.5 text-gold-600" />
                  {formatDate(c.scheduledDate)} • {c.startTime} - {c.endTime} ({c.timezone})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={c.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-800 transition"
                >
                  <Video className="h-4 w-4" /> Start {c.meetingPlatform} Session
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
