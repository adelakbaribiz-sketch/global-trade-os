export type CommissionStatus =
  | "Estimated"
  | "Earned"
  | "Pending Approval"
  | "Approved"
  | "Payable"
  | "Paid"
  | "Reversed";

export type CommissionAgreementType =
  | "Percentage Commission"
  | "Fixed Fee"
  | "Tiered"
  | "Buyer-Side Fee"
  | "Supplier-Side Fee"
  | "Referral"
  | "Multi-Level Referral"
  | "Split"
  | "Performance Bonus";

export interface CommissionAgreement {
  id: string;
  reference: string;
  partyName: string;
  partyType: "Representative" | "Buyer" | "Supplier" | "Platform" | "Referrer";
  type: CommissionAgreementType;
  rate: string;
  basis: string;
  triggeringEvent: string;
  currency: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: "Active" | "Draft" | "Expired" | "Suspended";
  attributedVolumeUsd: number;
  estimatedUsd: number;
  earnedUsd: number;
  approvedUsd: number;
  payableUsd: number;
  paidUsd: number;
  reversedUsd: number;
}

export interface CommissionLedgerEntry {
  id: string;
  date: string;
  reference: string;
  agreementId: string;
  partyName: string;
  description: string;
  status: CommissionStatus;
  amount: number;
  currency: string;
  source: string;
  approver?: string;
}

export const commissionAgreements: CommissionAgreement[] = [
  {
    id: "ca-001",
    reference: "CA-2026-LH-001",
    partyName: "Lukas Hoffmann (Hoffmann Trade Advisory)",
    partyType: "Representative",
    type: "Percentage Commission",
    rate: "3.5%",
    basis: "Net invoiced value of awarded contracts",
    triggeringEvent: "Contract execution by referred buyer",
    currency: "USD",
    effectiveFrom: "2024-04-01",
    effectiveTo: "2027-03-31",
    status: "Active",
    attributedVolumeUsd: 5257000,
    estimatedUsd: 184000,
    earnedUsd: 124000,
    approvedUsd: 98000,
    payableUsd: 36000,
    paidUsd: 62000,
    reversedUsd: 0,
  },
  {
    id: "ca-002",
    reference: "CA-2026-AV-002",
    partyName: "Anya Vermeer (Vermeer Connect B.V.)",
    partyType: "Representative",
    type: "Percentage Commission",
    rate: "3.0%",
    basis: "Net invoiced value of awarded contracts",
    triggeringEvent: "Contract execution by referred buyer",
    currency: "USD",
    effectiveFrom: "2024-06-01",
    effectiveTo: "2026-05-31",
    status: "Active",
    attributedVolumeUsd: 3733000,
    estimatedUsd: 112000,
    earnedUsd: 78000,
    approvedUsd: 62000,
    payableUsd: 16000,
    paidUsd: 46000,
    reversedUsd: 0,
  },
  {
    id: "ca-003",
    reference: "CA-2026-DT-003",
    partyName: "Daniel Tan (Tan Bridge Partners)",
    partyType: "Representative",
    type: "Tiered",
    rate: "2.5% up to $5M / 3.5% above $5M / 4.0% above $10M",
    basis: "Net invoiced value of awarded contracts, tiered annually",
    triggeringEvent: "Contract execution by referred buyer",
    currency: "USD",
    effectiveFrom: "2024-02-01",
    effectiveTo: "2027-01-31",
    status: "Active",
    attributedVolumeUsd: 8170000,
    estimatedUsd: 286000,
    earnedUsd: 201000,
    approvedUsd: 162000,
    payableUsd: 64000,
    paidUsd: 98000,
    reversedUsd: 0,
  },
  {
    id: "ca-004",
    reference: "CA-2026-SR-004",
    partyName: "Sophia Reyes (Reyes Trade Solutions)",
    partyType: "Representative",
    type: "Percentage Commission",
    rate: "3.5%",
    basis: "Net invoiced value of awarded contracts",
    triggeringEvent: "Contract execution by referred buyer",
    currency: "USD",
    effectiveFrom: "2024-07-01",
    effectiveTo: "2026-06-30",
    status: "Active",
    attributedVolumeUsd: 4800000,
    estimatedUsd: 168000,
    earnedUsd: 119000,
    approvedUsd: 92000,
    payableUsd: 28000,
    paidUsd: 64000,
    reversedUsd: 0,
  },
  {
    id: "ca-005",
    reference: "CA-2026-MS-005",
    partyName: "Mariam Al Suwaidi (Al Suwaidi Trade Bridge FZE)",
    partyType: "Representative",
    type: "Percentage Commission",
    rate: "4.0%",
    basis: "Net invoiced value of awarded contracts",
    triggeringEvent: "Contract execution by referred buyer",
    currency: "USD",
    effectiveFrom: "2024-09-01",
    effectiveTo: "2026-08-31",
    status: "Active",
    attributedVolumeUsd: 2100000,
    estimatedUsd: 142000,
    earnedUsd: 84000,
    approvedUsd: 58000,
    payableUsd: 22000,
    paidUsd: 36000,
    reversedUsd: 0,
  },
  {
    id: "ca-006",
    reference: "CA-2026-PLT-006",
    partyName: "Platform Buyer-Side Fee (Elysian Procurement Group)",
    partyType: "Buyer",
    type: "Buyer-Side Fee",
    rate: "0.75%",
    basis: "Net invoiced value of awarded contracts sourced via Global Trade OS",
    triggeringEvent: "Contract execution",
    currency: "USD",
    effectiveFrom: "2024-11-01",
    effectiveTo: "2026-10-31",
    status: "Active",
    attributedVolumeUsd: 6750000,
    estimatedUsd: 50625,
    earnedUsd: 39375,
    approvedUsd: 39375,
    payableUsd: 0,
    paidUsd: 39375,
    reversedUsd: 0,
  },
  {
    id: "ca-007",
    reference: "CA-2026-PLT-007",
    partyName: "Platform Supplier-Side Fee (Meridian Manufacturing)",
    partyType: "Supplier",
    type: "Supplier-Side Fee",
    rate: "1.0%",
    basis: "Net invoiced value of contracts awarded via Global Trade OS",
    triggeringEvent: "Buyer's first milestone payment",
    currency: "USD",
    effectiveFrom: "2024-03-01",
    effectiveTo: "2027-02-28",
    status: "Active",
    attributedVolumeUsd: 9800000,
    estimatedUsd: 98000,
    earnedUsd: 98000,
    approvedUsd: 98000,
    payableUsd: 0,
    paidUsd: 98000,
    reversedUsd: 0,
  },
];

export const commissionLedger: CommissionLedgerEntry[] = [
  { id: "le-001", date: "2026-10-26", reference: "PAY-2026-Q4-001", agreementId: "ca-001", partyName: "Lukas Hoffmann", description: "Q3 commission payout — 4 awarded contracts", status: "Paid", amount: 24000, currency: "USD", source: "Wire transfer — Bank Leumi", approver: "C. Müller (Finance)" },
  { id: "le-002", date: "2026-10-22", reference: "APR-2026-10-114", agreementId: "ca-003", partyName: "Daniel Tan", description: "Earned commission — Meridian / Elysian contract award", status: "Approved", amount: 16800, currency: "USD", source: "Contract execution milestone", approver: "C. Müller (Finance)" },
  { id: "le-003", date: "2026-10-18", reference: "EAR-2026-10-091", agreementId: "ca-002", partyName: "Anya Vermeer", description: "Earned commission — Nordport / supplier contract award", status: "Earned", amount: 9200, currency: "USD", source: "Contract execution milestone" },
  { id: "le-004", date: "2026-10-15", reference: "APR-2026-10-088", agreementId: "ca-004", partyName: "Sophia Reyes", description: "Earned commission — Tidewater / aerospace OEM contract", status: "Pending Approval", amount: 14200, currency: "USD", source: "Contract execution milestone" },
  { id: "le-005", date: "2026-10-12", reference: "EST-2026-10-082", agreementId: "ca-005", partyName: "Mariam Al Suwaidi", description: "Estimated commission — PortLight RFQ expected award", status: "Estimated", amount: 18600, currency: "USD", source: "Forecast — RFQ-2026-1153 expected award" },
  { id: "le-006", date: "2026-10-08", reference: "PAY-2026-Q3-014", agreementId: "ca-003", partyName: "Daniel Tan", description: "Q2 commission payout — 6 awarded contracts", status: "Paid", amount: 46000, currency: "USD", source: "Wire transfer — DBS Singapore", approver: "C. Müller (Finance)" },
  { id: "le-007", date: "2026-10-05", reference: "APR-2026-10-071", agreementId: "ca-006", partyName: "Elysian Procurement Group", description: "Platform buyer-side fee — Q3 awarded contracts", status: "Approved", amount: 12800, currency: "USD", source: "Platform fee calculation", approver: "C. Müller (Finance)" },
  { id: "le-008", date: "2026-10-02", reference: "EAR-2026-10-065", agreementId: "ca-007", partyName: "Meridian Manufacturing", description: "Platform supplier-side fee — 2 contract milestones", status: "Earned", amount: 14200, currency: "USD", source: "Buyer milestone payment received" },
  { id: "le-009", date: "2026-09-28", reference: "PAY-2026-Q3-011", agreementId: "ca-001", partyName: "Lukas Hoffmann", description: "Q2 commission payout — 3 awarded contracts", status: "Paid", amount: 18000, currency: "USD", source: "Wire transfer — Bank Leumi", approver: "C. Müller (Finance)" },
  { id: "le-010", date: "2026-09-25", reference: "REV-2026-09-009", agreementId: "ca-002", partyName: "Anya Vermeer", description: "Reversal — contract cancelled by mutual agreement (refund processed)", status: "Reversed", amount: -3400, currency: "USD", source: "Contract cancellation — reversal entry", approver: "C. Müller (Finance)" },
  { id: "le-011", date: "2026-09-20", reference: "APR-2026-09-084", agreementId: "ca-005", partyName: "Mariam Al Suwaidi", description: "Earned commission — GCC distribution contract award", status: "Approved", amount: 11800, currency: "USD", source: "Contract execution milestone", approver: "C. Müller (Finance)" },
  { id: "le-012", date: "2026-09-15", reference: "EST-2026-09-079", agreementId: "ca-004", partyName: "Sophia Reyes", description: "Estimated commission — Tidewater RFQ pipeline", status: "Estimated", amount: 9600, currency: "USD", source: "Forecast — pipeline RFQs" },
];

export const commissionSummary = {
  totalEstimatedUsd: 662000,
  totalEarnedUsd: 519400,
  totalApprovedUsd: 519400,
  totalPayableUsd: 166000,
  totalPaidUsd: 441400,
  totalReversedUsd: 3400,
  pendingApprovals: 4,
  ytdVolumeUsd: 40605000,
  representativeCount: 6,
  activeAgreements: 7,
};

export function getCommissionAgreement(id: string): CommissionAgreement | undefined {
  return commissionAgreements.find((c) => c.id === id);
}
