import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCurrentUser } from "@/lib/auth/permissions";
import { studentRepository } from "@/server/repositories/student.repository";
import { BookOpen, Award, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentCoursesPage() {
  const user = await getCurrentUser();
  const student = user?.student
    ? await studentRepository.findById(user.student.id)
    : null;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="My Enrolled Courses"
        subtitle="Current Islamic curriculum, duration, and level advancement"
        role="STUDENT"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!student?.courses || student.courses.length === 0 ? (
          <p className="text-center py-10 text-xs text-charcoal-500 col-span-3">
            No courses enrolled yet.
          </p>
        ) : (
          student.courses.map((sc: any) => (
            <Card key={sc.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-900 border border-green-200">
                    {sc.course.category}
                  </span>
                  <Badge variant="green">{sc.status}</Badge>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold text-green-950">
                  {sc.course.name}
                </h3>
                <p className="text-xs text-gold-600 font-semibold mt-1">
                  Level: {sc.currentLevel || "Beginner"} • {sc.course.duration}
                </p>
                <p className="mt-2 text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                  {sc.course.description}
                </p>
              </div>

              <div className="mt-6 border-t border-charcoal-200 pt-3 flex items-center justify-between text-xs text-charcoal-500">
                <span>Progress: {sc.currentProgress || 65}%</span>
                <span className="font-semibold text-green-950">Active Enrollment</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
