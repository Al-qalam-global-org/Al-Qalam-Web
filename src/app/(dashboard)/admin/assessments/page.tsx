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
import { assessmentRepository } from "@/server/repositories/assessment.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAssessmentsPage() {
  const data = await assessmentRepository.findAll();

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="Evaluations &amp; Assessments"
        subtitle="Manage examinations, Tajweed oral evaluations, and grade records"
        role="ADMIN"
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Graded Results</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.assessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-charcoal-500">
                  No assessments announced yet.
                </TableCell>
              </TableRow>
            ) : (
              data.assessments.map((ass) => (
                <TableRow key={ass.id}>
                  <TableCell>
                    <p className="font-serif font-bold text-green-950">{ass.title}</p>
                    <p className="text-xs text-charcoal-500">{ass.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="green">{ass.course.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-charcoal-700">
                      Ustadh {ass.teacher.firstName} {ass.teacher.lastName}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-xs text-charcoal-900">
                      {ass.totalMarks} Marks
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="gold">{ass._count.results} Graded</Badge>
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
