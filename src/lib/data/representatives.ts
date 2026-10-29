export type AgreementType =
  | "Non-Exclusive Representation"
  | "Exclusive Representation"
  | "Limited-Territory"
  | "Industry-Specific"
  | "Product-Specific"
  | "Referral-Only"
  | "Fixed-Fee";

export type RepStatus = "Active" | "Pending Review" | "Onboarding" | "Suspended" | "Expired";

export interface Representative {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  companyName: string;
  country: string;
  countryCode: string;
  regions: string[];
  industries: string[];
  languages: string[];
  agreementType: AgreementType;
  status: RepStatus;
  verificationLevel: "Enhanced Verified" | "Basic Verified" | "Pending";
  rating: number;
  activeLeads: number;
  closedDeals: number;
  estimatedCommissionUsd: number;
  earnedCommissionUsd: number;
  paidCommissionUsd: number;
  coverageRate: number;
  responseTimeHours: number;
  joinedDate: string;
  contractStart: string;
  contractEnd: string;
  references: number;
  specializations: string[];
  bio: string;
}

export const representatives: Representative[] = [
  {
    id: "rep-001",
    name: "Lukas Hoffmann",
    email: "l.hoffmann@example.com",
    avatarInitials: "LH",
    companyName: "Hoffmann Trade Advisory",
    country: "Germany",
    countryCode: "DE",
    regions: ["Germany", "Austria", "Switzerland", "Benelux"],
    industries: ["Industrial Machinery", "Manufacturing", "Energy"],
    languages: ["English", "German", "Dutch"],
    agreementType: "Exclusive Representation",
    status: "Active",
    verificationLevel: "Enhanced Verified",
    rating: 4.8,
    activeLeads: 12,
    closedDeals: 34,
    estimatedCommissionUsd: 184000,
    earnedCommissionUsd: 124000,
    paidCommissionUsd: 98000,
    coverageRate: 92,
    responseTimeHours: 4,
    joinedDate: "2024-03-12",
    contractStart: "2024-04-01",
    contractEnd: "2027-03-31",
    references: 18,
    specializations: ["Pumps & Hydraulics", "Steel Fabrication", "Energy Projects"],
    bio: "20+ years connecting DACH region industrial buyers with qualified international suppliers. Former procurement director at a Tier-1 energy OEM. Deep network in German Mittelstand manufacturing.",
  },
  {
    id: "rep-002",
    name: "Anya Vermeer",
    email: "a.vermeer@example.com",
    avatarInitials: "AV",
    companyName: "Vermeer Connect B.V.",
    country: "Netherlands",
    countryCode: "NL",
    regions: ["Netherlands", "Belgium", "Luxembourg", "Northern France"],
    industries: ["Logistics", "Distribution", "Consumer Goods"],
    languages: ["English", "Dutch", "French"],
    agreementType: "Non-Exclusive Representation",
    status: "Active",
    verificationLevel: "Enhanced Verified",
    rating: 4.6,
    activeLeads: 8,
    closedDeals: 21,
    estimatedCommissionUsd: 112000,
    earnedCommissionUsd: 78000,
    paidCommissionUsd: 62000,
    coverageRate: 88,
    responseTimeHours: 6,
    joinedDate: "2024-05-08",
    contractStart: "2024-06-01",
    contractEnd: "2026-05-31",
    references: 12,
    specializations: ["Port & Logistics", "FMCG Distribution", "Bonded Warehousing"],
    bio: "Rotterdam-based trade advisor specialising in port-centric distribution and EU market entry. 14 years at a major 3PL before founding advisory. Strong relationships with Rotterdam and Antwerp terminals.",
  },
  {
    id: "rep-003",
    name: "Daniel Tan",
    email: "d.tan@example.com",
    avatarInitials: "DT",
    companyName: "Tan Bridge Partners",
    country: "Singapore",
    countryCode: "SG",
    regions: ["Singapore", "Malaysia", "Indonesia", "Vietnam"],
    industries: ["Electronics", "Semiconductors", "Medical Devices"],
    languages: ["English", "Mandarin", "Bahasa Malaysia"],
    agreementType: "Industry-Specific",
    status: "Active",
    verificationLevel: "Enhanced Verified",
    rating: 4.9,
    activeLeads: 14,
    closedDeals: 41,
    estimatedCommissionUsd: 286000,
    earnedCommissionUsd: 201000,
    paidCommissionUsd: 162000,
    coverageRate: 94,
    responseTimeHours: 3,
    joinedDate: "2024-01-22",
    contractStart: "2024-02-01",
    contractEnd: "2027-01-31",
    references: 24,
    specializations: ["EMS / PCB Assembly", "Contract Manufacturing", "Semiconductor Equipment"],
    bio: "Asia-Pacific electronics and semiconductor specialist. Former business development director at a top-5 EMS provider. Trusted bridge between Western OEMs and qualified SEA manufacturing capacity.",
  },
  {
    id: "rep-004",
    name: "Sophia Reyes",
    email: "s.reyes@example.com",
    avatarInitials: "SR",
    companyName: "Reyes Trade Solutions",
    country: "United States",
    countryCode: "US",
    regions: ["United States (East)", "Canada (East)"],
    industries: ["Aerospace", "Defence", "Industrial Components"],
    languages: ["English", "Spanish"],
    agreementType: "Product-Specific",
    status: "Active",
    verificationLevel: "Enhanced Verified",
    rating: 4.7,
    activeLeads: 9,
    closedDeals: 27,
    estimatedCommissionUsd: 168000,
    earnedCommissionUsd: 119000,
    paidCommissionUsd: 92000,
    coverageRate: 87,
    responseTimeHours: 8,
    joinedDate: "2024-06-18",
    contractStart: "2024-07-01",
    contractEnd: "2026-06-30",
    references: 16,
    specializations: ["CNC Machined Components", "Aerospace Sub-Assemblies", "ITAR Compliant Trade"],
    bio: "US East Coast representative specialising in aerospace & defence supply chains. ITAR-trained with strong network across tier-2/3 suppliers. 12 years in industrial sales leadership.",
  },
  {
    id: "rep-005",
    name: "Mariam Al Suwaidi",
    email: "m.alsuwaidi@example.com",
    avatarInitials: "MS",
    companyName: "Al Suwaidi Trade Bridge FZE",
    country: "United Arab Emirates",
    countryCode: "AE",
    regions: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kenya"],
    industries: ["Building Materials", "Construction", "Infrastructure"],
    languages: ["English", "Arabic"],
    agreementType: "Limited-Territory",
    status: "Active",
    verificationLevel: "Basic Verified",
    rating: 4.3,
    activeLeads: 11,
    closedDeals: 19,
    estimatedCommissionUsd: 142000,
    earnedCommissionUsd: 84000,
    paidCommissionUsd: 58000,
    coverageRate: 79,
    responseTimeHours: 14,
    joinedDate: "2024-08-01",
    contractStart: "2024-09-01",
    contractEnd: "2026-08-31",
    references: 9,
    specializations: ["Project Cargo", "Steel & Construction Materials", "GCC Distribution"],
    bio: "Dubai-based trade representative covering GCC and East African markets. Specialises in infrastructure and energy projects. Strong relationships with main contractors in Saudi Arabia and UAE.",
  },
  {
    id: "rep-006",
    name: "Olivia Brooks",
    email: "o.brooks@example.com",
    avatarInitials: "OB",
    companyName: "Brooks Trade Advisory",
    country: "United Kingdom",
    countryCode: "GB",
    regions: ["United Kingdom", "Ireland"],
    industries: ["Food & Beverage", "Consumer Goods", "Retail Supply"],
    languages: ["English"],
    agreementType: "Non-Exclusive Representation",
    status: "Pending Review",
    verificationLevel: "Pending",
    rating: 0,
    activeLeads: 0,
    closedDeals: 0,
    estimatedCommissionUsd: 0,
    earnedCommissionUsd: 0,
    paidCommissionUsd: 0,
    coverageRate: 0,
    responseTimeHours: 0,
    joinedDate: "2026-10-15",
    contractStart: "",
    contractEnd: "",
    references: 3,
    specializations: ["Specialty Food Ingredients", "CPG Distribution"],
    bio: "Applicant with 10 years in UK food & beverage distribution. Currently under representative review with 3 references pending verification. Awaiting compliance approval before activation.",
  },
];

export function getRepresentative(id: string): Representative | undefined {
  return representatives.find((r) => r.id === id);
}
