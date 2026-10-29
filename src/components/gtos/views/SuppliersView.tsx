"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Factory,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowUpDown,
  MapPin,
  Globe2,
  Clock,
  TrendingUp,
  Award,
  Eye,
  FileText,
  X,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, CountryFlag, Rating, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, verificationBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { companies, companyCategories, countries, getCompany } from "@/lib/data/companies";
import type { Company, CompanyType } from "@/lib/data/companies";

interface Props {
  mode: "suppliers" | "buyers";
}

export function SuppliersView({}: Props) {
  return <CompanyDirectory mode="suppliers" />;
}

export function BuyersView() {
  return <CompanyDirectory mode="buyers" />;
}

function CompanyDirectory({ mode }: { mode: "suppliers" | "buyers" }) {
  const openDetail = useAppStore((s) => s.openDetail);
  const detailId = useAppStore((s) => s.detailId);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [verification, setVerification] = useState("All");
  const [sortField, setSortField] = useState<"rating" | "tradeVolumeUsd" | "responseTimeHours" | "name">("tradeVolumeUsd");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const targetType: CompanyType[] = mode === "suppliers"
    ? ["Supplier", "Buyer & Supplier"]
    : ["Buyer", "Buyer & Supplier"];

  const filtered = useMemo(() => {
    let list = companies.filter((c) => targetType.includes(c.type));
    if (category !== "All Categories") list = list.filter((c) => c.category === category);
    if (country !== "All Countries") list = list.filter((c) => c.country === country);
    if (verification !== "All") list = list.filter((c) => c.verification === verification);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((c) =>
        `${c.name} ${c.city} ${c.country} ${c.industry} ${c.tags.join(" ")}`.toLowerCase().includes(q),
      );
    }
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else cmp = (a[sortField] as number) - (b[sortField] as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [query, category, country, verification, sortField, sortDir, targetType]);

  // If detailId is set, show company profile
  if (detailId) {
    const company = getCompany(detailId);
    if (company) return <CompanyProfile company={company} />;
  }

  const totalVolume = filtered.reduce((s, c) => s + c.tradeVolumeUsd, 0);
  const enhancedCount = filtered.filter((c) => c.verification === "Enhanced Verification Complete").length;

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {mode === "suppliers" ? "Find Suppliers" : "Find Buyers"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "suppliers"
            ? "Verified international manufacturers, distributors, and contract manufacturing partners."
            : "Verified international procurement organizations, importers, and distribution partners."}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label={mode === "suppliers" ? "Verified Suppliers" : "Verified Buyers"} value={String(filtered.length)} icon={mode === "suppliers" ? Factory : Users} accent="primary" hint="In current filter" />
        <KpiCard label="Enhanced Verified" value={String(enhancedCount)} icon={ShieldCheck} accent="success" hint={`${Math.round((enhancedCount / Math.max(filtered.length, 1)) * 100)}% of filter`} />
        <KpiCard label="Total trade volume" value={`$${(totalVolume / 1e6).toFixed(1)}M`} icon={TrendingUp} accent="accent" hint="USD attributed" />
        <KpiCard label="Avg. response time" value={`${Math.round(filtered.reduce((s, c) => s + c.responseTimeHours, 0) / Math.max(filtered.length, 1))}h`} icon={Clock} accent="warning" hint="Across directory" />
      </div>

      {/* Filter bar */}
      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${mode} by name, industry, capability…`}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none focus:ring-1 focus:ring-[#4D8DFF]/30"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              {companyCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={verification} onChange={(e) => setVerification(e.target.value)} className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground">
              <option>All</option>
              <option>Enhanced Verification Complete</option>
              <option>Basic Verification Complete</option>
              <option>Under Review</option>
            </select>
          </div>
        </div>
      </PageCard>

      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{filtered.length} {mode}</span>
        <div className="flex items-center gap-3">
          <button onClick={() => { setSortDir(sortDir === "asc" ? "desc" : "asc"); }} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowUpDown className="h-3 w-3" /> {sortDir === "asc" ? "Ascending" : "Descending"}
          </button>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
            className="rounded border border-border bg-background px-2 py-1 text-[11px] text-foreground"
          >
            <option value="tradeVolumeUsd">Trade volume</option>
            <option value="rating">Rating</option>
            <option value="responseTimeHours">Response time</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={`No ${mode} match your filters`}
          description="Try adjusting the filters or search query."
          icon={Search}
          action={<button onClick={() => { setQuery(""); setCategory("All Categories"); setCountry("All Countries"); setVerification("All"); }} className="rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:border-[#4D8DFF]/40">Reset filters</button>}
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((company, i) => {
            const vb = verificationBadge(company.verification);
            const Icon = vb.icon;
            return (
              <motion.div key={company.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                <PageCard className="group h-full p-4 hover:border-[#4D8DFF]/40 transition-colors cursor-pointer" >
                  <div onClick={() => openDetail(mode === "suppliers" ? "suppliers" : "buyers", company.id)}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#18253A] to-[#0E1626] text-sm font-bold text-[#4D8DFF]">
                        {company.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground group-hover:text-[#4D8DFF] transition-colors">{company.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin className="h-2.5 w-2.5" /> {company.city}, {company.country} <CountryFlag code={company.countryCode} className="ml-0.5" />
                        </p>
                      </div>
                      <StatusBadge variant={vb.variant} dot><Icon className="h-2.5 w-2.5" /></StatusBadge>
                    </div>

                    <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{company.description}</p>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {company.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-muted/40 px-1.5 py-0 text-[10px] text-muted-foreground">{t}</span>
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-2.5 text-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Rating</p>
                        <p className="mt-0.5 text-xs font-semibold text-[#F2B441]">{company.rating.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Volume</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground tabular-nums">${(company.tradeVolumeUsd / 1e6).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70">Response</p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground tabular-nums">{company.responseTimeHours}h</p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {company.certifications.slice(0, 2).map((c) => (
                        <span key={c} className="flex items-center gap-1 rounded border border-[#34D399]/30 bg-[#34D399]/5 px-1.5 py-0 text-[9px] text-[#34D399]">
                          <Award className="h-2 w-2" /> {c}
                        </span>
                      ))}
                      {company.certifications.length > 2 && (
                        <span className="rounded px-1.5 py-0 text-[9px] text-muted-foreground">+{company.certifications.length - 2}</span>
                      )}
                    </div>
                  </div>
                </PageCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

function CompanyProfile({ company }: { company: Company }) {
  const { closeDetail, setView, openDetail } = useAppStore();
  const vb = verificationBadge(company.verification);
  const Icon = vb.icon;

  return (
    <PageContainer>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={closeDetail} className="hover:text-foreground">← Back to directory</button>
        <span>/</span>
        <span className="text-foreground">{company.name}</span>
      </div>

      <PageCard className="mb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#18253A] to-[#0E1626] text-xl font-bold text-[#4D8DFF]">
            {company.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{company.name}</h1>
              <StatusBadge variant={vb.variant} dot><Icon className="h-2.5 w-2.5" /> {company.verification}</StatusBadge>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {company.city}, {company.country} <CountryFlag code={company.countryCode} />
              <span className="mx-1">·</span>
              <Globe2 className="h-3 w-3" /> {company.website}
              <span className="mx-1">·</span>
              Founded {company.foundedYear}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{company.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {company.tags.map((t) => (
                <span key={t} className="rounded bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded-md bg-[#4D8DFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0]">Send RFQ</button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">Bookmark</button>
            <button onClick={() => setView("rfqs")} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-[#4D8DFF]/40">Invite to RFQ</button>
          </div>
        </div>
      </PageCard>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Performance metrics */}
        <PageCard>
          <SectionHeader title="Performance" />
          <div className="space-y-3">
            <Metric label="Rating" value={`${company.rating.toFixed(1)} / 5.0`} ratingValue={company.rating} />
            <Metric label="Trade volume (USD)" value={`$${(company.tradeVolumeUsd / 1e6).toFixed(1)}M`} barValue={company.tradeVolumeUsd} barMax={30000000} variant="accent" />
            <Metric label="On-time delivery" value={`${company.onTimeDelivery}%`} barValue={company.onTimeDelivery} barMax={100} variant="success" />
            <Metric label="Response time" value={`${company.responseTimeHours}h`} barValue={Math.max(0, 24 - company.responseTimeHours)} barMax={24} variant="primary" />
            <Metric label="Open deals" value={String(company.openDeals)} barValue={company.openDeals} barMax={15} variant="violet" />
          </div>
        </PageCard>

        {/* Verification details */}
        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Verification — Trade Passport"
            subtitle="What was checked, when, and by which source"
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {company.verificationChecks.map((c) => {
              const statusConfig = {
                passed: { variant: "success" as const, icon: ShieldCheck, label: c.date ?? "Passed" },
                pending: { variant: "warning" as const, icon: Clock, label: "Pending" },
                expired: { variant: "danger" as const, icon: Clock, label: "Expired" },
                not_required: { variant: "neutral" as const, icon: X, label: "N/A" },
              }[c.status];
              const CheckIcon = statusConfig.icon;
              return (
                <div key={c.label} className="flex items-center gap-2.5 rounded-md border border-border bg-background/40 p-2.5">
                  <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-${statusConfig.variant === "success" ? "[#34D399]" : statusConfig.variant === "warning" ? "[#F2B441]" : statusConfig.variant === "danger" ? "[#F45B6B]" : "[#A4B1C5]"}/10`}>
                    <CheckIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground">{statusConfig.label}</p>
                  </div>
                  <StatusBadge variant={statusConfig.variant}>{c.status}</StatusBadge>
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-md border border-[#F2B441]/30 bg-[#F2B441]/5 p-2.5 text-[11px] text-muted-foreground">
            <strong className="text-[#F2B441]">Transparency note:</strong> Self-reported information is always distinguished from verified facts. Verification does not constitute a guarantee of business performance.
          </div>
        </PageCard>

        {/* Capabilities */}
        {company.capabilities && (
          <PageCard>
            <SectionHeader title="Capabilities" />
            <ul className="space-y-2">
              {company.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#4D8DFF]" /> <span>{cap}</span>
                </li>
              ))}
            </ul>
          </PageCard>
        )}

        {/* Certifications */}
        <PageCard>
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {company.certifications.map((c) => (
              <div key={c} className="flex items-center gap-2 rounded-md border border-[#34D399]/30 bg-[#34D399]/5 p-2 text-xs text-foreground">
                <Award className="h-3.5 w-3.5 text-[#34D399]" /> <span>{c}</span>
              </div>
            ))}
          </div>
        </PageCard>

        {/* Commercial terms */}
        <PageCard>
          <SectionHeader title="Commercial Terms" />
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Preferred Incoterms</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {company.preferredIncoterms.map((t) => (
                  <span key={t} className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Payment terms</p>
              <div className="mt-1 space-y-1">
                {company.preferredPaymentTerms.map((t) => (
                  <p key={t} className="rounded border border-border bg-background px-2 py-1 text-[11px] text-foreground">{t}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Languages</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {company.languages.map((l) => (
                  <span key={l} className="rounded bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </PageContainer>
  );
}

function Metric({
  label,
  value,
  ratingValue,
  barValue,
  barMax,
  variant = "primary",
}: {
  label: string;
  value: string;
  ratingValue?: number;
  barValue?: number;
  barMax?: number;
  variant?: "primary" | "accent" | "success" | "warning" | "danger" | "violet";
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {ratingValue !== undefined ? (
          <Rating value={ratingValue} size="sm" />
        ) : (
          <span className="text-xs font-semibold text-foreground tabular-nums">{value}</span>
        )}
      </div>
      {barValue !== undefined && barMax !== undefined && (
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${
              variant === "primary" ? "bg-[#4D8DFF]" :
              variant === "accent" ? "bg-[#35D6C5]" :
              variant === "success" ? "bg-[#34D399]" :
              variant === "warning" ? "bg-[#F2B441]" :
              variant === "danger" ? "bg-[#F45B6B]" : "bg-[#8B7BFF]"
            }`}
            style={{ width: `${Math.min(100, (barValue / barMax) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
