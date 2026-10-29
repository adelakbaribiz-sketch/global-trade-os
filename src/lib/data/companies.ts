// Deterministic demo data for Global Trade OS
// All companies are fictional, with internationally diverse examples.
// No Iran-specific data, no RTL, English only.

export type VerificationLevel =
  | "Unverified"
  | "Information Submitted"
  | "Under Review"
  | "Basic Verification Complete"
  | "Enhanced Verification Complete"
  | "Verification Expired"
  | "Verification Suspended";

export type CompanyType = "Buyer" | "Supplier" | "Buyer & Supplier" | "Service Partner" | "Representative";

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  country: string;
  countryCode: string;
  city: string;
  industry: string;
  category: string;
  employees: string;
  foundedYear: number;
  verification: VerificationLevel;
  verificationChecks: { label: string; status: "passed" | "pending" | "expired" | "not_required"; date?: string }[];
  rating: number;
  responseTimeHours: number;
  onTimeDelivery: number;
  tradeVolumeUsd: number;
  openDeals: number;
  description: string;
  tags: string[];
  certifications: string[];
  preferredIncoterms: string[];
  preferredPaymentTerms: string[];
  capabilities?: string[];
  languages: string[];
  website: string;
}

export const companies: Company[] = [
  {
    id: "co-rheintech",
    name: "RheinTech Industries GmbH",
    type: "Supplier",
    country: "Germany",
    countryCode: "DE",
    city: "Stuttgart",
    industry: "Industrial Machinery",
    category: "Manufacturing",
    employees: "1,200",
    foundedYear: 1998,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-02-14" },
      { label: "Authorized Representatives", status: "passed", date: "2025-02-14" },
      { label: "Business Address", status: "passed", date: "2025-02-14" },
      { label: "Tax / VAT Identifier", status: "passed", date: "2025-02-14" },
      { label: "Sanctions Screening", status: "passed", date: "2025-02-14" },
      { label: "ISO 9001 Certification", status: "passed", date: "2024-11-03" },
      { label: "Production Capacity Audit", status: "passed", date: "2025-01-22" },
      { label: "Reference Customers", status: "passed", date: "2025-01-22" },
    ],
    rating: 4.8,
    responseTimeHours: 4,
    onTimeDelivery: 96,
    tradeVolumeUsd: 18400000,
    openDeals: 7,
    description:
      "Precision engineering and contract manufacturer of industrial pumps, hydraulic systems, and custom mechanical assemblies. Specializes in mid-to-high volume production for the energy, water treatment, and process industries. TÜV-certified quality management with full traceability.",
    tags: ["Industrial Pumps", "Hydraulics", "Contract Manufacturing", "Precision Engineering"],
    certifications: ["ISO 9001:2015", "ISO 14001", "ATEX Directive 2014/34/EU", "TÜV SÜD Audited"],
    preferredIncoterms: ["EXW", "FCA", "CIP", "DAP"],
    preferredPaymentTerms: ["30% advance, 70% before shipment", "Irrevocable L/C at sight"],
    capabilities: [
      "CNC machining (5-axis)",
      "Stainless steel fabrication",
      "Hydraulic assembly",
      "PED 2014/68/EU compliant pressure equipment",
      "Lead time: 45–60 days for repeat orders",
    ],
    languages: ["English", "German"],
    website: "rheintech.example.com",
  },
  {
    id: "co-nordport",
    name: "Nordport Logistics B.V.",
    type: "Buyer & Supplier",
    country: "Netherlands",
    countryCode: "NL",
    city: "Rotterdam",
    industry: "Logistics & Distribution",
    category: "Distribution",
    employees: "480",
    foundedYear: 2004,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-03-02" },
      { label: "Authorized Representatives", status: "passed", date: "2025-03-02" },
      { label: "Business Address", status: "passed", date: "2025-03-02" },
      { label: "Tax / VAT Identifier", status: "passed", date: "2025-03-02" },
      { label: "Sanctions Screening", status: "passed", date: "2025-03-02" },
      { label: "Customs AEO Certificate", status: "passed", date: "2024-08-19" },
      { label: "Warehouse Capacity Audit", status: "passed", date: "2025-01-15" },
    ],
    rating: 4.6,
    responseTimeHours: 6,
    onTimeDelivery: 94,
    tradeVolumeUsd: 9200000,
    openDeals: 4,
    description:
      "Port-centric distributor and 3PL partner operating bonded warehouses near Rotterdam. Provides consolidation, customs brokerage, last-mile distribution across the EU, and reverse logistics for industrial clients.",
    tags: ["3PL", "Customs Brokerage", "EU Distribution", "Bonded Warehousing"],
    certifications: ["AEO C", "ISO 28000 Supply Chain Security", "GDP for Medical Devices"],
    preferredIncoterms: ["FCA", "CIP", "DAP"],
    preferredPaymentTerms: ["Net 30", "Net 45"],
    capabilities: [
      "Bonded warehousing — 38,000 m²",
      "EU last-mile distribution",
      "Customs clearance EU import",
      "Cross-dock operations",
    ],
    languages: ["English", "Dutch"],
    website: "nordport.example.com",
  },
  {
    id: "co-meridian-mfg",
    name: "Meridian Manufacturing Pte. Ltd.",
    type: "Supplier",
    country: "Singapore",
    countryCode: "SG",
    city: "Singapore",
    industry: "Electronics Manufacturing",
    category: "Electronics",
    employees: "2,400",
    foundedYear: 1989,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-01-12" },
      { label: "Authorized Representatives", status: "passed", date: "2025-01-12" },
      { label: "Sanctions Screening", status: "passed", date: "2025-01-12" },
      { label: "ISO 9001 Certification", status: "passed", date: "2024-09-30" },
      { label: "IPC-A-610 Audit", status: "passed", date: "2024-12-05" },
      { label: "Conflict Minerals Reporting", status: "passed", date: "2024-10-18" },
    ],
    rating: 4.9,
    responseTimeHours: 3,
    onTimeDelivery: 98,
    tradeVolumeUsd: 26100000,
    openDeals: 11,
    description:
      "Full-service electronics manufacturing services (EMS) provider with surface mount, through-hole, and box-build capability. Serves medical devices, industrial controls, and connected infrastructure sectors with full traceability and conflict-minerals compliance.",
    tags: ["EMS", "PCB Assembly", "Box Build", "Medical Devices", "Industrial Controls"],
    certifications: ["ISO 9001:2015", "ISO 13485 Medical Devices", "IPC-A-610 Class 3", "UL Listed"],
    preferredIncoterms: ["FCA", "FOB", "CIP"],
    preferredPaymentTerms: ["30% advance, 70% before shipment", "Net 30 (verified buyers)"],
    capabilities: [
      "SMT lines — 6 lanes",
      "Through-hole assembly",
      "Box build / system integration",
      "Functional test & burn-in",
      "Lead time: 4–8 weeks depending on BOM",
    ],
    languages: ["English", "Mandarin"],
    website: "meridian-mfg.example.com",
  },
  {
    id: "co-elysian-proc",
    name: "Elysian Procurement Group",
    type: "Buyer",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    industry: "Procurement & Wholesale",
    category: "Procurement",
    employees: "320",
    foundedYear: 2011,
    verification: "Basic Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-02-01" },
      { label: "Authorized Representatives", status: "passed", date: "2025-02-01" },
      { label: "Sanctions Screening", status: "passed", date: "2025-02-01" },
      { label: "Trade References", status: "passed", date: "2025-01-22" },
      { label: "Financial Standing Review", status: "pending" },
    ],
    rating: 4.4,
    responseTimeHours: 12,
    onTimeDelivery: 91,
    tradeVolumeUsd: 12700000,
    openDeals: 9,
    description:
      "Centralised procurement organisation serving a network of regional distributors across the UK and Ireland. Specialises in industrial components, MRO, and facilities-management consumables.",
    tags: ["Procurement", "MRO", "Industrial Components", "Wholesale"],
    certifications: ["ISO 9001:2015", "Cyber Essentials Plus"],
    preferredIncoterms: ["DAP", "DDP"],
    preferredPaymentTerms: ["Net 45", "Net 60"],
    capabilities: [
      "Multi-branch procurement consolidation",
      "Vendor managed inventory",
      "Group purchasing for SMEs",
    ],
    languages: ["English"],
    website: "elysian-proc.example.com",
  },
  {
    id: "co-portlight",
    name: "PortLight Trading FZE",
    type: "Buyer & Supplier",
    country: "United Arab Emirates",
    countryCode: "AE",
    city: "Dubai",
    industry: "Building Materials & Trade",
    category: "Construction",
    employees: "180",
    foundedYear: 2016,
    verification: "Under Review",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-03-11" },
      { label: "Authorized Representatives", status: "passed", date: "2025-03-11" },
      { label: "Sanctions Screening", status: "passed", date: "2025-03-11" },
      { label: "Warehouse Inspection", status: "pending" },
      { label: "Reference Customers", status: "pending" },
    ],
    rating: 4.1,
    responseTimeHours: 18,
    onTimeDelivery: 88,
    tradeVolumeUsd: 4100000,
    openDeals: 5,
    description:
      "Free-zone based trading house connecting Asian manufacturers with construction and infrastructure projects across the GCC and East Africa. Sourcing focus on steel products, finishing materials, and lighting systems.",
    tags: ["Building Materials", "Steel", "Lighting", "GCC Distribution"],
    certifications: ["Dubai Chamber of Commerce Member"],
    preferredIncoterms: ["CIF", "CFR", "DAP"],
    preferredPaymentTerms: ["Irrevocable L/C at sight", "30% advance, 70% against B/L copy"],
    capabilities: [
      "Project sourcing",
      "GCC logistics coordination",
      "Buyer consolidation Jebel Ali",
    ],
    languages: ["English", "Arabic"],
    website: "portlight.example.com",
  },
  {
    id: "co-tidewater",
    name: "Tidewater Components Inc.",
    type: "Supplier",
    country: "United States",
    countryCode: "US",
    city: "Cleveland, OH",
    industry: "Industrial Components",
    category: "Manufacturing",
    employees: "780",
    foundedYear: 1972,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-01-08" },
      { label: "Authorized Representatives", status: "passed", date: "2025-01-08" },
      { label: "Sanctions Screening", status: "passed", date: "2025-01-08" },
      { label: "ISO 9001 Certification", status: "passed", date: "2024-07-22" },
      { label: "ITAR Registration", status: "passed", date: "2024-06-15" },
      { label: "Reference Customers", status: "passed", date: "2024-12-10" },
    ],
    rating: 4.7,
    responseTimeHours: 8,
    onTimeDelivery: 95,
    tradeVolumeUsd: 15800000,
    openDeals: 6,
    description:
      "Manufacturer of precision-machined industrial components and sub-assemblies for the energy, aerospace, and defence sectors. ITAR-registered with full material traceability and NDT capabilities.",
    tags: ["CNC Machining", "Sub-Assemblies", "Aerospace", "Defence"],
    certifications: ["ISO 9001:2015", "AS9100D", "ITAR Registered", "Nadcap NDT"],
    preferredIncoterms: ["FCA", "FAS", "FOB"],
    preferredPaymentTerms: ["Net 30", "50% advance, 50% on delivery"],
    capabilities: [
      "5-axis CNC machining",
      "Sub-assembly & kitting",
      "Material traceability (mill certs)",
      "Lead time: 35–50 days",
    ],
    languages: ["English", "Spanish"],
    website: "tidewater.example.com",
  },
  {
    id: "co-sapphirespice",
    name: "Sapphire Trading LLP",
    type: "Buyer & Supplier",
    country: "United Kingdom",
    countryCode: "GB",
    city: "Manchester",
    industry: "Food & Consumer Goods",
    category: "Consumer Goods",
    employees: "65",
    foundedYear: 2019,
    verification: "Basic Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-02-20" },
      { label: "Sanctions Screening", status: "passed", date: "2025-02-20" },
      { label: "Reference Customers", status: "passed", date: "2025-02-20" },
      { label: "Food Safety Audit", status: "pending" },
    ],
    rating: 4.2,
    responseTimeHours: 14,
    onTimeDelivery: 89,
    tradeVolumeUsd: 2300000,
    openDeals: 3,
    description:
      "Importer and distributor of specialty food ingredients and consumer packaged goods. Serves UK retailers, food manufacturers, and HoReCa suppliers.",
    tags: ["Food Ingredients", "CPG", "Distribution", "Retail"],
    certifications: ["BRCGS Storage & Distribution"],
    preferredIncoterms: ["FCA", "CIP", "DAP"],
    preferredPaymentTerms: ["Net 30", "Net 45"],
    capabilities: ["UK distribution", "Consolidated sourcing", "Retail-ready packaging"],
    languages: ["English"],
    website: "sapphire-trading.example.com",
  },
  {
    id: "co-hudson",
    name: "Hudson Bay Materials Corp.",
    type: "Supplier",
    country: "United States",
    countryCode: "US",
    city: "Houston, TX",
    industry: "Industrial Chemicals",
    category: "Chemicals",
    employees: "540",
    foundedYear: 1985,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-02-28" },
      { label: "Authorized Representatives", status: "passed", date: "2025-02-28" },
      { label: "Sanctions Screening", status: "passed", date: "2025-02-28" },
      { label: "ISO 9001 Certification", status: "passed", date: "2024-08-11" },
      { label: "Responsible Distribution Audit", status: "passed", date: "2024-10-02" },
      { label: "Reference Customers", status: "passed", date: "2024-11-15" },
    ],
    rating: 4.5,
    responseTimeHours: 10,
    onTimeDelivery: 93,
    tradeVolumeUsd: 11300000,
    openDeals: 5,
    description:
      "Manufacturer and distributor of specialty industrial chemicals, lubricants, and water-treatment compounds. NACD Responsible Distribution certified with bulk and packaged product capability.",
    tags: ["Industrial Chemicals", "Lubricants", "Water Treatment", "Bulk Distribution"],
    certifications: ["ISO 9001:2015", "NACD Responsible Distribution", "REACH Compliant"],
    preferredIncoterms: ["FCA", "FOB", "DAP"],
    preferredPaymentTerms: ["Net 30", "Irrevocable L/C at sight"],
    capabilities: ["Bulk tanker loading", "Drum & IBC filling", "Custom blending", "Lead time: 25–40 days"],
    languages: ["English"],
    website: "hudsonbay.example.com",
  },
  {
    id: "co-vega-industries",
    name: "Vega Industries Ltd",
    type: "Supplier",
    country: "United Kingdom",
    countryCode: "GB",
    city: "Birmingham",
    industry: "Industrial Fabrication",
    category: "Manufacturing",
    employees: "410",
    foundedYear: 1967,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-01-19" },
      { label: "Authorized Representatives", status: "passed", date: "2025-01-19" },
      { label: "Sanctions Screening", status: "passed", date: "2025-01-19" },
      { label: "ISO 9001 Certification", status: "passed", date: "2024-06-30" },
      { label: "CE Marking Compliance", status: "passed", date: "2024-09-12" },
      { label: "Reference Customers", status: "passed", date: "2024-12-20" },
    ],
    rating: 4.6,
    responseTimeHours: 7,
    onTimeDelivery: 92,
    tradeVolumeUsd: 7600000,
    openDeals: 4,
    description:
      "Steel fabrication and structural engineering specialist serving infrastructure, energy, and process plant sectors. CE-marked structural steelwork with full welding traceability.",
    tags: ["Structural Steel", "Fabrication", "Infrastructure", "Energy"],
    certifications: ["ISO 9001:2015", "CE Marking EN 1090", "BS EN ISO 3834 Welding Quality"],
    preferredIncoterms: ["EXW", "FCA", "DAP"],
    preferredPaymentTerms: ["30% advance, 70% before dispatch"],
    capabilities: ["Heavy structural fabrication", "Welding (MIG/TIG/MMA)", "Surface treatment", "Lead time: 40–70 days"],
    languages: ["English"],
    website: "vega-industries.example.com",
  },
  {
    id: "co-kaiyo",
    name: "Kaiyo Marine Services Ltd",
    type: "Service Partner",
    country: "Singapore",
    countryCode: "SG",
    city: "Singapore",
    industry: "Inspection & Marine Services",
    category: "Services",
    employees: "240",
    foundedYear: 2002,
    verification: "Enhanced Verification Complete",
    verificationChecks: [
      { label: "Legal Entity Registration", status: "passed", date: "2025-02-04" },
      { label: "Authorized Representatives", status: "passed", date: "2025-02-04" },
      { label: "Sanctions Screening", status: "passed", date: "2025-02-04" },
      { label: "ISO/IEC 17020 Accreditation", status: "passed", date: "2024-08-22" },
      { label: "Inspector Competency Audit", status: "passed", date: "2024-11-08" },
    ],
    rating: 4.7,
    responseTimeHours: 5,
    onTimeDelivery: 97,
    tradeVolumeUsd: 5400000,
    openDeals: 8,
    description:
      "Independent third-party inspection and quality assurance provider for marine cargo, industrial equipment, and project cargo. ISO/IEC 17020 accredited with offices in major Asian ports.",
    tags: ["Inspection", "QA/QC", "Marine Cargo", "Pre-Shipment Inspection"],
    certifications: ["ISO/IEC 17020 Type A", "ISO 9001:2015"],
    preferredIncoterms: ["DAP"],
    preferredPaymentTerms: ["Net 30"],
    capabilities: ["Pre-shipment inspection", "Loading supervision", "Cargo damage survey", "Project cargo QA"],
    languages: ["English", "Mandarin", "Bahasa Indonesia"],
    website: "kaiyo-marine.example.com",
  },
];

export const companyCategories = [
  "All Categories",
  "Manufacturing",
  "Electronics",
  "Distribution",
  "Procurement",
  "Construction",
  "Chemicals",
  "Consumer Goods",
  "Services",
];

export const countries = [
  "All Countries",
  "Germany",
  "Netherlands",
  "Singapore",
  "United Kingdom",
  "United Arab Emirates",
  "United States",
];

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}
