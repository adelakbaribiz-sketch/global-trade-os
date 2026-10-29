"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Network,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Search,
  ChevronRight,
  Clock,
  Plus,
  BadgeDollarSign,
  Globe2,
  Star,
  Filter,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, Avatar, Rating, CountryFlag, ProgressBar, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { representatives, getRepresentative } from "@/lib/data/representatives";
import type { AgreementType } from "@/lib/data/representatives";

const agreementTypeFilters: (AgreementType | "All")[] = [
  "All",
  "Exclusive Representation",
  "Non-Exclusive Representation",
  "Limited-Territory",
  "Industry-Specific",
  "Product-Specific",
  "Referral-Only",
];

export function RepresentativesView() {
  const detailId = useAppStore((s) => s.detailId);
  const openDetail = useAppStore((s) => s.openDetail);

  const [query, setQuery] = useState("");
  const [agreement, setAgreement] = useState<AgreementType | "All">("All");
  const [status, setStatus] = useState<"All" | "Active" | "Pending Review" | "Onboarding" | "Suspended" | "Expired">("All");

  const filtered = useMemo(() => {
    let list = [...representatives];
    if (agreement !== "All") list = list.filter((r) => r.agreementType === agreement);
    if (status !== "All") list = list.filter((r) => r.status === status);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((r) =>
        `${r.name} ${r.companyName} ${r.country} ${r.industries.join(" ")} ${r.regions.join(" ")} ${r.specializations.join(" ")}`
          .toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, agreement, status]);

  if (detailId) {
    const rep = getRepresentative(detailId);
    if (rep) return <RepresentativeProfile repId={detailId} />;
  }

  const activeReps = representatives.filter((r) => r.status === "Active");
  const totalEarned = activeReps.reduce((s, r) => s + r.earnedCommissionUsd, 0);
  const totalPaid = activeReps.reduce((s, r) => s + r.paidCommissionUsd, 0);
  const avgCoverage = Math.round(activeReps.reduce((s, r) => s + r.coverageRate, 0) / activeReps.length);

  return (
    <PageContainer>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Country Representative Network</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Managed network connecting local demand with international supply, with auditable attribution and territory protection.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors">
          <Plus className="h-3.5 w-3.5" /> Apply as representative
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Active reps" value={String(activeReps.length)} icon={Network} accent="primary" hint="Across regions" />
        <KpiCard label="Earned commission" value={`$${(totalEarned / 1000).toFixed(0)}K`} icon={BadgeDollarSign} accent="violet" hint="Total YTD" />
        <KpiCard label="Paid commission" value={`$${(totalPaid / 1000).toFixed(0)}K`} icon={CheckCircle2} accent="success" hint="Disbursed" />
        <KpiCard label="Avg. coverage" value={`${avgCoverage}%`} icon={Globe2} accent="accent" hint="Territory coverage" />
      </div>

      {/* Filter bar */}
      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, country, industry, specialization…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none"
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
            <option>All</option>
            <option>Active</option>
            <option>Pending Review</option>
            <option>Onboarding</option>
            <option>Suspended</option>
            <option>Expired</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {agreementTypeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setAgreement(t)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                agreement === t
                  ? "bg-[#4D8DFF] text-white"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </PageCard>

      {filtered.length === 0 ? (
        <EmptyState
          title="No representatives match your filters"
          icon={Search}
          action={<button onClick={() => { setQuery(""); setAgreement("All"); setStatus("All"); }} className="rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:border-[#4D8DFF]/40">Reset filters</button>}
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((rep, i) => (
            <motion.div key={rep.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <PageCard className="group h-full p-4 hover:border-[#4D8DFF]/40 transition-colors cursor-pointer" >
                <div onClick={() => openDetail("representatives", rep.id)}>
                  <div className="flex items-start gap-3">
                    <Avatar initials={rep.avatarInitials} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground group-hover:text-[#4D8DFF] transition-colors">{rep.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{rep.companyName}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" /> {rep.country} <CountryFlag code={rep.countryCode} className="ml-0.5" />
                      </p>
                    </div>
                    <StatusBadge variant={rep.status === "Active" ? "success" : rep.status === "Pending Review" ? "warning" : "neutral"} dot>
                      {rep.status}
                    </StatusBadge>
                  </div>

                  {rep.rating > 0 && (
                    <div className="mt-2.5">
                      <Rating value={rep.rating} size="sm" />
                    </div>
                  )}

                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{rep.bio}</p>

                  {/* Territories */}
                  <div className="mt-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Territory coverage</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {rep.regions.slice(0, 4).map((region) => (
                        <span key={region} className="rounded bg-[#4D8DFF]/10 px-1.5 py-0 text-[10px] text-[#4D8DFF]">{region}</span>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mt-2">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Specializations</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {rep.specializations.slice(0, 3).map((s) => (
                        <span key={s} className="rounded bg-muted/40 px-1.5 py-0 text-[10px] text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Agreement + stats */}
                  <div className="mt-3 border-t border-border pt-2.5">
                    <div className="mb-2 flex items-center gap-2">
                      <StatusBadge variant="violet">{rep.agreementType}</StatusBadge>
                      <StatusBadge variant={rep.verificationLevel === "Enhanced Verified" ? "success" : rep.verificationLevel === "Basic Verified" ? "primary" : "warning"}>
                        {rep.verificationLevel}
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Leads</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground tabular-nums">{rep.activeLeads}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Closed</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground tabular-nums">{rep.closedDeals}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Earned</p>
                        <p className="mt-0.5 text-xs font-semibold text-[#8B7BFF] tabular-nums">${(rep.earnedCommissionUsd / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PageCard>
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function RepresentativeProfile({ repId }: { repId: string }) {
  const closeDetail = useAppStore((s) => s.closeDetail);
  const setView = useAppStore((s) => s.setView);
  const rep = getRepresentative(repId);

  if (!rep) return null;

  return (
    <PageContainer>
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={closeDetail} className="hover:text-foreground">← Back to representatives</button>
        <span>/</span>
        <span className="text-foreground">{rep.name}</span>
      </div>

      <PageCard className="mb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar initials={rep.avatarInitials} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{rep.name}</h1>
              <StatusBadge variant={rep.status === "Active" ? "success" : "warning"} dot>{rep.status}</StatusBadge>
              <StatusBadge variant={rep.verificationLevel === "Enhanced Verified" ? "success" : "primary"}>{rep.verificationLevel}</StatusBadge>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {rep.companyName}, {rep.country} <CountryFlag code={rep.countryCode} />
              <span className="mx-1">·</span>
              Joined {rep.joinedDate}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rep.bio}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded-md bg-[#4D8DFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0]">Assign lead</button>
            <button onClick={() => setView("commissions")} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">View commission</button>
          </div>
        </div>
      </PageCard>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Performance */}
        <PageCard>
          <SectionHeader title="Performance" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Rating</span>
              <Rating value={rep.rating} />
            </div>
            <MetricRow label="Active leads" value={String(rep.activeLeads)} barValue={rep.activeLeads} barMax={15} variant="primary" />
            <MetricRow label="Closed deals" value={String(rep.closedDeals)} barValue={rep.closedDeals} barMax={50} variant="success" />
            <MetricRow label="Coverage rate" value={`${rep.coverageRate}%`} barValue={rep.coverageRate} barMax={100} variant="accent" />
            <MetricRow label="Response time" value={`${rep.responseTimeHours}h`} barValue={Math.max(0, 24 - rep.responseTimeHours)} barMax={24} variant="violet" />
            <MetricRow label="References" value={String(rep.references)} barValue={rep.references} barMax={30} variant="warning" />
          </div>
        </PageCard>

        {/* Commission summary */}
        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Commission summary"
            subtitle="Estimated → Earned → Approved → Paid (immutable ledger)"
            actions={<button onClick={() => setView("commissions")} className="text-[11px] text-[#4D8DFF] hover:underline">Open ledger</button>}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Estimated", value: rep.estimatedCommissionUsd, color: "#8B7BFF" },
              { label: "Earned", value: rep.earnedCommissionUsd, color: "#F2B441" },
              { label: "Approved", value: rep.paidCommissionUsd + (rep.earnedCommissionUsd - rep.paidCommissionUsd) * 0.7, color: "#35D6C5" },
              { label: "Paid", value: rep.paidCommissionUsd, color: "#34D399" },
            ].map((m) => (
              <div key={m.label} className="rounded-md border border-border bg-background/40 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{m.label}</p>
                <p className="mt-1 text-lg font-bold tabular-nums" style={{ color: m.color }}>
                  ${Math.round(m.value / 1000)}K
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Commission pipeline</p>
            <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-[#34D399]" style={{ width: `${(rep.paidCommissionUsd / Math.max(rep.estimatedCommissionUsd, 1)) * 100}%` }} />
              <div className="bg-[#35D6C5]" style={{ width: `${((rep.earnedCommissionUsd - rep.paidCommissionUsd) / Math.max(rep.estimatedCommissionUsd, 1)) * 100}%` }} />
              <div className="bg-[#8B7BFF]" style={{ width: `${((rep.estimatedCommissionUsd - rep.earnedCommissionUsd) / Math.max(rep.estimatedCommissionUsd, 1)) * 100}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>Paid</span>
              <span>Approved</span>
              <span>Estimated</span>
            </div>
          </div>
        </PageCard>

        {/* Territory + agreement */}
        <PageCard>
          <SectionHeader title="Agreement" />
          <div className="space-y-2 text-xs">
            <Row label="Type" value={rep.agreementType} />
            <Row label="Contract start" value={rep.contractStart || "—"} />
            <Row label="Contract end" value={rep.contractEnd || "—"} />
            <Row label="Verification" value={rep.verificationLevel} />
            <Row label="References" value={String(rep.references)} />
            <Row label="Languages" value={rep.languages.join(", ")} />
          </div>
        </PageCard>

        {/* Territories */}
        <PageCard>
          <SectionHeader title="Territory coverage" />
          <div className="space-y-2">
            {rep.regions.map((region) => (
              <div key={region} className="flex items-center gap-2 rounded-md border border-border bg-background/40 p-2 text-xs">
                <Globe2 className="h-3.5 w-3.5 text-[#4D8DFF]" />
                <span className="font-medium text-foreground">{region}</span>
                <StatusBadge variant="success" className="ml-auto">Covered</StatusBadge>
              </div>
            ))}
          </div>
        </PageCard>

        {/* Industries */}
        <PageCard>
          <SectionHeader title="Industries" />
          <div className="flex flex-wrap gap-1.5">
            {rep.industries.map((ind) => (
              <span key={ind} className="rounded bg-[#35D6C5]/10 px-2 py-0.5 text-[11px] text-[#35D6C5]">{ind}</span>
            ))}
          </div>
          <SectionHeader title="Specializations" />
          <div className="flex flex-wrap gap-1.5">
            {rep.specializations.map((s) => (
              <span key={s} className="rounded bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground">{s}</span>
            ))}
          </div>
        </PageCard>
      </div>
    </PageContainer>
  );
}

function MetricRow({ label, value, barValue, barMax, variant }: { label: string; value: string; barValue: number; barMax: number; variant: "primary" | "accent" | "success" | "warning" | "danger" | "violet" }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground tabular-nums">{value}</span>
      </div>
      <div className="mt-1.5">
        <ProgressBar value={barValue} max={barMax} variant={variant} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
