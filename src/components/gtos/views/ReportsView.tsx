"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileBarChart,
  Clock,
  Download,
  Play,
  Calendar,
  Database,
  FileText,
  Search,
  ChevronUp,
  ChevronDown,
  Plus,
  Inbox,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState } from "@/components/gtos/shared/Primitives";
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

type ReportType = "Trade Volume" | "Supplier" | "RFQ Analytics" | "Commission" | "Verification" | "Risk" | "Geographic" | "Document SLA";
type Format = "CSV" | "PDF" | "XLSX" | "Dashboard";

interface Report {
  id: string;
  name: string;
  type: ReportType;
  dateRange: string;
  owner: string;
  lastRun: string;
  format: Format;
}

const reports: Report[] = [
  { id: "r-1", name: "Monthly trade volume by region", type: "Trade Volume", dateRange: "Oct 2026", owner: "M. van Dijk", lastRun: "2026-10-26 09:00", format: "PDF" },
  { id: "r-2", name: "Top suppliers by awarded value", type: "Supplier", dateRange: "YTD 2026", owner: "L. Hoffmann", lastRun: "2026-10-25 17:30", format: "XLSX" },
  { id: "r-3", name: "RFQ response time analysis", type: "RFQ Analytics", dateRange: "Q3 2026", owner: "A. Patel", lastRun: "2026-10-24 11:15", format: "Dashboard" },
  { id: "r-4", name: "Commission payouts YTD", type: "Commission", dateRange: "YTD 2026", owner: "D. Tan", lastRun: "2026-10-23 14:00", format: "CSV" },
  { id: "r-5", name: "Verification pipeline", type: "Verification", dateRange: "Last 30 days", owner: "M. Al Suwaidi", lastRun: "2026-10-22 08:45", format: "Dashboard" },
  { id: "r-6", name: "Supplier risk assessment", type: "Risk", dateRange: "Q4 2026 (rolling)", owner: "M. van Dijk", lastRun: "2026-10-21 16:20", format: "PDF" },
  { id: "r-7", name: "Geographic concentration report", type: "Geographic", dateRange: "Q3-Q4 2026", owner: "L. Hoffmann", lastRun: "2026-10-20 10:00", format: "PDF" },
  { id: "r-8", name: "Document processing SLA", type: "Document SLA", dateRange: "Last 30 days", owner: "K. Robinson", lastRun: "2026-10-19 13:30", format: "CSV" },
];

const typeFilters = ["All Types", "Trade Volume", "Supplier", "RFQ Analytics", "Commission", "Verification", "Risk", "Geographic", "Document SLA"];
const formatFilters = ["All Formats", "CSV", "PDF", "XLSX", "Dashboard"];

interface ScheduledExport {
  id: string;
  reportName: string;
  schedule: string;
  destination: "S3" | "Email" | "SFTP";
  nextRun: string;
  status: "Active" | "Paused" | "Error";
}

const scheduled: ScheduledExport[] = [
  { id: "se-1", reportName: "Daily deal stage snapshot", schedule: "Daily 09:00 UTC", destination: "S3", nextRun: "2026-10-27 09:00", status: "Active" },
  { id: "se-2", reportName: "Weekly commission ledger", schedule: "Weekly Monday 06:00", destination: "Email", nextRun: "2026-10-28 06:00", status: "Active" },
  { id: "se-3", reportName: "Monthly trade volume — finance", schedule: "Monthly 1st 08:00", destination: "SFTP", nextRun: "2026-11-01 08:00", status: "Active" },
  { id: "se-4", reportName: "Risk indicators digest", schedule: "Daily 18:00 UTC", destination: "Email", nextRun: "2026-10-26 18:00", status: "Paused" },
  { id: "se-5", reportName: "Document SLA — operations", schedule: "Weekly Friday 16:00", destination: "S3", nextRun: "2026-10-30 16:00", status: "Error" },
];

function formatVariant(f: Format) {
  if (f === "PDF") return "danger" as const;
  if (f === "CSV") return "success" as const;
  if (f === "XLSX") return "accent" as const;
  return "primary" as const;
}

function schedVariant(s: ScheduledExport["status"]) {
  if (s === "Active") return "success" as const;
  if (s === "Paused") return "warning" as const;
  return "danger" as const;
}

function destIcon(d: ScheduledExport["destination"]) {
  if (d === "S3") return Database;
  if (d === "Email") return Inbox;
  return FileText;
}

type SortField = "name" | "type" | "owner" | "lastRun" | "format";
type SortDir = "asc" | "desc";

export function ReportsView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [formatFilter, setFormatFilter] = useState("All Formats");
  const [sortField, setSortField] = useState<SortField>("lastRun");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filteredReports = useMemo(() => {
    let rows = reports.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All Types" || r.type === typeFilter;
      const matchFormat = formatFilter === "All Formats" || r.format === formatFilter;
      return matchSearch && matchType && matchFormat;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "lastRun") cmp = a.lastRun.localeCompare(b.lastRun);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, typeFilter, formatFilter, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  }
  function sortIcon(field: SortField) {
    if (sortField !== field) return null;
    return sortDir === "asc"
      ? <ChevronUp className="h-3 w-3 inline ml-1 text-[#4D8DFF]" />
      : <ChevronDown className="h-3 w-3 inline ml-1 text-[#4D8DFF]" />;
  }

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Reports & Exports"
        subtitle="Saved reports, scheduled exports, and analytics dashboards"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-3.5 w-3.5" /> Schedule export
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("intelligence")}>
              <Plus className="h-3.5 w-3.5" /> New report
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Saved Reports" value="12" delta={{ value: "+2", direction: "up" }} icon={FileBarChart} accent="primary" trend={[6, 7, 8, 9, 10, 11, 12]} hint="across 8 categories" />
        <KpiCard label="Scheduled Exports" value="5" delta={{ value: "stable", direction: "stable" }} icon={Clock} accent="accent" trend={[3, 4, 4, 5, 5, 5, 5]} hint="3 active, 1 paused, 1 error" />
        <KpiCard label="Recent Reports" value="3" delta={{ value: "+1", direction: "up" }} icon={Download} accent="violet" trend={[1, 1, 2, 2, 2, 3, 3]} hint="run in last 24h" />
        <KpiCard label="Auto-Generated (7d)" value="7" delta={{ value: "+2", direction: "up" }} icon={FileText} accent="warning" trend={[3, 4, 5, 5, 6, 6, 7]} hint="by scheduled exports" />
      </PageGrid>

      <PageCard>
        <SectionHeader
          title="Saved Reports"
          subtitle={`${filteredReports.length} of ${reports.length} reports`}
          actions={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-56 pl-8"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger size="sm" className="h-8 w-44">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeFilters.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger size="sm" className="h-8 w-36">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  {formatFilters.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          }
        />
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("name")}>
                Report name {sortIcon("name")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("type")}>
                Type {sortIcon("type")}
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Date range</TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("owner")}>
                Owner {sortIcon("owner")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("lastRun")}>
                Last run {sortIcon("lastRun")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("format")}>
                Format {sortIcon("format")}
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState title="No reports match" description="Try adjusting filters or search." icon={FileBarChart} />
                </TableCell>
              </TableRow>
            )}
            {filteredReports.map((r) => (
              <TableRow key={r.id} className="border-border hover:border-[#4D8DFF]/40">
                <TableCell className="text-sm font-medium text-foreground">{r.name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.type}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.dateRange}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.owner}</TableCell>
                <TableCell className="text-xs tabular-nums text-muted-foreground">{r.lastRun}</TableCell>
                <TableCell><StatusBadge variant={formatVariant(r.format)}>{r.format}</StatusBadge></TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Run" title="Run now">
                      <Play className="h-3.5 w-3.5 text-[#34D399]" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Schedule" title="Schedule">
                      <Calendar className="h-3.5 w-3.5 text-[#4D8DFF]" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Download CSV" title="Download CSV">
                      <Download className="h-3.5 w-3.5 text-[#34D399]" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Download PDF" title="Download PDF">
                      <FileText className="h-3.5 w-3.5 text-[#F45B6B]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>

      <PageCard>
        <SectionHeader
          title="Scheduled Exports"
          subtitle="Automated reports delivered to your destinations"
          actions={<StatusBadge variant="success" dot>{scheduled.filter((s) => s.status === "Active").length} active</StatusBadge>}
        />
        <PageGrid cols={3}>
          {scheduled.map((s, idx) => {
            const DestIcon = destIcon(s.destination);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4D8DFF]/10">
                      <Calendar className="h-4 w-4 text-[#4D8DFF]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.reportName}</p>
                      <p className="text-[11px] text-muted-foreground">{s.schedule}</p>
                    </div>
                  </div>
                  <StatusBadge variant={schedVariant(s.status)} dot>{s.status}</StatusBadge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <DestIcon className="h-3.5 w-3.5" /> {s.destination}
                  </span>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Next run</p>
                    <p className="text-xs font-medium tabular-nums text-foreground">{s.nextRun}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </PageGrid>
      </PageCard>
    </PageContainer>
  );
}
