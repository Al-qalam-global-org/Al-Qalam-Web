import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCurrentUser } from "@/lib/auth/permissions";
import { classRepository } from "@/server/repositories/class.repository";
import { formatDate } from "@/lib/utils";
import { Video, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentClassesPage() {
  const user = await getCurrentUser();
  const classesData = user?.student
    ? await classRepository.findAll({ studentId: user.student.id })
    : { total: 0, classes: [] };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="My Live Classes"
        subtitle="Your scheduled Islamic learning classes and direct meeting access links"
        role="STUDENT"
      />

      <div className="space-y-4">
        {classesData.classes.length === 0 ? (
          <Card className="text-center py-10 text-xs text-charcoal-500">
            No live classes scheduled on your timetable yet.
          </Card>
        ) : (
          classesData.classes.map((c) => (
            <Card key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-green-950 text-base">
                    {c.course.name}
                  </span>
                  <Badge variant="green">{c.classType}</Badge>
                </div>
                <p className="text-xs text-charcoal-600 mt-1">
                  Teacher: Ustadh {c.teacher.firstName} {c.teacher.lastName}
                </p>
                <p className="text-xs text-charcoal-500 flex items-center gap-1.5 mt-1 font-medium">
                  <Clock className="h-3.5 w-3.5 text-gold-600" />
                  {formatDate(c.scheduledDate)} • {c.startTime} - {c.endTime} ({c.timezone})
                </p>
              </div>

              <div>
                <a
                  href={c.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-800 transition"
                >
                  <Video className="h-4 w-4" /> Join {c.meetingPlatform} Class
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
