"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Clock,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  MapPin,
  Users,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState, ProgressBar } from "@/components/gtos/shared/Primitives";
import { StatusBadge, riskBadge } from "@/components/gtos/shared/StatusBadge";
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
import { riskIndicators } from "@/lib/data/intelligence";

const severityColors: Record<string, string> = {
  high: "#F45B6B",
  medium: "#F2B441",
  low: "#4D8DFF",
};

interface DependencyRow {
  id: string;
  buyer: string;
  supplier: string;
  category: string;
  pct: number;
  risk: "high" | "medium" | "low";
}

const dependencies: DependencyRow[] = [
  { id: "d-1", buyer: "Nordport Logistics", supplier: "RheinTech Industries", category: "Industrial Pumps", pct: 100, risk: "high" },
  { id: "d-2", buyer: "Elysian Procurement", supplier: "Meridian Manufacturing", category: "Medical PCB Assembly", pct: 92, risk: "high" },
  { id: "d-3", buyer: "PortLight Trading", supplier: "Vega Industries", category: "Structural Steel", pct: 65, risk: "medium" },
  { id: "d-4", buyer: "Sapphire Trading", supplier: "Asia cooperative supplier", category: "Food Ingredients", pct: 48, risk: "low" },
];

const severityFilters = ["All Severities", "high", "medium", "low"];
const typeFilters = ["All Types", "Supplier Dependency", "Geographic Concentration", "Lead Time", "Document Expiry", "Sanctions", "Logistics"];

export function RiskView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All Severities");
  const [type, setType] = useState("All Types");

  const filtered = useMemo(() => {
    return riskIndicators.filter((r) => {
      const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.affected.toLowerCase().includes(search.toLowerCase());
      const matchSev = severity === "All Severities" || r.severity === severity;
      const matchType = type === "All Types" || r.type === type;
      return matchSearch && matchSev && matchType;
    });
  }, [search, severity, type]);

  const stats = useMemo(() => {
    const open = riskIndicators.filter((r) => r.status === "Open").length;
    const mitigated = riskIndicators.filter((r) => r.status === "Mitigated").length;
    const monitoring = riskIndicators.filter((r) => r.status === "Monitoring").length;
    return { open, mitigated, monitoring };
  }, []);

  function statusVariant(status: string) {
    if (status === "Open") return "danger" as const;
    if (status === "Mitigated") return "success" as const;
    if (status === "Monitoring") return "warning" as const;
    return "neutral" as const;
  }

  function depRiskVariant(risk: string) {
    if (risk === "high") return "danger" as const;
    if (risk === "medium") return "warning" as const;
    return "info" as const;
  }

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Risk & Resilience"
        subtitle="Supply-chain risk indicators, dependency mapping and mitigation tracking"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-3.5 w-3.5" /> Export risk report
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("intelligence")}>
              <TrendingUp className="h-3.5 w-3.5" /> View intelligence
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Open Risks" value={String(stats.open)} delta={{ value: "+1", direction: "up" }} icon={ShieldAlert} accent="danger" trend={[1, 2, 2, 2, 3, 3, 3]} hint="needs action" />
        <KpiCard label="Mitigated" value={String(stats.mitigated)} delta={{ value: "stable", direction: "stable" }} icon={ShieldCheck} accent="accent" trend={[0, 0, 1, 1, 1, 1, 1]} hint="this quarter" />
        <KpiCard label="Monitoring" value={String(stats.monitoring)} delta={{ value: "+1", direction: "up" }} icon={Activity} accent="warning" trend={[0, 1, 1, 1, 1, 1, 1]} hint="watch list" />
        <KpiCard label="Avg. Resolution" value="8 days" delta={{ value: "−2d", direction: "down" }} icon={Clock} accent="primary" trend={[12, 11, 10, 10, 9, 9, 8]} hint="MTTR Q4 2026" />
      </PageGrid>

      <div className="grid gap-4 lg:grid-cols-5">
        <PageCard className="lg:col-span-3">
          <SectionHeader
            title="Risk Indicators"
            subtitle={`${filtered.length} of ${riskIndicators.length} active`}
            actions={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search risks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-48 pl-8"
                  />
                </div>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger size="sm" className="h-8 w-36">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityFilters.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger size="sm" className="h-8 w-44">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeFilters.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            }
          />
          <div className="space-y-3">
            {filtered.length === 0 && (
              <EmptyState title="No risk indicators match your filters" description="All clear — try widening filters to see monitored risks." icon={ShieldCheck} />
            )}
            {filtered.map((risk, idx) => {
              const { variant, icon: Icon } = riskBadge(risk.severity);
              const border = severityColors[risk.severity];
              return (
                <motion.div
                  key={risk.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
                  style={{ borderLeft: `3px solid ${border}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-3.5 w-3.5" style={{ color: border }} />}
                        <StatusBadge variant={variant} dot>{risk.severity.toUpperCase()}</StatusBadge>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{risk.type}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-foreground">{risk.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{risk.description}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-md border border-border bg-muted/30 p-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Affected</p>
                          <p className="mt-0.5 text-xs font-medium text-foreground">{risk.affected}</p>
                        </div>
                        <div className="rounded-md border border-border bg-muted/30 p-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recommendation</p>
                          <p className="mt-0.5 text-xs text-foreground/90">{risk.recommendation}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> detected {risk.detected}
                        </span>
                        <span>·</span>
                        <StatusBadge variant={statusVariant(risk.status)}>{risk.status}</StatusBadge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </PageCard>

        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Supplier Dependency Map"
            subtitle="Buyer→supplier spend concentration by category"
            actions={<StatusBadge variant="warning" dot>{dependencies.length} mapped</StatusBadge>}
          />
          <div className="space-y-4">
            {dependencies.map((d, idx) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="rounded-lg border border-border bg-card/40 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Users className="h-3 w-3 text-[#4D8DFF]" />
                      <span className="font-medium text-foreground truncate">{d.buyer}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <ArrowRight className="h-3 w-3" /> {d.supplier}
                    </div>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/70">{d.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-foreground">{d.pct}%</p>
                    <StatusBadge variant={depRiskVariant(d.risk)} className="mt-1">{d.risk} risk</StatusBadge>
                  </div>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    value={d.pct}
                    variant={d.risk === "high" ? "danger" : d.risk === "medium" ? "warning" : "primary"}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </PageCard>
      </div>
    </PageContainer>
  );
}
