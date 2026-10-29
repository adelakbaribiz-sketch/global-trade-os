# Data Model

Current mock-data shapes used in the demo + real-schema open questions. All data lives in `src/lib/data/*.ts` as static TypeScript modules.

## Current mock-data shapes

### Companies (`src/lib/data/companies.ts`)

```typescript
interface Company {
  id: string;                    // "co-rheintech"
  name: string;
  type: "Buyer" | "Supplier" | "Buyer & Supplier" | "Service Partner" | "Representative";
  country: string;               // "Germany"
  countryCode: string;           // "DE"
  city: string;
  industry: string;
  category: string;
  employees: string;
  foundedYear: number;
  verification: VerificationLevel;
  verificationChecks: {
    label: string;
    status: "passed" | "pending" | "expired" | "not_required";
    date?: string;
  }[];
  rating: number;                // 0-5
  responseTimeHours: number;
  onTimeDelivery: number;        // %
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

type VerificationLevel =
  | "Unverified"
  | "Information Submitted"
  | "Under Review"
  | "Basic Verification Complete"
  | "Enhanced Verification Complete"
  | "Verification Expired"
  | "Verification Suspended";
```

### Opportunities (`src/lib/data/opportunities.ts`)

```typescript
interface Opportunity {
  id: string;
  title: string;
  type: "Buy RFQ" | "Supply Offer" | "Distribution" | "Capacity" | "Manufacturing" | "Contract Manufacturing";
  status: "Open" | "Closing Soon" | "Awarded" | "Closed" | "Draft";
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
```

### RFQs (`src/lib/data/rfqs.ts`)

```typescript
interface RFQ {
  id: string;                    // "rfq-2026-1142"
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

type RFQStatus =
  | "Draft" | "Review" | "Published" | "Receiving Offers"
  | "Evaluation" | "Negotiation" | "Awarded" | "Cancelled" | "Expired";

interface RFQLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  currency: string;
  specifications: { label: string; value: string }[];
}

interface Quotation {
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
  qualityScore: number;          // 0-100
  verificationScore: number;
  riskScore: number;
  status: "Draft" | "Submitted" | "Under Review" | "Shortlisted" | "Declined" | "Withdrawn";
  submittedDate: string;
  validity: string;
  notes: string;
  matchScore: number;            // 0-100
  matchReasons: {
    label: string;
    status: "match" | "partial" | "gap";
    detail: string;
  }[];
}
```

### Representatives (`src/lib/data/representatives.ts`)

```typescript
interface Representative {
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
  status: "Active" | "Pending Review" | "Onboarding" | "Suspended" | "Expired";
  verificationLevel: "Enhanced Verified" | "Basic Verified" | "Pending";
  rating: number;
  activeLeads: number;
  closedDeals: number;
  estimatedCommissionUsd: number;
  earnedCommissionUsd: number;
  paidCommissionUsd: number;
  coverageRate: number;          // %
  responseTimeHours: number;
  joinedDate: string;
  contractStart: string;
  contractEnd: string;
  references: number;
  specializations: string[];
  bio: string;
}

type AgreementType =
  | "Non-Exclusive Representation"
  | "Exclusive Representation"
  | "Limited-Territory"
  | "Industry-Specific"
  | "Product-Specific"
  | "Referral-Only"
  | "Fixed-Fee";
```

### Commissions (`src/lib/data/commissions.ts`)

```typescript
interface CommissionAgreement {
  id: string;
  reference: string;
  partyName: string;
  partyType: "Representative" | "Buyer" | "Supplier" | "Platform" | "Referrer";
  type: CommissionAgreementType;
  rate: string;                  // "3.5%" or "2.5% up to $5M / 3.5% above $5M"
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

interface CommissionLedgerEntry {
  id: string;
  date: string;
  reference: string;
  agreementId: string;
  partyName: string;
  description: string;
  status: "Estimated" | "Earned" | "Pending Approval" | "Approved" | "Payable" | "Paid" | "Reversed";
  amount: number;                // can be negative for reversals
  currency: string;
  source: string;
  approver?: string;
}
```

### Deals (`src/lib/data/deals.ts`)

```typescript
interface Deal {
  id: string;
  reference: string;             // "D-2026-0193"
  title: string;
  buyerCompanyId: string;
  buyerName: string;
  supplierCompanyId: string;
  supplierName: string;
  valueUsd: number;
  currency: string;
  stage: "Discovery" | "Qualification" | "RFQ" | "Negotiation" | "Contract" | "Execution" | "Shipment" | "Closed Won" | "Closed Lost";
  probability: number;           // 0-100
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

interface CRMActivity {
  id: string;
  date: string;
  type: "call" | "email" | "meeting" | "task" | "note" | "rfq" | "deal";
  party: string;
  title: string;
  description: string;
  owner: string;
  dealRef?: string;
}

interface Order {
  id: string;
  reference: string;             // "PO-2026-0089"
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
```

### Intelligence (`src/lib/data/intelligence.ts`)

```typescript
interface TradeIntelRecord {
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

interface RiskIndicator {
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

interface CountryNode {
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
```

## Real-schema open questions

When this becomes a real backend (Prisma + PostgreSQL), the following need to be resolved:

### Multi-tenancy

- Should `Organization` be the tenant boundary, or should there be a higher-level `Tenant` entity for holding companies?
- How are subsidiary organizations modeled? (e.g., Elysian Procurement Group UK + Elysian Procurement Group Ireland)
- Cross-organization visibility rules for marketplace opportunities

### Currencies & units

- Store amounts in a base currency (USD) + original currency, or just original?
- How are FX rates sourced and updated?
- How are unit conversions handled (e.g., metric tons vs short tons)?
- JSON column for variable units, or normalized `Unit` table?

### Verification

- Should verification checks be a separate `VerificationCheck` table with FK to `Company`, or embedded JSON?
- How are third-party verification provider responses stored?
- Sanctions screening results — store the raw response or just the pass/fail?
- How long are verification documents retained? (GDPR data retention)

### RFQ & quotations

- Should `Quotation` be versioned? (Suppliers may revise quotes before the RFQ closes)
- How are confidential bids enforced at the database level? (Row-level security?)
- How are negotiations tracked? (New `NegotiationRound` entity?)

### Commissions

- Should `CommissionLedgerEntry` be an append-only table with no UPDATE/DELETE permissions?
- How are multi-currency payouts handled?
- How are split commissions modeled when multiple reps participate in one transaction?
- Reversal entries — require linked original entry?

### Documents

- File storage in S3-compatible with metadata in DB?
- Versioning strategy — append-only versions or in-place updates?
- OCR extraction results — stored as JSON or normalized fields?
- Document classification confidence scores?

### Audit log

- Separate `AuditEvent` table for all state changes?
- What level of detail? (Field-level diffs or just "updated"?)
- Retention period?
- Immutable storage (WORM)?

### AI jobs

- `AIJob` and `AIExecutionStep` tables for tracing?
- Token usage and cost tracking?
- Approval workflow for consequential actions — separate `ApprovalRequest` table?

## Indexes to plan

- `Company(country, type, verification)` — for filtered directory
- `Opportunity(status, closingDate)` — for open opportunities
- `RFQ(buyerId, status)` and `RFQ(supplierId, status)` — for participant views
- `Quotation(rfqId, status)` — for quotation comparison
- `CommissionLedgerEntry(agreementId, date)` — for ledger queries
- `Deal(stage, expectedClose)` — for pipeline funnel
- `Document(dealId, version)` — for version-controlled docs
