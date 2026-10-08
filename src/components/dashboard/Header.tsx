"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface HeaderProps {
  title: string;
  subtitle?: string;
  role?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, role, actions }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-charcoal-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl font-bold text-green-950">
            {title}
          </h1>
          {role && (
            <Badge variant="green" className="text-[10px] uppercase font-bold tracking-wider">
              {role}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-sm text-charcoal-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-charcoal-200 px-3 py-1.5 text-xs font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-green-950 transition"
        >
          <ExternalLink className="h-3.5 w-3.5" /> View Public Site
        </Link>
        {actions}
      </div>
    </header>
  );
}
