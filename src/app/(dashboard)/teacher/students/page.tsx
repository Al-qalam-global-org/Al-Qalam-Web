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
import { teacherRepository } from "@/server/repositories/teacher.repository";
import { MessageCircle, Phone } from "lucide-react";
import { whatsappService } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function TeacherStudentsPage() {
  const user = await getCurrentUser();
  const teacher = user?.teacher
    ? await teacherRepository.findById(user.teacher.id)
    : null;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="My Assigned Students"
        subtitle="Roster of students under your pedagogical care and guidance"
        role="TEACHER"
      />

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Contact &amp; Location</TableHead>
              <TableHead>Parent Info</TableHead>
              <TableHead className="text-right">WhatsApp Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!teacher?.assignedStudents || teacher.assignedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-charcoal-500">
                  No students assigned yet.
                </TableCell>
              </TableRow>
            ) : (
              teacher.assignedStudents.map((assignment: any) => {
                const st = assignment.student;
                const waLink = st.phone
                  ? whatsappService.generateStudentContactLink(
                      st.phone,
                      st.firstName,
                      assignment.course.name
                    )
                  : null;

                const parentWaLink = st.parentPhone
                  ? whatsappService.generateParentContactLink(
                      st.parentPhone,
                      st.parentName || "Parent",
                      st.firstName
                    )
                  : null;

                return (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-950 font-bold text-sm">
                          {st.firstName[0]}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-green-950">
                            {st.firstName} {st.lastName}
                          </p>
                          <p className="text-xs text-charcoal-500">{st.grade || "Grade 6"}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="green">{assignment.course.name}</Badge>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs text-charcoal-800">{st.phone || "—"}</p>
                      <p className="text-[11px] text-charcoal-500">{st.country || "Global"}</p>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs font-medium text-charcoal-800">
                        {st.parentName || "—"}
                      </p>
                      <p className="text-[11px] text-charcoal-500">{st.parentPhone || "—"}</p>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900"
                          >
                            <MessageCircle className="h-4 w-4" /> Student
                          </a>
                        )}
                        {parentWaLink && (
                          <a
                            href={parentWaLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700 ml-2"
                          >
                            <Phone className="h-3.5 w-3.5" /> Parent
                          </a>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
