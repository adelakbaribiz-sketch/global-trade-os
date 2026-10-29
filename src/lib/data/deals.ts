export type DealStage = "Discovery" | "Qualification" | "RFQ" | "Negotiation" | "Contract" | "Execution" | "Shipment" | "Closed Won" | "Closed Lost";

export interface Deal {
  id: string;
  reference: string;
  title: string;
  buyerCompanyId: string;
  buyerName: string;
  supplierCompanyId: string;
  supplierName: string;
  valueUsd: number;
  currency: string;
  stage: DealStage;
  probability: number;
  representativeId?: string;
  representativeName?: string;
  createdDate: string;
  expectedClose: string;
  lastActivity: string;
  milestones: { label: string; date: string; status: "done" | "current" | "pending" }[];
  documents: { name: string; type: string; version: string; uploadedBy: string; date: string }[];
  participants: { name: string; role: string; organization: string; initials: string }[];
  notes: string;
}

export const deals: Deal[] = [
  {
    id: "deal-001",
    reference: "D-2026-0193",
    title: "Water Treatment Pumps — Nordport × RheinTech",
    buyerCompanyId: "co-nordport",
    buyerName: "Nordport Logistics B.V.",
    supplierCompanyId: "co-rheintech",
    supplierName: "RheinTech Industries GmbH",
    valueUsd: 6640000,
    currency: "USD",
    stage: "Negotiation",
    probability: 65,
    representativeId: "rep-001",
    representativeName: "Lukas Hoffmann",
    createdDate: "2026-10-19",
    expectedClose: "2026-12-15",
    lastActivity: "2026-10-26",
    milestones: [
      { label: "Opportunity qualified", date: "2026-10-12", status: "done" },
      { label: "RFQ published", date: "2026-10-15", status: "done" },
      { label: "Quotation submitted", date: "2026-10-19", status: "done" },
      { label: "Shortlisted", date: "2026-10-24", status: "done" },
      { label: "Negotiation round 1", date: "2026-11-02", status: "current" },
      { label: "Contract executed", date: "2026-12-15", status: "pending" },
      { label: "First milestone payment", date: "2026-12-30", status: "pending" },
      { label: "Production complete", date: "2027-02-15", status: "pending" },
      { label: "Pre-shipment inspection", date: "2027-02-22", status: "pending" },
      { label: "Delivery to Rotterdam", date: "2027-03-15", status: "pending" },
    ],
    documents: [
      { name: "RFQ-2026-1142.pdf", type: "RFQ", version: "v3", uploadedBy: "M. van Dijk", date: "2026-10-15" },
      { name: "RheinTech_Quotation_Q-001.pdf", type: "Quotation", version: "v1", uploadedBy: "RheinTech", date: "2026-10-19" },
      { name: "ISO_9001_Certificate.pdf", type: "Certification", version: "v1", uploadedBy: "RheinTech", date: "2026-10-19" },
      { name: "PED_2014_68_EU_Declaration.pdf", type: "Compliance", version: "v1", uploadedBy: "RheinTech", date: "2026-10-19" },
      { name: "Production_Capacity_Audit.pdf", type: "Audit", version: "v1", uploadedBy: "TÜV SÜD", date: "2025-01-22" },
      { name: "NDA_signed.pdf", type: "Contract", version: "v1", uploadedBy: "M. van Dijk", date: "2026-10-24" },
      { name: "Draft_Supply_Agreement_v2.docx", type: "Contract", version: "v2", uploadedBy: "L. Hoffmann", date: "2026-10-26" },
    ],
    participants: [
      { name: "Marieke van Dijk", role: "Procurement Lead", organization: "Nordport Logistics", initials: "MD" },
      { name: "Karl Richter", role: "Sales Director", organization: "RheinTech Industries", initials: "KR" },
      { name: "Lukas Hoffmann", role: "Representative", organization: "Hoffmann Trade Advisory", initials: "LH" },
      { name: "Hans Bauer", role: "Engineering", organization: "RheinTech Industries", initials: "HB" },
    ],
    notes: "Negotiation focus on delivery schedule (buyer requesting 50 days vs supplier offering 58). Representative Lukas Hoffmann facilitated initial contact. PED compliance confirmed. Awaiting legal review of supply agreement v2.",
  },
  {
    id: "deal-002",
    reference: "D-2026-0188",
    title: "Medical PCB Assemblies — Elysian × Meridian",
    buyerCompanyId: "co-elysian-proc",
    buyerName: "Elysian Procurement Group",
    supplierCompanyId: "co-meridian-mfg",
    supplierName: "Meridian Manufacturing Pte. Ltd.",
    valueUsd: 8400000,
    currency: "USD",
    stage: "Contract",
    probability: 85,
    representativeId: "rep-003",
    representativeName: "Daniel Tan",
    createdDate: "2026-10-15",
    expectedClose: "2026-11-25",
    lastActivity: "2026-10-26",
    milestones: [
      { label: "Opportunity qualified", date: "2026-09-28", status: "done" },
      { label: "RFQ published", date: "2026-10-04", status: "done" },
      { label: "Quotation received", date: "2026-10-15", status: "done" },
      { label: "Shortlisted", date: "2026-10-22", status: "done" },
      { label: "Negotiation complete", date: "2026-10-26", status: "done" },
      { label: "Contract execution", date: "2026-11-25", status: "current" },
      { label: "Pilot batch production", date: "2026-12-15", status: "pending" },
      { label: "Pilot batch delivery", date: "2027-01-10", status: "pending" },
      { label: "Series production start", date: "2027-02-01", status: "pending" },
    ],
    documents: [
      { name: "RFQ-2026-1147.pdf", type: "RFQ", version: "v2", uploadedBy: "A. Patel", date: "2026-10-04" },
      { name: "Meridian_Quotation_Q-005.pdf", type: "Quotation", version: "v1", uploadedBy: "Meridian", date: "2026-10-15" },
      { name: "ISO_13485_Certificate.pdf", type: "Certification", version: "v1", uploadedBy: "Meridian", date: "2026-10-15" },
      { name: "3TG_Conflict_Minerals_Report.pdf", type: "Compliance", version: "v1", uploadedBy: "Meridian", date: "2026-10-15" },
      { name: "Pilot_Batch_Spec.docx", type: "Specification", version: "v3", uploadedBy: "D. Tan", date: "2026-10-22" },
      { name: "Framework_Agreement_v4.docx", type: "Contract", version: "v4", uploadedBy: "Legal (Elysian)", date: "2026-10-26" },
    ],
    participants: [
      { name: "Arun Patel", role: "Procurement Director", organization: "Elysian Procurement", initials: "AP" },
      { name: "Daniel Tan", role: "Representative", organization: "Tan Bridge Partners", initials: "DT" },
      { name: "Wei Lin", role: "Sales VP", organization: "Meridian Manufacturing", initials: "WL" },
      { name: "Sarah Chen", role: "Quality Manager", organization: "Meridian Manufacturing", initials: "SC" },
    ],
    notes: "Long-term 24-month framework agreement for 50,000 medical PCB assemblies / year. ISO 13485 + IPC-A-610 Class 3 confirmed. Pilot batch of 1,000 pcs as gating milestone. Contract execution imminent — legal review complete on both sides.",
  },
  {
    id: "deal-003",
    reference: "D-2026-0201",
    title: "Structural Steel — PortLight × Vega Industries",
    buyerCompanyId: "co-portlight",
    buyerName: "PortLight Trading FZE",
    supplierCompanyId: "co-vega-industries",
    supplierName: "Vega Industries Ltd",
    valueUsd: 1860000,
    currency: "USD",
    stage: "RFQ",
    probability: 40,
    representativeId: "rep-005",
    representativeName: "Mariam Al Suwaidi",
    createdDate: "2026-10-18",
    expectedClose: "2026-12-30",
    lastActivity: "2026-10-25",
    milestones: [
      { label: "Opportunity qualified", date: "2026-10-18", status: "done" },
      { label: "RFQ published", date: "2026-10-22", status: "done" },
      { label: "Quotation received", date: "2026-10-25", status: "done" },
      { label: "Shortlisting", date: "2026-11-12", status: "current" },
      { label: "Negotiation", date: "2026-11-20", status: "pending" },
      { label: "Contract execution", date: "2026-12-30", status: "pending" },
      { label: "First production batch", date: "2027-02-15", status: "pending" },
    ],
    documents: [
      { name: "RFQ-2026-1153.pdf", type: "RFQ", version: "v2", uploadedBy: "S. Al Mazrouei", date: "2026-10-22" },
      { name: "Vega_Quotation_Q-006.pdf", type: "Quotation", version: "v1", uploadedBy: "Vega", date: "2026-10-25" },
      { name: "EN_1090_CE_Marking.pdf", type: "Certification", version: "v1", uploadedBy: "Vega", date: "2026-10-25" },
      { name: "Project_Drawings_Set_A.zip", type: "Drawing", version: "v1", uploadedBy: "S. Al Mazrouei", date: "2026-10-20" },
    ],
    participants: [
      { name: "Salma Al Mazrouei", role: "Sourcing Director", organization: "PortLight Trading", initials: "SM" },
      { name: "Mariam Al Suwaidi", role: "Representative", organization: "Al Suwaidi Trade Bridge", initials: "MS" },
      { name: "James Whitfield", role: "Sales Manager", organization: "Vega Industries", initials: "JW" },
    ],
    notes: "EN 1090 EXC3 fabrication for energy infrastructure project in GCC. Vega shortlisted alongside one alternative. Negotiation focus on phasing shipments to align with site readiness. Payment via Irrevocable L/C at sight.",
  },
];

export interface CRMActivity {
  id: string;
  date: string;
  type: "call" | "email" | "meeting" | "task" | "note" | "rfq" | "deal";
  party: string;
  title: string;
  description: string;
  owner: string;
  dealRef?: string;
}

export const crmActivities: CRMActivity[] = [
  { id: "a-001", date: "2026-10-26", type: "meeting", party: "Nordport Logistics", title: "Negotiation prep — pump RFQ", description: "Discussed negotiation strategy with Lukas Hoffmann. Reviewed alternative suppliers in case RheinTech does not concede on delivery time.", owner: "Lukas Hoffmann", dealRef: "D-2026-0193" },
  { id: "a-002", date: "2026-10-26", type: "email", party: "Elysian Procurement Group", title: "Framework agreement v4 sent", description: "Sent updated framework agreement v4 with pilot batch milestone and SLA penalties. Awaiting Meridian counter-sign.", owner: "Daniel Tan", dealRef: "D-2026-0188" },
  { id: "a-003", date: "2026-10-25", type: "call", party: "Vega Industries", title: "Quotation clarifications", description: "Confirmed EN 1090 EXC3 scope and Sa 2.5 + 3-coat system included in Vega quotation. Discussed phased shipment possibility.", owner: "Mariam Al Suwaidi", dealRef: "D-2026-0201" },
  { id: "a-004", date: "2026-10-24", type: "task", party: "RheinTech Industries", title: "Confirm production slot", description: "Task assigned to RheinTech: confirm production slot for Q1 2027 (5,000 units).", owner: "Lukas Hoffmann", dealRef: "D-2026-0193" },
  { id: "a-005", date: "2026-10-23", type: "rfq", party: "Multiple suppliers", title: "Pump RFQ — 6 quotations received", description: "RFQ-2026-1142 has received 6 quotations as of closing deadline. Average unit price $1,310. Top match score 94 (RheinTech).", owner: "AI Sourcing Assistant" },
  { id: "a-006", date: "2026-10-22", type: "note", party: "Sapphire Trading LLP", title: "Food ingredients RFQ update", description: "5 quotations received for specialty food ingredients RFQ-2026-1158. 3 shortlisted. Negotiation phase begins next week.", owner: "K. Robinson" },
  { id: "a-007", date: "2026-10-20", type: "meeting", party: "PortLight Trading FZE", title: "Project cargo inspection scoping", description: "Reviewed inspection requirements with Kaiyo Marine Services. Quote request issued for pre-shipment inspection services.", owner: "Mariam Al Suwaidi" },
  { id: "a-008", date: "2026-10-19", type: "deal", party: "Meridian Manufacturing", title: "New deal created — D-2026-0188", description: "Medical PCB assemblies long-term contract. Estimated value $8.4M over 24 months. Probability 85%.", owner: "Daniel Tan" },
];

export interface Order {
  id: string;
  reference: string;
  dealRef?: string;
  buyer: string;
  supplier: string;
  description: string;
  valueUsd: number;
  status: "Awaiting Contract" | "In Production" | "Ready for Shipment" | "In Transit" | "Customs Clearance" | "Delivered" | "Closed";
  poDate: string;
  expectedDelivery: string;
  originPort: string;
  destinationPort: string;
  incoterms: string;
  shipmentMode: string;
  trackingRef?: string;
}

export const orders: Order[] = [
  {
    id: "po-001",
    reference: "PO-2026-0089",
    dealRef: "D-2026-0188",
    buyer: "Elysian Procurement Group",
    supplier: "Meridian Manufacturing Pte. Ltd.",
    description: "Pilot batch — 1,000 medical PCB assemblies",
    valueUsd: 168000,
    status: "In Production",
    poDate: "2026-11-01",
    expectedDelivery: "2027-01-10",
    originPort: "Singapore",
    destinationPort: "Manchester (via Felixstowe)",
    incoterms: "DAP UK Distribution Centre",
    shipmentMode: "Ocean FCL + Road",
  },
  {
    id: "po-002",
    reference: "PO-2026-0074",
    dealRef: "D-2026-0074",
    buyer: "Nordport Logistics B.V.",
    supplier: "Hudson Bay Materials Corp.",
    description: "Bulk industrial lubricants — 2,000 drums",
    valueUsd: 312000,
    status: "In Transit",
    poDate: "2026-10-01",
    expectedDelivery: "2026-11-08",
    originPort: "Houston, TX",
    destinationPort: "Rotterdam",
    incoterms: "CIP Rotterdam",
    shipmentMode: "Ocean FCL",
    trackingRef: "MAEU-7841230",
  },
  {
    id: "po-003",
    reference: "PO-2026-0061",
    buyer: "Tidewater Components Inc.",
    supplier: "Meridian Manufacturing Pte. Ltd.",
    description: "Industrial control PCB assemblies — 8,000 pcs",
    valueUsd: 224000,
    status: "Ready for Shipment",
    poDate: "2026-09-15",
    expectedDelivery: "2026-11-05",
    originPort: "Singapore",
    destinationPort: "Cleveland, OH (via LA)",
    incoterms: "FCA Singapore",
    shipmentMode: "Ocean LCL + Air",
    trackingRef: "CMA-CGM-VERDI-5521",
  },
  {
    id: "po-004",
    reference: "PO-2026-0058",
    buyer: "Sapphire Trading LLP",
    supplier: "Asia cooperative supplier",
    description: "Specialty food ingredients — 12 MT turmeric",
    valueUsd: 96000,
    status: "Customs Clearance",
    poDate: "2026-09-20",
    expectedDelivery: "2026-10-30",
    originPort: "Mumbai",
    destinationPort: "Manchester (via Felixstowe)",
    incoterms: "CIP UK Warehouse",
    shipmentMode: "Ocean FCL",
    trackingRef: "MSC-AMSTERDAM-9912",
  },
  {
    id: "po-005",
    reference: "PO-2026-0044",
    buyer: "PortLight Trading FZE",
    supplier: "Hudson Bay Materials Corp.",
    description: "Water treatment compounds — 80 MT",
    valueUsd: 124000,
    status: "Delivered",
    poDate: "2026-08-15",
    expectedDelivery: "2026-10-12",
    originPort: "Houston, TX",
    destinationPort: "Jebel Ali",
    incoterms: "CIF Jebel Ali",
    shipmentMode: "Ocean Breakbulk",
    trackingRef: "HLC-AL-KHOR-2200",
  },
];

export function getDeal(id: string): Deal | undefined {
  return deals.find((d) => d.id === id || d.reference === id);
}
