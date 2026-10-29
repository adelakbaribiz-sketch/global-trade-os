"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Clock,
  Send,
  Search,
  Building2,
  ChevronUp,
  ChevronDown,
  Inbox,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard, PageGrid } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, EmptyState, Rating, CountryFlag } from "@/components/gtos/shared/Primitives";
import { StatusBadge, verificationBadge } from "@/components/gtos/shared/StatusBadge";
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

interface ServicePartner {
  id: string;
  name: string;
  countryCode: string;
  country: string;
  city: string;
  category: string;
  rating: number;
  verification: string;
  coverage: string;
  capabilities: string[];
  responseTimeHours: number;
  onTimeDelivery: number;
}

const serviceCategories = [
  "All Categories",
  "Freight Forwarding",
  "Customs Brokerage",
  "Warehousing",
  "Cargo Insurance",
  "Independent Inspection",
  "Product Testing",
  "Certification",
  "Translation",
  "Trade Finance",
];

const countries = ["All Countries", "Singapore", "Germany", "Netherlands", "United Kingdom", "United Arab Emirates", "United States"];

const partners: ServicePartner[] = [
  {
    id: "co-kaiyo",
    name: "Kaiyo Marine Services Ltd",
    countryCode: "SG",
    country: "Singapore",
    city: "Singapore",
    category: "Independent Inspection",
    rating: 4.7,
    verification: "Enhanced Verification Complete",
    coverage: "Major Asian ports — Singapore, Rotterdam, Hamburg, Antwerp, Jebel Ali",
    capabilities: ["Pre-shipment inspection", "Loading supervision", "Cargo damage survey", "Project cargo QA"],
    responseTimeHours: 5,
    onTimeDelivery: 97,
  },
  {
    id: "sp-nordlog",
    name: "NordLog Freight GmbH",
    countryCode: "DE",
    country: "Germany",
    city: "Hamburg",
    category: "Freight Forwarding",
    rating: 4.5,
    verification: "Enhanced Verification Complete",
    coverage: "EU road, rail, ocean FCL/LCL — Asia-EU corridors",
    capabilities: ["FCL/LCL consolidation", "Project cargo", "EU customs brokerage", "Last-mile EU"],
    responseTimeHours: 6,
    onTimeDelivery: 94,
  },
  {
    id: "sp-rotterdam-customs",
    name: "Rotterdam Customs Brokers B.V.",
    countryCode: "NL",
    country: "Netherlands",
    city: "Rotterdam",
    category: "Customs Brokerage",
    rating: 4.6,
    verification: "Enhanced Verification Complete",
    coverage: "EU import / export clearance — all major NL, BE, DE ports",
    capabilities: ["AEO C certified", "HS classification", "Duty drawback", "Bonded warehouse"],
    responseTimeHours: 4,
    onTimeDelivery: 96,
  },
  {
    id: "sp-london-finance",
    name: "London Trade Finance Partners",
    countryCode: "GB",
    country: "United Kingdom",
    city: "London",
    category: "Trade Finance",
    rating: 4.4,
    verification: "Basic Verification Complete",
    coverage: "Letter of credit issuance, factoring, supply chain finance — UK/EU",
    capabilities: ["L/C issuance & confirmation", "Factoring", "Invoice discounting", "FX hedging"],
    responseTimeHours: 12,
    onTimeDelivery: 92,
  },
  {
    id: "sp-jebel-warehouse",
    name: "Jebel Bonded Warehousing FZE",
    countryCode: "AE",
    country: "United Arab Emirates",
    city: "Dubai",
    category: "Warehousing",
    rating: 4.3,
    verification: "Under Review",
    coverage: "GCC bonded warehousing — Jebel Ali, Khalifa, Dammam",
    capabilities: ["Bonded storage 60K m²", "GCC distribution", "Cross-dock", "Re-export"],
    responseTimeHours: 18,
    onTimeDelivery: 89,
  },
  {
    id: "sp-cleveland-test",
    name: "Cleveland Materials Testing Lab",
    countryCode: "US",
    country: "United States",
    city: "Cleveland, OH",
    category: "Product Testing",
    rating: 4.6,
    verification: "Enhanced Verification Complete",
    coverage: "Mechanical, chemical, NDT, materials certification — US/EU",
    capabilities: ["Tensile / hardness", "NDT (UT, RT, MT)", "Chemical analysis", "Mill cert verification"],
    responseTimeHours: 8,
    onTimeDelivery: 95,
  },
  {
    id: "sp-manchester-translate",
    name: "Manchester Trade Translation LLP",
    countryCode: "GB",
    country: "United Kingdom",
    city: "Manchester",
    category: "Translation",
    rating: 4.2,
    verification: "Basic Verification Complete",
    coverage: "Technical & commercial translation — 28 languages",
    capabilities: ["Technical translation", "Commercial contracts", "Notarised translation", "AS/NZS EN"],
    responseTimeHours: 14,
    onTimeDelivery: 90,
  },
];

interface ServiceRequest {
  id: string;
  ref: string;
  serviceType: string;
  buyer: string;
  partner: string;
  status: "Quoted" | "In Progress" | "Completed" | "Awaiting Quote";
  quotedPrice: string;
  expectedDelivery: string;
}

const serviceRequests: ServiceRequest[] = [
  { id: "sr-1", ref: "SR-2026-0042", serviceType: "Pre-shipment inspection", buyer: "PortLight Trading FZE", partner: "Kaiyo Marine Services", status: "In Progress", quotedPrice: "$3,200", expectedDelivery: "2026-11-08" },
  { id: "sr-2", ref: "SR-2026-0039", serviceType: "EU customs clearance", buyer: "Nordport Logistics", partner: "Rotterdam Customs Brokers", status: "Completed", quotedPrice: "$1,150", expectedDelivery: "2026-10-22" },
  { id: "sr-3", ref: "SR-2026-0036", serviceType: "Project cargo freight", buyer: "Vega Industries", partner: "NordLog Freight", status: "Quoted", quotedPrice: "$28,400", expectedDelivery: "2026-12-01" },
  { id: "sr-4", ref: "SR-2026-0033", serviceType: "L/C issuance", buyer: "Sapphire Trading LLP", partner: "London Trade Finance", status: "Awaiting Quote", quotedPrice: "—", expectedDelivery: "2026-11-12" },
  { id: "sr-5", ref: "SR-2026-0028", serviceType: "Materials testing", buyer: "Tidewater Components", partner: "Cleveland Materials Testing", status: "In Progress", quotedPrice: "$4,800", expectedDelivery: "2026-11-15" },
];

type SortField = "ref" | "serviceType" | "buyer" | "partner" | "status" | "expectedDelivery";
type SortDir = "asc" | "desc";

export function ServicePartnersView() {
  const setView = useAppStore((s) => s.setView);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [sortField, setSortField] = useState<SortField>("expectedDelivery");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.coverage.toLowerCase().includes(search.toLowerCase()) ||
        p.capabilities.some((c) => c.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === "All Categories" || p.category === category;
      const matchCountry = country === "All Countries" || p.country === country;
      return matchSearch && matchCategory && matchCountry;
    });
  }, [search, category, country]);

  const filteredRequests = useMemo(() => {
    let rows = serviceRequests.filter((r) => {
      const matchSearch = r.ref.toLowerCase().includes(search.toLowerCase()) ||
        r.buyer.toLowerCase().includes(search.toLowerCase()) ||
        r.partner.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortField === "expectedDelivery") cmp = a.expectedDelivery.localeCompare(b.expectedDelivery);
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, sortField, sortDir]);

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

  function reqStatusVariant(s: string) {
    if (s === "Completed") return "success" as const;
    if (s === "In Progress") return "primary" as const;
    if (s === "Quoted") return "info" as const;
    return "warning" as const;
  }

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Service Partners"
        subtitle="Logistics, inspection, customs, finance and certification marketplace"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <ShieldCheck className="h-3.5 w-3.5" /> Become a partner
            </Button>
            <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("rfqs")}>
              <Send className="h-3.5 w-3.5" /> New service request
            </Button>
          </div>
        }
      />

      <PageGrid cols={4}>
        <KpiCard label="Verified Partners" value="28" delta={{ value: "+2", direction: "up" }} icon={ShieldCheck} accent="primary" trend={[20, 22, 24, 25, 26, 27, 28]} hint="across 9 categories" />
        <KpiCard label="Active Service Requests" value="7" delta={{ value: "+2", direction: "up" }} icon={Send} accent="accent" trend={[3, 4, 5, 5, 6, 6, 7]} hint="avg. 5h response" />
        <KpiCard label="Avg. Response Time" value="5h" delta={{ value: "−1h", direction: "down" }} icon={Clock} accent="warning" trend={[8, 7, 7, 6, 6, 6, 5]} hint="across all categories" />
        <KpiCard label="Pending Approvals" value="2" delta={{ value: "stable", direction: "stable" }} icon={Inbox} accent="violet" trend={[1, 2, 2, 2, 2, 2, 2]} hint="awaiting verification" />
      </PageGrid>

      <PageCard>
        <SectionHeader
          title="Filter partners"
          subtitle="Find the right service partner by capability, location, or category"
          actions={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search partners..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-56 pl-8"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger size="sm" className="h-8 w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger size="sm" className="h-8 w-44">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          }
        />
        {filteredPartners.length === 0 ? (
          <EmptyState title="No partners found" description="Try widening filters or searching for a different capability." icon={Wrench} />
        ) : (
          <PageGrid cols={3}>
            {filteredPartners.map((p, idx) => {
              const { variant: vVariant, icon: vIcon } = verificationBadge(p.verification);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#4D8DFF]/30 bg-gradient-to-br from-[#18253A] to-[#0E1626]">
                        <Building2 className="h-4 w-4 text-[#4D8DFF]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <CountryFlag code={p.countryCode} className="text-sm" />
                          <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{p.city}, {p.country}</p>
                      </div>
                    </div>
                    {vIcon && <vIcon className="h-3.5 w-3.5 text-[#34D399]" />}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <StatusBadge variant="primary">{p.category}</StatusBadge>
                    <StatusBadge variant={vVariant} dot>
                      {p.verification.includes("Enhanced") ? "Verified" : p.verification.includes("Basic") ? "Basic" : "Pending"}
                    </StatusBadge>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.coverage}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.capabilities.slice(0, 3).map((c) => (
                      <span key={c} className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <Rating value={p.rating} />
                    <span className="text-[11px] tabular-nums text-muted-foreground">{p.onTimeDelivery}% on-time</span>
                  </div>
                  <Button size="sm" className="mt-3 h-8 w-full bg-[#4D8DFF] hover:bg-[#3a7af0]">
                    <Send className="h-3.5 w-3.5" /> Request quote
                  </Button>
                </motion.div>
              );
            })}
          </PageGrid>
        )}
      </PageCard>

      <PageCard>
        <SectionHeader
          title="Active Service Requests"
          subtitle={`${filteredRequests.length} service requests in flight`}
          actions={<StatusBadge variant="info" dot>Live</StatusBadge>}
        />
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("ref")}>
                Request ref {sortIcon("ref")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("serviceType")}>
                Service type {sortIcon("serviceType")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("buyer")}>
                Buyer {sortIcon("buyer")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("partner")}>
                Partner {sortIcon("partner")}
              </TableHead>
              <TableHead className="cursor-pointer select-none text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("status")}>
                Status {sortIcon("status")}
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">Quoted price</TableHead>
              <TableHead className="cursor-pointer select-none text-right text-xs uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("expectedDelivery")}>
                Expected {sortIcon("expectedDelivery")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState title="No service requests match" description="Adjust search or check back later." icon={Inbox} />
                </TableCell>
              </TableRow>
            )}
            {filteredRequests.map((r) => (
              <TableRow key={r.id} className="border-border hover:border-[#4D8DFF]/40">
                <TableCell className="text-xs font-medium text-[#4D8DFF]">{r.ref}</TableCell>
                <TableCell className="text-xs text-foreground">{r.serviceType}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.buyer}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.partner}</TableCell>
                <TableCell>
                  <StatusBadge variant={reqStatusVariant(r.status)} dot>{r.status}</StatusBadge>
                </TableCell>
                <TableCell className="text-right text-sm font-semibold tabular-nums text-foreground">{r.quotedPrice}</TableCell>
                <TableCell className="text-right text-xs tabular-nums text-muted-foreground">{r.expectedDelivery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </PageContainer>
  );
}
