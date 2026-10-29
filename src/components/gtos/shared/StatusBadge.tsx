"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertTriangle, XCircle, FileClock, ShieldAlert } from "lucide-react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "violet"
  | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground border-border",
  primary: "bg-[#4D8DFF]/10 text-[#4D8DFF] border-[#4D8DFF]/30",
  accent: "bg-[#35D6C5]/10 text-[#35D6C5] border-[#35D6C5]/30",
  success: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30",
  warning: "bg-[#F2B441]/10 text-[#F2B441] border-[#F2B441]/30",
  danger: "bg-[#F45B6B]/10 text-[#F45B6B] border-[#F45B6B]/30",
  info: "bg-[#4D8DFF]/10 text-[#4D8DFF] border-[#4D8DFF]/30",
  violet: "bg-[#8B7BFF]/10 text-[#8B7BFF] border-[#8B7BFF]/30",
  neutral: "bg-muted/40 text-muted-foreground border-border",
};

export function StatusBadge({
  variant = "default",
  children,
  dot = false,
  className,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// Helper: map verification level to variant
export function verificationBadge(level: string): { variant: BadgeVariant; icon?: typeof CheckCircle2 } {
  switch (level) {
    case "Enhanced Verification Complete":
      return { variant: "success", icon: CheckCircle2 };
    case "Basic Verification Complete":
      return { variant: "primary", icon: CheckCircle2 };
    case "Under Review":
      return { variant: "warning", icon: Clock };
    case "Information Submitted":
      return { variant: "info", icon: FileClock };
    case "Verification Expired":
      return { variant: "warning", icon: AlertTriangle };
    case "Verification Suspended":
      return { variant: "danger", icon: XCircle };
    case "Unverified":
      return { variant: "neutral", icon: AlertTriangle };
    default:
      return { variant: "neutral" };
  }
}

// Helper: map RFQ / deal stage to variant
export function stageBadge(stage: string): BadgeVariant {
  const stageLower = stage.toLowerCase();
  if (["awarded", "closed won", "delivered", "paid", "executed"].some((s) => stageLower.includes(s)))
    return "success";
  if (["negotiation", "evaluation", "review", "contract"].some((s) => stageLower.includes(s)))
    return "warning";
  if (["cancelled", "closed lost", "expired", "reversed", "suspended"].some((s) => stageLower.includes(s)))
    return "danger";
  if (["published", "receiving offers", "execution", "shipment"].some((s) => stageLower.includes(s)))
    return "primary";
  if (["draft", "estimated", "pending"].some((s) => stageLower.includes(s)))
    return "neutral";
  return "info";
}

// Risk severity
export function riskBadge(severity: string): { variant: BadgeVariant; icon?: typeof ShieldAlert } {
  switch (severity) {
    case "high":
      return { variant: "danger", icon: ShieldAlert };
    case "medium":
      return { variant: "warning", icon: AlertTriangle };
    case "low":
      return { variant: "info", icon: Clock };
    default:
      return { variant: "neutral" };
  }
}
