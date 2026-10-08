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
import { classRepository } from "@/server/repositories/class.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAttendancePage() {
  const classesData = await classRepository.findAll({ take: 20 });

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Attendance Logs"
        subtitle="Global class attendance logs, marked status, and lesson topics"
        role="ADMIN"
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class &amp; Date</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Student Attendee</TableHead>
              <TableHead>Attendance Status</TableHead>
              <TableHead>Topic Covered</TableHead>
              <TableHead>Teacher Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classesData.classes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-charcoal-500">
                  No attendance records logged yet.
                </TableCell>
              </TableRow>
            ) : (
              classesData.classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>
                    <p className="font-serif font-bold text-green-950">
                      {cls.course.name}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      {formatDate(cls.scheduledDate)} ({cls.startTime})
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-green-900 font-medium">
                      Ustadh {cls.teacher.firstName}
                    </p>
                  </TableCell>

                  <TableCell>
                    {cls.students?.map((s: any) => (
                      <p key={s.id} className="text-xs font-semibold text-charcoal-900">
                        {s.student.firstName} {s.student.lastName}
                      </p>
                    ))}
                  </TableCell>

                  <TableCell>
                    {cls.attendance?.length > 0 ? (
                      <Badge
                        variant={
                          cls.attendance[0].status === "PRESENT"
                            ? "green"
                            : "danger"
                        }
                      >
                        {cls.attendance[0].status}
                      </Badge>
                    ) : (
                      <Badge variant="gray">Scheduled</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-charcoal-700 max-w-xs truncate">
                      {cls.topics?.[0]?.title || "—"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs italic text-charcoal-500 max-w-xs truncate">
                      {cls.notes?.[0]?.note || "—"}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
