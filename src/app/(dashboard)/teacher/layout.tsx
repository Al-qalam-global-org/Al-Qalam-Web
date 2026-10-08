import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getCurrentUser } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";

export const metadata = {
  robots: "noindex, nofollow",
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "TEACHER") {
    redirect("/teacher/login");
  }

  const name = user.teacher
    ? `${user.teacher.firstName} ${user.teacher.lastName}`
    : "Teacher";

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <Sidebar role="TEACHER" userName={name} userEmail={user.email} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
