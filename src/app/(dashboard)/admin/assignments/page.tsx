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
import { assignmentRepository } from "@/server/repositories/assignment.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAssignmentsPage() {
  const data = await assignmentRepository.findAll();

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Course Homework &amp; Assignments"
        subtitle="Manage student homework tasks and teacher evaluations"
        role="ADMIN"
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.assignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-charcoal-500">
                  No assignments created yet.
                </TableCell>
              </TableRow>
            ) : (
              data.assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <p className="font-serif font-bold text-green-950">{a.title}</p>
                    <p className="text-xs text-charcoal-500 line-clamp-1">{a.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="green">{a.course.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-charcoal-700">
                      Ustadh {a.teacher.firstName} {a.teacher.lastName}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-charcoal-700">{formatDate(a.dueDate)}</p>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-xs text-green-950">
                      {a._count.submissions} submitted
                    </span>
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
