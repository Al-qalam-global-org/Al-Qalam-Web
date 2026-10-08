"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState<"request" | "confirm">("request");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Failed");

      setMessage(
        "If an account is associated with this email, you will receive a reset link. Check your inbox or proceed below if you have a reset token."
      );
      setStage("confirm");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error?.message || "Failed");

      setMessage("Password successfully reset! You can now log in.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-ivory-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-950 text-gold-400 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
        </Link>
        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-green-950">
          Password Recovery
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border border-charcoal-200 bg-white px-6 py-8 shadow-xl sm:px-10">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-3.5 text-xs text-danger border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-3.5 text-xs text-green-800 border border-green-200">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {stage === "request" ? (
            <form onSubmit={handleRequest} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="w-full"
              >
                Send Reset Link <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <Input
                label="Reset Token"
                placeholder="Paste token from email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Minimum 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="w-full"
              >
                Update Password <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          )}

          <div className="mt-6 border-t border-charcoal-200 pt-4 text-center">
            <Link
              href="/login"
              className="text-xs font-semibold text-green-900 hover:text-gold-600 transition"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
