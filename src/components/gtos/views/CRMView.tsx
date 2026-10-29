"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  StickyNote,
  FileText,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Inbox,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState, Avatar, ProgressBar } from "@/components/gtos/shared/Primitives";
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
import { crmActivities } from "@/lib/data/deals";

const typeMeta: Record<string, { icon: typeof Phone; color: string }> = {
  call: { icon: Phone, color: "#4D8DFF" },
  email: { icon: Mail, color: "#35D6C5" },
  meeting: { icon: Calendar, color: "#8B7BFF" },
  task: { icon: CheckSquare, color: "#F2B441" },
  note: { icon: StickyNote, color: "#A4B1C5" },
  rfq: { icon: FileText, color: "#34D399" },
  deal: { icon: Briefcase, color: "#F45B6B" },
};

const pipelineStages = [
  { stage: "Discovery", count: 8, color: "#A4B1C5" },
  { stage: "Qualification", count: 5, color: "#4D8DFF" },
  { stage: "RFQ", count: 3, color: "#35D6C5" },
  { stage: "Negotiation", count: 2, color: "#F2B441" },
  { stage: "Contract", count: 1, color: "#8B7BFF" },
  { stage: "Execution", count: 4, color: "#34D399" },
  { stage: "Shipment", count: 2, color: "#F45B6B" },
];

const tasksDueToday = [
  { id: "t-1", title: "Send framework agreement v4 to Meridian", assignee: "DT", time: "14:00", priority: "high" as const },
  { id: "t-2", title: "Confirm production slot Q1 2027 with RheinTech", assignee: "LH", time: "15:30", priority: "high" as const },
  { id: "t-3", title: "Schedule inspection scoping call with Kaiyo", assignee: "MS", time: "16:00", priority: "medium" as const },
  { id: "t-4", title: "Shortlist 3 quotations for food ingredients RFQ", assignee: "KR", time: "17:00", priority: "medium" as const },
  { id: "t-5", title: "Update weekly forecast — pump RFQ pipeline", assignee: "MD", time: "17:30", priority: "low" as const },
];

const typeFilters = ["All Types", "call", "email", "meeting", "task", "note", "rfq", "deal"];

type SortField = "date" | "type" | "party" | "owner";
type SortDir = "asc" | "desc";

function priorityVariant(p: "high" | "medium" | "low") {
  if (p === "high") return "danger" as const;
  if (p === "medium") return "warning" as const;
  return "info" as const;
}

export function CRMView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let rows = crmActivities.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.party.toLowerCase().includes(search.toLowerCase()) ||
        a.owner.toLowerCase().includes(search.toLowerCase()) ||
        (a.dealRef || "").toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All Types" || a.type === typeFilter;
      return matchSearch && matchType;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = a.date.localeCompare(b.date);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, typeFilter, sortField, sortDir]);

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

  const maxCount = Math.max(...pipelineStages.map((s) => s.count));

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Trade CRM"
        subtitle="Trade-focused pipeline, activity feed, and tasks for your account team"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-3.5 w-3.5" /> Pipeline view
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("deals")}>
              <Briefcase className="h-3.5 w-3.5" /> Open deals
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active Opportunities" value="12" delta={{ value: "+3", direction: "up" }} icon={TrendingUp} accent="primary" trend={[6, 7, 8, 9, 10, 11, 12]} hint="across 6 buyers" />
        <KpiCard label="Open Tasks" value="8" delta={{ value: "+2", direction: "up" }} icon={CheckSquare} accent="warning" trend={[4, 5, 5, 6, 6, 7, 8]} hint="5 due today" />
        <KpiCard label="Meetings This Week" value="5" delta={{ value: "+1", direction: "up" }} icon={Calendar} accent="violet" trend={[2, 3, 3, 4, 4, 4, 5]} hint="next 09:30 tomorrow" />
        <KpiCard label="Conversion Rate" value="28%" delta={{ value: "+4pp", direction: "up" }} icon={TrendingUp} accent="accent" trend={[18, 20, 22, 24, 25, 27, 28]} hint="Discovery → Won" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Activity Feed"
            subtitle={`${filtered.length} of ${crmActivities.length} activities`}
            actions={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search activity..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-48 pl-8"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger size="sm" className="h-8 w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeFilters.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            }
          />
          {filtered.length === 0 ? (
            <EmptyState title="No activities match" description="Try clearing filters." icon={Inbox} />
          ) : (
            <div className="space-y-1">
              <div className="mb-2 flex items-center justify-end text-[10px] text-muted-foreground">
                <button onClick={() => toggleSort("date")} className="mr-3 hover:text-foreground">Date {sortIcon("date")}</button>
                <button onClick={() => toggleSort("type")} className="mr-3 hover:text-foreground">Type {sortIcon("type")}</button>
                <button onClick={() => toggleSort("party")} className="mr-3 hover:text-foreground">Party {sortIcon("party")}</button>
                <button onClick={() => toggleSort("owner")} className="hover:text-foreground">Owner {sortIcon("owner")}</button>
              </div>
              {filtered.map((a, idx) => {
                const meta = typeMeta[a.type];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="flex items-start gap-3 rounded-lg border border-transparent p-3 hover:border-border hover:bg-card/40 transition-colors"
                    style={{ borderLeft: `2px solid ${meta.color}` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md" style={{ backgroundColor: `${meta.color}15` }}>
                      <Icon className="h-4 w-4" style={{ color: meta.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{a.type}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="tabular-nums">{a.date}</span>
                        <span>·</span>
                        <span className="font-medium text-foreground/80">{a.party}</span>
                        {a.dealRef && (
                          <>
                            <span>·</span>
                            <button
                              onClick={() => setView("deals")}
                              className="inline-flex items-center gap-1 font-medium text-[#4D8DFF] hover:underline"
                            >
                              {a.dealRef} <ArrowRight className="h-3 w-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Avatar initials={a.owner.split(" ").map((n) => n[0]).join("").slice(0, 2)} size="sm" />
                      <span className="text-[10px] text-muted-foreground">{a.owner.split(" ")[0]}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </PageCard>

        <div className="space-y-4">
          <PageCard>
            <SectionHeader title="Pipeline Summary" subtitle="Deal counts by stage" />
            <div className="space-y-3">
              {pipelineStages.map((s, idx) => (
                <motion.div
                  key={s.stage}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{s.stage}</span>
                    <span className="font-semibold tabular-nums text-foreground">{s.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(s.count / maxCount) * 100}%`, backgroundColor: s.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total active</p>
                  <p className="text-lg font-semibold tabular-nums text-foreground">{pipelineStages.reduce((a, s) => a + s.count, 0)}</p>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs text-[#4D8DFF]" onClick={() => setView("deals")}>
                  Open deals <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader title="Tasks Due Today" subtitle={`${tasksDueToday.length} tasks`} actions={<Clock className="h-4 w-4 text-[#F2B441]" />} />
            <div className="space-y-2">
              {tasksDueToday.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="flex items-start gap-2 rounded-lg border border-border bg-card/40 p-2.5 hover:border-[#4D8DFF]/40 transition-colors"
                >
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-border">
                    <CheckSquare className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground">{t.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar initials={t.assignee} size="sm" />
                      <span className="text-[10px] text-muted-foreground">{t.time}</span>
                      <StatusBadge variant={priorityVariant(t.priority)}>{t.priority}</StatusBadge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PageCard>
        </div>
      </div>
    </PageContainer>
  );
}
