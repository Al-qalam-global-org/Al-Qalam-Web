import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gold" | "gray" | "danger" | "warning";
}

export function Badge({
  className,
  variant = "green",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    green: "bg-green-50 text-green-800 border-green-200",
    gold: "bg-gold-100/60 text-gold-600 border-gold-400/30",
    gray: "bg-ivory-200 text-charcoal-700 border-charcoal-200",
    danger: "bg-red-50 text-danger border-red-200",
    warning: "bg-amber-50 text-warning border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
