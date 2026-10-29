"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: { value: string; direction: "up" | "down" | "stable" };
  icon?: LucideIcon;
  trend?: number[];
  accent?: "primary" | "accent" | "warning" | "danger" | "violet";
  hint?: string;
}

const accentMap = {
  primary: { text: "text-[#4D8DFF]", bg: "bg-[#4D8DFF]/10", stroke: "#4D8DFF" },
  accent: { text: "text-[#35D6C5]", bg: "bg-[#35D6C5]/10", stroke: "#35D6C5" },
  warning: { text: "text-[#F2B441]", bg: "bg-[#F2B441]/10", stroke: "#F2B441" },
  danger: { text: "text-[#F45B6B]", bg: "bg-[#F45B6B]/10", stroke: "#F45B6B" },
  violet: { text: "text-[#8B7BFF]", bg: "bg-[#8B7BFF]/10", stroke: "#8B7BFF" },
};

export function KpiCard({ label, value, delta, icon: Icon, trend, accent = "primary", hint }: KpiCardProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg border border-border bg-card/60 p-4 backdrop-blur-sm hover:border-[#4D8DFF]/40 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
        </div>
        {Icon && (
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-md", a.bg)}>
            <Icon className={cn("h-4 w-4", a.text)} />
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {delta.direction === "up" && <ArrowUpRight className="h-3 w-3 text-[#34D399]" />}
          {delta.direction === "down" && <ArrowDownRight className="h-3 w-3 text-[#F45B6B]" />}
          <span
            className={
              delta.direction === "up"
                ? "text-[#34D399]"
                : delta.direction === "down"
                ? "text-[#F45B6B]"
                : "text-muted-foreground"
            }
          >
            {delta.value}
          </span>
          <span className="text-muted-foreground/70">vs last period</span>
        </div>
      )}
      {trend && trend.length > 1 && (
        <div className="mt-3 h-8">
          <Sparkline data={trend} stroke={a.stroke} />
        </div>
      )}
    </motion.div>
  );
}

function Sparkline({ data, stroke }: { data: number[]; stroke: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / range) * h}`)
    .join(" ");
  const areaPts = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={`spark-${stroke.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#spark-${stroke.replace("#", "")})`} />
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
