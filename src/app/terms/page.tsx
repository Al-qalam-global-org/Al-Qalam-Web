import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Scale, CreditCard, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Refund Policy",
  description:
    "Review Al-Qalam Global Academy terms of enrollment, attendance expectations, cancellation procedures, and refund policy.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      <section className="border-b border-charcoal-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">ACADEMIC AGREEMENT</span>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-green-950 sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Clear guidelines on enrollment, class attendance, code of conduct, and our student satisfaction guarantee.
          </p>
          <p className="mt-2 text-xs text-charcoal-400">
            Last Updated: January 2026 | Governing Online Course Participation
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-charcoal-200 bg-white p-6 sm:p-10 shadow-sm space-y-10">
            {/* 1. Enrollment */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                1. Enrollment &amp; Class Allocation
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                By enrolling in any Al-Qalam Global Academy program, parents and adult learners agree to commit to regular attendance, respectful engagement with teachers, and active participation. Upon course confirmation, students are matched with an educator based on timezone, learning level, and schedule preferences.
              </p>
            </div>

            {/* 2. Attendance & Rescheduling */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                2. Attendance &amp; Class Rescheduling
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed mb-3">
                To maintain scheduling consistency for both scholars and fellow students:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-charcoal-700">
                <li><strong>Advance Notice:</strong> If a student needs to reschedule a 1-to-1 session, notice must be provided at least 12 hours in advance via the student portal or WhatsApp support.</li>
                <li><strong>Make-up Classes:</strong> Sessions cancelled with valid notice may be rescheduled within the same academic month subject to teacher availability.</li>
                <li><strong>Missed Classes without Notice:</strong> Sessions missed without prior notice cannot be rescheduled or credited.</li>
              </ul>
            </div>

            {/* 3. Refund Policy */}
            <div id="refund" className="scroll-mt-24 rounded-2xl bg-ivory-50 p-6 border border-charcoal-200/80">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="h-6 w-6 text-green-900" />
                <h2 className="font-serif text-xl font-bold text-green-950">
                  3. Satisfaction Guarantee &amp; Refund Policy
                </h2>
              </div>
              <p className="text-sm text-charcoal-700 leading-relaxed mb-3">
                We take immense pride in the quality of our certified educators and structured curriculum:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-charcoal-700">
                <li><strong>100% Satisfaction Guarantee:</strong> If after your first 2 paid live sessions you are not fully satisfied with your teacher match or course structure, you may request a teacher reassignment or a full refund of unused tuition fees.</li>
                <li><strong>Monthly Subscription Cancellation:</strong> Students enrolled in monthly recurring plans may pause or cancel their subscription at any time prior to the next billing renewal with no lock-in contracts or penalty fees.</li>
                <li><strong>Refund Processing:</strong> Approved refunds are credited back to the original payment method within 5–7 business days.</li>
              </ul>
            </div>

            {/* 4. Classroom Code of Conduct */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-green-950 mb-3">
                4. Code of Islamic Etiquette (Adab)
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                Students and educators are expected to embody Islamic manners (<em>Adab al-Talib</em>): dressing modestly during video classes, speaking with mutual respect, and maintaining an environment focused on sacred knowledge. Any disruptive, inappropriate, or disrespectful behavior may result in immediate suspension without refund.
              </p>
            </div>

            {/* 5. Support */}
            <div className="border-t border-charcoal-200 pt-6">
              <h2 className="font-serif text-xl font-bold text-green-950 mb-2">
                5. Questions &amp; Inquiries
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                If you have questions regarding enrollment terms or class policies, please reach our administrative office:
              </p>
              <p className="mt-3 text-sm font-semibold text-green-900">
                admin@alqalamglobal.com | WhatsApp: +971 50 123 4567
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
