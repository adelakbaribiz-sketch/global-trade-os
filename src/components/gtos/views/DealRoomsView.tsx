"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Users,
  FileText,
  Search,
  ChevronRight,
  Plus,
  Check,
  Clock,
  Download,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, Avatar, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, stageBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { deals, getDeal, crmActivities } from "@/lib/data/deals";

export function DealRoomsView() {
  const detailId = useAppStore((s) => s.detailId);
  const openDetail = useAppStore((s) => s.openDetail);

  if (detailId) {
    const deal = getDeal(detailId);
    if (deal) return <DealRoom deal={deal} />;
  }

  return <DealList onOpen={(id) => openDetail("deals", id)} />;
}

function DealList({ onOpen }: { onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<string>("All");

  const stages = ["All", "Discovery", "Qualification", "RFQ", "Negotiation", "Contract", "Execution", "Shipment", "Closed Won"];

  const filtered = useMemo(() => {
    let list = [...deals];
    if (stage !== "All") list = list.filter((d) => d.stage === stage);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((d) => `${d.title} ${d.reference} ${d.buyerName} ${d.supplierName}`.toLowerCase().includes(q));
    }
    return list;
  }, [query, stage]);

  return (
    <PageContainer>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Deal Rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Secure collaboration environment for each qualified trade opportunity.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors">
          <Plus className="h-3.5 w-3.5" /> New deal room
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Active deal rooms" value={String(deals.length)} icon={Boxes} accent="primary" hint="Across pipeline" />
        <KpiCard label="Pipeline value" value={`$${(deals.reduce((s, d) => s + d.valueUsd, 0) / 1e6).toFixed(1)}M`} icon={FileText} accent="accent" hint="Estimated" />
        <KpiCard label="Avg. probability" value={`${Math.round(deals.reduce((s, d) => s + d.probability, 0) / deals.length)}%`} icon={Check} accent="success" hint="Weighted" />
        <KpiCard label="Documents shared" value={String(deals.reduce((s, d) => s + d.documents.length, 0))} icon={FileText} accent="violet" hint="Version-controlled" />
      </div>

      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deals, parties, references…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
            />
          </div>
          <select value={stage} onChange={(e) => setStage(e.target.value)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
            {stages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </PageCard>

      {filtered.length === 0 ? (
        <EmptyState title="No deals match your filters" icon={Search} />
      ) : (
        <div className="space-y-3">
          {filtered.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <PageCard className="cursor-pointer p-4 hover:border-[#4D8DFF]/40 transition-colors" >
                <div onClick={() => onOpen(deal.id)} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <StatusBadge variant={stageBadge(deal.stage) as any} dot>{deal.stage}</StatusBadge>
                      <span className="text-[10px] text-muted-foreground">{deal.reference}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{deal.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {deal.buyerName} × {deal.supplierName}
                      {deal.representativeName && <span> · Rep: {deal.representativeName}</span>}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 lg:w-80">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Value</p>
                      <p className="mt-0.5 text-sm font-bold text-foreground tabular-nums">${(deal.valueUsd / 1e6).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Probability</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#35D6C5] tabular-nums">{deal.probability}%</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Close date</p>
                      <p className="mt-0.5 text-xs font-medium text-foreground">{deal.expectedClose}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                {/* Milestone preview */}
                <div className="mt-3 border-t border-border pt-2.5">
                  <div className="flex items-center gap-1">
                    {deal.milestones.map((m, idx) => (
                      <div key={idx} className={`h-1 flex-1 rounded-full ${
                        m.status === "done" ? "bg-[#4D8DFF]" :
                        m.status === "current" ? "bg-[#F2B441]" : "bg-muted"
                      }`} />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    Current: <span className="text-foreground">{deal.milestones.find(m => m.status === "current")?.label}</span>
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

function DealRoom({ deal }: { deal: NonNullable<ReturnType<typeof getDeal>> }) {
  const closeDetail = useAppStore((s) => s.closeDetail);
  const setView = useAppStore((s) => s.setView);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "participants" | "timeline" | "notes">("overview");

  return (
    <PageContainer>
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={closeDetail} className="hover:text-foreground">← Back to deal rooms</button>
        <span>/</span>
        <span className="text-foreground">{deal.reference}</span>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <StatusBadge variant={stageBadge(deal.stage) as any} dot>{deal.stage}</StatusBadge>
          <StatusBadge variant="primary">{deal.probability}% probability</StatusBadge>
          <StatusBadge variant="violet"><ShieldCheck className="h-2.5 w-2.5" /> Confidential</StatusBadge>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">{deal.title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{deal.reference} · Created {deal.createdDate} · Expected close {deal.expectedClose}</p>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
        {(["overview", "documents", "participants", "timeline", "notes"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`-mb-px border-b-2 px-3 py-2 text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-[#4D8DFF] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "documents" && <span className="ml-1.5 rounded bg-muted px-1 text-[10px] text-muted-foreground">{deal.documents.length}</span>}
            {tab === "participants" && <span className="ml-1.5 rounded bg-muted px-1 text-[10px] text-muted-foreground">{deal.participants.length}</span>}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <PageCard>
              <SectionHeader title="Commercial terms" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Term label="Contract value" value={`$${(deal.valueUsd / 1e6).toFixed(2)}M`} currency={deal.currency} />
                <Term label="Buyer" value={deal.buyerName} />
                <Term label="Supplier" value={deal.supplierName} />
                {deal.representativeName && <Term label="Representative" value={deal.representativeName} />}
                <Term label="Created" value={deal.createdDate} />
                <Term label="Expected close" value={deal.expectedClose} />
              </div>
            </PageCard>

            <PageCard>
              <SectionHeader title="Notes" subtitle="Last activity: today" />
              <p className="text-sm leading-relaxed text-muted-foreground">{deal.notes}</p>
              <div className="mt-3 flex gap-2">
                <textarea
                  placeholder="Add a note…"
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
                  rows={2}
                />
                <button className="rounded-md bg-[#4D8DFF] px-3 text-xs font-semibold text-white hover:bg-[#3a7af0]">Post</button>
              </div>
            </PageCard>

            <PageCard>
              <SectionHeader title="Activity feed" />
              <div className="space-y-2.5">
                {crmActivities.slice(0, 4).map((a) => (
                  <div key={a.id} className="flex gap-2.5 text-xs">
                    <Avatar initials={a.owner.split(" ").map(w => w[0]).join("").slice(0, 2)} size="sm" />
                    <div className="flex-1">
                      <p><span className="font-medium text-foreground">{a.owner}</span> <span className="text-muted-foreground">— {a.title}</span></p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{a.date} · {a.party}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PageCard>
          </div>

          <div className="space-y-4">
            <PageCard>
              <SectionHeader title="Quick actions" />
              <div className="space-y-2">
                <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#4D8DFF] py-2 text-xs font-semibold text-white hover:bg-[#3a7af0]">
                  <FileText className="h-3.5 w-3.5" /> Upload document
                </button>
                <button onClick={() => setView("documents")} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">
                  <Clock className="h-3.5 w-3.5" /> Schedule milestone
                </button>
                <button onClick={() => setView("commissions")} className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">
                  View commission
                </button>
              </div>
            </PageCard>

            <PageCard>
              <SectionHeader title="Participants" />
              <div className="space-y-2">
                {deal.participants.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <Avatar initials={p.initials} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">{p.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{p.role} · {p.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PageCard>

            <PageCard>
              <SectionHeader title="Status" />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Stage</span>
                  <StatusBadge variant={stageBadge(deal.stage) as any}>{deal.stage}</StatusBadge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Probability</span>
                  <span className="font-semibold text-[#35D6C5]">{deal.probability}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last activity</span>
                  <span className="text-foreground">{deal.lastActivity}</span>
                </div>
              </div>
            </PageCard>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <PageCard padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Document name</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Version</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Uploaded by</th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-4 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deal.documents.map((doc, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-[#4D8DFF]" />
                        <span className="text-xs font-medium text-foreground">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge variant="info">{doc.type}</StatusBadge>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{doc.version}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{doc.uploadedBy}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{doc.date}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="rounded p-1 text-muted-foreground hover:text-[#4D8DFF]"><Download className="h-3 w-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageCard>
      )}

      {activeTab === "participants" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deal.participants.map((p) => (
            <PageCard key={p.name}>
              <div className="flex items-center gap-3">
                <Avatar initials={p.initials} size="lg" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.role}</p>
                  <p className="text-[10px] text-muted-foreground">{p.organization}</p>
                </div>
              </div>
            </PageCard>
          ))}
        </div>
      )}

      {activeTab === "timeline" && (
        <PageCard>
          <SectionHeader title="Deal milestones" subtitle="Version-controlled timeline" />
          <div className="relative space-y-3 pl-4">
            <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
            {deal.milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-3.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-background ${
                  m.status === "done" ? "bg-[#4D8DFF]" :
                  m.status === "current" ? "bg-[#F2B441]" : "bg-muted"
                }`} />
                <p className={`text-xs font-medium ${m.status === "current" ? "text-[#F2B441]" : "text-foreground"}`}>{m.label}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{m.date} · <StatusBadge variant={m.status === "done" ? "success" : m.status === "current" ? "warning" : "neutral"}>{m.status}</StatusBadge></p>
              </div>
            ))}
          </div>
        </PageCard>
      )}

      {activeTab === "notes" && (
        <PageCard>
          <div className="flex gap-2">
            <textarea
              placeholder="Add a note to the deal room…"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
              rows={4}
            />
          </div>
          <div className="mt-3 flex justify-end">
            <button className="rounded-md bg-[#4D8DFF] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0]">Post note</button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{deal.notes}</p>
        </PageCard>
      )}
    </PageContainer>
  );
}

function Term({ label, value, currency }: { label: string; value: string; currency?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-foreground">{value}{currency && currency !== "USD" && ` ${currency}`}</p>
    </div>
  );
}
