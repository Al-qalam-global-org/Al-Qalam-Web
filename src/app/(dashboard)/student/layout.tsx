import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getCurrentUser } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";

export const metadata = {
  robots: "noindex, nofollow",
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/login");
  }

  const name = user.student
    ? `${user.student.firstName} ${user.student.lastName}`
    : "Student";

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <Sidebar role="STUDENT" userName={name} userEmail={user.email} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
