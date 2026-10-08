"use client";

import React from "react";
import { GraduationCap, Award, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export interface CertificateData {
  id: string;
  certificateNumber: string;
  completionDate: Date | string;
  issuedBy: string;
  student: {
    firstName: string;
    lastName: string;
  };
  course: {
    name: string;
    description: string;
  };
}

export function CertificateView({ certificate }: { certificate: CertificateData }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Actions Toolbar (Hidden on Print) */}
      <div className="mb-6 flex w-full max-w-3xl items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Badge variant="green" className="text-xs">
            <CheckCircle2 className="h-3 w-3" /> Officially Verified
          </Badge>
          <span className="text-xs font-mono text-charcoal-500">
            {certificate.certificateNumber}
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> Print Certificate
          </Button>
        </div>
      </div>

      {/* Certificate Frame */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border-8 border-gold-500/40 bg-[#fefdfa] p-10 shadow-2xl text-center print:border-4 print:p-8 print:shadow-none">
        {/* Decorative corner ornaments */}
        <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-gold-400/20" />
        <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-green-900/10" />

        {/* Outer border line */}
        <div className="border-2 border-dashed border-gold-600/40 p-8 rounded-xl bg-white/60">
          {/* Academy Brand Header */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-950 text-gold-400 shadow-md">
              <GraduationCap className="h-9 w-9" />
            </div>
            <h1 className="mt-3 font-serif text-2xl font-bold tracking-wider text-green-950 uppercase">
              Al-Qalam Global Academy
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
              Online Islamic Education Platform
            </p>
          </div>

          <div className="my-6">
            <p className="text-xs uppercase tracking-widest text-charcoal-500 font-medium">
              Certificate of Course Completion
            </p>
            <div className="mx-auto my-2 h-0.5 w-24 bg-gold-500" />
          </div>

          <p className="text-sm italic text-charcoal-500">
            This is to proudly certify that
          </p>

          {/* Student Name */}
          <h2 className="my-3 font-serif text-3xl font-bold text-green-900 border-b border-charcoal-200 pb-2 inline-block px-8">
            {certificate.student.firstName} {certificate.student.lastName}
          </h2>

          <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
            has successfully completed all requirements, attendance, and assessments for the course:
          </p>

          {/* Course Name */}
          <div className="my-4 rounded-xl bg-green-50/60 p-4 border border-green-100 max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-bold text-green-950">
              {certificate.course.name}
            </h3>
          </div>

          {/* Footer details: Issue date & signature */}
          <div className="mt-8 grid grid-cols-3 items-end pt-6 border-t border-charcoal-200 text-xs text-charcoal-600">
            <div className="text-left">
              <p className="font-semibold text-charcoal-900">
                {formatDate(certificate.completionDate)}
              </p>
              <p className="text-[11px] text-charcoal-500">Date of Completion</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-50 text-gold-600">
                <Award className="h-6 w-6" />
              </div>
              <p className="mt-1 font-mono text-[10px] text-charcoal-500">
                {certificate.certificateNumber}
              </p>
            </div>

            <div className="text-right">
              <p className="font-serif text-sm font-bold text-green-950 italic">
                {certificate.issuedBy}
              </p>
              <p className="text-[11px] text-charcoal-500">Academic Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({
  variant = "green",
  className,
  children,
}: {
  variant?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-medium ${variant === "green" ? "bg-green-50 text-green-800 border-green-200" : ""} ${className}`}>
      {children}
    </span>
  );
}
