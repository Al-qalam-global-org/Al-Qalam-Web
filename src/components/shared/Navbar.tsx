"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Moving Announcement Bar */}
      <div className="relative overflow-hidden bg-green-950 text-white border-b border-green-900/60 py-2">
        <div className="flex animate-marquee whitespace-nowrap text-xs font-medium tracking-wide">
          <div className="flex shrink-0 items-center gap-8 px-4">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-semibold text-gold-300">Admissions Open Now:</span> Enroll for the upcoming session
            </span>
            <span className="text-gold-400/70">✦</span>
            <span>Learn from Certified Scholars &amp; Expert Tutors</span>
            <span className="text-gold-400/70">✦</span>

            <span>Flexible Schedules for Children, Teens &amp; Adults</span>
            <span className="text-gold-400/70">✦</span>
            <span>Global Online Learning: India, GCC, Australia &amp; Worldwide</span>
            <span className="text-gold-400/70">✦</span>
          </div>

          <div className="flex shrink-0 items-center gap-8 px-4" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-semibold text-gold-300">Admissions Open Now:</span> Enroll for the upcoming session
            </span>
            <span className="text-gold-400/70">✦</span>
            <span>Learn from Certified Scholars &amp; Expert Tutors</span>
            <span className="text-gold-400/70">✦</span>

            <span>Flexible Schedules for Children, Teens &amp; Adults</span>
            <span className="text-gold-400/70">✦</span>
            <span>Global Online Learning: India, GCC, Australia &amp; Worldwide</span>
            <span className="text-gold-400/70">✦</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-charcoal-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-950 text-gold-400 shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-green-950">
                Al-Qalam<span className="text-gold-500">Global</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-charcoal-500">
                Online Islamic Education Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean page routes, removed FAQ and Teachers as requested) */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition",
                    isActive
                      ? "text-green-950 font-semibold underline decoration-gold-500 decoration-2 underline-offset-8"
                      : "text-charcoal-700 hover:text-green-950"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden items-center gap-3.5 md:flex">
            <Link href="/courses" aria-label="Search courses">
              <button
                aria-label="Search courses"
                className="rounded-lg p-2 text-charcoal-500 hover:bg-ivory-100 hover:text-green-950 transition"
              >
                <Search className="h-4 w-4" />
              </button>
            </Link>

            {/* Login Button (Direct Student Login) */}
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>

            <Link href="/courses">
              <Button variant="primary" size="sm">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-charcoal-700 hover:bg-ivory-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-charcoal-200 bg-white px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-charcoal-800 hover:bg-ivory-100 hover:text-green-950 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
