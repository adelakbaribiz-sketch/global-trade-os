"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  Check,
  Clock,
  Search,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, stageBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { commissionAgreements, commissionLedger, commissionSummary } from "@/lib/data/commissions";
import type { CommissionStatus } from "@/lib/data/commissions";

const statusFilters: (CommissionStatus | "All")[] = ["All", "Estimated", "Earned", "Pending Approval", "Approved", "Payable", "Paid", "Reversed"];

export function CommissionView() {
  const [tab, setTab] = useState<"summary" | "agreements" | "ledger">("summary");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CommissionStatus | "All">("All");

  const filteredLedger = useMemo(() => {
    let list = [...commissionLedger];
    if (status !== "All") list = list.filter((l) => l.status === status);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((l) => `${l.reference} ${l.partyName} ${l.description} ${l.source}`.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [query, status]);

  const filteredAgreements = useMemo(() => {
    if (!query) return commissionAgreements;
    const q = query.toLowerCase();
    return commissionAgreements.filter((a) =>
      `${a.reference} ${a.partyName} ${a.type} ${a.basis}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageContainer>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Commission Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Transparent, auditable commission system. Immutable ledger — adjustments recorded as new entries, never silently overwritten.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors">
          <Plus className="h-3.5 w-3.5" /> New agreement
        </button>
      </div>

      {/* KPI summary */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="Estimated" value={`$${(commissionSummary.totalEstimatedUsd / 1000).toFixed(0)}K`} icon={Clock} accent="violet" hint="Forecast" />
        <KpiCard label="Earned" value={`$${(commissionSummary.totalEarnedUsd / 1000).toFixed(0)}K`} icon={Check} accent="warning" hint="Contractually triggered" />
        <KpiCard label="Approved" value={`$${(commissionSummary.totalApprovedUsd / 1000).toFixed(0)}K`} icon={ShieldCheck} accent="accent" hint="Finance approved" />
        <KpiCard label="Payable" value={`$${(commissionSummary.totalPayableUsd / 1000).toFixed(0)}K`} icon={BadgeDollarSign} accent="primary" hint="Ready for payout" />
        <KpiCard label="Paid YTD" value={`$${(commissionSummary.totalPaidUsd / 1000).toFixed(0)}K`} icon={TrendingUp} accent="success" hint="Disbursed" />
        <KpiCard label="Reversed" value={`$${Math.abs(commissionSummary.totalReversedUsd).toLocaleString()}`} icon={AlertCircle} accent="danger" hint="Audit trail" />
      </div>

      {/* Pipeline bar */}
      <PageCard className="mb-4">
        <SectionHeader title="Commission pipeline" subtitle="Estimated → Earned → Approved → Payable → Paid (immutable ledger)" />
        <div className="relative">
          {/* Pipeline visualization */}
          <div className="flex h-12 items-center gap-1">
            {[
              { label: "Estimated", value: commissionSummary.totalEstimatedUsd, color: "#8B7BFF" },
              { label: "Earned", value: commissionSummary.totalEarnedUsd, color: "#F2B441" },
              { label: "Approved", value: commissionSummary.totalApprovedUsd, color: "#35D6C5" },
              { label: "Payable", value: commissionSummary.totalPayableUsd, color: "#4D8DFF" },
              { label: "Paid", value: commissionSummary.totalPaidUsd, color: "#34D399" },
            ].map((stage, i, arr) => {
              const maxVal = Math.max(...arr.map(s => s.value));
              return (
                <div key={stage.label} className="flex flex-1 flex-col items-center">
                  <div className="relative flex h-8 w-full overflow-hidden rounded-md bg-muted/40" style={{ minHeight: 32 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(stage.value / maxVal) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="w-full"
                      style={{ backgroundColor: `${stage.color}30`, borderTop: `2px solid ${stage.color}` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-semibold tabular-nums" style={{ color: stage.color }}>
                    ${(stage.value / 1000).toFixed(0)}K
                  </p>
                  <p className="text-[9px] text-muted-foreground">{stage.label}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-2 rounded-md border border-[#4D8DFF]/30 bg-[#4D8DFF]/5 p-2.5 text-[11px] text-muted-foreground">
            <strong className="text-[#4D8DFF]">Audit policy:</strong> All adjustments are recorded as new auditable ledger entries. Reversals never silently overwrite financial history. Multiple representatives in a single transaction are allocated per explicit contractual rules.
          </div>
        </div>
      </PageCard>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 border-b border-border">
        {(["summary", "agreements", "ledger"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2 text-xs font-medium capitalize transition-colors ${
              tab === t ? "border-[#4D8DFF] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "summary" ? "Active agreements" : t === "agreements" ? "All agreements" : "Ledger entries"}
            {t === "agreements" && <span className="ml-1.5 rounded bg-muted px-1 text-[10px] text-muted-foreground">{commissionAgreements.length}</span>}
            {t === "ledger" && <span className="ml-1.5 rounded bg-muted px-1 text-[10px] text-muted-foreground">{commissionLedger.length}</span>}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by reference, party, agreement type…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
            />
          </div>
          {tab === "ledger" && (
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              {statusFilters.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          <button className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground hover:border-[#4D8DFF]/40 hover:text-foreground">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </PageCard>

      {/* Content */}
      {tab === "summary" && (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {commissionAgreements.filter(a => a.status === "Active").slice(0, 6).map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <PageCard className="h-full p-4 hover:border-[#4D8DFF]/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate">{a.partyName}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{a.reference}</p>
                  </div>
                  <StatusBadge variant="success" dot>{a.status}</StatusBadge>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <StatusBadge variant="violet">{a.type}</StatusBadge>
                  <StatusBadge variant="info">{a.partyType}</StatusBadge>
                </div>
                <div className="mt-2.5 rounded-md border border-border bg-background/40 p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Rate</p>
                  <p className="text-xs font-semibold text-foreground">{a.rate}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{a.basis}</p>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-border pt-2.5">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Volume</p>
                    <p className="text-xs font-semibold text-foreground tabular-nums">${(a.attributedVolumeUsd / 1e6).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Paid</p>
                    <p className="text-xs font-semibold text-[#34D399] tabular-nums">${(a.paidUsd / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </PageCard>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "agreements" && (
        <PageCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Party</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Rate</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Volume</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Earned</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Paid</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgreements.map((a, i) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-medium text-foreground">{a.reference}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="text-xs text-foreground">{a.partyName}</p>
                      <p className="text-[10px] text-muted-foreground">{a.partyType}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge variant="violet">{a.type}</StatusBadge>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{a.rate}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="text-xs font-semibold text-foreground tabular-nums">${(a.attributedVolumeUsd / 1e6).toFixed(2)}M</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="text-xs font-semibold text-[#F2B441] tabular-nums">${(a.earnedUsd / 1000).toFixed(0)}K</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="text-xs font-semibold text-[#34D399] tabular-nums">${(a.paidUsd / 1000).toFixed(0)}K</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge variant={a.status === "Active" ? "success" : a.status === "Expired" ? "warning" : "neutral"} dot>{a.status}</StatusBadge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageCard>
      )}

      {tab === "ledger" && (
        filteredLedger.length === 0 ? (
          <EmptyState title="No ledger entries match your filters" icon={Search} />
        ) : (
          <PageCard padded={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Party</th>
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                    <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Approver</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedger.map((entry, i) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${entry.amount < 0 ? "bg-[#F45B6B]/5" : ""}`}
                    >
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{entry.date}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-medium text-foreground">{entry.reference}</span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{entry.partyName}</td>
                      <td className="px-4 py-2.5">
                        <p className="text-xs text-muted-foreground">{entry.description}</p>
                        <p className="text-[10px] text-muted-foreground/70">{entry.source}</p>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`text-xs font-semibold tabular-nums ${entry.amount < 0 ? "text-[#F45B6B]" : "text-foreground"}`}>
                          {entry.amount < 0 ? "-" : ""}${Math.abs(entry.amount).toLocaleString()} {entry.currency}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge variant={stageBadge(entry.status) as any} dot>{entry.status}</StatusBadge>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{entry.approver || "—"}</td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border bg-muted/40">
                    <td colSpan={4} className="px-4 py-2 text-right text-xs font-semibold text-muted-foreground">Net total</td>
                    <td className="px-4 py-2 text-right">
                      <span className="text-sm font-bold text-foreground tabular-nums">
                        ${commissionLedger.reduce((s, e) => s + e.amount, 0).toLocaleString()}
                      </span>
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </PageCard>
        )
      )}
    </PageContainer>
  );
}
