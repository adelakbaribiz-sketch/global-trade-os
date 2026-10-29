"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Target,
  Users,
  Factory,
  Boxes,
  Wrench,
  ChevronRight,
  Eye,
  Bookmark,
  Globe2,
  Lock,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { SectionHeader, CountryFlag, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { opportunities, type OpportunityType } from "@/lib/data/opportunities";
import { companyCategories, countries } from "@/lib/data/companies";

const typeFilters: { value: OpportunityType | "All"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "All", label: "All Types", icon: Globe2 },
  { value: "Buy RFQ", label: "Buy RFQ", icon: Target },
  { value: "Supply Offer", label: "Supply Offer", icon: Factory },
  { value: "Distribution", label: "Distribution", icon: Users },
  { value: "Capacity", label: "Capacity", icon: Boxes },
  { value: "Contract Manufacturing", label: "Contract Mfg", icon: Wrench },
];

export function MarketplaceView() {
  const openDetail = useAppStore((s) => s.openDetail);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<OpportunityType | "All">("All");
  const [category, setCategory] = useState("All Categories");
  const [origin, setOrigin] = useState("All Countries");
  const [savedOnly, setSavedOnly] = useState(false);

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (type !== "All" && o.type !== type) return false;
      if (category !== "All Categories" && o.category !== category) return false;
      if (origin !== "All Countries" && o.origin !== origin) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${o.title} ${o.description} ${o.tags.join(" ")} ${o.postedBy}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, type, category, origin]);

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Global Trade Marketplace</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover verified commercial opportunities across products, manufacturing, distribution, capacity, and trade services worldwide.
        </p>
      </div>

      {/* KPI strip */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Open Opportunities" value={String(opportunities.filter(o => o.status === "Open").length)} icon={Target} accent="primary" hint="Updated 1h ago" />
        <KpiCard label="Total applicants" value={String(opportunities.reduce((s, o) => s + o.applicants, 0))} icon={Users} accent="accent" hint="Across all opportunities" />
        <KpiCard label="Closing this week" value="2" icon={Clock} accent="warning" hint="Action required" />
        <KpiCard label="Verified buyers" value="100%" icon={CheckCircle2} accent="success" hint="Buyer verification mandatory" />
      </div>

      {/* Filter bar */}
      <PageCard className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities, products, suppliers…"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#4D8DFF]/50 focus:outline-none focus:ring-1 focus:ring-[#4D8DFF]/30"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:border-[#4D8DFF]/50 focus:outline-none"
            >
              {companyCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="rounded-md border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:border-[#4D8DFF]/50 focus:outline-none"
            >
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={() => setSavedOnly(!savedOnly)}
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs font-medium transition-colors ${
                savedOnly
                  ? "border-[#4D8DFF]/40 bg-[#4D8DFF]/10 text-[#4D8DFF]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bookmark className="h-3 w-3" /> Saved
            </button>
          </div>
        </div>

        {/* Type pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {typeFilters.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  type === t.value
                    ? "bg-[#4D8DFF] text-white"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-3 w-3" />
                {t.label}
              </button>
            );
          })}
        </div>
      </PageCard>

      {/* Results count */}
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {filtered.length} of {opportunities.length} opportunities
        </span>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <Filter className="h-3 w-3" /> Sort: Latest first
        </button>
      </div>

      {/* Opportunity grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No opportunities match your filters"
          description="Try adjusting the filters or search query."
          icon={Search}
          action={<button onClick={() => { setQuery(""); setType("All"); setCategory("All Categories"); setOrigin("All Countries"); }} className="rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:border-[#4D8DFF]/40">Reset filters</button>}
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <PageCard className="group h-full p-4 hover:border-[#4D8DFF]/40 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <StatusBadge variant="primary">{opp.type}</StatusBadge>
                      <StatusBadge variant={opp.status === "Open" ? "success" : opp.status === "Closing Soon" ? "warning" : "neutral"} dot>
                        {opp.status}
                      </StatusBadge>
                      {opp.confidentiality !== "Public" && (
                        <StatusBadge variant="violet"><Lock className="h-2.5 w-2.5" /> {opp.confidentiality}</StatusBadge>
                      )}
                    </div>
                    <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-[#4D8DFF] transition-colors cursor-pointer" onClick={() => openDetail("marketplace", opp.id)}>
                      {opp.title}
                    </p>
                  </div>
                  <button className="rounded p-1 text-muted-foreground hover:text-[#4D8DFF]">
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground line-clamp-3">
                  {opp.description}
                </p>

                {/* Tags */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {opp.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded bg-muted/40 px-1.5 py-0 text-[10px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Spec grid */}
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-border bg-background/40 p-2.5">
                  <Spec label="Quantity" value={`${opp.quantity} ${opp.unit}`} />
                  <Spec label="Target price" value={opp.targetPrice} />
                  <Spec label="Lead time" value={`${opp.leadTimeDays} days`} />
                  <Spec label="Incoterms" value={opp.incoterms} />
                  <Spec label="Min order" value={opp.minOrderQty} />
                  <Spec label="Closing" value={opp.closingDate} />
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <CountryFlag code={opp.postedBy.includes("Nordport") ? "NL" : opp.postedBy.includes("Elysian") ? "GB" : opp.postedBy.includes("PortLight") ? "AE" : opp.postedBy.includes("Meridian") ? "SG" : opp.postedBy.includes("Tidewater") || opp.postedBy.includes("Hudson") ? "US" : "GB"} />
                    <span className="truncate">{opp.postedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {opp.applicants}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {opp.saved}</span>
                  </div>
                </div>

                <button
                  onClick={() => openDetail("marketplace", opp.id)}
                  className="mt-2.5 flex w-full items-center justify-center gap-1 rounded-md border border-border bg-card/60 py-1.5 text-[11px] font-medium text-foreground hover:border-[#4D8DFF]/40 hover:bg-card transition-colors"
                >
                  View details
                  <ChevronRight className="h-3 w-3" />
                </button>
              </PageCard>
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{label}</p>
      <p className="mt-0.5 truncate text-[11px] font-medium text-foreground">{value}</p>
    </div>
  );
}
