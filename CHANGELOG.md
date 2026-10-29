# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-29

### Added — Initial demo release

#### Platform foundation
- Premium dark theme design system with custom CSS variable palette (`#080D18` background, `#4D8DFF` primary, `#35D6C5` accent, `#8B7BFF` violet for AI)
- Forced dark mode via `<html className="dark">` in root layout
- Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4
- Zustand store for client state (view, detailId, command palette, sidebar)
- Framer Motion for view transitions and entrance animations
- shadcn/ui (New York style) — 40+ primitive components

#### Public landing page
- Sticky navigation with anchor links
- Hero section with gradient headline ("Global Trade. Connected, Verified, Intelligent.")
- 4 trust stats with "Illustrative metrics" disclaimer
- Live dashboard preview card with 3 KPIs and 2 mini charts
- 6 value proposition cards
- 20-module product grid
- 4-step workflow (Discover → Qualify → Negotiate → Execute)
- 3 persona cards (Buyers / Suppliers / Representatives)
- AI Copilot demo dialogue
- Trade Passport preview (RheinTech Industries example)
- 4-tier pricing (Starter / Professional / Business / Enterprise)
- FAQ accordion (6 questions)
- Footer with 4 columns

#### Application shell
- Collapsible left sidebar with 19 nav items in 4 groups (Core / Trade Operations / Intelligence & Revenue / System)
- Topbar with global search trigger, "New RFQ" button, AI Copilot shortcut, notifications dropdown, user menu
- Command palette (⌘K / Ctrl+K) with fuzzy search across nav + companies + opportunities + RFQs + representatives
- AnimatePresence view transitions with 180ms fade

#### 20 functional views
- **Overview Dashboard** — 5 KPI cards with sparklines, trade volume bar chart, conversion funnel (8 stages), active opportunities, recent activity feed, risk alerts, representative network, upcoming deliveries, AI suggestion banner
- **Global Marketplace** — 8 opportunity cards with type/category/country filters, confidentiality badges, spec grids
- **Find Suppliers** / **Find Buyers** — 10 fictional international companies, sortable directory, Trade Passport profile pages (verification checks, certifications, capabilities, commercial terms)
- **RFQs & Sourcing** — 4 RFQs with line items, evaluation criteria, timelines; RFQ detail with quotations comparison (match score radial, weighted criteria, explainable match reasons)
- **Opportunities** — leads table with source/representative/confidence/attribution
- **Representatives** — 6 reps across DE / NL / SG / US / AE / UK with agreement types, territory coverage, commission pipeline per rep
- **CRM** — activity feed, pipeline funnel, tasks due today
- **Deal Rooms** — 3 deals with tabbed detail (Overview, Documents, Participants, Timeline, Notes), milestone progress, version-controlled documents
- **Orders & Deliveries** — PO status pipeline, expandable milestone timeline, upcoming deliveries carousel
- **Trade Documents** — document table, cross-document consistency checks, expiration tracking
- **Trade Intelligence** — intel feed with source/freshness/confidence, sortable country coverage map
- **Risk & Resilience** — risk indicators with severity coloring, supplier dependency map
- **Commission Center** — pipeline visualization (Estimated → Earned → Approved → Payable → Paid), 7 agreements, 12 immutable ledger entries including 1 reversal
- **Service Partners** — partner cards with categories, active service requests
- **AI Copilot** — interactive chat with structured blocks (RFQ draft, supplier match, clarification, next-action, warning), 12 specialized agents sidebar, human-in-the-loop safety panel
- **Integrations** — integration catalog by category (ERP, CRM, Document, Verification, Logistics, Market Data), webhook deliveries, health monitoring
- **Reports** — saved reports table, scheduled exports
- **Settings** — 8-section vertical-tab settings (Profile, Org, Notifications, Security, Billing, API Keys, Localization, Appearance)
- **Administration** — 6-tab admin (Verification Queue, Rep Approvals, Moderation, Audit Log, Feature Flags, System Health)

#### Demo data
- 10 fictional companies across 6 countries (DE, NL, SG, GB, AE, US)
- 8 marketplace opportunities
- 4 RFQs with line items, evaluation criteria, timelines
- 6 quotations with match scores (67-96) and match reasons
- 6 representatives with 7 agreement types
- 7 commission agreements + 12 ledger entries
- 3 deals with milestones, documents, participants
- 8 CRM activities
- 5 purchase orders
- 6 trade intelligence records
- 5 risk indicators
- 8 country coverage nodes

#### Documentation
- README.md following the AI-NODE portfolio template structure
- docs/PROJECT_CONTEXT.md — what stage this is at and why
- docs/PRODUCT_REQUIREMENTS.md — feature-by-feature demo vs. real scope
- docs/ARCHITECTURE.md — what's running vs. target architecture
- docs/USER_FLOWS.md — every flow, built or spec'd
- docs/API_SPEC.md — Open Trade Network API surface (target-state)
- docs/DATA_MODEL.md — current mock-data shapes + real-schema questions
- docs/SECURITY.md — what was checked, what's out of scope
- docs/DECISIONS.md — 14 engineering decisions with rationale
- docs/ROADMAP.md — 6 phases from current to scale
- docs/DEMO.md — full real-vs-simulated inventory
- docs/DEPLOYMENT.md — how to run/build/deploy
- docs/TESTING.md — what was tested, PASSED/FIXED/REMAINING
- docs/LIMITATIONS.md — every open gap
- docs/DESIGN_SYSTEM.md — color palette, typography, spacing, component patterns
- docs/MODULE_MATRIX.md — implementation status of all 20 modules
- docs/SETUP.md — installation, troubleshooting
- docs/DOSSIER_SOURCE.md — original 23-section master prompt preserved verbatim
- docs/screenshots/ — 7 platform screenshots

#### Screenshots (in docs/screenshots/)
- `landing-hero.png` — landing page hero section
- `landing-full.png` — full landing page
- `dashboard.png` — overview dashboard
- `dashboard-full.png` — full dashboard
- `marketplace.png` — global marketplace
- `ai-copilot.png` — AI Sourcing Copilot
- `ai-copilot-full.png` — full AI Copilot view

### Known issues
- Dev server (Turbopack) can be unstable in some sandboxed environments — restart with `pkill -9 -f next && rm -rf .next && bun run dev`
- Some views may throw runtime errors during HMR transitions — refresh the page to recover
- No backend persistence (Zustand-only state)
- No real authentication, AI, payment, or verification integrations

### Removed
- Sandbox artifacts (`.zscripts/`, `skills/`, `tests/`, `examples/`, `db/custom.db`, `.env`, `bun.lock`) removed from git tracking
- `.gitignore` updated to exclude sandbox-specific directories

## Versioning policy

This project follows Semantic Versioning:

- **MAJOR** — incompatible API changes (when backend is added)
- **MINOR** — new features (new views, new modules)
- **PATCH** — bug fixes, documentation updates

Until v1.0.0, the API is considered unstable and breaking changes may occur in minor versions.
