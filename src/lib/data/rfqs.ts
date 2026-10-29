export type RFQStatus =
  | "Draft"
  | "Review"
  | "Published"
  | "Receiving Offers"
  | "Evaluation"
  | "Negotiation"
  | "Awarded"
  | "Cancelled"
  | "Expired";

export type QuotationStatus = "Draft" | "Submitted" | "Under Review" | "Shortlisted" | "Declined" | "Withdrawn";

export interface RFQLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  currency: string;
  specifications: { label: string; value: string }[];
}

export interface Quotation {
  id: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  countryCode: string;
  unitPrice: number;
  currency: string;
  totalLandedCost: number;
  leadTimeDays: number;
  incoterms: string;
  paymentTerms: string;
  qualityScore: number;
  verificationScore: number;
  riskScore: number;
  status: QuotationStatus;
  submittedDate: string;
  validity: string;
  notes: string;
  matchScore: number;
  matchReasons: { label: string; status: "match" | "partial" | "gap"; detail: string }[];
}

export interface RFQ {
  id: string;
  reference: string;
  title: string;
  buyerCompanyId: string;
  buyerName: string;
  buyerCountry: string;
  status: RFQStatus;
  createdDate: string;
  publishedDate?: string;
  closingDate: string;
  deliveryCountry: string;
  deliveryCity: string;
  incoterms: string;
  paymentTerms: string;
  confidentiality: "Public" | "Invited Only" | "Qualified Suppliers" | "Confidential";
  sourcingType: "Public" | "Private" | "Invited" | "Qualified Suppliers";
  lines: RFQLineItem[];
  invitations: number;
  quotationsReceived: number;
  shortlisted: number;
  evaluationCriteria: { label: string; weight: number }[];
  timeline: { date: string; event: string; actor: string; status: "done" | "current" | "pending" }[];
  summary: string;
}

export const rfqs: RFQ[] = [
  {
    id: "rfq-2026-1142",
    reference: "RFQ-2026-1142",
    title: "Industrial Centrifugal Pumps — Water Treatment Project",
    buyerCompanyId: "co-nordport",
    buyerName: "Nordport Logistics B.V.",
    buyerCountry: "Netherlands",
    status: "Receiving Offers",
    createdDate: "2026-10-12",
    publishedDate: "2026-10-15",
    closingDate: "2026-11-25",
    deliveryCountry: "Netherlands",
    deliveryCity: "Rotterdam",
    incoterms: "DAP Rotterdam",
    paymentTerms: "30% advance, 70% before shipment",
    confidentiality: "Public",
    sourcingType: "Public",
    lines: [
      {
        id: "L1",
        description: "Centrifugal process pump — stainless steel, 75 kW",
        quantity: 5000,
        unit: "units",
        targetPrice: 1280,
        currency: "USD",
        specifications: [
          { label: "Material", value: "AISI 316L stainless steel" },
          { label: "Motor", value: "75 kW, 3-phase, 400V, IE3" },
          { label: "Flow rate", value: "≥ 280 m³/h @ 60 m head" },
          { label: "Standard", value: "ISO 9906 Grade 2 / EN 733" },
        ],
      },
      {
        id: "L2",
        description: "Mechanical seal kit (spare, 5% of pumps)",
        quantity: 250,
        unit: "kits",
        targetPrice: 95,
        currency: "USD",
        specifications: [{ label: "Type", value: "Balanced cartridge mechanical seal" }, { label: "Material", value: "SiC/SiC, EPDM" }],
      },
    ],
    invitations: 14,
    quotationsReceived: 6,
    shortlisted: 3,
    evaluationCriteria: [
      { label: "Total landed cost", weight: 30 },
      { label: "Product quality & specifications", weight: 25 },
      { label: "Supplier verification", weight: 15 },
      { label: "Delivery time", weight: 12 },
      { label: "Production capacity", weight: 10 },
      { label: "Payment terms", weight: 5 },
      { label: "Historical performance", weight: 3 },
    ],
    timeline: [
      { date: "2026-10-12", event: "RFQ created", actor: "M. van Dijk (Nordport)", status: "done" },
      { date: "2026-10-13", event: "Platform consistency check — 1 missing field flagged", actor: "AI Sourcing Assistant", status: "done" },
      { date: "2026-10-14", event: "RFQ updated with material specification", actor: "M. van Dijk", status: "done" },
      { date: "2026-10-15", event: "RFQ published (Public sourcing)", actor: "M. van Dijk", status: "done" },
      { date: "2026-10-16", event: "14 suppliers invited via matching engine", actor: "Matching Agent", status: "done" },
      { date: "2026-10-19", event: "First quotation received — RheinTech Industries", actor: "RheinTech", status: "done" },
      { date: "2026-10-22", event: "5 more quotations received", actor: "Multiple suppliers", status: "done" },
      { date: "2026-11-25", event: "RFQ closes for evaluation", actor: "System", status: "current" },
      { date: "2026-11-28", event: "Evaluation & shortlisting", actor: "M. van Dijk", status: "pending" },
      { date: "2026-12-05", event: "Negotiation rounds begin", actor: "Buyer + shortlisted", status: "pending" },
    ],
    summary:
      "Public RFQ for 5,000 centrifugal process pumps destined for a regional water treatment infrastructure project. Sourcing is open to qualified suppliers globally; evaluation will prioritise total landed cost, technical compliance, and supplier verification status rather than lowest price.",
  },
  {
    id: "rfq-2026-1147",
    reference: "RFQ-2026-1147",
    title: "Medical Device PCB Assemblies — Long-Term Contract Manufacturing",
    buyerCompanyId: "co-elysian-proc",
    buyerName: "Elysian Procurement Group",
    buyerCountry: "United Kingdom",
    status: "Published",
    createdDate: "2026-09-28",
    publishedDate: "2026-10-04",
    closingDate: "2026-11-05",
    deliveryCountry: "United Kingdom",
    deliveryCity: "Manchester",
    incoterms: "DAP UK Distribution Centre",
    paymentTerms: "Net 45 (verified suppliers)",
    confidentiality: "Qualified Suppliers",
    sourcingType: "Qualified Suppliers",
    lines: [
      {
        id: "L1",
        description: "Class III medical device PCB assembly — main control board",
        quantity: 50000,
        unit: "assemblies/year",
        targetPrice: undefined,
        currency: "USD",
        specifications: [
          { label: "IPC class", value: "IPC-A-610 Class 3" },
          { label: "Quality system", value: "ISO 13485 mandatory" },
          { label: "Traceability", value: "3TG conflict minerals reporting" },
          { label: "Test", value: "Functional test + 100% burn-in" },
        ],
      },
    ],
    invitations: 9,
    quotationsReceived: 3,
    shortlisted: 0,
    evaluationCriteria: [
      { label: "Quality system compliance", weight: 30 },
      { label: "Total landed cost", weight: 25 },
      { label: "Supplier verification & references", weight: 20 },
      { label: "Capacity & lead time", weight: 15 },
      { label: "Payment terms", weight: 5 },
      { label: "Sustainability documentation", weight: 5 },
    ],
    timeline: [
      { date: "2026-09-28", event: "RFQ created (draft)", actor: "A. Patel (Elysian)", status: "done" },
      { date: "2026-10-02", event: "AI consistency check — 3 clarification questions suggested", actor: "AI Sourcing Assistant", status: "done" },
      { date: "2026-10-04", event: "RFQ published (Qualified Suppliers)", actor: "A. Patel", status: "done" },
      { date: "2026-10-06", event: "9 qualified suppliers invited", actor: "Matching Agent", status: "done" },
      { date: "2026-10-15", event: "First quotation received — Meridian Manufacturing", actor: "Meridian", status: "done" },
      { date: "2026-11-05", event: "RFQ closes for evaluation", actor: "System", status: "current" },
      { date: "2026-11-12", event: "Evaluation", actor: "A. Patel", status: "pending" },
    ],
    summary:
      "Qualified-supplier RFQ for 50,000 medical-grade PCB assemblies per year. Long-term contract manufacturing with pilot batch, then 24-month framework agreement. ISO 13485 mandatory; IPC-A-610 Class 3 and full traceability required.",
  },
  {
    id: "rfq-2026-1153",
    reference: "RFQ-2026-1153",
    title: "Structural Steel Fabrication — Energy Infrastructure Project",
    buyerCompanyId: "co-portlight",
    buyerName: "PortLight Trading FZE",
    buyerCountry: "United Arab Emirates",
    status: "Evaluation",
    createdDate: "2026-10-18",
    publishedDate: "2026-10-22",
    closingDate: "2026-11-10",
    deliveryCountry: "United Arab Emirates",
    deliveryCity: "Dubai (project site DAP)",
    incoterms: "DAP Project Site",
    paymentTerms: "Irrevocable L/C at sight",
    confidentiality: "Invited Only",
    sourcingType: "Invited",
    lines: [
      {
        id: "L1",
        description: "Fabricated structural steel beams (HEB / IPE sections)",
        quantity: 600,
        unit: "tonnes",
        targetPrice: 2100,
        currency: "USD",
        specifications: [
          { label: "Material grade", value: "S355J2 to EN 10025" },
          { label: "Standard", value: "EN 1090 CE Marking (EXC3)" },
          { label: "Welding", value: "BS EN ISO 3834-2" },
          { label: "Coating", value: "Sa 2.5 blast + 3-coat paint system" },
        ],
      },
      {
        id: "L2",
        description: "Trusses and lattice structures — welded",
        quantity: 250,
        unit: "tonnes",
        targetPrice: 2350,
        currency: "USD",
        specifications: [{ label: "Material", value: "S355J2" }, { label: "Standard", value: "EN 1090 EXC3" }],
      },
    ],
    invitations: 6,
    quotationsReceived: 4,
    shortlisted: 2,
    evaluationCriteria: [
      { label: "Product quality & compliance", weight: 28 },
      { label: "Total landed cost", weight: 25 },
      { label: "Delivery time", weight: 15 },
      { label: "Supplier verification", weight: 15 },
      { label: "Production capacity", weight: 12 },
      { label: "Historical performance", weight: 5 },
    ],
    timeline: [
      { date: "2026-10-18", event: "RFQ created (draft)", actor: "S. Al Mazrouei (PortLight)", status: "done" },
      { date: "2026-10-20", event: "Document package added (drawings + coating spec)", actor: "S. Al Mazrouei", status: "done" },
      { date: "2026-10-22", event: "RFQ published (Invited Only)", actor: "S. Al Mazrouei", status: "done" },
      { date: "2026-10-23", event: "6 suppliers invited", actor: "S. Al Mazrouei", status: "done" },
      { date: "2026-10-25", event: "First quotation — Vega Industries", actor: "Vega", status: "done" },
      { date: "2026-11-02", event: "3 more quotations received", actor: "Multiple", status: "done" },
      { date: "2026-11-10", event: "RFQ closed for evaluation", actor: "System", status: "done" },
      { date: "2026-11-12", event: "Shortlisting — 2 suppliers retained", actor: "S. Al Mazrouei", status: "current" },
      { date: "2026-11-18", event: "Negotiation rounds", actor: "Buyer + 2 suppliers", status: "pending" },
    ],
    summary:
      "Invited RFQ for structural steel fabrications for a regional energy infrastructure project. Buyer requires EN 1090 CE-marked fabrications with full welding traceability. Sourcing restricted to invited pre-qualified suppliers with project cargo experience.",
  },
  {
    id: "rfq-2026-1158",
    reference: "RFQ-2026-1158",
    title: "Specialty Food Ingredients — UK Distribution Framework",
    buyerCompanyId: "co-sapphirespice",
    buyerName: "Sapphire Trading LLP",
    buyerCountry: "United Kingdom",
    status: "Negotiation",
    createdDate: "2026-10-15",
    publishedDate: "2026-10-18",
    closingDate: "2026-11-30",
    deliveryCountry: "United Kingdom",
    deliveryCity: "Manchester",
    incoterms: "CIP UK Warehouse",
    paymentTerms: "Net 45",
    confidentiality: "Qualified Suppliers",
    sourcingType: "Qualified Suppliers",
    lines: [
      { id: "L1", description: "Ground turmeric (high curcumin)", quantity: 24, unit: "MT/year", targetPrice: undefined, currency: "GBP", specifications: [{ label: "Curcumin", value: "≥ 3.5%" }, { label: "Moisture", value: "≤ 10%" }] },
      { id: "L2", description: "Paprika extract (oil-soluble)", quantity: 8, unit: "MT/year", targetPrice: undefined, currency: "GBP", specifications: [{ label: "Colour strength", value: "100,000 ICU" }] },
    ],
    invitations: 7,
    quotationsReceived: 5,
    shortlisted: 3,
    evaluationCriteria: [
      { label: "Product quality & specifications", weight: 30 },
      { label: "Total landed cost", weight: 25 },
      { label: "Supplier verification & audit", weight: 20 },
      { label: "Documentation & traceability", weight: 15 },
      { label: "Payment terms", weight: 5 },
      { label: "Sustainability documentation", weight: 5 },
    ],
    timeline: [
      { date: "2026-10-15", event: "RFQ created", actor: "K. Robinson (Sapphire)", status: "done" },
      { date: "2026-10-18", event: "Published (Qualified Suppliers)", actor: "K. Robinson", status: "done" },
      { date: "2026-10-19", event: "7 qualified suppliers invited", actor: "Matching Agent", status: "done" },
      { date: "2026-11-02", event: "5 quotations received", actor: "Multiple", status: "done" },
      { date: "2026-11-10", event: "Shortlisting — 3 retained", actor: "K. Robinson", status: "done" },
      { date: "2026-11-15", event: "Negotiation rounds begin", actor: "Buyer + 3 suppliers", status: "current" },
      { date: "2026-12-01", event: "Award target date", actor: "Buyer", status: "pending" },
    ],
    summary:
      "Qualified-supplier RFQ for specialty food ingredients with UK distribution framework. BRCGS-compliant storage required. Long-term framework agreement with quarterly minimums.",
  },
];

export const rfqQuotations: Quotation[] = [
  {
    id: "q-001",
    rfqId: "rfq-2026-1142",
    supplierId: "co-rheintech",
    supplierName: "RheinTech Industries GmbH",
    supplierCountry: "Germany",
    countryCode: "DE",
    unitPrice: 1310,
    currency: "USD",
    totalLandedCost: 1328,
    leadTimeDays: 58,
    incoterms: "DAP Rotterdam",
    paymentTerms: "30% advance, 70% before shipment",
    qualityScore: 92,
    verificationScore: 98,
    riskScore: 18,
    status: "Shortlisted",
    submittedDate: "2026-10-19",
    validity: "30 days",
    notes:
      "Enhanced verification complete. PED 2014/68/EU compliant. Full material traceability EN 10204 3.1. Production capacity audit passed 2025-01-22. 4 reference customers in EU water treatment sector.",
    matchScore: 94,
    matchReasons: [
      { label: "Product specifications", status: "match", detail: "All technical specs met (material, motor, flow rate)" },
      { label: "Quality certification", status: "match", detail: "ISO 9001 + ISO 14001 + ATEX + TÜV SÜD audited" },
      { label: "Production capacity", status: "match", detail: "Confirmed 5,000 units in 60 days via audit" },
      { label: "Geographic fit", status: "match", detail: "EU production — direct DAP Rotterdam delivery" },
      { label: "Sanctions screening", status: "match", detail: "Cleared 2025-02-14" },
      { label: "Reference customers", status: "match", detail: "4 EU water-treatment references provided" },
    ],
  },
  {
    id: "q-002",
    rfqId: "rfq-2026-1142",
    supplierId: "co-meridian-mfg",
    supplierName: "Meridian Manufacturing Pte. Ltd.",
    supplierCountry: "Singapore",
    countryCode: "SG",
    unitPrice: 1190,
    currency: "USD",
    totalLandedCost: 1284,
    leadTimeDays: 64,
    incoterms: "DAP Rotterdam (via Singapore)",
    paymentTerms: "30% advance, 70% before shipment",
    qualityScore: 88,
    verificationScore: 95,
    riskScore: 22,
    status: "Shortlisted",
    submittedDate: "2026-10-22",
    validity: "30 days",
    notes:
      "Lower unit price partially offset by longer lead time and ocean freight. ISO 9001 + ISO 13485 in place; PED compliance confirmed via third-party review. Strong supplier verification profile.",
    matchScore: 86,
    matchReasons: [
      { label: "Product specifications", status: "match", detail: "All technical specs met" },
      { label: "Quality certification", status: "match", detail: "ISO 9001 + ISO 13485" },
      { label: "Production capacity", status: "partial", detail: "Capacity confirmed, but requires sequencing with EMS line" },
      { label: "Geographic fit", status: "partial", detail: "Singapore — longer ocean transit (≈28 days)" },
      { label: "Sanctions screening", status: "match", detail: "Cleared 2025-01-12" },
      { label: "Reference customers", status: "partial", detail: "Industrial references provided; not water-treatment specific" },
    ],
  },
  {
    id: "q-003",
    rfqId: "rfq-2026-1142",
    supplierId: "co-tidewater",
    supplierName: "Tidewater Components Inc.",
    supplierCountry: "United States",
    countryCode: "US",
    unitPrice: 1245,
    currency: "USD",
    totalLandedCost: 1341,
    leadTimeDays: 70,
    incoterms: "DAP Rotterdam (via US East Coast)",
    paymentTerms: "50% advance, 50% on delivery",
    qualityScore: 90,
    verificationScore: 92,
    riskScore: 25,
    status: "Shortlisted",
    submittedDate: "2026-10-23",
    validity: "30 days",
    notes:
      "AS9100D-certified manufacturer with strong quality systems. Payment terms (50% advance) and longer lead time (trans-Atlantic) push landed cost above competing offers. Reference customers in energy sector.",
    matchScore: 81,
    matchReasons: [
      { label: "Product specifications", status: "match", detail: "All technical specs met" },
      { label: "Quality certification", status: "match", detail: "ISO 9001 + AS9100D + ITAR" },
      { label: "Production capacity", status: "partial", detail: "Capacity confirmed, but aerospace priority mix" },
      { label: "Geographic fit", status: "partial", detail: "US — trans-Atlantic ocean transit (≈30 days)" },
      { label: "Sanctions screening", status: "match", detail: "Cleared 2025-01-08" },
      { label: "Reference customers", status: "partial", detail: "Energy sector references; not water-treatment specific" },
    ],
  },
  {
    id: "q-004",
    rfqId: "rfq-2026-1142",
    supplierId: "co-vega-industries",
    supplierName: "Vega Industries Ltd",
    supplierCountry: "United Kingdom",
    countryCode: "GB",
    unitPrice: 1395,
    currency: "USD",
    totalLandedCost: 1408,
    leadTimeDays: 72,
    incoterms: "DAP Rotterdam (via Hull)",
    paymentTerms: "30% advance, 70% before dispatch",
    qualityScore: 84,
    verificationScore: 94,
    riskScore: 24,
    status: "Under Review",
    submittedDate: "2026-10-25",
    validity: "30 days",
    notes:
      "Steel fabrication specialist rather than dedicated pump manufacturer. Could supply as contract fabricator of casings, but assembly & test would need additional partner. Worth considering for partial scope.",
    matchScore: 67,
    matchReasons: [
      { label: "Product specifications", status: "partial", detail: "Fabrication capability, not full pump assembly" },
      { label: "Quality certification", status: "match", detail: "ISO 9001 + EN 1090 + ISO 3834" },
      { label: "Production capacity", status: "partial", detail: "Capacity for casings; not for full pumps" },
      { label: "Geographic fit", status: "match", detail: "UK — short ferry to Rotterdam" },
      { label: "Sanctions screening", status: "match", detail: "Cleared 2025-01-19" },
      { label: "Reference customers", status: "gap", detail: "No water-treatment references" },
    ],
  },
  {
    id: "q-005",
    rfqId: "rfq-2026-1147",
    supplierId: "co-meridian-mfg",
    supplierName: "Meridian Manufacturing Pte. Ltd.",
    supplierCountry: "Singapore",
    countryCode: "SG",
    unitPrice: 0,
    currency: "USD",
    totalLandedCost: 0,
    leadTimeDays: 56,
    incoterms: "FCA Singapore",
    paymentTerms: "30% advance, 70% before shipment",
    qualityScore: 95,
    verificationScore: 98,
    riskScore: 15,
    status: "Shortlisted",
    submittedDate: "2026-10-15",
    validity: "60 days",
    notes:
      "ISO 13485 + IPC-A-610 Class 3 + 3TG reporting all confirmed. Perfect fit for medical device contract manufacturing. Capacity 25,000 PCB assemblies/week with 5 SMT lanes. Pilot batch 1,000 pcs available within 4 weeks.",
    matchScore: 96,
    matchReasons: [
      { label: "Quality system", status: "match", detail: "ISO 13485 mandatory — confirmed" },
      { label: "IPC class", status: "match", detail: "IPC-A-610 Class 3 confirmed" },
      { label: "Traceability", status: "match", detail: "3TG conflict-minerals reporting in place" },
      { label: "Capacity", status: "match", detail: "25,000 assemblies/week via 5 SMT lanes" },
      { label: "Reference customers", status: "match", detail: "Medical device references provided" },
      { label: "Geographic fit", status: "partial", detail: "Singapore — ocean transit ≈28 days" },
    ],
  },
  {
    id: "q-006",
    rfqId: "rfq-2026-1153",
    supplierId: "co-vega-industries",
    supplierName: "Vega Industries Ltd",
    supplierCountry: "United Kingdom",
    countryCode: "GB",
    unitPrice: 2280,
    currency: "USD",
    totalLandedCost: 2415,
    leadTimeDays: 78,
    incoterms: "DAP Project Site (via Jebel Ali)",
    paymentTerms: "Irrevocable L/C at sight",
    qualityScore: 95,
    verificationScore: 96,
    riskScore: 20,
    status: "Shortlisted",
    submittedDate: "2026-10-25",
    validity: "45 days",
    notes:
      "EN 1090 EXC3 fabrication with full BS EN ISO 3834 welding quality. CE marking confirmed. Project cargo experience in energy sector. Lead time tight but feasible with phased shipment.",
    matchScore: 92,
    matchReasons: [
      { label: "EN 1090 CE Marking", status: "match", detail: "EXC3 confirmed" },
      { label: "Welding quality", status: "match", detail: "BS EN ISO 3834-2 confirmed" },
      { label: "Coating system", status: "match", detail: "Sa 2.5 + 3-coat system available" },
      { label: "Project cargo experience", status: "match", detail: "Multiple energy sector references" },
      { label: "Geographic fit", status: "partial", detail: "UK fabrication — long ocean transit to GCC" },
      { label: "Sanctions screening", status: "match", detail: "Cleared 2025-01-19" },
    ],
  },
];

export function getRFQ(id: string): RFQ | undefined {
  return rfqs.find((r) => r.id === id || r.reference === id);
}

export function getQuotationsForRFQ(rfqId: string): Quotation[] {
  return rfqQuotations.filter((q) => q.rfqId === rfqId);
}
