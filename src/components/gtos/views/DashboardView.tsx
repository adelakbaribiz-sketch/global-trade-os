"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  FileText,
  Boxes,
  Network,
  BadgeDollarSign,
  TrendingUp,
  Bell,
  ArrowRight,
  Truck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, Avatar, ProgressBar } from "@/components/gtos/shared/Primitives";
import { StatusBadge, stageBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { opportunities } from "@/lib/data/opportunities";
import { rfqs } from "@/lib/data/rfqs";
import { deals } from "@/lib/data/deals";
import { representatives } from "@/lib/data/representatives";
import { crmActivities } from "@/lib/data/deals";
import { riskIndicators } from "@/lib/data/intelligence";
import { commissionSummary } from "@/lib/data/commissions";

export function DashboardView() {
  const setView = useAppStore((s) => s.setView);
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "ytd">("30d");

  const totalPipelineUsd = deals.reduce((s, d) => s + d.valueUsd, 0);
  const openRisks = riskIndicators.filter((r) => r.status === "Open").length;
  const activeOpps = opportunities.filter((o) => o.status === "Open").length;

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Welcome back, Marieke</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nordport Logistics B.V. · Procurement Lead · Demo environment
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card/40 p-1">
          {(["7d", "30d", "90d", "ytd"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                dateRange === r
                  ? "bg-[#4D8DFF] text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "ytd" ? "YTD" : r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard
          label="Active Opportunities"
          value={String(activeOpps)}
          delta={{ value: "+3", direction: "up" }}
          icon={Target}
          accent="primary"
          trend={[6, 7, 6, 8, 9, 11, 12]}
          hint="Closing soon: 1"
        />
        <KpiCard
          label="Open RFQs"
          value={String(rfqs.length)}
          delta={{ value: "+1", direction: "up" }}
          icon={FileText}
          accent="accent"
          trend={[1, 2, 2, 3, 3, 4, 4]}
          hint="Quotations: 18 total"
        />
        <KpiCard
          label="Active Deals"
          value={String(deals.length)}
          delta={{ value: "+$2.4M", direction: "up" }}
          icon={Boxes}
          accent="violet"
          trend={[8, 9, 10, 10, 11, 12, 12]}
          hint={`Pipeline: $${(totalPipelineUsd / 1e6).toFixed(1)}M`}
        />
        <KpiCard
          label="Est. Commission"
          value={`$${(commissionSummary.totalEstimatedUsd / 1000).toFixed(0)}K`}
          delta={{ value: "+$84K", direction: "up" }}
          icon={BadgeDollarSign}
          accent="warning"
          trend={[420, 460, 510, 540, 580, 620, 662]}
          hint={`Paid YTD: $${(commissionSummary.totalPaidUsd / 1000).toFixed(0)}K`}
        />
        <KpiCard
          label="Outstanding Tasks"
          value="8"
          delta={{ value: "−2", direction: "up" }}
          icon={Clock}
          accent="danger"
          trend={[12, 11, 10, 9, 10, 9, 8]}
          hint="2 due today"
        />
      </div>

      {/* Main grid */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {/* Left col: Trade volume + Conversion + Open opportunities */}
        <div className="space-y-4 lg:col-span-2">
          <PageCard>
            <SectionHeader
              title="Trade Volume Trend"
              subtitle="Monthly attributed trade volume (USD)"
              actions={
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#4D8DFF]" /> Actual
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#35D6C5]" /> Forecast
                  </span>
                </div>
              }
            />
            <VolumeChart />
          </PageCard>

          <PageCard>
            <SectionHeader
              title="Opportunity Conversion Funnel"
              subtitle="From discovery through delivery (rolling 90 days)"
            />
            <ConversionFunnel />
          </PageCard>

          <PageCard>
            <SectionHeader
              title="Active Trade Opportunities"
              subtitle="Open opportunities with the highest match scores"
              actions={
                <button
                  onClick={() => setView("marketplace")}
                  className="flex items-center gap-1 text-xs font-medium text-[#4D8DFF] hover:underline"
                >
                  View all
                  <ArrowRight className="h-3 w-3" />
                </button>
              }
            />
            <div className="space-y-2">
              {opportunities.slice(0, 3).map((opp) => (
                <div
                  key={opp.id}
                  className="flex items-center gap-3 rounded-md border border-border bg-card/40 p-3 hover:border-[#4D8DFF]/40 transition-colors cursor-pointer"
                  onClick={() => setView("marketplace")}
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-[#4D8DFF]/10 text-[#4D8DFF]">
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{opp.title}</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {opp.postedBy} · {opp.category} · Closes {opp.closingDate}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-semibold text-foreground tabular-nums">
                      {opp.quantity} {opp.unit}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{opp.targetPrice}</p>
                  </div>
                  <StatusBadge variant={opp.status === "Open" ? "success" : "warning"} dot>
                    {opp.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </PageCard>
        </div>

        {/* Right col: Activity + Risk + Reps */}
        <div className="space-y-4">
          <PageCard>
            <SectionHeader
              title="Recent Activity"
              actions={
                <button
                  onClick={() => setView("crm")}
                  className="text-[11px] font-medium text-[#4D8DFF] hover:underline"
                >
                  Open CRM
                </button>
              }
            />
            <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
              {crmActivities.slice(0, 6).map((a) => (
                <div key={a.id} className="flex gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#18253A] to-[#0E1626] text-[10px] font-semibold text-[#4D8DFF]">
                    {a.owner.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground">{a.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {a.party} · {a.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader
              title="Risk Alerts"
              subtitle={`${openRisks} open risks`}
              actions={
                <button
                  onClick={() => setView("risk")}
                  className="text-[11px] font-medium text-[#4D8DFF] hover:underline"
                >
                  View all
                </button>
              }
            />
            <div className="space-y-2.5">
              {riskIndicators.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="rounded-md border-l-2 border border-border bg-card/40 p-2.5"
                  style={{
                    borderLeftColor:
                      r.severity === "high" ? "#F45B6B" : r.severity === "medium" ? "#F2B441" : "#4D8DFF",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#F2B441]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground">{r.title}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2">{r.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader
              title="Representative Network"
              subtitle={`${representatives.filter((r) => r.status === "Active").length} active representatives`}
              actions={
                <button
                  onClick={() => setView("representatives")}
                  className="text-[11px] font-medium text-[#4D8DFF] hover:underline"
                >
                  View all
                </button>
              }
            />
            <div className="space-y-2">
              {representatives.filter((r) => r.status === "Active").slice(0, 4).map((rep) => (
                <div
                  key={rep.id}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-card/40 p-2 hover:border-[#4D8DFF]/40 transition-colors cursor-pointer"
                  onClick={() => setView("representatives")}
                >
                  <Avatar initials={rep.avatarInitials} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">{rep.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {rep.country} · {rep.activeLeads} leads
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-[#8B7BFF] tabular-nums">
                      ${(rep.earnedCommissionUsd / 1000).toFixed(0)}K
                    </p>
                    <p className="text-[9px] text-muted-foreground">earned</p>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>
        </div>
      </div>

      {/* Upcoming deliveries + AI suggestion banner */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Upcoming Deliveries"
            subtitle="Next 30 days"
            actions={
              <button
                onClick={() => setView("orders")}
                className="text-[11px] font-medium text-[#4D8DFF] hover:underline"
              >
                View all orders
              </button>
            }
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { ref: "PO-2026-0074", title: "Bulk industrial lubricants — 2,000 drums", supplier: "Hudson Bay Materials", delivery: "2026-11-08", mode: "Ocean FCL", status: "In Transit" },
              { ref: "PO-2026-0061", title: "Industrial control PCB assemblies — 8,000 pcs", supplier: "Meridian Manufacturing", delivery: "2026-11-05", mode: "Ocean LCL + Air", status: "Ready for Shipment" },
              { ref: "PO-2026-0089", title: "Pilot batch — 1,000 medical PCB assemblies", supplier: "Meridian Manufacturing", delivery: "2027-01-10", mode: "Ocean FCL + Road", status: "In Production" },
              { ref: "PO-2026-0044", title: "Water treatment compounds — 80 MT", supplier: "Hudson Bay Materials", delivery: "2026-10-12", mode: "Ocean Breakbulk", status: "Delivered" },
            ].map((d) => (
              <div key={d.ref} className="rounded-md border border-border bg-card/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{d.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{d.ref} · {d.supplier}</p>
                  </div>
                  <StatusBadge variant={stageBadge(d.status) as any} dot>{d.status}</StatusBadge>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> {d.mode}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {d.delivery}</span>
                </div>
              </div>
            ))}
          </div>
        </PageCard>

        <PageCard className="border-[#8B7BFF]/30 bg-[#8B7BFF]/5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-[#8B7BFF]/15 text-[#8B7BFF]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">AI Suggestion</p>
              <p className="mt-1 text-xs text-muted-foreground">
                RFQ-2026-1142 has 6 quotations. Top match RheinTech (94) — recommend shortlisting and starting negotiation round 1.
              </p>
              <button
                onClick={() => setView("copilot")}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#8B7BFF] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#7266e6] transition-colors"
              >
                Open AI Copilot
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </PageCard>
      </div>
    </PageContainer>
  );
}

function VolumeChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const actual = [2.8, 3.1, 3.0, 3.6, 3.4, 4.1, 4.5, 4.4, 4.8, 5.2, 4.9, 5.6];
  const forecast = [3.0, 3.2, 3.3, 3.5, 3.8, 4.0, 4.3, 4.6, 4.7, 5.0, 5.3, 5.8];
  const maxVal = 6;
  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-1.5" style={{ height: "200px" }}>
        {months.map((m, i) => (
          <div key={m} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative flex w-full max-w-[28px] flex-col justify-end" style={{ height: "170px" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(forecast[i] / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="absolute bottom-0 w-full rounded-t-sm bg-[#35D6C5]/30"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(actual[i] / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.04 + 0.1 }}
                className="relative w-full rounded-t bg-gradient-to-t from-[#4D8DFF]/60 to-[#4D8DFF]"
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{m}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
        <span className="text-[10px] text-muted-foreground">YTD volume</span>
        <span className="text-xs font-semibold text-foreground tabular-nums">$40.6M</span>
        <span className="text-[10px] text-[#34D399]">+18% QoQ</span>
      </div>
    </div>
  );
}

function ConversionFunnel() {
  const stages = [
    { label: "Discovery", count: 84, pct: 100, color: "#4D8DFF" },
    { label: "Qualification", count: 52, pct: 62, color: "#35D6C5" },
    { label: "RFQ Published", count: 28, pct: 33, color: "#8B7BFF" },
    { label: "Quotations Received", count: 22, pct: 26, color: "#F2B441" },
    { label: "Negotiation", count: 14, pct: 17, color: "#34D399" },
    { label: "Deal Room Created", count: 9, pct: 11, color: "#4D8DFF" },
    { label: "Contract Executed", count: 7, pct: 8.3, color: "#8B7BFF" },
    { label: "Delivered", count: 5, pct: 6, color: "#34D399" },
  ];
  return (
    <div className="space-y-1.5">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="w-28 flex-shrink-0 text-[11px] text-muted-foreground">{s.label}</span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-muted/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.pct}%` }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex h-full items-center justify-end rounded-md px-2"
              style={{ backgroundColor: `${s.color}25`, borderRight: `2px solid ${s.color}` }}
            >
              <span className="text-[10px] font-semibold tabular-nums" style={{ color: s.color }}>
                {s.count}
              </span>
            </motion.div>
          </div>
          <span className="w-12 flex-shrink-0 text-right text-[10px] text-muted-foreground tabular-nums">
            {s.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}
