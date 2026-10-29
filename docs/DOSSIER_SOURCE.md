# Dossier Source — Original Master Prompt

This is the original 23-section master prompt that scoped this demo. It is preserved verbatim as the source material for the project, exactly as provided by the user. Every design decision in this repository traces back to a requirement or constraint in this document.

See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for how this prompt was interpreted, [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) for what was built vs. spec'd, and [DECISIONS.md](DECISIONS.md) for the engineering decisions made along the way.

---

# MASTER PROMPT — BUILD A WORLD-CLASS GLOBAL TRADE OPERATING SYSTEM

## 1. Your Role and Mission

Act as a world-class multidisciplinary product team consisting of:

- Principal Product Strategist
- Global Trade and B2B Marketplace Expert
- Enterprise SaaS Architect
- Senior Full-Stack Engineer
- AI Agent Architect
- Senior UI/UX Designer
- Fintech and Commission Systems Architect
- Cybersecurity Engineer
- International Trade Compliance Researcher
- DevOps and Quality Assurance Engineer

Your mission is to inspect my existing project repository, understand its current state, and build a premium, modern, English-language platform called **Global Trade OS**.

This platform must evolve beyond a conventional B2B marketplace. It should become a digital operating system connecting importers, exporters, manufacturers, distributors, purchasing organizations, country representatives, logistics providers, inspection companies, and other authorized trade service providers worldwide.

The platform should help businesses discover verified commercial opportunities, find suitable international partners, negotiate deals, coordinate transactions, manage representatives, calculate commissions, and track trade execution through a unified digital environment.

Do not merely create a landing page, static dashboard, UI mockup, or collection of disconnected screens. Build a coherent, working, extensible software product.

## 2. Absolute Geographic and Language Requirements

**The platform must target the international market and must not target Iran in any way.**

Do not include:

- Iran-specific features, country configurations, business directories, or trade routes.
- Iranian companies, Iranian representatives, Iranian payment providers, or Iran-specific onboarding.
- Persian-language content or right-to-left layouts.
- Iran-specific legal, tax, customs, or regulatory workflows.
- Iranian market assumptions in seed data, demonstrations, or sample transactions.

Use English as the primary and initial application language, with a professional left-to-right interface.

Design the architecture so additional languages and countries can be supported in the future without rebuilding the application.

Use internationally relevant examples from appropriate global markets, such as Germany, the Netherlands, Singapore, the United Arab Emirates, the United Kingdom, the United States, and other suitable jurisdictions. Country selection must remain configurable rather than hard-coded.

Do not assume that every country has the same trade laws, digital-signature rules, tax requirements, sanctions obligations, payment capabilities, or customs procedures.

## 3. Product Vision

Build a platform that combines the strongest practical concepts of:

- International B2B marketplaces.
- Enterprise procurement and supplier networks.
- AI-powered sourcing and supplier discovery.
- International sales and distribution networks.
- Representative and commission management.
- Digital deal rooms and transaction collaboration.
- Supply-chain intelligence and risk management.
- Trade-document management.
- Logistics and inspection partner networks.
- Enterprise APIs and workflow automation.

Do not copy another company's branding, proprietary interface, or protected assets.

Study the product patterns of established international trade and procurement platforms where research tools are available. Identify gaps and opportunities, then develop a differentiated product strategy.

The central product concept is:

**One trusted digital environment for discovering, qualifying, negotiating, coordinating, and growing international trade relationships.**

The long-term objective is to develop a defensible network based on verified business relationships, reliable transaction data, representative coverage, and successful trade execution.

## 4. First Action: Inspect the Existing Repository

Before modifying code, inspect the complete project repository.

Determine:

- Current framework and application architecture.
- Existing frontend pages, components, and design system.
- Backend endpoints and business logic.
- Database schema and migrations.
- Authentication and authorization.
- Existing integrations and environment variables.
- Current tests, errors, incomplete modules, and technical debt.
- Existing deployment configuration and documentation.

Create an implementation plan based on the actual repository.

Preserve working functionality wherever possible. Do not delete existing features simply to make the project easier to rebuild.

If the repository is empty or incomplete, establish a suitable production-oriented foundation.

Use the following classifications in your technical notes:

- CONFIRMED
- PROPOSED
- ASSUMED
- UNKNOWN
- INCOMPLETE
- TODO

Do not claim that a feature works unless it has been implemented and tested.

## 5. Premium Dark UI/UX Design System

The user interface is a major priority. Build a sophisticated enterprise SaaS application that looks credible in front of multinational companies, procurement directors, distributors, international sales teams, and investors.

### Visual direction

Use a premium dark interface with:

- Deep charcoal and midnight-blue backgrounds.
- Layered dark surfaces for cards, panels, and modals.
- Carefully controlled electric-blue or cyan accents.
- High-contrast typography and readable secondary text.
- Refined borders, restrained shadows, and subtle gradients.
- Consistent spacing, alignment, and visual hierarchy.
- Professional charts, data tables, maps, activity feeds, and status indicators.
- Subtle motion and transitions that improve usability without distracting users.
- Polished loading states, skeleton screens, empty states, and error states.

Suggested starting palette:

- Main background: `#080D18`
- Secondary background: `#0E1626`
- Card background: `#121D30`
- Elevated surface: `#18253A`
- Primary accent: `#4D8DFF`
- Secondary accent: `#35D6C5`
- Main text: `#F3F6FC`
- Secondary text: `#A4B1C5`
- Borders: `#26364C`
- Success, warning, and error colors: accessible, consistent semantic colors.

Treat these as initial design tokens, not rigid restrictions. Refine the palette based on actual rendered screens.

### Layout requirements

Build:

- A premium public landing page.
- A modern authenticated application shell.
- A collapsible left navigation sidebar.
- A contextual top navigation bar.
- A global search interface.
- Notifications and activity center.
- A command palette or quick-action interface.
- Responsive desktop, tablet, and mobile layouts.
- Reusable components and consistent design tokens.

The desktop application should feel like a high-end enterprise command center, not a generic admin template.

Avoid excessive rounded cards, unnecessary whitespace, oversized headings, excessive gradients, decorative charts without purpose, and repetitive dashboard widgets.

Use realistic content density appropriate for business software.

### Required visual components

Create polished, functional versions of:

- Interactive data tables with filtering, sorting, pagination, and row actions.
- Advanced search panels.
- Country and regional coverage maps.
- Business profile pages.
- Supplier comparison views.
- Trade opportunity cards.
- RFQ and quotation workflows.
- Deal timeline and activity history.
- Commission and financial summary tables.
- Data visualizations.
- Document management interfaces.
- AI assistant panels.
- Notifications and approval queues.
- Role-specific dashboards.

Use consistent iconography and appropriate charts. Do not use decorative analytics that have no relationship to actual application data.

## 6. Public Website and Conversion Experience

Build a polished English-language public website with the following sections:

### Homepage

Communicate the platform's value proposition clearly.

Possible headline:

**Global Trade. Connected, Verified, Intelligent.**

Possible supporting message:

"Discover trusted international partners, identify new business opportunities, coordinate cross-border transactions, and manage your global trade network from one intelligent platform."

Include:

- Clear calls to action.
- Product screenshots or genuine interface previews.
- How the platform works.
- Buyer and supplier benefits.
- Country representative network.
- AI sourcing and opportunity matching.
- Transaction and collaboration workflows.
- Trust, verification, and transparency features.
- Enterprise integrations.
- Business use cases.
- Pricing overview.
- Frequently asked questions.
- Contact and enterprise sales options.

### Public pages

Create appropriate pages for:

- Product
- Solutions
- Industries
- Buyers
- Suppliers
- Country Representatives
- Trade Intelligence
- Integrations
- Security and Trust
- Pricing
- About
- Contact
- Terms and Privacy

Do not invent certifications, customer logos, completed transactions, partnerships, or performance statistics.

Clearly label demo data and illustrative claims.

## 7. Core Platform Modules

Implement the following as an integrated product architecture.

### Module A — Global Trade Marketplace

Create a global B2B marketplace where authorized users can discover commercial opportunities.

Support:

- Products and product categories.
- Industrial goods and raw materials.
- Consumer products.
- Wholesale opportunities.
- Manufacturing and private-label requirements.
- Distribution and agency opportunities.
- Bulk procurement.
- Contract manufacturing.
- Recurring supply agreements.
- Import and export requirements.
- Buyer and supplier company profiles.

Each opportunity should support:

- Product or service description.
- Specifications and quality requirements.
- Quantity and units of measurement.
- Target price or budget range, where appropriate.
- Origin and destination markets.
- Required certifications and documentation.
- Target delivery date.
- Incoterms version and delivery term, where relevant.
- Payment preferences.
- Minimum order quantity.
- Required supplier qualifications.
- Visibility and confidentiality settings.
- Attachments.
- Status and expiration date.

Provide search, filtering, sorting, saved searches, alerts, and structured comparison.

### Module B — Buyer and Supplier Portals

Build dedicated workspaces for buyers and suppliers.

Buyer capabilities:

- Create and manage procurement requirements.
- Publish requests for quotation.
- Invite suppliers.
- Compare quotations.
- Shortlist candidates.
- Request samples or inspections.
- Manage negotiations.
- Track purchase orders and deal milestones.
- Maintain preferred suppliers.
- Review completed transactions.

Supplier capabilities:

- Create a company and product catalogue.
- Manage production and supply capacity.
- Publish offers.
- Respond to RFQs.
- Submit quotations.
- Upload relevant documents.
- Manage sales pipelines.
- Track negotiations and purchase orders.
- Maintain product availability and lead times.

Provide separate permissions for employees, departments, branches, and subsidiaries.

### Module C — Advanced RFQ and Competitive Sourcing Engine

Create a complete request-for-quotation workflow.

The workflow should support:

1. Buyer creates a structured RFQ.
2. Platform checks for missing or inconsistent information.
3. Buyer chooses public, private, invited, or qualified-supplier sourcing.
4. Matching suppliers receive invitations.
5. Suppliers submit quotations.
6. Buyer compares offers using configurable criteria.
7. Authorized parties request clarifications.
8. Negotiation rounds occur under defined rules.
9. The selected offer moves to a deal room.
10. Parties approve and execute the next agreed steps.

Support configurable criteria such as:

- Total landed cost.
- Product quality.
- Supplier verification.
- Delivery time.
- Production capacity.
- Payment terms.
- Warranty.
- Sustainability documentation.
- Historical delivery performance.
- Geographic and operational risk.

Do not rank suppliers based only on the lowest price.

Support confidential bids, access controls, deadlines, evaluation records, and auditable decision history.

### Module D — AI Trade Matching Engine

Develop an explainable matching engine connecting buyers, suppliers, distributors, and representatives.

Matching inputs may include:

- Product taxonomy.
- Technical specifications.
- Quantity and capacity.
- Price and commercial terms.
- Country and destination.
- Production capabilities.
- Certifications.
- Lead times.
- Delivery requirements.
- Historical transaction performance.
- Company verification status.
- Logistics feasibility.
- Relevant risk indicators.
- Buyer preferences.

Return:

- Ranked candidate matches.
- Match scores.
- Explanation of why each candidate matches.
- Missing information.
- Potential incompatibilities.
- Suggested questions.
- Recommended next actions.

Distinguish between verified facts, company-provided claims, AI-generated inferences, and unknown information.

Never present a speculative match score as proof that a company is trustworthy.

Allow users to correct matching preferences and provide feedback.

### Module E — AI Sourcing Copilot

Create an intelligent sourcing assistant that can transform a natural-language business requirement into a structured sourcing workflow.

Example:

"I need 5,000 industrial pumps delivered to Rotterdam within 60 days, with specified technical certifications and a maximum landed-cost budget."

The assistant should:

- Extract the required fields.
- Identify missing specifications.
- Ask relevant clarification questions.
- Create a draft RFQ.
- Search authorized internal marketplace data.
- Identify potentially suitable suppliers.
- Compare candidate capabilities.
- Suggest next steps.
- Prepare supplier outreach messages.
- Generate a comparison report.

Additional AI assistants may help with:

- Supplier research.
- RFQ analysis.
- Quotation comparison.
- Contract preparation.
- Document extraction.
- Translation of commercial correspondence.
- Market opportunity discovery.
- Meeting summaries.
- Follow-up reminders.
- Trade-risk explanations.

Use structured outputs, tool permissions, traceable source references, and human approval for consequential actions.

Do not allow an AI agent to independently sign contracts, transfer money, approve payments, or make binding commitments.

### Module F — Global Country Representative Network

This module is a key differentiator.

Create a managed network of representatives who connect local business opportunities with international buyers and suppliers.

Each representative should have a profile containing:

- Identity and company information.
- Country and regional coverage.
- Languages.
- Industry expertise.
- Product specializations.
- Experience and references.
- Verification status.
- Authorized services.
- Contract status.
- Performance history.
- Assigned accounts and opportunities.
- Commission agreements.
- Activity history.

Provide:

- Representative applications.
- Review and approval workflows.
- Country and industry coverage management.
- Representative directories.
- Lead assignment.
- Opportunity ownership and attribution.
- Referral links and tracking.
- CRM pipelines.
- Task management.
- Customer communication history.
- Performance dashboards.
- Territory management.
- Contract and document management.
- Dispute and reassignment workflows.

Support different agreement types:

- Non-exclusive representation.
- Exclusive representation.
- Limited-territory agreements.
- Industry-specific representation.
- Product-specific representation.
- Referral-only agreements.
- Fixed-fee and commission-based arrangements.

Territory exclusivity must be configurable and enforceable through business rules rather than assumed globally.

Create safeguards against duplicate leads, disputed attribution, unauthorized representations, and commission conflicts.

### Module G — Multi-Party Commission Engine

Build a transparent and auditable commission system.

Support:

- Percentage commissions.
- Fixed fees.
- Tiered commission schedules.
- Buyer-side and supplier-side fees.
- Referral commissions.
- Multi-level authorized referral arrangements.
- Country representative commissions.
- Split commissions.
- Performance bonuses.
- Recurring commissions where contractually appropriate.
- Currency-specific reporting.
- Tax and withholding configuration where legally applicable.
- Commission adjustments and reversals.
- Dispute management.

Each commission agreement should define:

- Eligible transaction.
- Commission calculation basis.
- Rate or amount.
- Triggering event.
- Payment responsibility.
- Attribution rules.
- Applicable currency.
- Effective dates.
- Refund and cancellation treatment.
- Approval requirements.
- Dispute resolution process.

Model the difference between:

1. Estimated commission.
2. Contractually earned commission.
3. Approved commission.
4. Payable commission.
5. Paid commission.
6. Reversed or disputed commission.

Use an immutable audit trail and a ledger-oriented data model.

Record adjustments as new auditable entries rather than silently overwriting financial history.

Where multiple representatives participate in one transaction, calculate the allocation according to explicit contractual rules.

Do not assume that the platform can automatically collect commissions on off-platform transactions. Use contractual declarations, transaction milestones, reconciliation tools, and clear reporting instead.

Actual collection, escrow, custody, and money transmission must be implemented only through suitable licensed providers and legally reviewed arrangements.

### Module H — CRM and Deal Pipeline

Create a full trade-focused CRM.

Track:

- Companies and contacts.
- Buyers and suppliers.
- Leads and referrals.
- Opportunities.
- Communications.
- Tasks and deadlines.
- Meetings.
- Documents.
- RFQs.
- Quotations.
- Negotiations.
- Contracts.
- Purchase orders.
- Shipments.
- Deliveries.
- Commission events.
- Customer feedback.

Support customizable pipelines, assignment rules, reminders, activity history, duplicate detection, and reporting.

The platform should allow users to trace an opportunity from initial discovery through negotiation and, where supported, final delivery.

### Module I — Digital Deal Room

Create a secure collaborative environment for each qualified trade opportunity.

Include:

- Participants and permissions.
- Deal overview.
- Commercial terms.
- RFQ and quotation history.
- Negotiation timeline.
- Version-controlled documents.
- Comments and clarification requests.
- Meeting notes.
- Approval workflows.
- Contract milestones.
- Purchase order details.
- Delivery and inspection milestones.
- Commission terms.
- Activity logs.
- Outstanding tasks.

Support version history and controlled access to sensitive commercial documents.

Where electronic signatures are required, integrate an appropriate provider rather than simulating legally binding signatures.

Distinguish a draft agreement from a reviewed agreement and an executed contract.

### Module J — Company Verification and Trust Infrastructure

Build a company verification framework.

Potential checks include:

- Legal entity information.
- Registration documents.
- Authorized representatives.
- Business addresses.
- Tax or registration identifiers where appropriate.
- Product certifications.
- Manufacturing or distribution capabilities.
- References.
- Ownership information where lawfully available.
- Sanctions and restricted-party screening through appropriate data providers.
- Adverse information and risk indicators.
- Trade and delivery history.
- Document expiration dates.

Implement verification levels such as:

- Unverified.
- Information Submitted.
- Under Review.
- Basic Verification Complete.
- Enhanced Verification Complete.
- Verification Expired.
- Verification Suspended.

Define the exact checks required for each level.

Never label a business "fully verified" unless the defined verification procedures have actually been completed.

Display what was checked, when it was checked, which source was used, and when re-verification is required.

Separate verified information from self-reported information.

Provide correction, review, and appeal workflows.

### Module K — Trade Passport

Create a reusable digital business profile called the Trade Passport.

It may include:

- Business identity.
- Verification history.
- Company capabilities.
- Product categories.
- Certifications.
- Production capacity.
- Export markets.
- Preferred trading terms.
- Relevant performance history.
- Authorized representatives.
- Expiration and renewal reminders.

Allow users to share selected fields with prospective partners through controlled permissions.

Design this as a portable profile with exportable data and integration APIs, not as a proprietary identity system that prevents users from accessing their own information.

### Module L — Trade Intelligence and Opportunity Discovery

Build a trade-intelligence workspace for discovering commercial opportunities.

Potential features:

- Demand and supply trend analysis.
- Product and category trends.
- Country and regional opportunity comparisons.
- Supplier concentration analysis.
- Competitor and alternative supplier discovery.
- RFQ demand aggregation.
- Emerging sourcing opportunities.
- Public procurement and tender monitoring where authorized.
- Market alerts.
- Supplier capacity alerts.
- Trade route disruption alerts.
- Searchable reports.
- Saved intelligence dashboards.

Use lawful, documented data sources and respect website terms, licenses, privacy requirements, and applicable data-access rules.

Do not fabricate market statistics.

Display data freshness, source, confidence, and coverage limitations.

Clearly distinguish actual historical data from estimates and forecasts.

### Module M — Trade Digital Twin and Landed-Cost Simulator

Create a scenario-analysis engine for comparing potential trade arrangements.

Where data is available, model:

- Product price.
- Quantity.
- Packaging.
- Inland transportation.
- International freight.
- Insurance.
- Duties and taxes.
- Port and handling charges.
- Inspection costs.
- Financing costs.
- Currency conversion.
- Estimated delivery time.
- Delay scenarios.
- Supplier failure scenarios.
- Alternative routes.
- Alternative suppliers.

Show base, optimistic, and adverse scenarios.

Provide sensitivity analysis to identify which variables most affect cost and delivery.

Allow users to compare multiple sourcing strategies.

Do not treat estimated duties, freight costs, or delivery dates as guaranteed quotes. Clearly label assumptions and require users to confirm jurisdiction-specific charges with qualified providers.

### Module N — Supply Chain Resilience

Create tools to reduce dependence on a single supplier or route.

Support:

- Alternative supplier recommendations.
- Geographic concentration indicators.
- Capacity and lead-time comparisons.
- Supplier dependency mapping.
- Delivery-risk indicators.
- Route alternatives.
- Contingency planning.
- Critical-product alerts.
- Supplier document expiration alerts.
- Scenario-based disruption planning.

Recommendations must be based on available data and must communicate uncertainty.

### Module O — Logistics, Inspection, and Trade Services Marketplace

Build a partner marketplace for authorized trade-related services.

Potential service categories:

- Freight forwarding.
- Warehousing.
- Customs brokerage.
- Cargo insurance.
- Independent inspection.
- Product testing.
- Certification services.
- Packaging.
- Translation.
- Trade documentation.
- Local distribution.
- Contract manufacturing.
- Trade finance through eligible financial institutions.

Support partner profiles, service coverage, quote requests, comparisons, service milestones, and partner feedback.

Do not claim to be a licensed customs broker, insurer, lender, or payment institution unless the actual business and licensing arrangements support that claim.

Initially, the platform may facilitate introductions and service requests rather than directly delivering regulated services.

### Module P — Capacity Exchange

Create an optional marketplace for underutilized business capacity.

Examples:

- Available manufacturing capacity.
- Unused warehouse space.
- Available freight capacity.
- Distribution capacity.
- Contract manufacturing slots.
- Packaging and processing capacity.

Support availability windows, capacity units, location, qualification requirements, indicative pricing, and booking or inquiry workflows.

Clearly distinguish indicative availability from confirmed availability.

### Module Q — Trade Document Intelligence

Build a secure document-processing workflow for relevant trade documents.

Potential document types:

- RFQs.
- Quotations.
- Purchase orders.
- Commercial invoices.
- Packing lists.
- Certificates of origin.
- Product certificates.
- Inspection reports.
- Shipping instructions.
- Transport documents.
- Insurance documents.
- Contracts.

Features:

- Secure upload.
- File type and size validation.
- Document classification.
- OCR and structured extraction.
- Field validation.
- Cross-document consistency checks.
- Missing-document alerts.
- Expiration tracking.
- Version history.
- Human review.
- Controlled sharing.
- Audit history.

Where practical, design interoperability around relevant standards and frameworks, including:

- GS1 identifiers and data standards.
- World Customs Organization Data Model.
- ICC Digital Standards Initiative resources and digital trade document frameworks.
- UNCITRAL Model Law on Electronic Transferable Records where applicable.

Research current specifications before implementing integrations. Do not claim full standards compliance merely because a data field has been named after a standard.

Electronic-document recognition and legal enforceability vary by jurisdiction. Design configurable jurisdiction-specific policies and obtain appropriate legal review.

### Module R — Trade Knowledge Graph

Design a graph-oriented model connecting:

- Companies.
- People and authorized roles.
- Products.
- Categories.
- Countries and regions.
- Representatives.
- Opportunities.
- RFQs.
- Quotations.
- Deals.
- Contracts.
- Shipments.
- Service providers.
- Documents.
- Verification records.
- Transaction outcomes.

Use these relationships to improve discovery, identify relevant introductions, find alternative suppliers, detect duplicate opportunities, and understand network performance.

Start with a well-designed relational data model and appropriate indexes if that is sufficient. Add a graph database or specialized graph engine only when a measurable use case justifies it.

### Module S — Open Trade Network and Integrations

Design secure APIs and integration points for:

- ERP systems.
- Procurement platforms.
- CRM systems.
- Supplier catalogues.
- Logistics systems.
- Document-signature providers.
- Business verification services.
- Payment service providers.
- Market data providers.
- Customs and trade-data sources where legally accessible.
- Business intelligence systems.

Provide:

- Documented API endpoints.
- Authentication and authorization.
- Webhooks.
- Rate limits.
- Idempotency for relevant operations.
- Retry and error handling.
- API versioning.
- Integration logs.
- Sandbox mode.
- Tenant-specific credentials.
- Integration health monitoring.

Do not expose API secrets in frontend code or repository files.

### Module T — Enterprise Workspaces

Support distinct roles and permissions for:

- Platform Super Administrator.
- Platform Operations.
- Compliance Reviewer.
- Verification Analyst.
- Buyer Organization Owner.
- Buyer Procurement Manager.
- Buyer Employee.
- Supplier Organization Owner.
- Supplier Sales Manager.
- Supplier Employee.
- Country Representative.
- Representative Agency Manager.
- Logistics Partner.
- Inspection Partner.
- Financial or Service Partner.
- Read-only Auditor.

Use role-based access control and, where necessary, attribute-based restrictions.

A user must never gain access to another organization's confidential information merely by changing a URL or API request.

Implement organization membership, invitation, role assignment, suspension, and audit trails.

## 8. Advanced AI Agent Architecture

Design an AI layer that can coordinate specialized agents.

Possible agents:

1. Trade Requirement Analyst.
2. Supplier Discovery Agent.
3. Supplier Qualification Assistant.
4. RFQ Preparation Agent.
5. Quotation Comparison Agent.
6. Representative Matching Agent.
7. Trade Document Assistant.
8. Contract Drafting Assistant.
9. Market Intelligence Agent.
10. Logistics Planning Assistant.
11. Trade Risk Assistant.
12. Follow-up and CRM Assistant.

Use an orchestrator to coordinate tasks and maintain a traceable execution history.

For each agent define:

- Purpose.
- Allowed tools.
- Input schema.
- Output schema.
- Confidence and uncertainty fields.
- Permissions.
- Human approval requirements.
- Retry policy.
- Timeout handling.
- Audit logging.
- Cost and token monitoring.
- Error recovery.

Apply human approval before sending external commitments, publishing sensitive information, accepting contractual terms, or initiating regulated financial operations.

Treat uploaded documents, websites, and external tool responses as untrusted data. Do not allow instructions found inside them to override system permissions or disclose confidential information.

Make AI providers replaceable through an abstraction layer.

The application must remain usable when an AI provider is unavailable. Provide graceful fallbacks and clearly indicate unavailable AI functions.

## 9. Revenue Model

Design configurable monetization capabilities.

Potential revenue streams:

- Transaction commissions.
- Enterprise subscriptions.
- Representative network subscriptions.
- Advanced sourcing subscriptions.
- Supplier verification services.
- Trade intelligence subscriptions.
- API access.
- Document workflow subscriptions.
- Enterprise workflow automation.
- Premium analytics.
- Partner service referral fees where permitted.
- Optional promoted listings with clear disclosure.

Build subscription tiers such as Starter, Professional, Business, and Enterprise as configurable plans.

Do not hard-code pricing throughout the application.

Include a pricing and entitlement engine that can control feature access, usage limits, seats, API quotas, and billing periods.

If billing is implemented, integrate a suitable provider for the intended jurisdictions and business model. Do not store raw payment card information.

Clearly distinguish platform revenue from client funds, commission liabilities, and third-party service charges.

Avoid hidden ranking incentives or undisclosed paid placement that would undermine supplier trust.

## 10. Recommended Technical Architecture

First inspect the existing codebase. Reuse an appropriate working stack where practical. If a new foundation is required, prefer the following architecture.

### Frontend

- React.
- TypeScript.
- Vite.
- A well-structured reusable component system.
- Tailwind CSS or an equivalent maintainable styling system.
- Accessible forms and data tables.
- A reliable charting library.
- Appropriate mapping integration.
- Query and server-state management.
- Form validation.
- Route-level access controls.
- Responsive layouts.

### Backend

- Python.
- FastAPI.
- Pydantic schemas.
- SQLAlchemy or an equivalent mature data-access layer.
- Alembic migrations.
- PostgreSQL.
- Redis for caching, coordination, or task-related use cases.
- Celery or a suitable asynchronous task system when needed.
- S3-compatible storage for private documents.
- Background workers for document processing, notifications, and scheduled jobs.

### Architecture principles

- Start with a modular monolith.
- Separate domain logic from HTTP routes and UI concerns.
- Use explicit module boundaries.
- Introduce separate services only when justified by scale, security, or operational requirements.
- Use tenant-aware data access.
- Validate all external inputs.
- Use database transactions for financial and state-changing workflows.
- Use idempotency for operations where duplicate execution could cause harm.
- Maintain reliable audit logs.
- Support pagination and filtering on large collections.
- Avoid loading entire datasets into the browser.
- Provide database migrations and deterministic seed data.
- Add automated tests for critical workflows.

### Suggested domain modules

- Identity and Access.
- Organizations.
- Business Verification.
- Products and Categories.
- Marketplace.
- RFQ and Sourcing.
- Matching.
- Representatives.
- CRM.
- Deals and Contracts.
- Commission Ledger.
- Documents.
- Trade Intelligence.
- Logistics and Services.
- AI Agents.
- Notifications.
- Billing and Entitlements.
- Integrations.
- Administration and Audit.

### Infrastructure

Where suitable, support:

- Docker.
- Docker Compose for local development.
- GitHub.
- CI/CD workflows.
- Environment-specific configuration.
- Automated tests.
- Database migrations.
- Health checks.
- Structured logging.
- Error monitoring.
- Backup and recovery procedures.
- Deployment on an appropriate hosting platform, including Coolify if compatible with the existing environment.

Do not require Kubernetes for an early-stage prototype unless the current project has a concrete operational reason to use it.

## 11. Core Data Model

Design a coherent relational schema with appropriate foreign keys, constraints, indexes, and tenant boundaries.

Consider entities such as:

- User
- Organization
- OrganizationMembership
- Role
- Permission
- OrganizationVerification
- VerificationEvidence
- Country
- Region
- Product
- ProductCategory
- ProductSpecification
- SupplierCapability
- CapacityListing
- TradeOpportunity
- TradeRequirement
- RFQ
- RFQInvitation
- Quotation
- QuotationLine
- Negotiation
- RepresentativeProfile
- RepresentativeAgreement
- TerritoryAssignment
- Lead
- OpportunityAttribution
- CRMActivity
- Deal
- DealParticipant
- Contract
- PurchaseOrder
- Shipment
- Inspection
- Document
- DocumentVersion
- CommissionAgreement
- CommissionLedgerEntry
- CommissionAllocation
- Invoice
- Subscription
- Entitlement
- Notification
- AuditEvent
- AIJob
- AIExecutionStep
- ExternalIntegration
- WebhookDelivery

Treat this as a starting point, not a mandate to create unnecessary tables.

Define entity ownership, relationships, lifecycle states, uniqueness constraints, and data retention rules.

Use normalized relational data where appropriate and JSON fields only for genuinely variable structured attributes.

Model currencies and quantities explicitly. Do not assume all countries use the same currency, units, date formats, or tax treatment.

## 12. Security, Privacy, and Compliance

Security is a fundamental product requirement.

Implement, where appropriate:

- Secure authentication.
- Strong password handling.
- Optional multi-factor authentication.
- Secure session management.
- Role-based access control.
- Organization-level tenant isolation.
- Server-side authorization.
- Input validation.
- Output encoding.
- Rate limiting.
- CSRF protection where applicable.
- Secure CORS configuration.
- Protection against common web vulnerabilities.
- Secure file uploads.
- Malware scanning integration points.
- Secret management.
- Encryption in transit.
- Appropriate encryption at rest.
- Audit logs.
- Backup and recovery procedures.
- Data retention and deletion workflows.
- Privacy-conscious analytics.
- Security headers.
- Dependency vulnerability scanning.

Design for applicable privacy obligations, including GDPR where relevant.

Create a configurable compliance framework for sanctions screening, restricted-party checks, anti-fraud controls, and other relevant obligations. Exact legal obligations depend on the parties, goods, services, jurisdictions, and transaction.

Do not make unsupported claims that the platform is automatically GDPR-compliant, legally compliant worldwide, or certified.

Never embed production credentials, API keys, private certificates, or real customer data in source code or seed files.

## 13. Business Workflows and State Machines

Implement explicit state transitions for critical objects.

For example, an RFQ may move through:

Draft → Review → Published → Receiving Offers → Evaluation → Negotiation → Awarded / Cancelled / Expired.

A supplier verification case may move through:

Submitted → Under Review → Additional Information Required → Approved / Rejected / Suspended / Expired.

A commission may move through:

Estimated → Earned → Pending Approval → Approved → Payable → Paid.

These examples must be adapted to the actual business rules.

Define which roles can trigger each transition, what validation is required, and which events are recorded.

Prevent invalid state changes and ensure the UI reflects authoritative backend state.

## 14. Required User Experience and Application Pages

Build an integrated application with these primary navigation areas:

1. Overview
2. Global Marketplace
3. Find Suppliers
4. Find Buyers
5. RFQs and Sourcing
6. Opportunities
7. Representatives
8. CRM
9. Deal Rooms
10. Orders and Deliveries
11. Trade Documents
12. Trade Intelligence
13. Risk and Resilience
14. Commission Center
15. Service Partners
16. AI Copilot
17. Integrations
18. Reports
19. Settings

Create a dedicated administration workspace for:

- User management.
- Organization management.
- Verification review.
- Marketplace moderation.
- Representative approval.
- Commission configuration.
- Subscription management.
- Categories and taxonomy.
- Integration management.
- Audit logs.
- System health.
- Feature flags.

Show navigation items based on role and permissions.

Do not create empty pages with only a heading. Every implemented page must have a meaningful user purpose and an appropriate data state.

## 15. Dashboard Requirements

Create a highly polished, data-driven overview dashboard.

Possible widgets include:

- Active Trade Opportunities.
- Open RFQs.
- Incoming Quotations.
- Pending Negotiations.
- Active Deals.
- Suppliers Awaiting Verification.
- Representative Network Coverage.
- Estimated Commission.
- Approved Commission.
- Outstanding Tasks.
- Recent Activity.
- Opportunity Conversion Funnel.
- Trade Volume Trends.
- Supplier Response Time.
- Upcoming Deliveries.
- Risk Alerts.

Use only metrics that can be calculated from implemented data.

For an empty new account, show useful onboarding actions and clear empty states instead of fabricated performance statistics.

Support date filters, relevant drill-downs, and role-specific views.

## 16. Demo Data and Product Demonstration

Create realistic but entirely fictional demonstration data.

Use diverse international companies and trade examples unrelated to Iran.

Populate the demo environment with:

- Buyer organizations.
- Supplier organizations.
- Products.
- RFQs.
- Quotations.
- Representatives.
- Deals.
- Documents.
- Commission agreements.
- Activities.
- Verification cases.
- Service providers.
- Trade intelligence records.

Include sufficient relationships between records so the interface feels like a functioning platform rather than disconnected mock data.

Clearly label the environment as a demonstration where appropriate.

Never present fictional companies, transactions, reviews, or performance statistics as real verified businesses or completed real-world transactions.

Use deterministic seed data so the same demo can be reproduced.

## 17. Functional Implementation Rules

Follow these rules throughout development:

1. Every visible button must perform a meaningful action or be explicitly disabled with a clear reason.
2. Every form must validate input and provide useful feedback.
3. Search and filtering must operate on actual data.
4. Tables must support appropriate sorting, pagination, and empty states.
5. Navigation links must lead to implemented pages.
6. CRUD operations must persist through the backend where applicable.
7. Critical business operations must be authorized on the server.
8. Errors must be visible, understandable, and logged appropriately.
9. Loading and success states must be consistent.
10. Do not use local browser state as a substitute for persistent business records.
11. Do not expose secrets or confidential records to unauthorized users.
12. Do not simulate a completed payment, signature, verification, shipment, or commission payout when the underlying operation has not occurred.
13. Clearly label integrations that are mocked, simulated, or not yet connected.
14. Use feature flags or explicit unavailable states for unfinished modules.
15. Keep the code maintainable and documented.

Where a real third-party integration requires credentials, build the integration boundary and configuration interface. Provide a safe sandbox or mock adapter for development, and explain what remains necessary to connect the live provider.

## 18. Implementation Roadmap

Build the platform in controlled phases.

### Phase 1 — Product Foundation and Premium UI

- Inspect the repository.
- Define architecture and design system.
- Implement authentication and organization structure.
- Build the public website.
- Build the application shell.
- Implement role-aware navigation.
- Create dashboard and shared components.
- Establish database migrations, seed data, and deployment configuration.

### Phase 2 — Marketplace and Sourcing

- Product catalogue.
- Buyer and supplier profiles.
- Search and filtering.
- Trade opportunities.
- RFQ creation.
- Supplier invitations.
- Quotations.
- Offer comparison.
- Basic matching.
- Saved searches and notifications.

### Phase 3 — Representatives and Revenue

- Representative applications.
- Approval and territory management.
- Lead assignment.
- Opportunity attribution.
- Representative CRM.
- Commission agreements.
- Commission calculation.
- Ledger and audit history.
- Commission dashboards.

### Phase 4 — Trust and Deal Execution

- Business verification workflows.
- Trade Passport.
- Digital Deal Rooms.
- Document management.
- Contract and order milestones.
- Delivery tracking.
- Service partner marketplace.
- Dispute and exception handling.

### Phase 5 — AI and Intelligence

- AI sourcing copilot.
- AI-assisted RFQ creation.
- Explainable matching.
- Quotation comparison.
- Document extraction.
- Trade intelligence.
- Landed-cost simulation.
- Supply-chain resilience.
- AI execution logs and approval workflows.

### Phase 6 — Enterprise Integrations and Scale

- External APIs.
- Webhooks.
- ERP and CRM integration points.
- Logistics integrations.
- Payment provider integration where appropriate.
- Standards-based data exchange.
- Advanced reporting.
- Performance optimization.
- Security hardening.
- Operational monitoring.

Do not attempt to implement every advanced module at full production depth in one step. Establish the complete product structure, then deliver the core workflows end to end before expanding into sophisticated integrations.

## 19. Definition of Done

The project is not complete simply because it builds successfully or looks attractive.

For every delivered phase:

- The application starts using documented instructions.
- The frontend and backend integrate correctly.
- Database migrations run successfully.
- Demo data loads correctly.
- The main workflows work end to end.
- Permissions are enforced.
- Validation and error handling are present.
- Critical tests pass.
- No known critical errors are left unexplained.
- The UI has been checked at desktop and mobile sizes.
- No broken navigation or misleading controls remain.
- Environment variables are documented.
- Setup and deployment instructions are updated.

Test at least the following end-to-end scenarios:

1. A buyer creates an account and organization.
2. A buyer creates an RFQ.
3. A suitable supplier is found and invited.
4. The supplier submits a quotation.
5. The buyer compares offers and starts negotiations.
6. A deal room is created.
7. Authorized participants review documents and milestones.
8. A representative receives and manages an opportunity.
9. A commission is calculated from an applicable agreement.
10. An administrator reviews verification and audit records.
11. Unauthorized users are prevented from accessing confidential data.
12. Failed integrations and invalid operations produce safe, understandable errors.

If an integration or workflow is incomplete, report its exact state and remaining dependencies.

## 20. Repository, Documentation, and Delivery

Maintain a clean and professional repository structure.

Provide or update:

- README.md
- Product overview.
- Architecture documentation.
- Setup instructions.
- Environment variable reference.
- Database and migration instructions.
- API documentation.
- Demo credentials for a local demo, if applicable.
- Testing instructions.
- Deployment guide.
- Security notes.
- Feature implementation matrix.
- Known limitations.
- Development roadmap.

Do not commit real credentials or secrets.

If GitHub access is available and I have authorized repository changes, commit and push the work to the intended repository. Do not overwrite unrelated projects or rewrite Git history without explicit authorization.

Do not deploy to production, incur paid third-party costs, or change external production data without appropriate authorization.

## 21. Working Method

Work independently and make sensible technical decisions.

Do not stop after generating a plan or a list of recommendations.

Start by inspecting the existing repository, then implement the highest-value work that can be completed reliably.

If the project is large, break it into small, verifiable milestones. Maintain a progress checklist and update it as features are completed.

Prioritize in this order:

1. Visual quality and professional product presentation.
2. A coherent and functional application shell.
3. Reliable marketplace and RFQ workflows.
4. Representatives and commission management.
5. Security and data integrity.
6. Trust and deal execution.
7. AI-assisted workflows.
8. Advanced intelligence and integrations.

Do not sacrifice basic functionality for decorative complexity.

If you must choose between an attractive but broken feature and a slightly simpler feature that works correctly, implement the working feature and improve its presentation.

Do not ask me to make decisions that can reasonably be made using professional engineering judgment. Ask only when a decision materially affects business ownership, security, irreversible data changes, external commitments, or a requirement that cannot be safely inferred.

## 22. Final Deliverables and Reporting

At the end of each milestone, provide:

- What was inspected.
- What was implemented.
- Which files or modules changed.
- Which workflows are functional.
- Which tests were run and their actual results.
- Which integrations are live, mocked, or incomplete.
- Any known security or architectural limitations.
- The exact command to run the application.
- The next recommended milestone.

Maintain an implementation matrix with these statuses:

- COMPLETE AND TESTED
- IMPLEMENTED, NOT FULLY TESTED
- PARTIALLY IMPLEMENTED
- MOCKED
- NOT IMPLEMENTED
- BLOCKED

Never report a feature as complete merely because its UI exists.

## 23. Your First Tasks

Begin now:

1. Inspect the entire existing repository and identify the current state.
2. Produce a concise technical assessment and implementation plan.
3. Establish the dark design system and global application layout.
4. Build the most polished, functional initial version possible.
5. Connect the main screens to real application state and backend services where available.
6. Implement the core buyer, supplier, marketplace, RFQ, representative, and commission workflows in the appropriate order.
7. Run the application and tests, fix discovered issues, and verify the result.
8. Document exactly what works and what remains.

**Final objective:** Deliver a visually outstanding, English-language, dark-themed Global Trade OS that can evolve into a serious international B2B platform. Its competitive advantage must come from trusted business relationships, intelligent sourcing, a high-quality representative network, transparent commission management, and coordinated trade execution—not merely from having many features or adding AI labels to ordinary screens.

Begin with repository inspection and proceed to implementation. Do not stop at planning.