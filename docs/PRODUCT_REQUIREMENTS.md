# Product Requirements

Feature-by-feature breakdown of what's built in this demo vs. what a real Global Trade OS would need. Status legend: **DEMO** = implemented on synthetic data; **SPEC** = target-state design only (documented but not built).

## Module A — Global Trade Marketplace

| Feature | Status | Notes |
|---------|--------|-------|
| Browse opportunities by type | DEMO | 8 opportunities across Buy RFQ, Supply Offer, Distribution, Capacity, Contract Manufacturing |
| Filter by category / country / type | DEMO | Working filters on the marketplace view |
| Opportunity cards with spec grids | DEMO | Quantity, target price, lead time, incoterms, MOQ, closing date |
| Confidentiality badges | DEMO | Public / Invited Only / Qualified Suppliers / Confidential |
| Saved searches & alerts | SPEC | UI affordance only, no persistence |
| Structured comparison | SPEC | Single-opportunity detail only |

## Module B — Buyer and Supplier Portals

| Feature | Status | Notes |
|---------|--------|-------|
| Buyer / supplier company directory | DEMO | 10 fictional international companies |
| Trade Passport profile page | DEMO | Verification checks, certifications, capabilities, commercial terms |
| Preferred suppliers list | SPEC | UI not built |
| Sample / inspection request flow | SPEC | Not built |

## Module C — Advanced RFQ and Competitive Sourcing Engine

| Feature | Status | Notes |
|---------|--------|-------|
| Structured RFQ with line items | DEMO | 4 RFQs with multiple lines, specifications |
| Platform consistency check | DEMO | Static banner from "AI Sourcing Assistant" |
| Public / Private / Invited / Qualified sourcing | DEMO | Sourcing type badge on each RFQ |
| Quotation comparison with weighted criteria | DEMO | Match score radial, weighted evaluation criteria, explainable match reasons |
| Negotiation rounds under defined rules | SPEC | Timeline shows the intended state, not the workflow |
| Deal room creation from RFQ award | SPEC | Manual navigation only |

## Module D — AI Trade Matching Engine

| Feature | Status | Notes |
|---------|--------|-------|
| Ranked candidate matches with scores | DEMO | 6 quotations with match scores 67-96 |
| Explanation of why each candidate matches | DEMO | Match reasons with status (match / partial / gap) |
| Missing information flags | DEMO | Clarification questions shown in Copilot |
| Verified facts vs inferences distinction | SPEC | Copilot labels "verified" vs "inferred" but not enforced |
| User feedback / correction | SPEC | Not built |

## Module E — AI Sourcing Copilot

| Feature | Status | Notes |
|---------|--------|-------|
| Natural-language sourcing | DEMO | 4 worked example prompts (pumps, medical PCB, steel, Red Sea) |
| Structured RFQ draft extraction | DEMO | RFQ draft block with extracted fields |
| Clarification questions | DEMO | "3 clarification questions before publishing" |
| Supplier match surfacing | DEMO | Top 3 candidates with match scores |
| Supplier outreach message drafting | SPEC | Not built |
| Real LLM integration | SPEC | Rule-based reply generator only — see `docs/DECISIONS.md` D4 |
| Human approval for consequential actions | DEMO | Every action button requires explicit click |

## Module F — Global Country Representative Network

| Feature | Status | Notes |
|---------|--------|-------|
| Representative directory | DEMO | 6 reps across DE / NL / SG / US / AE / UK |
| Agreement type filters | DEMO | 7 agreement types (Exclusive, Non-Exclusive, Limited-Territory, Industry-Specific, Product-Specific, Referral-Only, Fixed-Fee) |
| Territory coverage display | DEMO | Regions listed on profile |
| Lead assignment & attribution | SPEC | Static attribution in leads table only |
| Referral links & tracking | SPEC | Not built |
| Dispute & reassignment workflows | SPEC | Not built |

## Module G — Multi-Party Commission Engine

| Feature | Status | Notes |
|---------|--------|-------|
| Percentage / tiered / fixed-fee commissions | DEMO | 7 active agreements across all types |
| Buyer-side & supplier-side fees | DEMO | Platform fee agreements shown |
| Referral & multi-level arrangements | SPEC | UI labels it, no logic |
| Split commissions | SPEC | Not built |
| Estimated → Earned → Approved → Payable → Paid lifecycle | DEMO | Pipeline visualization with all 5 stages |
| Reversal entries | DEMO | 1 reversal entry in the ledger (-$3,400) |
| Immutable audit trail | DEMO | Ledger entries never modified, only new entries added |
| Currency-specific reporting | SPEC | All values in USD |
| Tax / withholding configuration | SPEC | Not built |

## Module H — CRM and Deal Pipeline

| Feature | Status | Notes |
|---------|--------|-------|
| Activity feed | DEMO | 8 activities (calls, emails, meetings, tasks, notes, RFQs, deals) |
| Pipeline funnel | DEMO | 8-stage funnel with counts |
| Tasks due today | DEMO | 4 example tasks |
| Customizable pipelines | SPEC | Static funnel only |
| Duplicate detection | SPEC | Not built |

## Module I — Digital Deal Room

| Feature | Status | Notes |
|---------|--------|-------|
| Deal list & detail | DEMO | 3 deals with full detail view |
| Tabbed deal room (Overview, Documents, Participants, Timeline, Notes) | DEMO | All 5 tabs functional |
| Milestone timeline | DEMO | 7-10 milestones per deal with done / current / pending status |
| Version-controlled documents | DEMO | Document list with version column |
| Approval workflows | SPEC | UI not built |
| E-signature integration | SPEC | Not built — see `docs/DECISIONS.md` D5 |

## Module J — Company Verification and Trust Infrastructure

| Feature | Status | Notes |
|---------|--------|-------|
| Six-tier verification levels | DEMO | Unverified → Information Submitted → Under Review → Basic → Enhanced → Expired → Suspended |
| Verification checks displayed | DEMO | 4-8 checks per company with status & date |
| What was checked, when, by which source | DEMO | All checks show source and date |
| Self-reported vs verified distinction | DEMO | "Transparency note" callout on every profile |
| Correction / appeal workflows | SPEC | Not built |
| Real sanctions screening | SPEC | Not integrated — see `docs/DECISIONS.md` D5 |

## Module K — Trade Passport

| Feature | Status | Notes |
|---------|--------|-------|
| Portable business profile | DEMO | Profile pages with all relevant fields |
| Selected-field sharing | SPEC | UI not built |
| Exportable data | SPEC | Not built |

## Module L — Trade Intelligence and Opportunity Discovery

| Feature | Status | Notes |
|---------|--------|-------|
| Intelligence feed | DEMO | 6 records (Demand Trend, Route Disruption, Capacity Alert, Category Trend, Procurement Opportunity, Supply Alert) |
| Source / freshness / confidence | DEMO | Each record shows source type, freshness, confidence level |
| Country coverage map | DEMO | Sortable table of 8 countries with buyer/supplier/rep/deal counts |
| Saved intelligence dashboards | DEMO | 3 example saved dashboards |
| Real market data integration | SPEC | Not built |

## Module M — Trade Digital Twin and Landed-Cost Simulator

| Feature | Status | Notes |
|---------|--------|-------|
| Scenario analysis engine | SPEC | Not built — Phase 4 |
| Sensitivity analysis | SPEC | Not built |

## Module N — Supply Chain Resilience

| Feature | Status | Notes |
|---------|--------|-------|
| Risk indicators | DEMO | 5 indicators with severity, recommendation, status |
| Supplier dependency mapping | DEMO | Dependency bars shown |
| Geographic concentration indicators | DEMO | Mentioned in risk descriptions |
| Alternative supplier recommendations | SPEC | Mentioned in recommendations, not built |

## Module O — Logistics, Inspection, and Trade Services Marketplace

| Feature | Status | Notes |
|---------|--------|-------|
| Service partner directory | DEMO | Kaiyo Marine + 5-6 fictional partners |
| Active service requests | DEMO | 4-5 example requests |
| Quote requests & comparisons | SPEC | Not built |

## Module P — Capacity Exchange

| Feature | Status | Notes |
|---------|--------|-------|
| Available capacity listings | DEMO | 1 capacity listing (Meridian SMT Q1 2027) |
| Booking / inquiry workflows | SPEC | Not built |

## Module Q — Trade Document Intelligence

| Feature | Status | Notes |
|---------|--------|-------|
| Document table | DEMO | 6-8 fictional documents |
| Cross-document consistency checks | DEMO | 3-4 example issues |
| Expiration tracking | DEMO | 2-3 certs expiring soon |
| OCR / structured extraction | SPEC | Not built |
| Real standards compliance (GS1, WCO, ICC) | SPEC | Not built |

## Module R — Trade Knowledge Graph

| Feature | Status | Notes |
|---------|--------|-------|
| Relational data model | DEMO | Data files model relationships |
| Graph database | SPEC | Not built — see `docs/DECISIONS.md` |

## Module S — Open Trade Network and Integrations

| Feature | Status | Notes |
|---------|--------|-------|
| Integration catalog | DEMO | 8-10 cards (ERP, CRM, Document, Verification, Logistics, Market Data) |
| Webhook deliveries table | DEMO | 6-8 example deliveries |
| Integration health monitoring | DEMO | 4 cards with uptime % |
| Real API endpoints | SPEC | See `docs/API_SPEC.md` |
| Webhook delivery system | SPEC | Not built |

## Module T — Enterprise Workspaces

| Feature | Status | Notes |
|---------|--------|-------|
| Role-based access control | SPEC | UI mentions roles but no enforcement |
| Organization membership | SPEC | Not built |
| Server-side authorization | SPEC | Not built — see `docs/SECURITY.md` |
