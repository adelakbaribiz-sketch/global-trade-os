"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  Search,
  ChevronRight,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, CountryFlag, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { opportunities } from "@/lib/data/opportunities";

export function OpportunitiesView() {
  const setView = useAppStore((s) => s.setView);
  const openDetail = useAppStore((s) => s.openDetail);
  const [tab, setTab] = useState<"all" | "leads" | "referrals" | "attribution">("all");
  const [query, setQuery] = useState("");

  // Demo leads data
  const leads = [
    { id: "ld-001", title: "Nordport pump RFQ lead", source: "Marketplace match", rep: "Lukas Hoffmann", value: "$6.6M", stage: "Negotiation", confidence: 92, days: 14 },
    { id: "ld-002", title: "Elysian medical PCB framework", source: "Referral — Daniel Tan", rep: "Daniel Tan", value: "$8.4M", stage: "Contract", confidence: 85, days: 24 },
    { id: "ld-003", title: "PortLight structural steel", source: "Direct inquiry", rep: "Mariam Al Suwaidi", value: "$1.86M", stage: "RFQ", confidence: 40, days: 8 },
    { id: "ld-004", title: "Sapphire food ingredients UK", source: "Marketplace", rep: "(Unassigned)", value: "$420K", stage: "Negotiation", confidence: 65, days: 16 },
    { id: "ld-005", title: "Tidewater aerospace components", source: "Rep referral — S. Reyes", rep: "Sophia Reyes", value: "$1.4M", stage: "Qualification", confidence: 55, days: 5 },
    { id: "ld-006", title: "Hudson Bay lubricants — Singapore", source: "Trade intel alert", rep: "Daniel Tan", value: "$312K", stage: "Closed Won", confidence: 100, days: 22 },
  ];

  const filteredLeads = leads.filter((l) => {
    if (query) {
      const q = query.toLowerCase();
      if (!`${l.title} ${l.source} ${l.rep}`.toLowerCase().includes(q)) return false;
    }
    if (tab === "leads") return l.stage !== "Closed Won";
    if (tab === "referrals") return l.source.toLowerCase().includes("referral");
    if (tab === "attribution") return l.rep !== "(Unassigned)";
    return true;
  });

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Opportunities</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Leads, referrals, and opportunities with auditable attribution across your representative network.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Open leads" value={String(leads.filter(l => l.stage !== "Closed Won").length)} icon={Target} accent="primary" hint="Active pipeline" />
        <KpiCard label="Pipeline value" value={`$${((leads.reduce((s, l) => s + parseFloat(l.value.replace(/[$M,K]/g, "")) * (l.value.includes("M") ? 1000000 : 1000), 0)) / 1e6).toFixed(1)}M`} icon={TrendingUp} accent="accent" hint="Total estimated" />
        <KpiCard label="Referrals" value={String(leads.filter(l => l.source.toLowerCase().includes("referral")).length)} icon={CheckCircle2} accent="success" hint="Attributed" />
        <KpiCard label="Avg. confidence" value={`${Math.round(leads.reduce((s, l) => s + l.confidence, 0) / leads.length)}%`} icon={Clock} accent="warning" hint="Match score" />
      </div>

      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, sources, representatives…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
            />
          </div>
          <div className="flex gap-1 rounded-md border border-border bg-muted/40 p-1">
            {[
              { id: "all", label: "All" },
              { id: "leads", label: "Open Leads" },
              { id: "referrals", label: "Referrals" },
              { id: "attribution", label: "Attributed" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  tab === t.id ? "bg-[#4D8DFF] text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </PageCard>

      {filteredLeads.length === 0 ? (
        <EmptyState title="No leads match your filters" icon={Search} />
      ) : (
        <PageCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Lead</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Source</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Representative</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Stage</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Confidence</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Days</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => setView("crm")}
                  >
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-medium text-foreground">{lead.title}</p>
                      <p className="text-[10px] text-muted-foreground">{lead.id}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs text-muted-foreground">{lead.source}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs ${lead.rep === "(Unassigned)" ? "italic text-muted-foreground/60" : "text-foreground"}`}>{lead.rep}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="text-xs font-semibold text-foreground tabular-nums">{lead.value}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge variant={
                        lead.stage === "Closed Won" ? "success" :
                        lead.stage === "Negotiation" || lead.stage === "Contract" ? "warning" :
                        lead.stage === "Qualification" || lead.stage === "RFQ" ? "primary" : "neutral"
                      } dot>{lead.stage}</StatusBadge>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${lead.confidence >= 80 ? "bg-[#34D399]" : lead.confidence >= 60 ? "bg-[#F2B441]" : "bg-[#F45B6B]"}`}
                            style={{ width: `${lead.confidence}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-foreground tabular-nums">{lead.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-muted-foreground tabular-nums">{lead.days}d</td>
                    <td className="px-4 py-2.5">
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageCard>
      )}

      {/* Quick marketplace CTA */}
      <PageCard className="mt-4 border-[#4D8DFF]/30 bg-[#4D8DFF]/5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-[#4D8DFF]" />
            <div>
              <p className="text-sm font-semibold text-foreground">{opportunities.filter(o => o.status === "Open").length} open marketplace opportunities</p>
              <p className="text-xs text-muted-foreground">Discover trade opportunities matched to your capabilities.</p>
            </div>
          </div>
          <button
            onClick={() => setView("marketplace")}
            className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors"
          >
            Browse marketplace
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </PageCard>
    </PageContainer>
  );
}
