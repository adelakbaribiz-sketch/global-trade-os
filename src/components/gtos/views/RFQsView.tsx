"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  Search,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, CountryFlag, Avatar, ProgressBar, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, stageBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { rfqs, getRFQ, getQuotationsForRFQ } from "@/lib/data/rfqs";
import type { RFQStatus } from "@/lib/data/rfqs";

const statusOrder: RFQStatus[] = ["Draft", "Review", "Published", "Receiving Offers", "Evaluation", "Negotiation", "Awarded", "Cancelled", "Expired"];

export function RFQsView() {
  const detailId = useAppStore((s) => s.detailId);
  const openDetail = useAppStore((s) => s.openDetail);

  if (detailId) {
    const rfq = getRFQ(detailId);
    if (rfq) return <RFQDetail rfq={rfq} />;
  }

  return <RFQList onOpen={(id) => openDetail("rfqs", id)} />;
}

function RFQList({ onOpen }: { onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<RFQStatus | "All">("All");
  const [sortField, setSortField] = useState<"createdDate" | "closingDate" | "quotationsReceived" | "value">("createdDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let list = [...rfqs];
    if (status !== "All") list = list.filter((r) => r.status === status);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((r) =>
        `${r.title} ${r.reference} ${r.buyerName} ${r.summary}`.toLowerCase().includes(q),
      );
    }
    return list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "createdDate" || sortField === "closingDate") cmp = a[sortField].localeCompare(b[sortField]);
      else if (sortField === "quotationsReceived") cmp = a.quotationsReceived - b.quotationsReceived;
      else cmp = 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [query, status, sortField, sortDir]);

  return (
    <PageContainer>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">RFQs &amp; Sourcing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            End-to-end request-for-quotation workflow with configurable sourcing and structured offer comparison.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors">
          <Plus className="h-3.5 w-3.5" /> New RFQ
        </button>
      </div>

      {/* KPI strip */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Total RFQs" value={String(rfqs.length)} icon={FileText} accent="primary" hint="Across all statuses" />
        <KpiCard label="Receiving offers" value={String(rfqs.filter(r => r.status === "Receiving Offers").length)} icon={Clock} accent="warning" hint="Awaiting quotations" />
        <KpiCard label="In negotiation" value={String(rfqs.filter(r => r.status === "Negotiation").length)} icon={Users} accent="violet" hint="Shortlisted suppliers" />
        <KpiCard label="Total quotations" value={String(rfqs.reduce((s, r) => s + r.quotationsReceived, 0))} icon={CheckCircle2} accent="success" hint="All RFQs" />
      </div>

      {/* Filter bar */}
      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search RFQs by reference, title, or buyer…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              <option value="All">All statuses</option>
              {statusOrder.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={sortField} onChange={(e) => setSortField(e.target.value as any)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              <option value="createdDate">Date created</option>
              <option value="closingDate">Closing date</option>
              <option value="quotationsReceived">Quotations</option>
            </select>
            <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="rounded-md border border-border bg-background p-2 text-muted-foreground hover:text-foreground">
              {sortDir === "asc" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </PageCard>

      {/* RFQ cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No RFQs match your filters"
          description="Try adjusting filters or create a new RFQ."
          icon={Search}
          action={<button onClick={() => { setQuery(""); setStatus("All"); }} className="rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:border-[#4D8DFF]/40">Reset filters</button>}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((rfq, i) => (
            <motion.div key={rfq.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <PageCard className="cursor-pointer p-4 hover:border-[#4D8DFF]/40 transition-colors" >
                <div onClick={() => onOpen(rfq.id)} className="flex flex-col gap-3 lg:flex-row lg:items-start">
                  {/* Status indicator */}
                  <div className="flex lg:flex-col lg:items-center gap-2 lg:w-32">
                    <div className="flex items-center gap-2">
                      <StatusBadge variant={stageBadge(rfq.status) as any} dot>{rfq.status}</StatusBadge>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{rfq.reference}</span>
                  </div>

                  {/* Title + summary */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{rfq.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{rfq.summary}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CountryFlag code={rfq.buyerCountry === "Netherlands" ? "NL" : rfq.buyerCountry === "United Kingdom" ? "GB" : rfq.buyerCountry === "United Arab Emirates" ? "AE" : "DE"} />
                        {rfq.buyerName}
                      </span>
                      <span>·</span>
                      <span>Delivery: {rfq.deliveryCity}, {rfq.deliveryCountry}</span>
                      <span>·</span>
                      <span>Closes: {rfq.closingDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 lg:w-56">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Lines</p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{rfq.lines.length}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Invited</p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{rfq.invitations}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Quotes</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#35D6C5] tabular-nums">{rfq.quotationsReceived}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center lg:self-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#4D8DFF]" />
                  </div>
                </div>

                {/* Timeline preview */}
                <div className="mt-3 border-t border-border pt-3">
                  <div className="flex items-center gap-1.5">
                    {rfq.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-center">
                        <div
                          className={`h-1.5 w-8 rounded-full ${
                            step.status === "done" ? "bg-[#4D8DFF]" :
                            step.status === "current" ? "bg-[#F2B441]" :
                            "bg-muted"
                          }`}
                        />
                        {idx < rfq.timeline.length - 1 && <span className="w-0.5" />}
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    Current: <span className="text-foreground">{rfq.timeline.find((s) => s.status === "current")?.event}</span>
                  </p>
                </div>
              </PageCard>
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function RFQDetail({ rfq }: { rfq: NonNullable<ReturnType<typeof getRFQ>> }) {
  const closeDetail = useAppStore((s) => s.closeDetail);
  const setView = useAppStore((s) => s.setView);
  const quotations = getQuotationsForRFQ(rfq.id);
  const [showCopilotBanner] = useState(true);

  return (
    <PageContainer>
      {/* Breadcrumb + header */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={closeDetail} className="hover:text-foreground">← Back to RFQs</button>
        <span>/</span>
        <span className="text-foreground">{rfq.reference}</span>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <StatusBadge variant={stageBadge(rfq.status) as any} dot>{rfq.status}</StatusBadge>
            <StatusBadge variant="violet">{rfq.sourcingType}</StatusBadge>
            <StatusBadge variant="neutral">{rfq.confidentiality}</StatusBadge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">{rfq.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{rfq.reference} · Created {rfq.createdDate} · Closes {rfq.closingDate}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setView("copilot")} className="flex items-center gap-1.5 rounded-md border border-[#8B7BFF]/40 bg-[#8B7BFF]/10 px-3 py-1.5 text-xs font-medium text-[#8B7BFF] hover:bg-[#8B7BFF]/15 transition-colors">
            <Sparkles className="h-3.5 w-3.5" /> AI Copilot
          </button>
          <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">
            <Users className="h-3.5 w-3.5" /> Invite suppliers
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0]">
            <Plus className="h-3.5 w-3.5" /> Add quotation
          </button>
        </div>
      </div>

      {/* AI consistency check banner */}
      {showCopilotBanner && (
        <PageCard className="mb-4 border-[#8B7BFF]/30 bg-[#8B7BFF]/5">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#8B7BFF]/15 text-[#8B7BFF]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">AI Sourcing Assistant</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                RFQ passes consistency checks. Top supplier match: <span className="text-[#35D6C5]">RheinTech Industries</span> (94) — enhanced verified, PED 2014/68/EU confirmed, production capacity audited.
              </p>
            </div>
            <button onClick={() => setView("copilot")} className="rounded border border-[#8B7BFF]/30 px-2 py-1 text-[10px] text-[#8B7BFF] hover:bg-[#8B7BFF]/15">Open</button>
          </div>
        </PageCard>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-4 lg:col-span-2">
          {/* Line items */}
          <PageCard>
            <SectionHeader title="Line items" subtitle={`${rfq.lines.length} line(s)`} />
            <div className="space-y-3">
              {rfq.lines.map((line) => (
                <div key={line.id} className="rounded-md border border-border bg-background/40 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{line.description}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">Line {line.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground tabular-nums">{line.quantity.toLocaleString()} {line.unit}</p>
                      {line.targetPrice && (
                        <p className="text-[10px] text-muted-foreground">Target: {line.currency} {line.targetPrice.toLocaleString()}/{line.unit}</p>
                      )}
                    </div>
                  </div>
                  {line.specifications.length > 0 && (
                    <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                      {line.specifications.map((spec) => (
                        <div key={spec.label} className="flex items-center gap-2 text-[11px]">
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PageCard>

          {/* Quotations comparison */}
          <PageCard>
            <SectionHeader
              title="Quotations received"
              subtitle={`${quotations.length} quotations · ${rfq.shortlisted} shortlisted`}
            />
            {quotations.length === 0 ? (
              <EmptyState title="No quotations yet" description="Quotations will appear here once suppliers submit." icon={FileText} />
            ) : (
              <div className="space-y-2">
                {quotations
                  .slice()
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="rounded-md border border-border bg-background/40 p-3 hover:border-[#4D8DFF]/40 transition-colors"
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        {/* Supplier */}
                        <div className="flex items-center gap-3">
                          <Avatar initials={q.supplierName.split(" ").slice(0, 2).map((w) => w[0]).join("")} size="md" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{q.supplierName}</p>
                            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <CountryFlag code={q.countryCode} /> {q.supplierCountry} · Submitted {q.submittedDate}
                            </p>
                          </div>
                        </div>

                        {/* Match score */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <svg width="44" height="44" viewBox="0 0 44 44">
                              <circle cx="22" cy="22" r="18" fill="none" stroke="#26364C" strokeWidth="3" />
                              <circle
                                cx="22" cy="22" r="18" fill="none"
                                stroke={q.matchScore >= 90 ? "#34D399" : q.matchScore >= 80 ? "#35D6C5" : q.matchScore >= 70 ? "#F2B441" : "#F45B6B"}
                                strokeWidth="3"
                                strokeDasharray={`${(q.matchScore / 100) * 113} 113`}
                                strokeLinecap="round"
                                transform="rotate(-90 22 22)"
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-foreground">{q.matchScore}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">Match<br />score</div>
                        </div>

                        {/* Key metrics */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <MiniMetric label="Unit price" value={`$${q.unitPrice.toLocaleString()}`} />
                          <MiniMetric label="Landed cost" value={`$${q.totalLandedCost.toLocaleString()}`} />
                          <MiniMetric label="Lead time" value={`${q.leadTimeDays}d`} />
                          <MiniMetric label="Quality" value={`${q.qualityScore}`} />
                        </div>

                        {/* Status */}
                        <div>
                          <StatusBadge variant={stageBadge(q.status) as any} dot>{q.status}</StatusBadge>
                        </div>
                      </div>

                      {/* Match reasons */}
                      <div className="mt-3 grid gap-1.5 border-t border-border pt-3 sm:grid-cols-2 lg:grid-cols-3">
                        {q.matchReasons.map((reason) => (
                          <div key={reason.label} className="flex items-start gap-1.5 text-[10px]">
                            {reason.status === "match" && <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#34D399]" />}
                            {reason.status === "partial" && <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#F2B441]" />}
                            {reason.status === "gap" && <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#F45B6B]" />}
                            <div>
                              <span className="font-medium text-foreground">{reason.label}</span>
                              <p className="text-muted-foreground">{reason.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </PageCard>

          {/* Evaluation criteria */}
          <PageCard>
            <SectionHeader title="Evaluation criteria" subtitle="Buyer-defined weights for offer comparison" />
            <div className="space-y-2">
              {rfq.evaluationCriteria.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="w-48 flex-shrink-0 text-xs text-muted-foreground">{c.label}</span>
                  <div className="flex-1">
                    <ProgressBar value={c.weight} max={Math.max(...rfq.evaluationCriteria.map((c) => c.weight))} variant="primary" />
                  </div>
                  <span className="w-8 text-right text-xs font-semibold text-foreground tabular-nums">{c.weight}%</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md border border-[#4D8DFF]/30 bg-[#4D8DFF]/5 p-2.5 text-[11px] text-muted-foreground">
              <strong className="text-[#4D8DFF]">Decision policy:</strong> Suppliers are not ranked solely by price. The platform scores on a weighted blend of total landed cost, quality, verification, delivery, and risk.
            </div>
          </PageCard>
        </div>

        {/* Right col: timeline + participants */}
        <div className="space-y-4">
          <PageCard>
            <SectionHeader title="Timeline" subtitle="RFQ lifecycle events" />
            <div className="relative space-y-3 pl-4">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
              {rfq.timeline.map((step, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -left-3.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-background ${
                      step.status === "done" ? "bg-[#4D8DFF]" :
                      step.status === "current" ? "bg-[#F2B441]" : "bg-muted"
                    }`}
                  />
                  <p className={`text-xs font-medium ${step.status === "current" ? "text-[#F2B441]" : "text-foreground"}`}>{step.event}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{step.date} · {step.actor}</p>
                </div>
              ))}
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader title="Buyer" subtitle="Procurement organization" />
            <div className="flex items-center gap-3">
              <Avatar initials={rfq.buyerName.split(" ").slice(0, 2).map((w) => w[0]).join("").slice(0, 2)} size="md" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{rfq.buyerName}</p>
                <p className="text-[10px] text-muted-foreground">{rfq.buyerCountry} · Procurement Lead: M. van Dijk</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Delivery</p>
                <p className="font-medium text-foreground">{rfq.deliveryCity}, {rfq.deliveryCountry}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Incoterms</p>
                <p className="font-medium text-foreground">{rfq.incoterms}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Payment</p>
                <p className="font-medium text-foreground">{rfq.paymentTerms}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Invited</p>
                <p className="font-medium text-foreground">{rfq.invitations} suppliers</p>
              </div>
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader title="Workflow status" />
            <div className="space-y-2">
              {statusOrder.slice(0, 7).map((s) => {
                const isActive = rfq.status === s;
                const isPast = statusOrder.indexOf(rfq.status as RFQStatus) > statusOrder.indexOf(s);
                return (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#F2B441]" : isPast ? "bg-[#4D8DFF]" : "bg-muted"}`} />
                    <span className={isActive ? "font-semibold text-[#F2B441]" : isPast ? "text-muted-foreground line-through" : "text-muted-foreground"}>{s}</span>
                  </div>
                );
              })}
            </div>
          </PageCard>
        </div>
      </div>
    </PageContainer>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-foreground tabular-nums">{value}</p>
    </div>
  );
}
