"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileCheck2,
  ClipboardList,
  ShieldCheck,
  Search,
  Download,
  Eye,
  RefreshCw,
  AlertTriangle,
  Clock,
  CalendarClock,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  FileWarning,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState, ProgressBar } from "@/components/gtos/shared/Primitives";
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

type DocStatus = "Verified" | "Pending Review" | "Action Required" | "Expired";

interface TradeDoc {
  id: string;
  name: string;
  type: string;
  linkedRef: string;
  linkedType: "RFQ" | "Deal";
  uploadedBy: string;
  version: string;
  status: DocStatus;
  uploadedDate: string;
  sizeKb: number;
}

const documents: TradeDoc[] = [
  { id: "doc-001", name: "Commercial Invoice — Pump Order #001", type: "Commercial Invoice", linkedRef: "D-2026-0193", linkedType: "Deal", uploadedBy: "RheinTech Industries", version: "v1", status: "Verified", uploadedDate: "2026-10-26", sizeKb: 184 },
  { id: "doc-002", name: "Packing List — Pump Shipment", type: "Packing List", linkedRef: "D-2026-0193", linkedType: "Deal", uploadedBy: "RheinTech Industries", version: "v2", status: "Pending Review", uploadedDate: "2026-10-26", sizeKb: 92 },
  { id: "doc-003", name: "Certificate of Origin — DE", type: "Certificate of Origin", linkedRef: "D-2026-0193", linkedType: "Deal", uploadedBy: "TÜV SÜD", version: "v1", status: "Verified", uploadedDate: "2026-10-24", sizeKb: 56 },
  { id: "doc-004", name: "Pre-Shipment Inspection Report", type: "Inspection Report", linkedRef: "D-2026-0188", linkedType: "Deal", uploadedBy: "Kaiyo Marine Services", version: "v3", status: "Pending Review", uploadedDate: "2026-10-25", sizeKb: 412 },
  { id: "doc-005", name: "Master Supply Agreement — Medical PCBs", type: "Contract", linkedRef: "D-2026-0188", linkedType: "Deal", uploadedBy: "Legal (Elysian)", version: "v4", status: "Verified", uploadedDate: "2026-10-26", sizeKb: 728 },
  { id: "doc-006", name: "EN 1090 CE Compliance Certificate", type: "Certificate of Origin", linkedRef: "D-2026-0201", linkedType: "Deal", uploadedBy: "Vega Industries", version: "v1", status: "Action Required", uploadedDate: "2026-10-25", sizeKb: 88 },
  { id: "doc-007", name: "RFQ-2026-1142 Specification Pack", type: "Specification", linkedRef: "RFQ-2026-1142", linkedType: "RFQ", uploadedBy: "M. van Dijk", version: "v3", status: "Verified", uploadedDate: "2026-10-15", sizeKb: 1240 },
  { id: "doc-008", name: "ISO 9001 Certificate — Vega Industries", type: "Compliance", linkedRef: "co-vega-industries", linkedType: "RFQ", uploadedBy: "Vega Industries", version: "v1", status: "Expired", uploadedDate: "2024-06-30", sizeKb: 64 },
];

const consistencyIssues = [
  {
    id: "c-1",
    severity: "high" as const,
    title: "Packing list quantity mismatch",
    detail: "Packing list shows 4,980 units; commercial invoice shows 5,000 units (delta: 20 units / 0.4%).",
    affectedDocs: ["Commercial Invoice — Pump Order #001", "Packing List — Pump Shipment"],
  },
  {
    id: "c-2",
    severity: "medium" as const,
    title: "Certificate of origin missing on shipment docs",
    detail: "Certificate of origin (DE) is linked to deal but not present in the shipment doc pack for PO-2026-0089.",
    affectedDocs: ["Shipment Doc Pack PO-2026-0089"],
  },
  {
    id: "c-3",
    severity: "low" as const,
    title: "Incoterms inconsistency",
    detail: "Commercial invoice states DAP Rotterdam; draft contract references CIP Rotterdam. Verify before countersign.",
    affectedDocs: ["Commercial Invoice — Pump Order #001", "Master Supply Agreement v4"],
  },
  {
    id: "c-4",
    severity: "medium" as const,
    title: "Inspection report references outdated PO revision",
    detail: "Kaiyo inspection report cites PO-2026-0089 rev 2; current rev is 3 (dated 2026-10-26).",
    affectedDocs: ["Pre-Shipment Inspection Report"],
  },
];

const expiringCerts = [
  { id: "e-1", name: "ISO 9001 — Vega Industries", ref: "co-vega-industries", expiryDate: "2026-11-28", daysRemaining: 12, totalDays: 90 },
  { id: "e-2", name: "ISO 13485 — Meridian Manufacturing", ref: "co-meridian-mfg", expiryDate: "2026-12-04", daysRemaining: 18, totalDays: 90 },
  { id: "e-3", name: "BRCGS Storage — Sapphire Trading LLP", ref: "co-sapphirespice", expiryDate: "2027-01-15", daysRemaining: 60, totalDays: 90 },
];

const docTypes = [
  "All Types",
  "Commercial Invoice",
  "Packing List",
  "Certificate of Origin",
  "Inspection Report",
  "Contract",
  "Specification",
  "Compliance",
];

const statuses = ["All Statuses", "Verified", "Pending Review", "Action Required", "Expired"];

function docStatusVariant(status: DocStatus) {
  switch (status) {
    case "Verified": return "success" as const;
    case "Pending Review": return "warning" as const;
    case "Action Required": return "danger" as const;
    case "Expired": return "danger" as const;
    default: return "neutral" as const;
  }
}

function consistencySeverityColor(sev: "high" | "medium" | "low") {
  if (sev === "high") return "#F45B6B";
  if (sev === "medium") return "#F2B441";
  return "#4D8DFF";
}

type SortField = "name" | "type" | "uploadedBy" | "version" | "status" | "uploadedDate";
type SortDir = "asc" | "desc";

export function DocumentsView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortField, setSortField] = useState<SortField>("uploadedDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let rows = documents.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.linkedRef.toLowerCase().includes(search.toLowerCase()) ||
        d.uploadedBy.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All Types" || d.type === typeFilter;
      const matchStatus = statusFilter === "All Statuses" || d.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "uploadedDate") cmp = a.uploadedDate.localeCompare(b.uploadedDate);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, typeFilter, statusFilter, sortField, sortDir]);

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
        title="Trade Document Intelligence"
        subtitle="OCR-processed trade documents, cross-document consistency checks, and expiry tracking"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <RefreshCw className="h-3.5 w-3.5" /> Re-run OCR
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("rfqs")}>
              <FileText className="h-3.5 w-3.5" /> Upload document
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Total Documents" value="47" delta={{ value: "+6", direction: "up" }} icon={FileText} accent="primary" trend={[8, 9, 10, 12, 11, 14, 15]} hint="across 14 active deals" />
        <KpiCard label="Pending Review" value="8" delta={{ value: "+2", direction: "up" }} icon={Clock} accent="warning" trend={[3, 4, 5, 6, 7, 6, 8]} hint="avg. review time 3.4h" />
        <KpiCard label="Expired Soon" value="2" delta={{ value: "−1", direction: "down" }} icon={CalendarClock} accent="danger" trend={[4, 3, 3, 2, 2, 2, 2]} hint="within 30 days" />
        <KpiCard label="OCR Processed" value="38" delta={{ value: "+5", direction: "up" }} icon={ShieldCheck} accent="accent" trend={[20, 24, 28, 30, 32, 35, 38]} hint="81% of total" />
      </PageGrid>

      <PageCard>
        <SectionHeader
          title="Documents"
          subtitle="Sortable, filterable list of all uploaded trade documents"
          actions={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search docs, RFQ, deal..."
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
                  {docTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger size="sm" className="h-8 w-40">
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
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("name")}>
                Document name {sortIcon("name")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("type")}>
                Type {sortIcon("type")}
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Linked RFQ / Deal</TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("uploadedBy")}>
                Uploaded by {sortIcon("uploadedBy")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("version")}>
                Version {sortIcon("version")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("status")}>
                Status {sortIcon("status")}
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState title="No documents found" description="Try adjusting your search query or filters." icon={FileText} />
                </TableCell>
              </TableRow>
            )}
            {filtered.map((doc) => (
              <TableRow key={doc.id} className="border-border hover:border-[#4D8DFF]/40">
                <TableCell className="max-w-[280px]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/40">
                      <FileText className="h-3.5 w-3.5 text-[#4D8DFF]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{doc.sizeKb} KB · uploaded {doc.uploadedDate}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{doc.type}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setView(doc.linkedType === "Deal" ? "deals" : "rfqs")}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#4D8DFF] hover:underline"
                  >
                    {doc.linkedRef} <ArrowRight className="h-3 w-3" />
                  </button>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{doc.uploadedBy}</TableCell>
                <TableCell className="text-xs tabular-nums text-foreground/80">{doc.version}</TableCell>
                <TableCell>
                  <StatusBadge variant={docStatusVariant(doc.status)} dot>
                    {doc.status}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="View">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Re-verify">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Download">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <PageCard>
          <SectionHeader
            title="Cross-document consistency checks"
            subtitle="AI-detected discrepancies across related trade documents"
            actions={<StatusBadge variant="warning" dot>{consistencyIssues.length} issues</StatusBadge>}
          />
          <div className="space-y-3">
            {consistencyIssues.map((issue, idx) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="rounded-lg border border-border bg-card/40 p-3"
                style={{ borderLeft: `3px solid ${consistencySeverityColor(issue.severity)}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileWarning className="h-3.5 w-3.5" style={{ color: consistencySeverityColor(issue.severity) }} />
                      <p className="text-sm font-medium text-foreground">{issue.title}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{issue.detail}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {issue.affectedDocs.map((d) => (
                        <span key={d} className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <StatusBadge variant={issue.severity === "high" ? "danger" : issue.severity === "medium" ? "warning" : "info"}>
                    {issue.severity}
                  </StatusBadge>
                </div>
              </motion.div>
            ))}
          </div>
        </PageCard>

        <PageCard>
          <SectionHeader
            title="Expiration tracking"
            subtitle="Quality & compliance certificates nearing renewal"
            actions={<StatusBadge variant="warning" dot>{expiringCerts.length} soon</StatusBadge>}
          />
          <div className="space-y-4">
            {expiringCerts.map((cert, idx) => {
              const pct = (cert.daysRemaining / cert.totalDays) * 100;
              const variant = cert.daysRemaining <= 14 ? "danger" : cert.daysRemaining <= 30 ? "warning" : "primary";
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="rounded-lg border border-border bg-card/40 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#4D8DFF]" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{cert.name}</p>
                        <p className="text-[11px] text-muted-foreground">ref: {cert.ref}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium tabular-nums text-foreground">{cert.daysRemaining} days</p>
                      <p className="text-[10px] text-muted-foreground">expires {cert.expiryDate}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <ProgressBar value={pct} variant={variant} />
                    <span className="w-12 text-right text-[10px] tabular-nums text-muted-foreground">
                      {Math.round(pct)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </PageCard>
      </div>
    </PageContainer>
  );
}
