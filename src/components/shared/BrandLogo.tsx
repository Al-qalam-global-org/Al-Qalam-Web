"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconHeight?: string;
  nameHeight?: string;
  href?: string | null;
  showName?: boolean;
}

export function BrandLogo({
  className,
  iconHeight = "h-10 sm:h-11",
  nameHeight = "h-8 sm:h-9",
  href = "/",
  showName = true,
}: BrandLogoProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-2.5 sm:gap-3 group", className)}>
      {/* Official Al-Qalam Logo Icon (Left) */}
      <img
        src="/logos/logo-icon.jpeg"
        alt="Al-Qalam Global Emblem"
        className={cn(
          "w-auto object-contain shrink-0 mix-blend-multiply transition-transform duration-200 group-hover:scale-105",
          iconHeight
        )}
      />

      {/* Official Al-Qalam Logo Typography Name (Right) */}
      {showName && (
        <img
          src="/logos/logo-name.jpeg"
          alt="Al-Qalam Global - Online Islamic Education Platform"
          className={cn(
            "w-auto object-contain shrink-0 mix-blend-multiply",
            nameHeight
          )}
        />
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }

  return content;
}
