import React from "react";
import Link from "next/link";
import { Globe, Share2, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-200 bg-ivory-50 text-charcoal-700">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2">
            <BrandLogo iconHeight="h-11 sm:h-12" nameHeight="h-9 sm:h-10" />
            <p className="mt-4 max-w-sm text-sm text-charcoal-500 leading-relaxed">
              Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice.
            </p>
            <p className="mt-3 text-xs font-semibold text-green-900">
              Learn Islam. Live with Purpose. Share the Light.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-green-950">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-green-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-green-900 transition">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-green-900 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-900 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-900 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-green-950">
              Policies
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-green-900 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-900 transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy#safeguarding" className="hover:text-green-900 transition">
                  Student Safeguarding
                </Link>
              </li>
              <li>
                <Link href="/terms#refund" className="hover:text-green-900 transition">
                  Refund &amp; Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-green-950">
              Connect With Us
            </h4>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-charcoal-200 text-charcoal-700 hover:text-green-950 hover:border-green-700 transition"
                aria-label="Community Channel"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-charcoal-200 text-charcoal-700 hover:text-green-950 hover:border-green-700 transition"
                aria-label="Social Updates"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-charcoal-200 text-charcoal-700 hover:text-green-950 hover:border-green-700 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 text-xs text-charcoal-500 space-y-1">
              <p>support@alqalamglobal.com</p>
              <p>Admissions: +971 50 123 4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Only & Centered */}
        <div className="mt-12 border-t border-charcoal-200 pt-8 text-center text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
