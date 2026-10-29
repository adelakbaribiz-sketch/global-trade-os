"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Flag,
  ScrollText,
  ToggleLeft,
  Activity,
  Search,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, verificationBadge } from "@/components/gtos/shared/StatusBadge";
import { KpiCard } from "@/components/gtos/shared/KpiCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VerificationCase {
  id: string;
  company: string;
  type: string;
  submittedDate: string;
  analyst: string;
  status: "Under Review" | "Documents Requested" | "Awaiting Reference";
  priority: "P1" | "P2" | "P3";
}

const verificationCases: VerificationCase[] = [
  { id: "vc-1", company: "PortLight Trading FZE", type: "Enhanced Verification", submittedDate: "2026-10-22", analyst: "M. van Dijk", status: "Under Review", priority: "P1" },
  { id: "vc-2", company: "Sapphire Trading LLP", type: "Food Safety Audit", submittedDate: "2026-10-20", analyst: "K. Robinson", status: "Documents Requested", priority: "P2" },
  { id: "vc-3", company: "Asia cooperative supplier", type: "Sanctions Screening", submittedDate: "2026-10-25", analyst: "L. Hoffmann", status: "Awaiting Reference", priority: "P3" },
  { id: "vc-4", company: "London Trade Finance Partners", type: "Financial Standing", submittedDate: "2026-10-19", analyst: "D. Tan", status: "Under Review", priority: "P2" },
  { id: "vc-5", company: "Jebel Bonded Warehousing FZE", type: "Warehouse Inspection", submittedDate: "2026-10-18", analyst: "M. Al Suwaidi", status: "Documents Requested", priority: "P1" },
];

const repApprovals = [
  { id: "ra-1", name: "Hannah Schneider", company: "Schneider Trade Bridge", country: "Germany", submitted: "2026-10-24", status: "Pending Review" },
  { id: "ra-2", name: "Ahmed Khalifa", company: "Khalifa Trade Connect", country: "United Arab Emirates", submitted: "2026-10-23", status: "Pending Review" },
  { id: "ra-3", name: "Priya Subramanian", company: "Subramanian Trade Advisory", country: "Singapore", submitted: "2026-10-20", status: "Background check" },
];

const moderationItems = [
  { id: "mo-1", type: "RFQ flagged", target: "RFQ-2026-1158 (food ingredients)", reason: "Pricing outside market range", reportedBy: "Auto-moderation", severity: "medium" as const, status: "Open" },
  { id: "mo-2", type: "Supplier profile", target: "Asia cooperative supplier", reason: "Image missing trade licence", reportedBy: "User report", severity: "high" as const, status: "Open" },
];

const auditEvents = [
  { id: "ae-1", timestamp: "2026-10-26 14:23:11", actor: "m.vandijk@nordport", action: "deal.stage_changed", target: "D-2026-0193 (Negotiation → Contract)", ip: "84.105.x.x", result: "Success" },
  { id: "ae-2", timestamp: "2026-10-26 14:18:42", actor: "a.patel@elysian", action: "rfq.quotation_submitted", target: "Q-2026-0114 on RFQ-2026-1142", ip: "84.105.x.x", result: "Success" },
  { id: "ae-3", timestamp: "2026-10-26 13:55:08", actor: "system", action: "document.verified", target: "ISO 9001 — RheinTech", ip: "internal", result: "Success" },
  { id: "ae-4", timestamp: "2026-10-26 13:42:21", actor: "l.hoffmann@hoffmann-trade", action: "verification.doc_uploaded", target: "vc-1 (PortLight)", ip: "84.105.x.x", result: "Success" },
  { id: "ae-5", timestamp: "2026-10-26 12:48:53", actor: "system", action: "webhook.delivery_failed", target: "SAP S/4HANA (HTTP 500)", ip: "internal", result: "Failed" },
  { id: "ae-6", timestamp: "2026-10-26 12:32:18", actor: "d.tan@tan-bridge", action: "rfq.published", target: "RFQ-2026-1163", ip: "203.0.113.x", result: "Success" },
  { id: "ae-7", timestamp: "2026-10-26 11:14:09", actor: "system", action: "commission.approved", target: "AG-2026-0044 ($12,400)", ip: "internal", result: "Success" },
  { id: "ae-8", timestamp: "2026-10-26 10:55:02", actor: "k.robinson@sapphire", action: "user.login", target: "—", ip: "84.105.x.x", result: "Success" },
  { id: "ae-9", timestamp: "2026-10-26 09:11:33", actor: "m.vandijk@nordport", action: "user.login", target: "—", ip: "84.105.x.x", result: "Success" },
  { id: "ae-10", timestamp: "2026-10-26 08:00:00", actor: "system", action: "scheduler.export_run", target: "Daily deal snapshot", ip: "internal", result: "Success" },
];

const featureFlags = [
  { id: "ff-1", label: "AI Sourcing Copilot", description: "Conversational RFQ drafting & supplier shortlisting", on: true, env: "production" },
  { id: "ff-2", label: "Multi-currency commission", description: "Allows commission agreements in non-USD currencies", on: true, env: "production" },
  { id: "ff-3", label: "Trade Twin simulator", description: "What-if simulation for tariff & route scenarios", on: false, env: "beta" },
  { id: "ff-4", label: "Capacity Exchange", description: "Real-time supplier capacity listings & bookings", on: true, env: "production" },
  { id: "ff-5", label: "Standards-based EDI", description: "EDIFACT / X12 message exchange with ERPs", on: false, env: "beta" },
  { id: "ff-6", label: "Risk scoring v2", description: "ML-based supplier risk scoring model", on: true, env: "production" },
  { id: "ff-7", label: "Auto-NDA signing", description: "Auto-issue DocuSign NDAs on first RFQ invitation", on: false, env: "beta" },
  { id: "ff-8", label: "Webhooks v3", description: "Typed webhook payloads with HMAC signature", on: true, env: "production" },
];

const systemHealth = [
  { id: "sh-1", service: "API gateway", uptime: 99.99, latencyMs: 42, status: "Healthy" },
  { id: "sh-2", service: "Webhook dispatcher", uptime: 99.86, latencyMs: 184, status: "Healthy" },
  { id: "sh-3", service: "OCR pipeline", uptime: 99.92, latencyMs: 1240, status: "Healthy" },
  { id: "sh-4", service: "Risk scoring engine", uptime: 99.71, latencyMs: 312, status: "Degraded" },
  { id: "sh-5", service: "Trade intel crawler", uptime: 98.40, latencyMs: 4210, status: "Degraded" },
];

function vStatusVariant(s: string) {
  if (s === "Under Review") return "warning" as const;
  if (s === "Documents Requested") return "info" as const;
  return "violet" as const;
}
function priorityVariant(p: string) {
  if (p === "P1") return "danger" as const;
  if (p === "P2") return "warning" as const;
  return "neutral" as const;
}
function auditResultVariant(r: string) {
  if (r === "Success") return "success" as const;
  return "danger" as const;
}
function healthVariant(s: string) {
  if (s === "Healthy") return "success" as const;
  if (s === "Degraded") return "warning" as const;
  return "danger" as const;
}
function sevVariant(s: "high" | "medium" | "low") {
  if (s === "high") return "danger" as const;
  if (s === "medium") return "warning" as const;
  return "info" as const;
}

type SortField = "company" | "type" | "submittedDate" | "status" | "priority" | "analyst";
type SortDir = "asc" | "desc";

export function AdminView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortField, setSortField] = useState<SortField>("submittedDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [flags, setFlags] = useState<Record<string, boolean>>(
    featureFlags.reduce((acc, f) => ({ ...acc, [f.id]: f.on }), {})
  );

  const filteredCases = useMemo(() => {
    let rows = verificationCases.filter((c) => {
      const matchSearch = c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.analyst.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All Statuses" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "submittedDate") cmp = a.submittedDate.localeCompare(b.submittedDate);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, statusFilter, sortField, sortDir]);

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

  function toggleFlag(id: string) {
    setFlags((f) => ({ ...f, [id]: !f[id] }));
  }

  const statuses = ["All Statuses", "Under Review", "Documents Requested", "Awaiting Reference"];

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Administration"
        subtitle="Verification queue, audit log, moderation, and feature flags"
        actions={
          <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("settings")}>
            <ShieldCheck className="h-3.5 w-3.5" /> Workspace settings
          </Button>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Pending Verifications" value="5" delta={{ value: "+2", direction: "up" }} icon={ShieldCheck} accent="primary" trend={[2, 3, 3, 4, 4, 4, 5]} hint="2 P1 priority" />
        <KpiCard label="Pending Rep Approvals" value="1" delta={{ value: "stable", direction: "stable" }} icon={UserCheck} accent="accent" trend={[1, 1, 1, 1, 1, 1, 1]} hint="background check" />
        <KpiCard label="Moderation Queue" value="2" delta={{ value: "+1", direction: "up" }} icon={Flag} accent="warning" trend={[0, 1, 1, 1, 1, 1, 2]} hint="1 high severity" />
        <KpiCard label="Audit Events (24h)" value="1,284" delta={{ value: "+8%", direction: "up" }} icon={ScrollText} accent="violet" trend={[980, 1040, 1080, 1120, 1180, 1230, 1284]} hint="3 failed events" />
      </PageGrid>

      <PageCard>
        <Tabs defaultValue="verification">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="verification" className="text-xs">Verification Queue</TabsTrigger>
            <TabsTrigger value="representatives" className="text-xs">Representative Approvals</TabsTrigger>
            <TabsTrigger value="moderation" className="text-xs">Marketplace Moderation</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs">Audit Log</TabsTrigger>
            <TabsTrigger value="flags" className="text-xs">Feature Flags</TabsTrigger>
            <TabsTrigger value="health" className="text-xs">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="verification">
            <SectionHeader
              title="Verification Queue"
              subtitle={`${filteredCases.length} of ${verificationCases.length} cases pending`}
              actions={
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search cases..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-8 w-48 pl-8"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger size="sm" className="h-8 w-44">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              }
            />
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("company")}>
                    Company {sortIcon("company")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("type")}>
                    Type {sortIcon("type")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("submittedDate")}>
                    Submitted {sortIcon("submittedDate")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("analyst")}>
                    Analyst {sortIcon("analyst")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("status")}>
                    Status {sortIcon("status")}
                  </TableHead>
                  <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("priority")}>
                    Priority {sortIcon("priority")}
                  </TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <EmptyState title="No verification cases match" description="Try adjusting filters." icon={ShieldCheck} />
                    </TableCell>
                  </TableRow>
                )}
                {filteredCases.map((c) => (
                  <TableRow key={c.id} className="border-border hover:border-[#4D8DFF]/40">
                    <TableCell className="text-sm font-medium text-foreground">{c.company}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.type}</TableCell>
                    <TableCell className="text-xs tabular-nums text-muted-foreground">{c.submittedDate}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.analyst}</TableCell>
                    <TableCell><StatusBadge variant={vStatusVariant(c.status)} dot>{c.status}</StatusBadge></TableCell>
                    <TableCell><StatusBadge variant={priorityVariant(c.priority)}>{c.priority}</StatusBadge></TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs" title="Review">Review</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-[#F2B441]" title="Request docs">Docs</Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Approve">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Reject">
                          <XCircle className="h-3.5 w-3.5 text-[#F45B6B]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="representatives">
            <SectionHeader title="Representative Approvals" subtitle="Pending agent onboarding & background checks" />
            <div className="space-y-3">
              {repApprovals.map((r, idx) => {
                const { variant } = verificationBadge(r.status === "Pending Review" ? "Under Review" : "Information Submitted");
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="flex items-center justify-between rounded-lg border border-border bg-card/40 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4D8DFF]/30 bg-gradient-to-br from-[#18253A] to-[#0E1626] text-xs font-semibold text-[#4D8DFF]">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.company} · {r.country} · submitted {r.submitted}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge variant={variant} dot>{r.status}</StatusBadge>
                      <Button variant="outline" size="sm" className="h-8">Review application</Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="moderation">
            <SectionHeader title="Marketplace Moderation" subtitle="User-reported and auto-flagged items" />
            <div className="space-y-3">
              {moderationItems.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="rounded-lg border border-border bg-card/40 p-4"
                  style={{ borderLeft: `3px solid ${m.severity === "high" ? "#F45B6B" : "#F2B441"}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" style={{ color: m.severity === "high" ? "#F45B6B" : "#F2B441" }} />
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.type}</span>
                        <StatusBadge variant={sevVariant(m.severity)}>{m.severity}</StatusBadge>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-foreground">{m.target}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{m.reason} · reported by {m.reportedBy}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-[#34D399]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Dismiss
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-[#F45B6B]">
                        <XCircle className="h-3.5 w-3.5" /> Take down
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audit">
            <SectionHeader
              title="Audit Log"
              subtitle="Immutable event log of all platform activity (last 24h)"
              actions={<StatusBadge variant="info" dot>10 events shown</StatusBadge>}
            />
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Timestamp</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Actor</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Action</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Target</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">IP</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditEvents.map((e) => (
                  <TableRow key={e.id} className="border-border hover:border-[#4D8DFF]/40">
                    <TableCell className="text-[11px] tabular-nums text-muted-foreground">{e.timestamp}</TableCell>
                    <TableCell className="text-xs text-foreground">{e.actor}</TableCell>
                    <TableCell className="text-xs font-mono text-[#4D8DFF]">{e.action}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{e.target}</TableCell>
                    <TableCell className="text-[11px] tabular-nums text-muted-foreground">{e.ip}</TableCell>
                    <TableCell>
                      <StatusBadge variant={auditResultVariant(e.result)} dot>
                        {e.result}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="flags">
            <SectionHeader title="Feature Flags" subtitle="Toggle capabilities per environment" actions={<StatusBadge variant="info" dot>{Object.values(flags).filter(Boolean).length} on</StatusBadge>} />
            <div className="space-y-2">
              {featureFlags.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg border border-border bg-card/40 p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-md ${flags[f.id] ? "bg-[#4D8DFF]/10" : "bg-muted"}`}>
                      <ToggleLeft className={`h-4 w-4 ${flags[f.id] ? "text-[#4D8DFF]" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{f.label}</p>
                      <p className="text-xs text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant={f.env === "production" ? "success" : "violet"}>{f.env}</StatusBadge>
                    <Switch checked={flags[f.id]} onCheckedChange={() => toggleFlag(f.id)} />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health">
            <SectionHeader title="System Health" subtitle="Service uptime and latency (last 24h)" actions={<StatusBadge variant="success" dot>3 healthy · 2 degraded</StatusBadge>} />
            <PageGrid cols={3}>
              {systemHealth.map((h, idx) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#4D8DFF]" />
                      <p className="text-sm font-semibold text-foreground">{h.service}</p>
                    </div>
                    <StatusBadge variant={healthVariant(h.status)} dot>{h.status}</StatusBadge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Uptime</p>
                      <p className="text-sm font-semibold tabular-nums text-foreground">{h.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Avg latency</p>
                      <p className="text-sm font-semibold tabular-nums text-foreground">{h.latencyMs}ms</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </PageGrid>
          </TabsContent>
        </Tabs>
      </PageCard>
    </PageContainer>
  );
}
