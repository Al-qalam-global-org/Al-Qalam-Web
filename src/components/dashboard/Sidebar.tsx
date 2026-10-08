"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  Award,
  FolderArchive,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  BookCheck,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: "ADMIN" | "TEACHER" | "STUDENT";
  userName?: string;
  userEmail?: string;
}

export function Sidebar({ role, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/cms", label: "Website CMS", icon: Globe },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/teachers", label: "Teachers", icon: UserCheck },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/classes", label: "Classes & Schedule", icon: Calendar },
    { href: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
    { href: "/admin/assignments", label: "Assignments", icon: FileText },
    { href: "/admin/assessments", label: "Assessments", icon: BookCheck },
    { href: "/admin/certificates", label: "Certificates", icon: Award },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const teacherLinks = [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/students", label: "My Students", icon: Users },
    { href: "/teacher/courses", label: "My Courses", icon: BookOpen },
    { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
    { href: "/teacher/attendance", label: "Attendance & Notes", icon: ClipboardCheck },
    { href: "/teacher/assignments", label: "Assignments", icon: FileText },
    { href: "/teacher/assessments", label: "Assessments", icon: BookCheck },
    { href: "/teacher/progress", label: "Student Progress", icon: BarChart3 },
    { href: "/teacher/notifications", label: "Notifications", icon: Bell },
    { href: "/teacher/settings", label: "Settings", icon: Settings },
  ];

  const studentLinks = [
    { href: "/student", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/courses", label: "My Courses", icon: BookOpen },
    { href: "/student/classes", label: "My Classes", icon: Calendar },
    { href: "/student/attendance", label: "Attendance & Notes", icon: ClipboardCheck },
    { href: "/student/assignments", label: "Assignments", icon: FileText },
    { href: "/student/assessments", label: "Assessments & Results", icon: BookCheck },
    { href: "/student/progress", label: "Progress Tracking", icon: BarChart3 },
    { href: "/student/certificates", label: "Certificates", icon: Award },
    { href: "/student/notifications", label: "Notifications", icon: Bell },
    { href: "/student/settings", label: "Settings & Security", icon: Settings },
  ];

  const links =
    role === "ADMIN"
      ? adminLinks
      : role === "TEACHER"
      ? teacherLinks
      : studentLinks;

  const roleLabels = {
    ADMIN: "Administrator",
    TEACHER: "Teacher Portal",
    STUDENT: "Student Portal",
  };

  const handleLogout = async () => {
    const target =
      role === "ADMIN"
        ? "/admin/login"
        : role === "TEACHER"
        ? "/teacher/login"
        : "/login";

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = target;
    } catch {
      window.location.href = target;
    }
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-charcoal-200 bg-white shadow-xs">
      <div>
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-charcoal-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-950 text-gold-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="font-serif text-base font-bold text-green-950">
              Al-Qalam<span className="text-gold-500">Global</span>
            </span>
            <p className="text-[10px] font-medium uppercase tracking-wider text-charcoal-500">
              {roleLabels[role]}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 p-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
          {links.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role.toLowerCase()}` &&
                pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-950 text-gold-400 shadow-xs"
                    : "text-charcoal-700 hover:bg-ivory-100 hover:text-green-950"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-gold-400" : "text-charcoal-500")} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile & Logout footer */}
      <div className="border-t border-charcoal-200 p-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-900 text-ivory-50 text-sm font-semibold">
            {userName ? userName[0].toUpperCase() : "U"}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-xs font-semibold text-charcoal-900">
              {userName || "User"}
            </p>
            <p className="truncate text-[11px] text-charcoal-500">
              {userEmail || "user@alqalamglobal.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-charcoal-200 px-3 py-2 text-xs font-medium text-charcoal-700 hover:bg-red-50 hover:text-danger hover:border-red-200 transition"
        >
          <LogOut className="h-3.5 w-3.5" /> Log Out
        </button>
      </div>
    </aside>
  );
}
