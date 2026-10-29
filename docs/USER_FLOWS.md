# User Flows

Every flow in the demo, built or spec'd. Built flows are click-through-able right now; spec'd flows are documented as target-state designs.

## Flow 1 — Discover → Qualify → Negotiate → Execute (BUILT)

The core trade lifecycle flow. All four stages are click-through-able.

1. **Discover**
   - Click **Global Marketplace** in the sidebar
   - Filter by type (Buy RFQ / Supply Offer / Distribution / Capacity / Contract Manufacturing)
   - Filter by category (Manufacturing, Electronics, Distribution, etc.)
   - Filter by country
   - Click an opportunity card to see full details

2. **Qualify**
   - Navigate to **Find Suppliers** or **Find Buyers**
   - Sort by rating, trade volume, response time, or name
   - Click a company card to open the Trade Passport profile
   - Review verification checks (what was checked, when, by which source)
   - Review certifications, capabilities, preferred commercial terms
   - Note the "Transparency note" separating verified facts from self-reported information

3. **Negotiate**
   - Open **RFQs & Sourcing**
   - Click an RFQ to see full detail
   - Review line items with specifications
   - Review quotations received (sorted by match score)
   - Examine the match score radial and match reasons for each quotation
   - Review weighted evaluation criteria (Total landed cost 30%, Quality 25%, Verification 15%, etc.)
   - Review the timeline of lifecycle events
   - Open the linked Deal Room for negotiation context

4. **Execute**
   - Open **Deal Rooms** → click a deal
   - Review milestones (done / current / pending)
   - Review version-controlled documents
   - Review participants
   - Navigate to **Orders & Deliveries** to track PO status
   - Navigate to **Commission Center** to review commission lifecycle

## Flow 2 — AI Sourcing Copilot (BUILT)

1. Click **AI Copilot** in the topbar or sidebar
2. Try one of the 4 quick prompts (or type your own):
   - "Source 5,000 industrial pumps" → extracts RFQ fields, identifies top 3 suppliers with match scores, asks 3 clarification questions
   - "Find medical PCB contract manufacturer" → surfaces Meridian Manufacturing with full match reasons
   - "Compare steel fabrication suppliers" → compares Vega Industries + Tidewater backup
   - "Analyze Red Sea route impact" → flags affected POs, recommends mitigation
3. Review the structured response blocks:
   - **RFQ draft** — extracted fields (Product, Quantity, Delivery, Lead time, Compliance, Sourcing type)
   - **Clarification** — questions for missing info (match / partial / gap status)
   - **Supplier match** — top 3 candidates with match scores and details
   - **Next action** — recommended steps with action buttons
   - **Warning** — risk alerts when applicable
4. Click action buttons to navigate (e.g. "Open RFQ", "Compare side-by-side")
5. Every action requires explicit human click — no automatic RFQ publishing, no automatic supplier invitations

**Safety panel** on the right sidebar documents:
- Every consequential action requires approval
- Documents & external responses are untrusted data
- AI cannot override system permissions
- Full audit log of every agent step

## Flow 3 — Command Palette (BUILT)

1. Press **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) anywhere in the app
2. Type to fuzzy-search across:
   - All 19 navigation items
   - 10 companies (suppliers, buyers, service partners)
   - 8 marketplace opportunities
   - 4 RFQs
   - 6 representatives
3. Use arrow keys to navigate results
4. Press **Enter** to open the selected item
5. Press **Escape** to close

## Flow 4 — Commission Lifecycle (BUILT)

1. Open **Commission Center** in the sidebar
2. View the pipeline visualization:
   - **Estimated** ($662K) — forecast based on open deals
   - **Earned** ($519K) — contractually triggered
   - **Approved** ($519K) — finance approved
   - **Payable** ($166K) — ready for payout
   - **Paid** ($441K) — disbursed
   - **Reversed** ($3.4K) — audit trail for cancellations
3. Switch to **All agreements** tab to see 7 commission agreements
4. Switch to **Ledger entries** tab to see 12 immutable entries (including 1 reversal)
5. Filter ledger by status (Estimated / Earned / Pending Approval / Approved / Payable / Paid / Reversed)
6. Note the audit policy: "All adjustments are recorded as new auditable ledger entries. Reversals never silently overwrite financial history."

## Flow 5 — Representative Network (BUILT)

1. Open **Representatives** in the sidebar
2. Filter by agreement type (Exclusive / Non-Exclusive / Limited-Territory / Industry-Specific / Product-Specific / Referral-Only)
3. Filter by status (Active / Pending Review / Onboarding / Suspended / Expired)
4. Search by name, country, industry, or specialization
5. Click a representative card to see full profile:
   - Performance metrics (rating, leads, closed deals, coverage, response time)
   - Commission summary (Estimated → Earned → Approved → Paid pipeline)
   - Agreement details (type, contract start/end, verification level)
   - Territory coverage (regions list)
   - Industries & specializations

## Flow 6 — Trade Intelligence & Risk (BUILT)

1. Open **Trade Intelligence** to see the intel feed
2. Each record shows category, title, description, source, source type, freshness, confidence, coverage
3. Review the country coverage map (sortable by buyers, suppliers, deals, volume)
4. Open **Risk & Resilience** to see risk indicators
5. Each risk shows severity (high/medium/low), type, title, description, affected party, recommendation, status, detected date
6. Review the supplier dependency map (bars showing % of category spend per supplier)

## Flow 7 — New RFQ Creation (SPEC)

Target-state flow, not built in demo:

1. Buyer clicks **"New RFQ"** button in topbar or RFQs view
2. Modal opens with structured form (or AI Copilot extraction)
3. Buyer enters: title, line items with specifications, quantity, target price, incoterms, payment terms, delivery, lead time, required certifications, sourcing type, confidentiality, closing date
4. Platform runs consistency check (flags missing or inconsistent fields)
5. Buyer chooses sourcing type (Public / Private / Invited / Qualified Suppliers)
6. Matching engine identifies qualified suppliers and sends invitations
7. RFQ appears in the list with status "Published"
8. Suppliers receive notifications and submit quotations
9. Buyer compares quotations on weighted criteria
10. Shortlisted suppliers enter negotiation rounds
11. Awarded offer moves to a deal room

In the demo, the "New RFQ" button is present but only navigates to the RFQs list — no creation modal is wired up.

## Flow 8 — Representative Application (SPEC)

Target-state flow:

1. Visitor clicks **"Apply as representative"** button on Representatives view
2. Application form collects: identity, company, country coverage, languages, industries, specializations, experience, references, desired agreement type
3. Application enters **Pending Review** status
4. Platform compliance reviewer opens **Administration → Representative Approvals**
5. Reviewer verifies references, checks territory conflicts, reviews agreement terms
6. Reviewer approves or rejects with documented reason
7. Approved representative appears in directory with **Active** status and contract dates

In the demo, the button is present but no application form is wired up. Olivia Brooks appears as a "Pending Review" representative to illustrate the state.

## Flow 9 — Business Verification (SPEC)

Target-state flow:

1. Company owner opens **Settings → Organization → Verification**
2. Submits required documents (registration, tax ID, authorized representatives, certifications, references)
3. Verification case enters **Under Review** status
4. Verification analyst opens **Administration → Verification Queue**
5. Analyst runs checks: legal entity, sanctions screening, certifications, capacity audit, references
6. Each check is recorded with date, source, and result
7. Verification level updates: Information Submitted → Under Review → Basic Verification Complete → Enhanced Verification Complete
8. Trade Passport displays verified checks with dates and sources

In the demo, all verification statuses are hand-assigned demo values. The Administration → Verification Queue tab shows the intended workflow with 5 example cases.

## Flow 10 — Deal Room Execution (PARTIAL)

Built portions:

1. Open **Deal Rooms** → click a deal
2. Five tabs available: Overview, Documents, Participants, Timeline, Notes
3. Overview tab shows commercial terms, notes, activity feed, quick actions, participants, status
4. Documents tab lists version-controlled documents with type, version, uploader, date
5. Participants tab shows all participants with role and organization
6. Timeline tab shows milestone progress (done / current / pending)
7. Notes tab has a textarea for adding notes (no persistence)

Spec portions:
- Actual document upload (UI button present, no file picker wired)
- Approval workflows for milestones
- E-signature integration for contract execution
- Real participant invitations
- Permission management for confidential documents
