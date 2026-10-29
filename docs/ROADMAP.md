# Roadmap

What's next, in order. Phases 2-6 are spec'd but not built.

## Phase 1 — Foundation & Premium UI (CURRENT — COMPLETE)

- ✅ Premium dark UI design system (custom palette, CSS variables)
- ✅ Application shell with 19 nav items + command palette (⌘K)
- ✅ Public landing page (hero, modules, workflow, personas, AI demo, pricing, FAQ)
- ✅ Overview dashboard with KPIs, charts, conversion funnel, activity feed
- ✅ Marketplace + RFQ + Supplier/Buyer directories
- ✅ Representatives directory + Commission Center
- ✅ AI Copilot (rule-based replies for 4 worked example prompts)
- ✅ 20 functional views with working filters, sorting, empty states
- ✅ Comprehensive documentation suite (15 docs)
- ✅ Screenshots captured and pushed to GitHub

## Phase 2 — Backend & Persistence (NEXT)

- ⬜ Replace Zustand-only state with TanStack Query + API routes
- ⬜ Prisma schema for trade entities (companies, RFQs, quotations, deals, commissions)
- ⬜ PostgreSQL database with row-level security for tenant isolation
- ⬜ Authentication (NextAuth.js v4) with email/password + optional SSO
- ⬜ Multi-factor authentication for consequential actions
- ⬜ Role-based access control (16+ roles per master prompt §8 Module T)
- ⬜ Server-side authorization on every API endpoint
- ⬜ Audit log persistence (append-only table)
- ⬜ Real RFQ creation flow (modal, validation, consistency check)
- ⬜ Real quotation submission flow
- ⬜ Real representative application flow

## Phase 3 — Trust & Deal Execution

- ⬜ Real document upload (S3-compatible storage with signed URLs)
- ⬜ Business verification workflows (with real document review)
- ⬜ Trade Passport with verifiable credentials (W3C VC standard)
- ⬜ Digital Deal Rooms with real document version control
- ⬜ Electronic signature integration boundary (DocuSign / Adobe Sign)
- ⬜ Delivery tracking with logistics provider integrations (project44, FourKites)
- ⬜ Multi-currency conversion (real FX rates)
- ⬜ Real sanctions screening integration (Dow Jones Risk & Compliance)
- ⬜ Restricted-party screening before every transaction milestone

## Phase 4 — AI & Intelligence

- ⬜ Real LLM integration via z-ai-web-dev-sdk (replaces rule-based Copilot)
- ⬜ Explainable matching engine with verified facts vs inferences vs unknowns
- ⬜ Quotation comparison agent with real weighted scoring
- ⬜ Contract drafting assistant with clause library
- ⬜ Document extraction (OCR + classification via Tesseract or cloud OCR)
- ⬜ Trade intelligence with real market data sources (Panjiva, ImportGenius)
- ⬜ Landed-cost simulator with real freight benchmarks (Freightos, Xeneta)
- ⬜ Supply chain resilience with real supplier dependency data
- ⬜ AI execution logs and approval workflows (AIJob, AIExecutionStep tables)
- ⬜ Token usage and cost monitoring per agent

## Phase 5 — Enterprise Integrations

- ⬜ ERP integrations (SAP, Oracle, Microsoft Dynamics)
- ⬜ CRM integrations (Salesforce, HubSpot)
- ⬜ Verification provider integrations (Kompass, Dun & Bradstreet)
- ⬜ Logistics intelligence (project44, FourKites)
- ⬜ Payment provider integration (Stripe Connect / Adyen) — buyer-side fees only
- ⬜ Webhook delivery system with retry + dead-letter queue
- ⬜ API gateway with per-tenant rate limits
- ⬜ Sandbox mode for integration testing
- ⬜ Idempotency for all write operations
- ⬜ OpenAPI 3.1 specification published
- ⬜ SDK libraries (TypeScript, Python)

## Phase 6 — Scale & Operations

- ⬜ Performance optimization (query optimization, caching, CDN)
- ⬜ Security hardening (CSP, HSTS, WAF, SIEM integration)
- ⬜ Backup and disaster recovery (tested restores)
- ⬜ SOC 2 Type II attestation (12-month audit evidence collection)
- ⬜ GDPR Data Processing Agreement template
- ⬜ Country-specific compliance (BaFin DE, MAS SG, FCA UK)
- ⬜ Multi-region deployment (EU, APAC, US)
- ⬜ High availability (99.95% SLA)
- ⬜ Capacity Exchange module
- ⬜ Trade Knowledge Graph (graph database for relationship queries)
- ⬜ Standards-based data exchange (GS1, WCO Data Model, ICC DSI)

## Out-of-scope (not planned)

- ❌ Direct payment custody / escrow — would require money transmitter licenses per jurisdiction
- ❌ Customs brokerage as a service — would require per-jurisdiction customs broker licenses
- ❌ Cargo insurance underwriting — would require insurance licenses
- ❌ Trade finance lending — would require banking licenses
- ❌ Real-time commodity trading — different regulatory regime

These are explicitly left as partner-marketplace introductions per master prompt §17 rule 12: "Clearly label integrations that are mocked, simulated, or not yet connected."

## Sequencing rationale

The phases are ordered by the master prompt's §21 priority list:

1. Visual quality and professional product presentation (Phase 1) — DONE
2. A coherent and functional application shell (Phase 1) — DONE
3. Reliable marketplace and RFQ workflows (Phase 2)
4. Representatives and commission management (Phase 2)
5. Security and data integrity (Phase 2-3)
6. Trust and deal execution (Phase 3)
7. AI-assisted workflows (Phase 4)
8. Advanced intelligence and integrations (Phase 5)

Phase 6 (scale) is last because it only matters once Phases 2-5 have real users.
