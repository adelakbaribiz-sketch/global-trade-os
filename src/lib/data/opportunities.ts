export type OpportunityStatus = "Open" | "Closing Soon" | "Awarded" | "Closed" | "Draft";
export type OpportunityType = "Buy RFQ" | "Supply Offer" | "Distribution" | "Capacity" | "Manufacturing" | "Contract Manufacturing";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  status: OpportunityStatus;
  postedBy: string;
  postedCompanyId: string;
  postedDate: string;
  closingDate: string;
  origin: string;
  destination: string;
  category: string;
  description: string;
  quantity: string;
  unit: string;
  targetPrice: string;
  currency: string;
  incoterms: string;
  paymentTerms: string;
  minOrderQty: string;
  leadTimeDays: number;
  requiredCerts: string[];
  applicants: number;
  saved: number;
  verifiedBuyer: boolean;
  confidentiality: "Public" | "Invited Only" | "Qualified Suppliers" | "Confidential";
  tags: string[];
}

export const opportunities: Opportunity[] = [
  {
    id: "opp-001",
    title: "5,000 Industrial Centrifugal Pumps — Rotterdam Delivery",
    type: "Buy RFQ",
    status: "Open",
    postedBy: "Nordport Logistics B.V.",
    postedCompanyId: "co-nordport",
    postedDate: "2026-10-12",
    closingDate: "2026-11-25",
    origin: "EU",
    destination: "Rotterdam, Netherlands",
    category: "Industrial Machinery",
    description:
      "Bulk procurement of centrifugal process pumps for a water treatment infrastructure project. Buyer requires ISO 9001 certification, PED 2014/68/EU compliance, and full material traceability. Suppliers must demonstrate at least 5 years of comparable production history and provide references from European customers.",
    quantity: "5,000",
    unit: "units",
    targetPrice: "$1,150 – $1,400",
    currency: "USD",
    incoterms: "DAP Rotterdam",
    paymentTerms: "30% advance, 70% before shipment",
    minOrderQty: "1,000 units",
    leadTimeDays: 60,
    requiredCerts: ["ISO 9001", "PED 2014/68/EU", "Material Certs EN 10204 3.1"],
    applicants: 12,
    saved: 38,
    verifiedBuyer: true,
    confidentiality: "Public",
    tags: ["Industrial Pumps", "Water Treatment", "Infrastructure"],
  },
  {
    id: "opp-002",
    title: "Contract Manufacturing — 50,000 Medical Device PCB Assemblies",
    type: "Contract Manufacturing",
    status: "Closing Soon",
    postedBy: "Elysian Procurement Group",
    postedCompanyId: "co-elysian-proc",
    postedDate: "2026-09-28",
    closingDate: "2026-11-05",
    origin: "Global",
    destination: "United Kingdom",
    category: "Electronics",
    description:
      "Long-term contract manufacturing requirement for medical-grade PCB assemblies (Class III). Buyer needs a partner with ISO 13485, IPC-A-610 Class 3 capability, and full traceability including conflict-minerals reporting (3TG). Initial pilot run, then quarterly deliveries over a 24-month framework agreement.",
    quantity: "50,000",
    unit: "assemblies/year",
    targetPrice: "Indicative budget on request",
    currency: "USD",
    incoterms: "DAP UK Distribution Centre",
    paymentTerms: "Net 45 (verified suppliers) or L/C at sight",
    minOrderQty: "Pilot batch 5,000",
    leadTimeDays: 56,
    requiredCerts: ["ISO 13485", "IPC-A-610 Class 3", "3TG Reporting"],
    applicants: 8,
    saved: 51,
    verifiedBuyer: true,
    confidentiality: "Qualified Suppliers",
    tags: ["PCB Assembly", "Medical Devices", "Contract Manufacturing"],
  },
  {
    id: "opp-003",
    title: "Steel Structural Components — 850 Tonnes for Energy Project",
    type: "Buy RFQ",
    status: "Open",
    postedBy: "PortLight Trading FZE",
    postedCompanyId: "co-portlight",
    postedDate: "2026-10-18",
    closingDate: "2026-12-10",
    origin: "EU / UK",
    destination: "GCC Region",
    category: "Construction",
    description:
      "Sourcing structural steel fabrications including beams, columns, and trusses for a regional energy infrastructure project. CE-marked or equivalent (EN 1090) required. Shipping to GCC, with delivery phased across Q1–Q2 2027. Inspection and document package: full welding traceability, mill certificates, NDT reports.",
    quantity: "850",
    unit: "tonnes",
    targetPrice: "$1,800 – $2,400/tonne DAP",
    currency: "USD",
    incoterms: "DAP Project Site",
    paymentTerms: "Irrevocable L/C at sight",
    minOrderQty: "200 tonnes",
    leadTimeDays: 90,
    requiredCerts: ["EN 1090 CE Marking", "BS EN ISO 3834", "ISO 9001"],
    applicants: 6,
    saved: 22,
    verifiedBuyer: true,
    confidentiality: "Public",
    tags: ["Structural Steel", "Energy", "Infrastructure"],
  },
  {
    id: "opp-004",
    title: "Supply Offer — Bulk Industrial Lubricants (15,000 Drums)",
    type: "Supply Offer",
    status: "Open",
    postedBy: "Hudson Bay Materials Corp.",
    postedCompanyId: "co-hudson",
    postedDate: "2026-10-22",
    closingDate: "2026-12-01",
    origin: "United States",
    destination: "Global",
    category: "Chemicals",
    description:
      "Supplier offering bulk supply of premium industrial lubricants and metalworking fluids. Available in 208L drums and 1,000L IBCs. REACH-compliant formulations, full SDS and traceability. Pricing scales favourably with quantity. Suitable for manufacturers, mining operators, and infrastructure fleets.",
    quantity: "15,000",
    unit: "drums",
    targetPrice: "$145 – $185/drum FCA",
    currency: "USD",
    incoterms: "FCA Houston",
    paymentTerms: "Net 30 (verified) / L/C at sight",
    minOrderQty: "500 drums",
    leadTimeDays: 35,
    requiredCerts: ["REACH", "ISO 9001", "NACD Responsible Distribution"],
    applicants: 4,
    saved: 17,
    verifiedBuyer: true,
    confidentiality: "Public",
    tags: ["Lubricants", "Industrial Chemicals", "Bulk Supply"],
  },
  {
    id: "opp-005",
    title: "Distribution Rights — Speciality Food Ingredients (UK)",
    type: "Distribution",
    status: "Open",
    postedBy: "Sapphire Trading LLP",
    postedCompanyId: "co-sapphirespice",
    postedDate: "2026-10-15",
    closingDate: "2026-11-30",
    origin: "EU / Asia",
    destination: "United Kingdom",
    category: "Consumer Goods",
    description:
      "Sapphire Trading LLP is seeking manufacturers of specialty food ingredients (spices, herbs, food colourants, and functional ingredients) seeking UK distribution. BRCGS-compliant storage and full traceability required. Long-term framework agreement with quarterly minimums and joint marketing.",
    quantity: "Container loads",
    unit: "20'/40' FCL",
    targetPrice: "By negotiation",
    currency: "GBP",
    incoterms: "CIP UK Warehouse",
    paymentTerms: "Net 45 (after pilot)",
    minOrderQty: "1 FCL",
    leadTimeDays: 45,
    requiredCerts: ["BRCGS Storage & Distribution", "HACCP", "Supplier audit"],
    applicants: 9,
    saved: 31,
    verifiedBuyer: true,
    confidentiality: "Qualified Suppliers",
    tags: ["Food Ingredients", "Distribution", "UK Market"],
  },
  {
    id: "opp-006",
    title: "Contract Manufacturing — Precision CNC Components (Aerospace)",
    type: "Contract Manufacturing",
    status: "Open",
    postedBy: "Tidewater Components Inc.",
    postedCompanyId: "co-tidewater",
    postedDate: "2026-10-20",
    closingDate: "2026-12-15",
    origin: "United States",
    destination: "United States",
    category: "Manufacturing",
    description:
      "Tidewater is offering contract manufacturing capacity for precision-machined aerospace components. AS9100D-certified facility with 5-axis CNC, full material traceability, and NDT capability. Ideal for tier-2/3 aerospace suppliers seeking additional capacity or offload opportunities. ITAR-registered — restricted to eligible partners.",
    quantity: "By RFQ",
    unit: "lot",
    targetPrice: "Project quotation",
    currency: "USD",
    incoterms: "FCA Cleveland",
    paymentTerms: "Net 30 / 50% advance, 50% on delivery",
    minOrderQty: "By package",
    leadTimeDays: 45,
    requiredCerts: ["AS9100D", "ITAR Registered", "Nadcap NDT"],
    applicants: 3,
    saved: 14,
    verifiedBuyer: true,
    confidentiality: "Qualified Suppliers",
    tags: ["Aerospace", "CNC Machining", "Sub-Assemblies"],
  },
  {
    id: "opp-007",
    title: "Available Capacity — SMT Lines Q1 2027 (Medical / Industrial)",
    type: "Capacity",
    status: "Open",
    postedBy: "Meridian Manufacturing Pte. Ltd.",
    postedCompanyId: "co-meridian-mfg",
    postedDate: "2026-10-25",
    closingDate: "2027-01-31",
    origin: "Singapore",
    destination: "Global",
    category: "Electronics",
    description:
      "Meridian announces pre-booked SMT capacity for Q1 2027 across two lanes. Suitable for medical device, industrial control, and connected infrastructure programmes requiring IPC-A-610 Class 3 and full traceability. Indicative capacity: 25,000 PCB assemblies / week. Pilot programme required before framework agreement.",
    quantity: "25,000",
    unit: "PCB assemblies/week",
    targetPrice: "By package",
    currency: "USD",
    incoterms: "FCA Singapore",
    paymentTerms: "30% advance, 70% before shipment",
    minOrderQty: "Pilot 1,000 pcs",
    leadTimeDays: 35,
    requiredCerts: ["ISO 13485", "IPC-A-610 Class 3", "ISO 9001"],
    applicants: 5,
    saved: 24,
    verifiedBuyer: true,
    confidentiality: "Public",
    tags: ["EMS", "SMT Capacity", "Medical Devices"],
  },
  {
    id: "opp-008",
    title: "Pre-Shipment Inspection Services — Project Cargo (GCC)",
    type: "Buy RFQ",
    status: "Open",
    postedBy: "PortLight Trading FZE",
    postedCompanyId: "co-portlight",
    postedDate: "2026-10-23",
    closingDate: "2026-11-20",
    origin: "Asia / EU",
    destination: "GCC Region",
    category: "Services",
    description:
      "Buyer seeking independent pre-shipment inspection and loading supervision services for project cargo consolidations. ISO/IEC 17020 Type A accredited providers preferred. Scope includes condition survey, packing list verification, photo and video documentation, and seal verification.",
    quantity: "Multiple",
    unit: "shipments",
    targetPrice: "$800 – $1,500/inspection",
    currency: "USD",
    incoterms: "DAP Inspection Point",
    paymentTerms: "Net 30",
    minOrderQty: "5 inspections",
    leadTimeDays: 14,
    requiredCerts: ["ISO/IEC 17020 Type A"],
    applicants: 7,
    saved: 11,
    verifiedBuyer: true,
    confidentiality: "Public",
    tags: ["Inspection", "Project Cargo", "QA"],
  },
];

export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((o) => o.id === id);
}
