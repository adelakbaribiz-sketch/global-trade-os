export interface TradeIntelRecord {
  id: string;
  category: "Demand Trend" | "Supply Alert" | "Route Disruption" | "Capacity Alert" | "Category Trend" | "Procurement Opportunity";
  title: string;
  description: string;
  source: string;
  sourceType: "Public Trade Data" | "Platform Data" | "Industry News" | "Logistics Intelligence";
  publishedDate: string;
  freshness: string;
  confidence: "High" | "Medium" | "Low";
  coverage: string;
  affectedCategories?: string[];
  affectedRegions?: string[];
}

export const tradeIntelRecords: TradeIntelRecord[] = [
  {
    id: "ti-001",
    category: "Demand Trend",
    title: "EU Water Treatment Investment Cycle — Pump Demand +18% YoY",
    description:
      "EU water treatment infrastructure investment cycle is driving a sustained increase in centrifugal pump demand, particularly for stainless steel process pumps (75–110 kW range). Verified data shows 18% YoY growth in published EU tender volume over the last 6 months. Supply in EU is concentrated in 4 major manufacturers; secondary tier capacity is becoming scarce.",
    source: "EU TED Tender Database + Platform RFQ Aggregation",
    sourceType: "Public Trade Data",
    publishedDate: "2026-10-24",
    freshness: "Updated 2 days ago",
    confidence: "High",
    coverage: "EU-wide, Q3 2026",
    affectedCategories: ["Industrial Pumps", "Water Treatment", "Manufacturing"],
    affectedRegions: ["Germany", "Netherlands", "Belgium", "France"],
  },
  {
    id: "ti-002",
    category: "Route Disruption",
    title: "Red Sea Routing — Suez Transit Delays 8–12 Days vs Baseline",
    description:
      "Ongoing Red Sea routing disruptions continue to push Asia-EU cargo via Cape of Good Hope. Verified carrier data indicates 8–12 day transit extension vs baseline, with FCL rates elevated approximately 35% above pre-disruption levels. Plan extra lead time for any Asia-origin shipment bound for EU/UK in Q4 2026.",
    source: "Verified carrier schedules + freight rate benchmark",
    sourceType: "Logistics Intelligence",
    publishedDate: "2026-10-22",
    freshness: "Updated 4 days ago",
    confidence: "High",
    coverage: "Asia-EU, Asia-UK routes",
    affectedCategories: ["Industrial Machinery", "Electronics", "Consumer Goods"],
    affectedRegions: ["Asia → EU", "Asia → UK"],
  },
  {
    id: "ti-003",
    category: "Capacity Alert",
    title: "ISO 13485 EMS Capacity — Singapore Tight in Q1 2027",
    description:
      "Verified EMS provider capacity survey indicates Q1 2027 capacity is 78% pre-booked at Singapore-based ISO 13485-certified providers. Medical-grade PCB assembly lead times have extended by 3–5 weeks. Plan pre-booking 60+ days in advance for new programmes.",
    source: "Platform EMS provider survey + Meridian internal capacity report",
    sourceType: "Platform Data",
    publishedDate: "2026-10-25",
    freshness: "Updated yesterday",
    confidence: "High",
    coverage: "Singapore, Q1 2027",
    affectedCategories: ["PCB Assembly", "Medical Devices", "Electronics"],
    affectedRegions: ["Singapore"],
  },
  {
    id: "ti-004",
    category: "Category Trend",
    title: "Specialty Food Ingredients — Curcumin Pricing Softening",
    description:
      "Wholesale pricing for high-curcumin turmeric (≥3.5%) has softened approximately 6% over the last quarter due to improved harvest yields. UK importer interest remains strong but supply availability has eased. Sapphire Trading LLP and similar distributors may benefit from favourable negotiation timing.",
    source: "Industry trade publications + verified importer reports",
    sourceType: "Industry News",
    publishedDate: "2026-10-19",
    freshness: "Updated 1 week ago",
    confidence: "Medium",
    coverage: "Asia → UK, Q4 2026",
    affectedCategories: ["Food Ingredients", "Consumer Goods"],
    affectedRegions: ["India → UK", "Asia → EU"],
  },
  {
    id: "ti-005",
    category: "Procurement Opportunity",
    title: "GCC Infrastructure Investment Cycle — Steel Fabrication Demand",
    description:
      "GCC region infrastructure investment cycle continues to drive demand for structural steel fabrications (EN 1090 EXC3). Verified project pipeline indicates sustained demand through Q2 2027. Pricing for EN 1090 fabrications has remained stable despite input material price increases. Strong opportunity for UK-based fabricators (Vega Industries, etc.).",
    source: "GCC project tracker + verified tender aggregation",
    sourceType: "Public Trade Data",
    publishedDate: "2026-10-20",
    freshness: "Updated 6 days ago",
    confidence: "High",
    coverage: "GCC Region, Q4 2026 – Q2 2027",
    affectedCategories: ["Structural Steel", "Construction", "Infrastructure"],
    affectedRegions: ["UAE", "Saudi Arabia", "Qatar"],
  },
  {
    id: "ti-006",
    category: "Supply Alert",
    title: "Industrial Lubricant Prices — Upward Pressure from Base Oil",
    description:
      "Group II base oil pricing increased approximately 4% in October 2026 due to refinery capacity allocation changes. Finished lubricant pricing expected to follow with 2–4 week lag. Hudson Bay Materials and similar suppliers have indicated willingness to hold existing price quotes for 30 days.",
    source: "Industry pricing benchmark + verified supplier confirmations",
    sourceType: "Industry News",
    publishedDate: "2026-10-23",
    freshness: "Updated 3 days ago",
    confidence: "Medium",
    coverage: "Global, October 2026",
    affectedCategories: ["Industrial Chemicals", "Lubricants"],
    affectedRegions: ["Global"],
  },
];

export interface RiskIndicator {
  id: string;
  type: "Supplier Dependency" | "Geographic Concentration" | "Lead Time" | "Document Expiry" | "Sanctions" | "Logistics";
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  affected: string;
  recommendation: string;
  status: "Open" | "Mitigated" | "Monitoring";
  detected: string;
}

export const riskIndicators: RiskIndicator[] = [
  {
    id: "ri-001",
    type: "Supplier Dependency",
    severity: "high",
    title: "Single-source dependency — centrifugal pumps (Nordport)",
    description:
      "Nordport Logistics has 100% of pump requirements concentrated on RheinTech Industries for the water treatment project. While RheinTech is enhanced-verified and shortlisted with strong match score, the absence of a qualified backup creates delivery risk in case of capacity loss.",
    affected: "Nordport Logistics B.V. (DE/NL)",
    recommendation:
      "Pre-qualify a secondary supplier from the shortlist (Meridian Manufacturing or Tidewater Components). Issue framework agreement for surge capacity or alternate sourcing scenarios.",
    status: "Open",
    detected: "2026-10-24",
  },
  {
    id: "ri-002",
    type: "Geographic Concentration",
    severity: "medium",
    title: "Singapore EMS concentration — Elysian medical device sourcing",
    description:
      "Elysian Procurement Group has 100% of medical-grade PCB assembly sourcing concentrated in Singapore (Meridian Manufacturing). Any port disruption, regulatory change, or capacity issue in Singapore could impact the entire 24-month framework agreement.",
    affected: "Elysian Procurement Group (UK)",
    recommendation:
      "Identify and pre-qualify a backup EMS provider in a different geography (e.g., Malaysia or Mexico) with ISO 13485 capability for similar product class.",
    status: "Monitoring",
    detected: "2026-10-22",
  },
  {
    id: "ri-003",
    type: "Document Expiry",
    severity: "low",
    title: "ISO 9001 certificate expiry — 2 suppliers within 60 days",
    description:
      "Two supplier quality certifications expire within the next 60 days. Platform will automatically flag verified status as 'Verification Expired' if renewal documentation is not submitted before expiry. Renewal reminders sent automatically 90 days, 60 days, and 30 days before expiry.",
    affected: "Vega Industries, Sapphire Trading LLP",
    recommendation:
      "Reminders sent automatically. Procurement and supplier quality teams should confirm renewal is in progress. Contact each supplier to request updated certificate.",
    status: "Open",
    detected: "2026-10-25",
  },
  {
    id: "ri-004",
    type: "Logistics",
    severity: "high",
    title: "Red Sea route disruption — Asia-EU transit +8–12 days",
    description:
      "Asia-EU shipments continue to face 8–12 day transit extension via Cape of Good Hope rerouting. Freight rates remain elevated approximately 35% above pre-disruption baseline. Multiple platform deals (3 active) are affected.",
    affected: "3 active deals (Asia → EU/UK routes)",
    recommendation:
      "Re-confirm transit times with freight forwarders. Update landed-cost simulations. Where possible, expedite shipments via air freight for time-critical orders or pre-position inventory.",
    status: "Monitoring",
    detected: "2026-10-22",
  },
  {
    id: "ri-005",
    type: "Lead Time",
    severity: "medium",
    title: "Pump RFQ — quoted lead time exceeds buyer's 60-day target",
    description:
      "RheinTech quoted 58 days for the 5,000-pump requirement, but competing quotes (Meridian 64 days, Tidewater 70 days) exceed the buyer's stated 60-day lead-time target. Negotiation should address either delivery time concessions or partial shipments.",
    affected: "Nordport Logistics — RFQ-2026-1142",
    recommendation:
      "Negotiate partial shipments or pre-shipment of pilot batch. Consider split award if total volume can be split between RheinTech and a backup supplier.",
    status: "Open",
    detected: "2026-10-23",
  },
];

export interface CountryNode {
  code: string;
  name: string;
  region: string;
  buyers: number;
  suppliers: number;
  representatives: number;
  activeDeals: number;
  trend: "up" | "down" | "stable";
  tradeVolumeUsd: number;
}

export const countryCoverage: CountryNode[] = [
  { code: "DE", name: "Germany", region: "EU", buyers: 12, suppliers: 28, representatives: 1, activeDeals: 5, trend: "up", tradeVolumeUsd: 18400000 },
  { code: "NL", name: "Netherlands", region: "EU", buyers: 18, suppliers: 11, representatives: 1, activeDeals: 4, trend: "up", tradeVolumeUsd: 9200000 },
  { code: "SG", name: "Singapore", region: "APAC", buyers: 6, suppliers: 19, representatives: 1, activeDeals: 6, trend: "up", tradeVolumeUsd: 26100000 },
  { code: "GB", name: "United Kingdom", region: "EU", buyers: 24, suppliers: 14, representatives: 1, activeDeals: 7, trend: "stable", tradeVolumeUsd: 22600000 },
  { code: "AE", name: "United Arab Emirates", region: "MENA", buyers: 9, suppliers: 4, representatives: 1, activeDeals: 3, trend: "up", tradeVolumeUsd: 4100000 },
  { code: "US", name: "United States", region: "NA", buyers: 31, suppliers: 27, representatives: 1, activeDeals: 6, trend: "stable", tradeVolumeUsd: 27100000 },
  { code: "FR", name: "France", region: "EU", buyers: 8, suppliers: 6, representatives: 0, activeDeals: 1, trend: "stable", tradeVolumeUsd: 3200000 },
  { code: "BE", name: "Belgium", region: "EU", buyers: 4, suppliers: 3, representatives: 0, activeDeals: 1, trend: "up", tradeVolumeUsd: 1100000 },
];
