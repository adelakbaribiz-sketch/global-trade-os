"use client";

import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Boxes,
  ClipboardCheck,
  PackageCheck,
  Search,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Ship,
  Plane,
  Train,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState } from "@/components/gtos/shared/Primitives";
import { StatusBadge, stageBadge } from "@/components/gtos/shared/StatusBadge";
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
import { orders } from "@/lib/data/deals";

const statusSegments = [
  { status: "Awaiting Contract", count: 1, color: "#A4B1C5" },
  { status: "In Production", count: 1, color: "#4D8DFF" },
  { status: "Ready for Shipment", count: 1, color: "#35D6C5" },
  { status: "In Transit", count: 1, color: "#8B7BFF" },
  { status: "Customs Clearance", count: 1, color: "#F2B441" },
  { status: "Delivered", count: 1, color: "#34D399" },
  { status: "Closed", count: 0, color: "#26364C" },
];

function shipmentModeIcon(mode: string) {
  if (mode.toLowerCase().includes("air")) return Plane;
  if (mode.toLowerCase().includes("rail") || mode.toLowerCase().includes("train")) return Train;
  if (mode.toLowerCase().includes("breakbulk") || mode.toLowerCase().includes("fcl") || mode.toLowerCase().includes("lcl") || mode.toLowerCase().includes("ocean")) return Ship;
  return Truck;
}

const milestonesForStatus = (status: string, ref: string) => {
  const base = [
    { label: "PO issued", done: true, current: false },
    { label: "Production", done: status !== "Awaiting Contract", current: status === "In Production" },
    { label: "Ready for shipment", done: ["Ready for Shipment", "In Transit", "Customs Clearance", "Delivered", "Closed"].includes(status), current: status === "Ready for Shipment" },
    { label: "In transit", done: ["In Transit", "Customs Clearance", "Delivered", "Closed"].includes(status), current: status === "In Transit" },
    { label: "Customs", done: ["Customs Clearance", "Delivered", "Closed"].includes(status), current: status === "Customs Clearance" },
    { label: "Delivered", done: ["Delivered", "Closed"].includes(status), current: status === "Delivered" },
    { label: "Closed", done: status === "Closed", current: status === "Closed" },
  ];
  return base.map((b, i) => ({ ...b, key: `${ref}-${i}` }));
};

const statusFilters = [
  "All Statuses",
  "Awaiting Contract",
  "In Production",
  "Ready for Shipment",
  "In Transit",
  "Customs Clearance",
  "Delivered",
  "Closed",
];

type SortField = "reference" | "buyer" | "supplier" | "valueUsd" | "status" | "poDate" | "expectedDelivery";
type SortDir = "asc" | "desc";

export function OrdersView() {
  const setView = useAppStore((s) => s.setView);
  const openDetail = useAppStore((s) => s.openDetail);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("poDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let rows = orders.filter((o) => {
      const matchSearch = o.reference.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer.toLowerCase().includes(search.toLowerCase()) ||
        o.supplier.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All Statuses" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "valueUsd") cmp = a.valueUsd - b.valueUsd;
      else if (sortField === "poDate" || sortField === "expectedDelivery") cmp = a[sortField].localeCompare(b[sortField]);
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

  const upcoming = useMemo(() => {
    return [...orders]
      .filter((o) => ["In Transit", "Customs Clearance", "Ready for Shipment"].includes(o.status))
      .sort((a, b) => a.expectedDelivery.localeCompare(b.expectedDelivery))
      .slice(0, 4);
  }, []);

  const totalStatusCount = statusSegments.reduce((a, s) => a + s.count, 0);

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Orders & Deliveries"
        subtitle="Track purchase orders through production, shipment, customs, and delivery"
        actions={
          <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("deals")}>
            <Boxes className="h-3.5 w-3.5" /> Open deal rooms
          </Button>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Active POs" value={String(orders.length)} delta={{ value: "+1", direction: "up" }} icon={Truck} accent="primary" trend={[2, 3, 3, 4, 4, 4, 5]} hint="across 6 routes" />
        <KpiCard label="In Transit" value="1" delta={{ value: "stable", direction: "stable" }} icon={Ship} accent="violet" trend={[1, 1, 1, 1, 1, 1, 1]} hint="Houston→Rotterdam" />
        <KpiCard label="Awaiting Customs" value="1" delta={{ value: "+1", direction: "up" }} icon={ClipboardCheck} accent="warning" trend={[0, 0, 1, 1, 1, 1, 1]} hint="Mumbai→Manchester" />
        <KpiCard label="Delivered (month)" value="8" delta={{ value: "+3", direction: "up" }} icon={PackageCheck} accent="accent" trend={[3, 4, 5, 6, 7, 7, 8]} hint="Oct 2026" />
      </PageGrid>

      <PageCard>
        <SectionHeader
          title="Status pipeline"
          subtitle={`${totalStatusCount} active orders distributed across the delivery lifecycle`}
        />
        <div className="flex h-3 w-full overflow-hidden rounded-full border border-border bg-muted">
          {statusSegments.map((s) => {
            const pct = totalStatusCount > 0 ? (s.count / totalStatusCount) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={s.status}
                className="h-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: s.color }}
                title={`${s.status}: ${s.count}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {statusSegments.map((s) => (
            <div key={s.status} className="flex items-center gap-1.5 text-[11px]">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground">{s.status}</span>
              <span className="font-semibold tabular-nums text-foreground">{s.count}</span>
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard>
        <SectionHeader
          title="Orders"
          subtitle={`${filtered.length} of ${orders.length} POs`}
          actions={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search PO, buyer, supplier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-64 pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger size="sm" className="h-8 w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          }
        />
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("reference")}>
                PO reference {sortIcon("reference")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("buyer")}>
                Buyer {sortIcon("buyer")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("supplier")}>
                Supplier {sortIcon("supplier")}
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Description</TableHead>
              <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("valueUsd")}>
                Value (USD) {sortIcon("valueUsd")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("status")}>
                Status {sortIcon("status")}
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Origin → Destination</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Mode</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Tracking</TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("poDate")}>
                PO date {sortIcon("poDate")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("expectedDelivery")}>
                Expected {sortIcon("expectedDelivery")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={11}>
                  <EmptyState title="No orders match your filters" description="Try widening filters or clearing search." icon={Truck} />
                </TableCell>
              </TableRow>
            )}
            {filtered.map((o) => {
              const ModeIcon = shipmentModeIcon(o.shipmentMode);
              const isExpanded = expanded === o.id;
              return (
                <Fragment key={o.id}>
                  <TableRow
                    className="cursor-pointer border-border hover:border-[#4D8DFF]/40"
                    onClick={() => setExpanded(isExpanded ? null : o.id)}
                  >
                    <TableCell className="text-xs font-medium text-[#4D8DFF]">
                      <div className="flex items-center gap-1.5">
                        {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        {o.reference}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.buyer}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.supplier}</TableCell>
                    <TableCell className="max-w-[180px] text-xs text-foreground/80">
                      <span className="truncate">{o.description}</span>
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold tabular-nums text-foreground">
                      ${o.valueUsd.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge variant={stageBadge(o.status)} dot>{o.status}</StatusBadge>
                    </TableCell>
                    <TableCell className="text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        {o.originPort} <ArrowRight className="h-3 w-3" /> {o.destinationPort}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <ModeIcon className="h-3.5 w-3.5" /> {o.shipmentMode}
                      </span>
                    </TableCell>
                    <TableCell className="text-[11px] tabular-nums text-muted-foreground">
                      {o.trackingRef || "—"}
                    </TableCell>
                    <TableCell className="text-[11px] tabular-nums text-muted-foreground">{o.poDate}</TableCell>
                    <TableCell className="text-right text-[11px] tabular-nums text-muted-foreground">{o.expectedDelivery}</TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="border-b border-border bg-muted/20">
                      <TableCell colSpan={11}>
                        <div className="py-2">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Milestone timeline · {o.incoterms}</p>
                          <div className="flex items-center gap-1 overflow-x-auto">
                            {milestonesForStatus(o.status, o.id).map((m, idx) => {
                              const color = m.done ? "#34D399" : m.current ? "#4D8DFF" : "#26364C";
                              return (
                                <div key={m.key} className="flex flex-1 items-center min-w-[110px]">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className="flex h-5 w-5 items-center justify-center rounded-full border-2"
                                      style={{ borderColor: color, backgroundColor: m.done || m.current ? `${color}20` : "transparent" }}
                                    >
                                      {m.done && <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />}
                                      {m.current && !m.done && <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />}
                                    </div>
                                    <span className="mt-1 text-[10px] text-muted-foreground whitespace-nowrap">{m.label}</span>
                                  </div>
                                  {idx < 6 && (
                                    <div className="h-px flex-1" style={{ backgroundColor: m.done ? "#34D399" : "#26364C" }} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-3 flex items-center justify-end gap-2">
                            {o.dealRef && (
                              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => openDetail("deals", o.dealRef!)}>
                                Open deal room <ArrowRight className="h-3 w-3" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Truck className="h-3 w-3" /> Track shipment
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </PageCard>

      <PageCard>
        <SectionHeader
          title="Upcoming Deliveries"
          subtitle="Next arrivals across active shipments"
          actions={<StatusBadge variant="info" dot>Live tracking</StatusBadge>}
        />
        <div className="flex gap-3 overflow-x-auto pb-2">
          {upcoming.length === 0 && (
            <EmptyState title="No upcoming deliveries" description="Active shipments will appear here." icon={Truck} />
          )}
          {upcoming.map((o, idx) => {
            const ModeIcon = shipmentModeIcon(o.shipmentMode);
            return (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="min-w-[280px] rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4D8DFF]/10">
                      <ModeIcon className="h-4 w-4 text-[#4D8DFF]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{o.reference}</p>
                      <p className="text-[10px] text-muted-foreground">{o.supplier}</p>
                    </div>
                  </div>
                  <StatusBadge variant={stageBadge(o.status)} dot>{o.status}</StatusBadge>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium text-foreground">{o.originPort} → {o.destinationPort}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" /> Expected
                    </span>
                    <span className="font-medium tabular-nums text-foreground">{o.expectedDelivery}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Tracking</span>
                    <span className="font-mono tabular-nums text-[#4D8DFF]">{o.trackingRef || "—"}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-3 h-7 w-full text-xs text-[#4D8DFF]">
                  View shipment <ArrowRight className="h-3 w-3" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </PageCard>
    </PageContainer>
  );
}
