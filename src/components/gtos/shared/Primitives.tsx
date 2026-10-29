"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function Rating({ value, max = 5, size = "sm" }: { value: number; max?: number; size?: "sm" | "md" }) {
  const sizeCls = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeCls,
              i < Math.round(value)
                ? "fill-[#F2B441] text-[#F2B441]"
                : "fill-muted text-muted-foreground/40",
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground/80 tabular-nums">{value.toFixed(1)}</span>
    </div>
  );
}

export function CountryFlag({ code, className }: { code: string; className?: string }) {
  // Map ISO country codes to emoji flags using regional indicator symbols
  if (!code || code.length !== 2) return <span className={cn("inline-block", className)}>{code}</span>;
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((c) => 0x1f1e6 + (c.charCodeAt(0) - "A".charCodeAt(0)));
  return <span className={cn("inline-block", className)}>{String.fromCodePoint(...codePoints)}</span>;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "primary",
  className,
}: {
  value: number;
  max?: number;
  variant?: "primary" | "accent" | "success" | "warning" | "danger" | "violet";
  className?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const colorMap: Record<string, string> = {
    primary: "bg-[#4D8DFF]",
    accent: "bg-[#35D6C5]",
    success: "bg-[#34D399]",
    warning: "bg-[#F2B441]",
    danger: "bg-[#F45B6B]",
    violet: "bg-[#8B7BFF]",
  };
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorMap[variant])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const sizeCls =
    size === "lg" ? "h-12 w-12 text-base" : size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-[#4D8DFF]/30 bg-gradient-to-br from-[#18253A] to-[#0E1626] font-semibold text-[#4D8DFF]",
        sizeCls,
      )}
    >
      {initials}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
      {Icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="mt-1 max-w-md text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
