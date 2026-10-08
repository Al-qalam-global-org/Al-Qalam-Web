"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Lock,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Phone,
  Globe,
  HelpCircle,
} from "lucide-react";

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success) {
          setProfile(data.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMe();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword.length < 8) {
      setErrorMsg("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirmation do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to change password");
      }

      setSuccessMsg("Your password has been successfully updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const student = profile?.student;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl">
      <Header
        title="Settings & Security"
        subtitle="Manage your personal account credentials and security settings"
        role="STUDENT"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Password Update Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border border-charcoal-200">
            <div className="flex items-center gap-3 pb-4 border-b border-charcoal-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-green-950">
                  Update Account Password
                </h3>
                <p className="text-xs text-charcoal-500">
                  Change your initial temporary password or set a new secure password
                </p>
              </div>
            </div>

            {successMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-danger border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                  Current / Temporary Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="input pr-10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="input pr-10 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-700"
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-700 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="input text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" isLoading={submitting}>
                  <Shield className="h-4 w-4 mr-1.5" /> Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Profile Summary */}
        <div className="space-y-6">
          <Card className="p-6 border border-charcoal-200 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-charcoal-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory-100 text-green-950 font-bold">
                {student?.firstName ? student.firstName[0] : "S"}
              </div>
              <div>
                <h4 className="font-bold text-sm text-green-950">
                  {student ? `${student.firstName} ${student.lastName}` : "Student Profile"}
                </h4>
                <p className="text-[11px] text-charcoal-500">{profile?.email}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-charcoal-700">
              <div className="flex items-center justify-between py-1 border-b border-charcoal-50">
                <span className="text-charcoal-400 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email
                </span>
                <span className="font-medium">{profile?.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-charcoal-50">
                <span className="text-charcoal-400 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Phone / WhatsApp
                </span>
                <span className="font-medium">{student?.phone || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-charcoal-50">
                <span className="text-charcoal-400 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Country / Timezone
                </span>
                <span className="font-medium">
                  {student?.country || "Global"} ({student?.timezone || "UTC"})
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-charcoal-400">Level / Grade</span>
                <span className="font-medium">
                  {student?.grade || "Standard"} • {student?.level || "Beginner"}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-charcoal-200 bg-ivory-50/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-950">
              <HelpCircle className="h-4 w-4 text-gold-600 shrink-0" />
              Need Help or Profile Changes?
            </div>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              If your course assignments or personal contact details need adjustment, please reach out directly to your assigned Ustadh or Academy Administrator.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
