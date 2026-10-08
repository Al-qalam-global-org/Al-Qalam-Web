"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Shield,
  BookOpen,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/shared/BrandLogo";

export type RoleType = "STUDENT" | "TEACHER" | "ADMIN";

interface RoleConfig {
  role: RoleType;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  demoAccount: {
    email: string;
    password: string;
    label: string;
    roleDesc: string;
  };
  accentColor: string;
}

const ROLE_CONFIGS: Record<RoleType, RoleConfig> = {
  STUDENT: {
    role: "STUDENT",
    title: "Student Sign In",
    subtitle: "Sign in to access your Islamic courses, live classes & progress tracking",
    badge: "Student Portal",
    icon: GraduationCap,
    demoAccount: {
      email: "ahmed.ali@example.com",
      password: "StudentPass123!",
      label: "Demo Student",
      roleDesc: "Ahmed Ali (Student)",
    },
    accentColor: "gold",
  },
  TEACHER: {
    role: "TEACHER",
    title: "Teacher Sign In",
    subtitle: "Manage your assigned students, live schedules, and lesson attendance",
    badge: "Teacher Portal",
    icon: BookOpen,
    demoAccount: {
      email: "ustadh.ahmed@alqalamglobal.com",
      password: "TeacherPass123!",
      label: "Demo Teacher",
      roleDesc: "Teacher Account",
    },
    accentColor: "emerald",
  },
  ADMIN: {
    role: "ADMIN",
    title: "Admin Control Center",
    subtitle: "Secure administrative access for curriculum, user, and academy management",
    badge: "Admin Portal",
    icon: Shield,
    demoAccount: {
      email: "admin@alqalamglobal.com",
      password: "AdminPass123!",
      label: "Demo Admin",
      roleDesc: "Administrator (Full Access)",
    },
    accentColor: "green",
  },
};

export function RoleLoginPage({ role }: { role: RoleType }) {
  const router = useRouter();
  const config = ROLE_CONFIGS[role];
  const IconComponent = config.icon;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Invalid email or password");
      }

      const userRole = data.data.user.role;
      if (userRole === "ADMIN") {
        router.push("/admin");
      } else if (userRole === "TEACHER") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setEmail(config.demoAccount.email);
    setPassword(config.demoAccount.password);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-ivory-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo & Portal Badge */}
        <div className="flex justify-center mb-3">
          <BrandLogo iconHeight="h-12 sm:h-14" nameHeight="h-8 sm:h-10" />
        </div>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-green-950">
          {config.title}
        </h2>
        <p className="mt-1.5 text-xs text-charcoal-500 max-w-sm mx-auto">
          {config.subtitle}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border border-charcoal-200 bg-white px-6 py-8 shadow-xl sm:px-10">
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 p-3.5 text-xs text-danger border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-charcoal-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs font-semibold text-green-900 hover:text-gold-600 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-charcoal-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-charcoal-400 hover:text-charcoal-600 focus:outline-hidden"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full mt-2"
            >
              Sign In <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>

          {/* Dedicated Quick Demo Account Helper */}
          <div className="mt-6 border-t border-charcoal-200 pt-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600">
                Demo Testing Account
              </span>
              <span className="text-[10px] text-charcoal-400">Click to auto-fill</span>
            </div>

            <button
              type="button"
              onClick={autofillDemo}
              className="w-full rounded-2xl border border-charcoal-200 bg-ivory-50 p-3 text-left hover:border-green-800 hover:bg-white transition flex items-center justify-between group"
            >
              <div>
                <span className="block text-xs font-bold text-green-950 group-hover:text-green-900">
                  {config.demoAccount.label}
                </span>
                <span className="text-[11px] text-charcoal-500">
                  {config.demoAccount.email}
                </span>
              </div>
              <span className="rounded-lg bg-green-950/10 px-2 py-1 text-[10px] font-bold text-green-950 group-hover:bg-green-950 group-hover:text-gold-400 transition">
                Use Credential
              </span>
            </button>
          </div>

        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-charcoal-500 hover:text-green-950 transition inline-flex items-center gap-1"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
