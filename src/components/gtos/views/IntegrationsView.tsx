"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plug,
  Webhook,
  Activity,
  Zap,
  Search,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Settings as SettingsIcon,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
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

type IntegrationStatus = "Connected" | "Available" | "Beta" | "Sandbox only";

interface Integration {
  id: string;
  name: string;
  category: "ERP" | "CRM" | "Document" | "Verification" | "Logistics" | "Market Data";
  status: IntegrationStatus;
  description: string;
}

const integrations: Integration[] = [
  { id: "int-sap", name: "SAP S/4HANA", category: "ERP", status: "Connected", description: "Sync purchase orders, goods receipts, and invoices with SAP ERP." },
  { id: "int-oracle", name: "Oracle Fusion ERP", category: "ERP", status: "Available", description: "Bi-directional sync of POs, AP invoices, and supplier master data." },
  { id: "int-d365", name: "Microsoft Dynamics 365", category: "ERP", status: "Connected", description: "Supply chain and finance integration with D365 F&O / SCM." },
  { id: "int-salesforce", name: "Salesforce CRM", category: "CRM", status: "Connected", description: "Sync opportunities, contacts, and activity timeline to Salesforce." },
  { id: "int-hubspot", name: "HubSpot CRM", category: "CRM", status: "Available", description: "Contact sync and deal stage mirroring with HubSpot." },
  { id: "int-docusign", name: "DocuSign", category: "Document", status: "Connected", description: "Send contracts and quotations for legally-binding e-signature." },
  { id: "int-adobe", name: "Adobe Sign", category: "Document", status: "Available", description: "Alternative e-signature provider for contracts and NDAs." },
  { id: "int-kompass", name: "Kompass", category: "Verification", status: "Connected", description: "Enrich company profiles with verified Kompass business data." },
  { id: "int-dnb", name: "Dun & Bradstreet", category: "Verification", status: "Connected", description: "D-U-N-S verified company lookup and financial standing signals." },
  { id: "int-p44", name: "project44", category: "Logistics", status: "Beta", description: "Multi-modal shipment visibility and ETA predictions." },
  { id: "int-4k", name: "FourKites", category: "Logistics", status: "Sandbox only", description: "Real-time freight visibility and yard management integration." },
  { id: "int-panjiva", name: "Panjiva", category: "Market Data", status: "Connected", description: "Customs bill of lading data for supplier and buyer discovery." },
  { id: "int-importgenius", name: "ImportGenius", category: "Market Data", status: "Available", description: "Trade flow intelligence from customs records and shipment data." },
];

const categoryFilters = ["All Categories", "ERP", "CRM", "Document", "Verification", "Logistics", "Market Data"];

interface WebhookDelivery {
  id: string;
  endpoint: string;
  statusCode: number;
  latencyMs: number;
  timestamp: string;
  event: string;
}

const webhooks: WebhookDelivery[] = [
  { id: "wh-1", endpoint: "POST https://erp.nordport.example.com/gtos/webhook", statusCode: 200, latencyMs: 142, timestamp: "2026-10-26 14:23:11", event: "deal.stage_changed" },
  { id: "wh-2", endpoint: "POST https://crm.elysian.example.com/gtos/hook", statusCode: 200, latencyMs: 88, timestamp: "2026-10-26 14:18:42", event: "rfq.quotation_submitted" },
  { id: "wh-3", endpoint: "POST https://erp.rheintech.example.com/gtos/wh", statusCode: 422, latencyMs: 312, timestamp: "2026-10-26 13:55:08", event: "document.verified" },
  { id: "wh-4", endpoint: "POST https://sign.dnb.example.com/gtos/cb", statusCode: 200, latencyMs: 64, timestamp: "2026-10-26 13:42:21", event: "company.verification_updated" },
  { id: "wh-5", endpoint: "POST https://vis.p44.example.com/gtos/track", statusCode: 200, latencyMs: 510, timestamp: "2026-10-26 13:11:09", event: "order.tracking_updated" },
  { id: "wh-6", endpoint: "POST https://erp.nordport.example.com/gtos/webhook", statusCode: 500, latencyMs: 1240, timestamp: "2026-10-26 12:48:53", event: "commission.approved" },
  { id: "wh-7", endpoint: "POST https://crm.elysian.example.com/gtos/hook", statusCode: 200, latencyMs: 71, timestamp: "2026-10-26 12:32:18", event: "rfq.published" },
  { id: "wh-8", endpoint: "POST https://erp.d365.hudson.example.com/gtos/wh", statusCode: 200, latencyMs: 184, timestamp: "2026-10-26 12:14:00", event: "order.delivered" },
];

interface HealthCard {
  id: string;
  name: string;
  status: "Healthy" | "Degraded" | "Down";
  uptime: number;
  lastError: string;
  errorRate: number;
  trend: number[];
}

const healthCards: HealthCard[] = [
  { id: "h-1", name: "SAP S/4HANA", status: "Healthy", uptime: 99.98, lastError: "No errors in 14 days", errorRate: 0.02, trend: [2, 1, 0, 0, 1, 0, 0] },
  { id: "h-2", name: "DocuSign", status: "Healthy", uptime: 99.95, lastError: "Rate limit warning 3 days ago", errorRate: 0.05, trend: [3, 5, 2, 0, 1, 0, 0] },
  { id: "h-3", name: "project44", status: "Degraded", uptime: 98.40, lastError: "Intermittent 504 (timeout) on /track endpoint", errorRate: 1.6, trend: [12, 18, 22, 28, 24, 20, 18] },
  { id: "h-4", name: "Dun & Bradstreet", status: "Healthy", uptime: 99.91, lastError: "API key rotation warning", errorRate: 0.09, trend: [1, 0, 2, 1, 0, 0, 1] },
];

function statusVariant(s: IntegrationStatus) {
  if (s === "Connected") return "success" as const;
  if (s === "Available") return "primary" as const;
  if (s === "Beta") return "violet" as const;
  return "warning" as const;
}

function healthVariant(s: HealthCard["status"]) {
  if (s === "Healthy") return "success" as const;
  if (s === "Degraded") return "warning" as const;
  return "danger" as const;
}

function statusClass(code: number) {
  if (code >= 200 && code < 300) return "text-[#34D399] border-[#34D399]/30 bg-[#34D399]/10";
  if (code >= 400 && code < 500) return "text-[#F2B441] border-[#F2B441]/30 bg-[#F2B441]/10";
  return "text-[#F45B6B] border-[#F45B6B]/30 bg-[#F45B6B]/10";
}

type SortField = "endpoint" | "statusCode" | "latencyMs" | "timestamp";
type SortDir = "asc" | "desc";

export function IntegrationsView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const grouped = useMemo(() => {
    const filtered = integrations.filter((i) => {
      const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "All Categories" || i.category === catFilter;
      return matchSearch && matchCat;
    });
    const groups: Record<Integration["category"], Integration[]> = {
      ERP: [], CRM: [], Document: [], Verification: [], Logistics: [], "Market Data": [],
    };
    filtered.forEach((i) => groups[i.category].push(i));
    return groups;
  }, [search, catFilter]);

  const filteredWebhooks = useMemo(() => {
    let rows = webhooks.filter((w) => {
      const matchSearch = w.endpoint.toLowerCase().includes(search.toLowerCase()) ||
        w.event.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "latencyMs" || sortField === "statusCode") cmp = (a[sortField] as number) - (b[sortField] as number);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, sortField, sortDir]);

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

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Integrations"
        subtitle="ERP, CRM, e-signature, verification and logistics data integrations"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <ExternalLink className="h-3.5 w-3.5" /> API docs
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("settings")}>
              <SettingsIcon className="h-3.5 w-3.5" /> API keys
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Active Integrations" value="8" delta={{ value: "+1", direction: "up" }} icon={Plug} accent="primary" trend={[5, 6, 6, 7, 7, 7, 8]} hint="6 categories" />
        <KpiCard label="Webhook Deliveries (30d)" value="1,247" delta={{ value: "+182", direction: "up" }} icon={Webhook} accent="accent" trend={[28, 34, 41, 38, 44, 47, 52]} hint="98.4% success rate" />
        <KpiCard label="API Calls (30d)" value="38.4K" delta={{ value: "+12%", direction: "up" }} icon={Zap} accent="violet" trend={[820, 910, 1040, 1180, 1290, 1340, 1410]} hint="avg. 142ms latency" />
        <KpiCard label="Health Incidents" value="2" delta={{ value: "+1", direction: "up" }} icon={AlertTriangle} accent="warning" trend={[0, 0, 1, 1, 1, 2, 2]} hint="p44 degraded" />
      </PageGrid>

      <div className="grid gap-4 lg:grid-cols-5">
        <PageCard className="lg:col-span-3">
          <SectionHeader
            title="Integration Catalog"
            subtitle={`${integrations.length} integrations · grouped by category`}
            actions={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search integrations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-48 pl-8"
                  />
                </div>
                <Select value={catFilter} onValueChange={setCatFilter}>
                  <SelectTrigger size="sm" className="h-8 w-44">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryFilters.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            }
          />
          <div className="space-y-5">
            {(Object.keys(grouped) as Integration["category"][]).map((cat) => {
              const items = grouped[cat];
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{cat}</h3>
                    <span className="text-[10px] text-muted-foreground/60">({items.length})</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {items.map((int, idx) => (
                      <motion.div
                        key={int.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.03 }}
                        className="rounded-lg border border-border bg-card/40 p-3 hover:border-[#4D8DFF]/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4D8DFF]/10">
                              <Plug className="h-3.5 w-3.5 text-[#4D8DFF]" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">{int.name}</p>
                          </div>
                          <StatusBadge variant={statusVariant(int.status)} dot>{int.status}</StatusBadge>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{int.description}</p>
                        <div className="mt-3 flex items-center justify-end">
                          {int.status === "Connected" ? (
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-[#4D8DFF]">
                              Configure <ChevronRight className="h-3 w-3" />
                            </Button>
                          ) : int.status === "Available" ? (
                            <Button size="sm" className="h-7 bg-[#4D8DFF] hover:bg-[#3a7af0] text-xs">Connect</Button>
                          ) : (
                            <Button variant="outline" size="sm" className="h-7 text-xs">View docs</Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </PageCard>

        <PageCard className="lg:col-span-2">
          <SectionHeader
            title="Recent Webhook Deliveries"
            subtitle={`${filteredWebhooks.length} most recent`}
            actions={<StatusBadge variant="info" dot>Live</StatusBadge>}
          />
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("endpoint")}>
                  Endpoint {sortIcon("endpoint")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("statusCode")}>
                  Code {sortIcon("statusCode")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("latencyMs")}>
                  Latency {sortIcon("latencyMs")}
                </TableHead>
                <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("timestamp")}>
                  Timestamp {sortIcon("timestamp")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWebhooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <EmptyState title="No webhooks match" description="Try clearing filters." icon={Webhook} />
                  </TableCell>
                </TableRow>
              )}
              {filteredWebhooks.map((w) => (
                <TableRow key={w.id} className="border-border hover:border-[#4D8DFF]/40">
                  <TableCell className="max-w-[220px]">
                    <p className="truncate text-[11px] text-muted-foreground">{w.endpoint}</p>
                    <p className="text-[10px] text-muted-foreground/70">{w.event}</p>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded border px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${statusClass(w.statusCode)}`}>
                      {w.statusCode}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-xs tabular-nums text-foreground/80">{w.latencyMs}ms</TableCell>
                  <TableCell className="text-right text-[11px] tabular-nums text-muted-foreground">{w.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PageCard>
      </div>

      <PageCard>
        <SectionHeader
          title="Integration Health"
          subtitle="Real-time status, uptime, and error rate trend (7-day)"
          actions={<StatusBadge variant="success" dot>3 healthy · 1 degraded</StatusBadge>}
        />
        <PageGrid cols={4}>
          {healthCards.map((h, idx) => (
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
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                </div>
                <StatusBadge variant={healthVariant(h.status)} dot>{h.status}</StatusBadge>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-semibold tabular-nums text-foreground">{h.uptime}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Error rate</span>
                  <span className={`font-semibold tabular-nums ${h.errorRate > 1 ? "text-[#F45B6B]" : h.errorRate > 0.1 ? "text-[#F2B441]" : "text-[#34D399]"}`}>
                    {h.errorRate}%
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {h.status === "Healthy" ? <CheckCircle2 className="mr-1 inline h-3 w-3 text-[#34D399]" /> : <AlertTriangle className="mr-1 inline h-3 w-3 text-[#F2B441]" />}
                {h.lastError}
              </p>
              <div className="mt-3 flex h-6 items-end gap-0.5">
                {h.trend.map((v, i) => {
                  const max = Math.max(...h.trend, 1);
                  const pct = (v / max) * 100;
                  const color = v === 0 ? "bg-[#34D399]" : v > 10 ? "bg-[#F45B6B]" : "bg-[#F2B441]";
                  return (
                    <div key={i} className={`flex-1 rounded-sm ${color}`} style={{ height: `${Math.max(pct, 6)}%` }} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </PageGrid>
      </PageCard>
    </PageContainer>
  );
}
