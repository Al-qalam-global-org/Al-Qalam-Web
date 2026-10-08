import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ShieldCheck, Lock, Eye, FileText, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy & Student Safeguarding Policy",
  description:
    "Learn how Al-Qalam Global Academy protects student privacy, adheres to Islamic ethics, and maintains stringent online safety standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      <section className="border-b border-charcoal-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">ACADEMY GOVERNANCE</span>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-green-950 sm:text-5xl">
            Privacy &amp; Safeguarding Policy
          </h1>
          <p className="mt-4 text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Our commitment to safeguarding student data, parent confidentiality, and maintaining a secure, morally uplifting online Islamic classroom environment.
          </p>
          <p className="mt-2 text-xs text-charcoal-400">
            Last Updated: January 2026 | Governing Global Online Operations
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-charcoal-200 bg-white p-6 sm:p-10 shadow-sm space-y-10">
            {/* 1. Introduction */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                1. Our Islamic Ethical Trust (Amanah)
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                At Al-Qalam Global Academy, protecting your personal data and the privacy of our students is not merely a legal obligation, but a sacred trust (<em>Amanah</em>). We operate with full transparency regarding what information we collect, how it is utilized, and the rigorous safeguards implemented to ensure student safety across all global jurisdictions (India, GCC, Australia, UK, and worldwide).
              </p>
            </div>

            {/* 2. Information Collected */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                2. Information We Collect
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed mb-3">
                We collect only the minimum required information to deliver high-quality, customized educational services:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-charcoal-700">
                <li><strong>Account Information:</strong> Student name, age/grade, parent/guardian contact information, email, phone number, and residential time zone for accurate class scheduling.</li>
                <li><strong>Academic Progress:</strong> Attendance records, homework submissions, teacher evaluation notes, and assessment results stored securely in your private LMS student portal.</li>
                <li><strong>Classroom Interactions:</strong> Live audio/video class sessions conducted via certified encrypted educational tools. Session recordings (where applicable) are strictly reserved for student revision and quality assurance.</li>
                <li><strong>Payment Data:</strong> All financial transactions are processed through tier-1 PCI-DSS compliant payment gateways. We never store credit card numbers on our servers.</li>
              </ul>
            </div>

            {/* 3. Student Safeguarding */}
            <div id="safeguarding" className="scroll-mt-24 rounded-2xl bg-ivory-50 p-6 border border-charcoal-200/80">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-6 w-6 text-green-900" />
                <h2 className="font-serif text-xl font-bold text-green-950">
                  3. Student Online Safeguarding Policy
                </h2>
              </div>
              <p className="text-sm text-charcoal-700 leading-relaxed mb-3">
                The safety, well-being, and dignity of our young students are paramount:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-charcoal-700">
                <li><strong>Vetted Educators:</strong> All teachers undergo comprehensive background verification, identity checks, and scholarly endorsement prior to onboarding.</li>
                <li><strong>Strict Code of Conduct:</strong> Teachers and students interact exclusively through monitored academy platforms. Private contact outside official learning channels is strictly prohibited.</li>
                <li><strong>Parental Transparency:</strong> Parents retain full oversight of their child’s progress and may request attendance logs or session summaries at any time.</li>
              </ul>
            </div>

            {/* 4. Data Security */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                4. Data Protection &amp; Confidentiality
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                We implement industry-standard encryption (TLS/SSL in transit, encrypted storage at rest) and strict role-based access control. Student records are accessible solely by authorized educators and administrators assigned to that student. We strictly never sell, rent, or monetize personal data to third-party advertisers.
              </p>
            </div>

            {/* 5. Contact Information */}
            <div className="border-t border-charcoal-200 pt-6">
              <h2 className="font-serif text-xl font-bold text-green-950 mb-2">
                5. Questions &amp; Data Rights
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                You have the right to request a copy of your records or ask for account data deletion at any time. For privacy inquiries, contact our Data Protection Officer at:
              </p>
              <p className="mt-3 text-sm font-semibold text-green-900">
                privacy@alqalamglobal.com | Al-Qalam Global Academy
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
