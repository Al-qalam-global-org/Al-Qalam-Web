import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { getCurrentUser } from "@/lib/auth/permissions";
import { attendanceRepository } from "@/server/repositories/attendance.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StudentAttendancePage() {
  const user = await getCurrentUser();
  const records = user?.student
    ? await attendanceRepository.findByStudentId(user.student.id)
    : [];

  const teacherNotes = user?.student
    ? await attendanceRepository.getTeacherNotesForStudent(user.student.id, true)
    : [];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <Header
        title="Attendance &amp; Lesson Notes"
        subtitle="Your class attendance history, covered topics, and teacher feedback"
        role="STUDENT"
      />

      {/* Attendance Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Class Date</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-charcoal-500">
                  No attendance records logged yet.
                </TableCell>
              </TableRow>
            ) : (
              records.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <p className="font-serif font-bold text-green-950">
                      {r.class.course.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-charcoal-700">
                      {formatDate(r.class.scheduledDate)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-green-900 font-medium">
                      Ustadh {r.class.teacher.firstName}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={r.status === "PRESENT" ? "green" : "danger"}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-charcoal-600">{r.note || "—"}</p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Teacher Feedback Notes */}
      <Card>
        <h3 className="font-serif text-lg font-bold text-green-950 mb-4">
          Teacher Feedback Notes
        </h3>
        <div className="space-y-3">
          {teacherNotes.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-4 text-center">
              No feedback notes received yet.
            </p>
          ) : (
            teacherNotes.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-charcoal-200 bg-ivory-50/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-serif font-bold text-sm text-green-950">
                    Ustadh {n.teacher.firstName} {n.teacher.lastName}
                  </p>
                  <span className="text-[11px] text-charcoal-500">
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
  );
}
