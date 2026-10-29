"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  AlertTriangle,
  Truck,
  Target,
  Calendar,
  Search,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Sparkles,
  Newspaper,
  Database,
  Globe2,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState, CountryFlag } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tradeIntelRecords, countryCoverage } from "@/lib/data/intelligence";

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "365d", label: "Last 12 months" },
];

const categoryStyles: Record<string, { variant: "primary" | "accent" | "warning" | "danger" | "violet" | "info"; icon: typeof Activity }> = {
  "Demand Trend": { variant: "primary", icon: TrendingUp },
  "Supply Alert": { variant: "warning", icon: AlertTriangle },
  "Route Disruption": { variant: "danger", icon: Truck },
  "Capacity Alert": { variant: "warning", icon: Activity },
  "Category Trend": { variant: "violet", icon: TrendingUp },
  "Procurement Opportunity": { variant: "accent", icon: Target },
};

function sourceTypeIcon(type: string) {
  if (type === "Public Trade Data") return Database;
  if (type === "Platform Data") return Activity;
  if (type === "Industry News") return Newspaper;
  return Globe2;
}

function confidenceVariant(c: string) {
  if (c === "High") return "success" as const;
  if (c === "Medium") return "warning" as const;
  return "neutral" as const;
}

const savedDashboards = [
  { id: "sd-1", title: "EU Pump Demand Monitor", description: "Tracks EU water treatment tender volume + pump RFQ pipeline weekly", lastUpdated: "2 hours ago", records: 4 },
  { id: "sd-2", title: "Asia-EU Freight & Route Risk", description: "Suez / Cape rerouting alerts and freight rate benchmark deltas", lastUpdated: "1 day ago", records: 7 },
  { id: "sd-3", title: "SG EMS Capacity Watch", description: "Singapore EMS pre-booked capacity & lead-time extension signals", lastUpdated: "3 days ago", records: 5 },
];

const regions = ["All Regions", "EU", "APAC", "MENA", "NA"];

type SortField = "name" | "region" | "buyers" | "suppliers" | "activeDeals" | "tradeVolumeUsd";
type SortDir = "asc" | "desc";

export function IntelligenceView() {
  const setView = useAppStore((s) => s.setView);
  const [dateRange, setDateRange] = useState("90d");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [sortField, setSortField] = useState<SortField>("tradeVolumeUsd");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filteredRecords = useMemo(() => {
    return tradeIntelRecords.filter((r) => {
      const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === "All Regions" ||
        (r.affectedRegions || []).some((ar) => ar.toLowerCase().includes(region.toLowerCase()));
      return matchSearch && matchRegion;
    });
  }, [search, region]);

  const filteredCoverage = useMemo(() => {
    let rows = countryCoverage.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === "All Regions" || c.region === region;
      return matchSearch && matchRegion;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name" || sortField === "region") cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      else cmp = (a[sortField] as number) - (b[sortField] as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, region, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }

  function sortIcon(field: SortField) {
    if (sortField !== field) return null;
    return sortDir === "asc"
      ? <ChevronUp className="h-3 w-3 inline ml-1 text-[#4D8DFF]" />
      : <ChevronDown className="h-3 w-3 inline ml-1 text-[#4D8DFF]" />;
  }

  const trendCounts = useMemo(() => {
    const up = countryCoverage.filter((c) => c.trend === "up").length;
    const down = countryCoverage.filter((c) => c.trend === "down").length;
    const stable = countryCoverage.filter((c) => c.trend === "stable").length;
    return { up, down, stable };
  }, []);

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Trade Intelligence"
        subtitle="Demand, supply, route & capacity signals from verified trade data sources"
        actions={
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger size="sm" className="h-8 w-40">
                <Calendar className="h-3.5 w-3.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]">
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Active Trends" value="12" delta={{ value: "+3", direction: "up" }} icon={TrendingUp} accent="primary" trend={[6, 7, 8, 9, 10, 11, 12]} hint="across 6 categories" />
        <KpiCard label="Route Disruptions" value="1 active" delta={{ value: "stable", direction: "stable" }} icon={Truck} accent="danger" trend={[2, 2, 1, 1, 1, 1, 1]} hint="Red Sea (Asia→EU)" />
        <KpiCard label="Capacity Alerts" value="3" delta={{ value: "+1", direction: "up" }} icon={AlertTriangle} accent="warning" trend={[1, 2, 2, 3, 3, 3, 3]} hint="SG EMS, base oil, pumps" />
        <KpiCard label="Procurement Opportunities" value="5" delta={{ value: "+2", direction: "up" }} icon={Target} accent="accent" trend={[2, 3, 3, 4, 4, 5, 5]} hint="EU pumps, GCC steel" />
      </PageGrid>

      <div className="grid gap-4 lg:grid-cols-5">
        <PageCard className="lg:col-span-3">
          <SectionHeader
            title="Trade Intelligence Feed"
            subtitle={`${filteredRecords.length} records · curated from public data, platform data & news`}
            actions={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search intelligence..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-48 pl-8"
                  />
                </div>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger size="sm" className="h-8 w-36">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            }
          />
          <div className="space-y-3">
            {filteredRecords.length === 0 && (
              <EmptyState title="No intelligence records match your filters" description="Try widening the date range or clearing filters." icon={Activity} />
            )}
            {filteredRecords.map((rec, idx) => {
              const style = categoryStyles[rec.category] || { variant: "info" as const, icon: Activity };
              const SourceIcon = sourceTypeIcon(rec.sourceType);
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <style.icon className="h-4 w-4 text-[#4D8DFF]" />
                      <StatusBadge variant={style.variant} dot>{rec.category}</StatusBadge>
                    </div>
                    <StatusBadge variant={confidenceVariant(rec.confidence)}>{rec.confidence} confidence</StatusBadge>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{rec.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rec.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <SourceIcon className="h-3 w-3" /> {rec.sourceType}
                    </span>
                    <span>·</span>
                    <span>{rec.freshness}</span>
                    <span>·</span>
                    <span>coverage: {rec.coverage}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </PageCard>

        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Coverage Map"
            subtitle={`${filteredCoverage.length} countries · ${trendCounts.up} up, ${trendCounts.stable} stable, ${trendCounts.down} down`}
            actions={
              <Button variant="outline" size="sm" className="h-8" onClick={() => setView("risk")}>
                <Globe2 className="h-3.5 w-3.5" /> Open risk
              </Button>
            }
          />
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("name")}>
                  Country {sortIcon("name")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("region")}>
                  Region {sortIcon("region")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("buyers")}>
                  Buyers {sortIcon("buyers")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("suppliers")}>
                  Suppliers {sortIcon("suppliers")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("activeDeals")}>
                  Deals {sortIcon("activeDeals")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("tradeVolumeUsd")}>
                  Trade Vol. {sortIcon("tradeVolumeUsd")}
                </TableHead>
                <TableHead className="text-center text-xs uppercase tracking-wider text-muted-foreground">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoverage.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState title="No country matches" description="Adjust filters to view coverage." icon={Globe2} />
                  </TableCell>
                </TableRow>
              )}
              {filteredCoverage.map((c) => {
                const TrendIcon = c.trend === "up" ? TrendingUp : c.trend === "down" ? TrendingDown : Minus;
                const trendColor = c.trend === "up" ? "text-[#34D399]" : c.trend === "down" ? "text-[#F45B6B]" : "text-muted-foreground";
                return (
                  <TableRow key={c.code} className="border-border hover:border-[#4D8DFF]/40">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CountryFlag code={c.code} className="text-base" />
                        <span className="text-sm font-medium text-foreground">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.region}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums text-foreground">{c.buyers}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums text-foreground">{c.suppliers}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums text-foreground">{c.activeDeals}</TableCell>
                    <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                      ${(c.tradeVolumeUsd / 1_000_000).toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-center">
                      <TrendIcon className={`mx-auto h-3.5 w-3.5 ${trendColor}`} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </PageCard>
      </div>

      <PageCard>
        <SectionHeader
          title="Saved Intelligence Dashboards"
          subtitle="Curated monitoring views your team has pinned"
          actions={<Button variant="outline" size="sm" className="h-8"><Bookmark className="h-3.5 w-3.5" /> Save current</Button>}
        />
        <PageGrid cols={3}>
          {savedDashboards.map((d, idx) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4D8DFF]/10">
                  <Sparkles className="h-4 w-4 text-[#4D8DFF]" />
                </div>
                <StatusBadge variant="primary" dot>{d.records} records</StatusBadge>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{d.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Updated {d.lastUpdated}</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#4D8DFF] hover:text-[#3a7af0]">
                  Open <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </PageGrid>
      </PageCard>
    </PageContainer>
  );
}

