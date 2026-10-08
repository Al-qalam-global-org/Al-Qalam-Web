"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Globe2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Australia",
    program: "Children's Islamic Foundation",
    schedulePreference: "Flexible Weekdays",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const regionalOffices = [
    {
      region: "Australia & Oceania",
      timezone: "AEST / AEDT (Sydney)",
      phone: "+61 2 8000 4500",
      whatsapp: "+61480004500",
      email: "australia@alqalamglobal.org",
      hours: "Mon – Fri: 9:00 AM – 8:00 PM AEST",
    },
    {
      region: "Middle East & GCC",
      timezone: "GST (Dubai)",
      phone: "+971 4 400 9800",
      whatsapp: "+971501234567",
      email: "admissions@alqalamglobal.org",
      hours: "Sun – Thu: 9:00 AM – 9:00 PM GST",
    },
    {
      region: "United Kingdom & Europe",
      timezone: "GMT / BST (London)",
      phone: "+44 20 7946 0912",
      whatsapp: "+447700900123",
      email: "uk@alqalamglobal.org",
      hours: "Mon – Fri: 9:00 AM – 7:00 PM BST",
    },
    {
      region: "North America (US & Canada)",
      timezone: "EST / PST (New York & Los Angeles)",
      phone: "+1 800 555 0199",
      whatsapp: "+18005550199",
      email: "americas@alqalamglobal.org",
      hours: "Mon – Fri: 8:00 AM – 8:00 PM EST",
    },
  ];

  const faqs = [
    {
      q: "How do online 1-on-1 classes work at Al-Qalam?",
      a: "Classes take place inside our secure student portal via interactive high-definition audio/video. Students and teachers share an interactive digital Quran with real-time highlighting and live feedback.",
    },
    {
      q: "Can I request a female teacher for my daughter or myself?",
      a: "Yes, absolutely. We have a dedicated faculty of certified female scholars (Ustadhat) and Hafidhat for our female students and young children.",
    },
    {
      q: "Are the class times flexible around school and work schedules?",
      a: "Yes! Because our faculty spans multiple international timezones (Australia, Middle East, UK, US), we can match your lessons to early mornings, evenings, or weekends.",
    },
    {
      q: "What is the procedure for a Free Assessment Trial?",
      a: "Once you submit an inquiry or message us on WhatsApp, our academic advisor will schedule a 20-minute introductory assessment session to evaluate reading fluency and recommend the right curriculum level.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-charcoal-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="uppercase tracking-widest text-[11px] font-bold px-3 py-1">
            Admissions and Support
          </Badge>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl">
            Get in Touch With Our Academic Team
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-charcoal-600 sm:text-lg leading-relaxed">
            Have questions about our programs, scheduling, or fee structure? Our global advisors are available to assist you via WhatsApp, email, or scheduled consultation.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-charcoal-200 bg-white p-8 sm:p-10 shadow-card">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-green-950">
                    Schedule a Free Academic Consultation
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-charcoal-600">
                    Fill out the form below and an academic advisor will reach out within 12 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="rounded-2xl bg-green-50 p-8 border border-green-200 text-center space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-950 text-gold-400 mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-green-950">
                      Inquiry Received!
                    </h3>
                    <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                      JazakAllah Khair for contacting Al-Qalam Global Academy. Our admissions advisor has received your request and will contact you via WhatsApp and email shortly.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. Tariq Ahmed"
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="tariq@example.com"
                          className="input text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+61 400 000 000"
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          Country of Residence
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                          className="input text-sm"
                        >
                          <option value="Australia">Australia</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="India">India</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          Program of Interest
                        </label>
                        <select
                          value={formData.program}
                          onChange={(e) =>
                            setFormData({ ...formData, program: e.target.value })
                          }
                          className="input text-sm"
                        >
                          <option value="Children's Islamic Foundation">Children (Grades 1 – 12)</option>
                          <option value="Teen Leadership Track">Teenagers (Ages 13 – 19)</option>
                          <option value="Adults & Professionals">Adults & Professionals</option>
                          <option value="Lifelong Quran Learning">Lifelong Seekers & Seniors</option>
                          <option value="Specific Modular Course">Specific Modular Course</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                          Preferred Timings
                        </label>
                        <select
                          value={formData.schedulePreference}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              schedulePreference: e.target.value,
                            })
                          }
                          className="input text-sm"
                        >
                          <option value="Flexible Weekdays">Flexible Weekdays (Morning / Afternoon)</option>
                          <option value="Weekday Evenings">Weekday Evenings</option>
                          <option value="Weekend Mornings">Weekend Mornings (Sat / Sun)</option>
                          <option value="Custom Schedule">Custom 1-on-1 Schedule</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-green-950 mb-1.5">
                        Additional Notes or Specific Goals (Optional)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about the student's current Quran reading level, learning goals, or any preferences for male/female teacher..."
                        className="input text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Request Free Trial"}
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Channels & WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Quick Connect Card */}
              <div className="rounded-3xl border border-green-800 bg-green-950 p-8 text-ivory-50 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-green-950 mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <Badge variant="gold" className="text-[10px] uppercase font-bold">
                  Instant Response
                </Badge>
                <h3 className="mt-2 font-serif text-2xl font-bold text-white">
                  Chat With Admissions on WhatsApp
                </h3>
                <p className="mt-2 text-xs text-charcoal-300 leading-relaxed">
                  Need immediate assistance or have quick questions? Speak directly with our admissions team on WhatsApp.
                </p>

                <div className="mt-6">
                  <a
                    href="https://wa.me/971501234567?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20Al-Qalam%20Global%20Academy%20courses."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-green-500 transition"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    Open WhatsApp Chat (+971 50 123 4567)
                  </a>
                </div>
              </div>

              {/* General Inquiries Card */}
              <div className="rounded-3xl border border-charcoal-200 bg-white p-8 shadow-card space-y-6">
                <h3 className="font-serif text-xl font-bold text-green-950">
                  Direct Contact Information
                </h3>

                <div className="space-y-4 text-xs text-charcoal-700">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-green-950">General Admissions</div>
                      <a href="mailto:admissions@alqalamglobal.org" className="text-charcoal-600 hover:text-green-950 underline">
                        admissions@alqalamglobal.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-green-950">International Hotline</div>
                      <p className="text-charcoal-600">+971 4 400 9800 (Middle East / International)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-green-950">Response Times</div>
                      <p className="text-charcoal-600">WhatsApp: &lt; 30 mins | Email: Within 12 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Support Desks */}
      <section className="bg-white py-16 md:py-20 border-t border-charcoal-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow">GLOBAL TIMEZONE COVERAGE</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-green-950">
              Regional Support Desks
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              We operate dedicated desks matching your local operating hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalOffices.map((office) => (
              <div
                key={office.region}
                className="rounded-2xl border border-charcoal-200 bg-ivory-50/50 p-6 space-y-3 hover:shadow-xs transition"
              >
                <Badge variant="gray" className="text-[10px] font-bold">
                  {office.timezone}
                </Badge>
                <h3 className="font-serif text-base font-bold text-green-950">
                  {office.region}
                </h3>
                <div className="text-xs text-charcoal-600 space-y-1">
                  <p><strong>Tel:</strong> {office.phone}</p>
                  <p><strong>Email:</strong> {office.email}</p>
                  <p className="text-[11px] text-charcoal-500 pt-1">{office.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24 bg-ivory-100 border-t border-charcoal-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-green-950">
              Common Admissions Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-charcoal-200 bg-white overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-base font-bold text-green-950 hover:text-green-800 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-600 transition-transform ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
