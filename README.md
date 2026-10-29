# Global Trade OS

> **Global Trade. Connected. Verified. Intelligent.**

A premium, dark-themed international trade operating system that combines a verified B2B marketplace, AI-powered sourcing, country representative network, transparent commission ledger, and digital deal rooms into one coherent platform.

Built with **Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui + Framer Motion + Zustand**.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Modules](#modules)
- [Demo Data](#demo-data)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Key User Flows](#key-user-flows)
- [Architecture Decisions](#architecture-decisions)
- [Security & Compliance Posture](#security--compliance-posture)
- [Roadmap](#roadmap)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Overview

Global Trade OS is designed to evolve beyond a conventional B2B marketplace into a digital operating system connecting importers, exporters, manufacturers, distributors, purchasing organizations, country representatives, logistics providers, inspection companies, and other authorized trade service providers worldwide.

The platform helps businesses:

- Discover verified commercial opportunities
- Find suitable international partners
- Negotiate and coordinate transactions
- Manage representatives and calculate commissions
- Track trade execution through a unified digital environment

### Target Market

International market focus — no Iran-specific features, no Persian content, no RTL layouts. Demo data uses diverse international examples from Germany, Netherlands, Singapore, UAE, UK, and US.

---

## Live Demo

The platform runs as a Next.js single-page application:

- **Landing page** — hero, modules, workflow, personas, AI Copilot preview, pricing, FAQ
- **Application shell** — collapsible sidebar with 19 nav items, topbar with search/notifications, command palette (⌘K)
- **20 functional views** — all wired to deterministic demo data

To enter the application, click **"Enter Platform"** on the landing page.

---

## Screenshots

All screenshots are in [`/screenshots`](./screenshots).

| Screenshot | Description |
|------------|-------------|
| `01_landing_hero.png` | Landing page hero with gradient headline, trust stats, and live preview card |
| `01_landing_full.png` | Full landing page (hero + modules + workflow + personas + AI + pricing + FAQ + footer) |
| `02_dashboard.png` | Overview dashboard with KPI cards, trade volume chart, conversion funnel, activity feed |
| `02_dashboard_full.png` | Full dashboard including risk alerts, rep network, upcoming deliveries, AI suggestion |
| `03_marketplace_full.png` | Global marketplace with opportunity cards and filters |
| `09_copilot.png` | AI Sourcing Copilot with structured chat blocks (RFQ draft, supplier match, clarifications) |
| `09_copilot_full.png` | Full AI Copilot view with specialized agents sidebar and safety panel |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| State | Zustand (client) + React state |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Custom lightweight SVG (sparklines, bars, funnels) |
| Database | Prisma ORM (SQLite client) — schema defined but unused in demo |
| Fonts | Geist Sans + Geist Mono |

---

## Project Structure

```
global-trade-os/
├── src/
│   ├── app/
│   │   ├── globals.css          # Premium dark theme tokens
│   │   ├── layout.tsx           # Root layout, forced dark mode
│   │   └── page.tsx             # Single route — switches LandingPage ↔ AppShell
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives (40+ components)
│   │   └── gtos/
│   │       ├── landing/
│   │       │   └── LandingPage.tsx       # Public website
│   │       ├── shell/
│   │       │   ├── AppShell.tsx          # Main shell container
│   │       │   ├── Sidebar.tsx           # Collapsible left nav (19 items)
│   │       │   ├── Topbar.tsx            # Search, notifications, user menu
│   │       │   └── CommandPalette.tsx    # ⌘K fuzzy search
│   │       ├── shared/
│   │       │   ├── KpiCard.tsx           # KPI card with sparkline
│   │       │   ├── StatusBadge.tsx       # Status/verification/stage/risk badges
│   │       │   ├── Primitives.tsx        # Rating, CountryFlag, ProgressBar, Avatar, etc.
│   │       │   └── PageContainer.tsx     # Page wrapper + PageCard
│   │       └── views/                    # 20 view components
│   │           ├── DashboardView.tsx
│   │           ├── MarketplaceView.tsx
│   │           ├── SuppliersView.tsx     # (+ BuyersView re-export)
│   │           ├── RFQsView.tsx
│   │           ├── OpportunitiesView.tsx
│   │           ├── RepresentativesView.tsx
│   │           ├── CRMView.tsx
│   │           ├── DealRoomsView.tsx
│   │           ├── OrdersView.tsx
│   │           ├── DocumentsView.tsx
│   │           ├── IntelligenceView.tsx
│   │           ├── RiskView.tsx
│   │           ├── CommissionView.tsx
│   │           ├── ServicePartnersView.tsx
│   │           ├── AICopilotView.tsx
│   │           ├── IntegrationsView.tsx
│   │           ├── ReportsView.tsx
│   │           ├── SettingsView.tsx
│   │           └── AdminView.tsx
│   ├── lib/
│   │   ├── store/
│   │   │   └── app-store.ts     # Zustand: view, detailId, commandOpen, sidebar
│   │   ├── data/                # Deterministic demo data
│   │   │   ├── companies.ts
│   │   │   ├── opportunities.ts
│   │   │   ├── rfqs.ts
│   │   │   ├── representatives.ts
│   │   │   ├── commissions.ts
│   │   │   ├── deals.ts
│   │   │   ├── intelligence.ts
│   │   │   └── navigation.ts
│   │   ├── db.ts                # Prisma client (unused in demo)
│   │   └── utils.ts             # cn() class merge helper
│   └── hooks/
│       ├── use-toast.ts
│       └── use-mobile.ts
├── prisma/
│   └── schema.prisma            # Default User/Post schema (unused in demo)
├── public/
│   ├── logo.svg
│   └── robots.txt
├── screenshots/                 # Platform screenshots
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── Caddyfile                    # Gateway config (port 81 → 3000)
└── README.md                    # This file
```

---

## Design System

### Color Palette (Premium Dark)

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#080D18` | Main app background |
| `--secondary bg` | `#0E1626` | Sidebar / elevated sections |
| `--card` | `#121D30` | Card background |
| `--popover` | `#18253A` | Elevated surface (modals, dropdowns) |
| `--primary` | `#4D8DFF` | Primary accent — links, buttons, focus |
| `--accent` | `#35D6C5` | Secondary accent — highlights, cyan |
| `--violet` | `#8B7BFF` | AI Copilot accent |
| `--success` | `#34D399` | Verified, paid, complete |
| `--warning` | `#F2B441` | Pending, closing soon, caution |
| `--danger` | `#F45B6B` | Errors, reversed, expired |
| `--foreground` | `#F3F6FC` | Main text |
| `--muted-foreground` | `#A4B1C5` | Secondary text |
| `--border` | `#26364C` | Borders, dividers |

### Visual Language

- **Glassmorphism panels** — subtle gradients with backdrop blur
- **Grid background** — subtle electric-blue grid on hero sections
- **Gradient text** — applied to key headlines
- **Pulse dots** — animated status indicators
- **Sparklines** — custom SVG, no chart library dependency
- **Motion** — Framer Motion entrance animations, AnimatePresence view transitions

---

## Modules

The platform implements 20 integrated modules covering the full trade lifecycle:

### Core
1. **Overview Dashboard** — 5 KPI cards with sparklines, trade volume bar chart, conversion funnel, active opportunities, activity feed, risk alerts, representative network, upcoming deliveries, AI suggestion banner
2. **Global Marketplace** — 8 opportunity cards with type/category/country filters, confidentiality badges, spec grids
3. **Find Suppliers** / **Find Buyers** — 10 verified companies with sortable directory, Trade Passport profile pages (verification checks, certifications, capabilities, commercial terms)
4. **RFQs & Sourcing** — full list + RFQ detail with line items, quotations comparison (match score radial, weighted evaluation criteria, match reasons), timeline, status workflow

### Trade Operations
5. **Opportunities** — leads table with source/representative/confidence/attribution
6. **Representatives** — directory with agreement type filters, profile with territory, industries, commission pipeline
7. **CRM** — activity feed, pipeline funnel, tasks due today
8. **Deal Rooms** — list + deal room with tabs (Overview, Documents, Participants, Timeline, Notes), milestone progress, version-controlled documents
9. **Orders & Deliveries** — PO status pipeline, expandable milestone timeline, upcoming deliveries carousel
10. **Trade Documents** — document table, cross-document consistency checks, expiration tracking

### Intelligence & Revenue
11. **Trade Intelligence** — intel feed with source/freshness/confidence, sortable country coverage map
12. **Risk & Resilience** — risk indicators with severity coloring, supplier dependency map
13. **Commission Center** — pipeline visualization (Estimated → Earned → Approved → Payable → Paid), agreements table, immutable ledger with reversal entries
14. **Service Partners** — partner cards with categories, active service requests
15. **AI Copilot** — interactive chat with structured blocks (RFQ draft, supplier match, clarification, next-action, warning), 12 specialized agents sidebar, human-in-the-loop safety panel

### System
16. **Integrations** — integration catalog by category (ERP, CRM, Document, Verification, Logistics, Market Data), webhook deliveries, health monitoring
17. **Reports** — saved reports table, scheduled exports
18. **Settings** — 8-section vertical-tab settings (Profile, Org, Notifications, Security, Billing, API Keys, Localization, Appearance)
19. **Administration** — 6-tab admin (Verification Queue, Rep Approvals, Moderation, Audit Log, Feature Flags, System Health)
20. **Landing Page** — public website (hero, modules, workflow, personas, AI demo, pricing, FAQ, footer)

---

## Demo Data

All data is **deterministic, fictional, and clearly labelled as illustrative**. No real companies, no real transactions.

| Dataset | Records | Examples |
|---------|---------|----------|
| Companies | 10 | RheinTech Industries GmbH (DE), Nordport Logistics B.V. (NL), Meridian Manufacturing Pte. Ltd. (SG), Elysian Procurement Group (UK), PortLight Trading FZE (AE), Tidewater Components Inc. (US), Hudson Bay Materials Corp. (US), Vega Industries Ltd (UK), Sapphire Trading LLP (UK), Kaiyo Marine Services Ltd (SG) |
| Opportunities | 8 | Industrial pumps, medical PCB assemblies, structural steel, lubricants, food ingredients, CNC components, SMT capacity, inspection services |
| RFQs | 4 | With line items, evaluation criteria, timelines |
| Quotations | 6 | With match scores, match reasons, status |
| Representatives | 6 | Across DE, NL, SG, US, AE, UK with agreement types |
| Commission agreements | 7 | Percentage, tiered, fixed-fee, buyer-side, supplier-side |
| Commission ledger entries | 12 | Including reversal entries |
| Deals | 3 | With milestones, documents, participants |
| CRM activities | 8 | Calls, emails, meetings, tasks, notes, RFQs, deals |
| Orders | 5 | PO status pipeline |
| Trade intelligence records | 6 | Demand trends, route disruptions, capacity alerts |
| Risk indicators | 5 | Supplier dependency, geographic concentration, document expiry, logistics, lead time |
| Country coverage | 8 | DE, NL, SG, GB, AE, US, FR, BE |

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.3+
- npm / bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/adelakbaribiz-sketch/global-trade-os.git
cd global-trade-os

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start the dev server
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
bun run build
bun run start
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Next.js dev server with Turbopack on port 3000 |
| `bun run build` | Production build (standalone) |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:reset` | Reset database |

---

## Key User Flows

### 1. Discover → Qualify → Negotiate → Execute

1. **Discover**: Open **Global Marketplace** → filter by type/category/country → click opportunity card for details
2. **Qualify**: Navigate to **Find Suppliers** → click company card → review Trade Passport (verification checks, certifications, capabilities)
3. **Negotiate**: Open **RFQs & Sourcing** → click RFQ → review quotations, match scores, evaluation criteria → enter **Deal Room** for negotiation
4. **Execute**: Track milestones in **Deal Rooms** → monitor PO status in **Orders & Deliveries** → review commission in **Commission Center**

### 2. AI Sourcing Copilot

1. Click **AI Copilot** in the topbar or sidebar
2. Try one of the quick prompts (e.g., "Source 5,000 industrial pumps")
3. Watch the Copilot extract structured fields, draft an RFQ, surface qualified suppliers with match scores, and recommend next actions
4. Every consequential action requires explicit human approval

### 3. Command Palette (⌘K)

Press **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) anywhere in the app to:
- Search across navigation items, companies, opportunities, RFQs, representatives
- Quickly jump to any view or detail page

### 4. Commission Lifecycle

Open **Commission Center** → see the full pipeline:
- **Estimated** → forecast based on open deals
- **Earned** → contractually triggered
- **Approved** → finance approved
- **Payable** → ready for payout
- **Paid** → disbursed
- **Reversed** → audit trail for cancellations

All adjustments are recorded as new auditable ledger entries — never silently overwritten.

---

## Architecture Decisions

### Single-Page Application with State-Based Navigation

The platform is implemented as a single Next.js route (`/`) that switches between **LandingPage** and **AppShell** based on a Zustand store. This approach:

- Avoids route-level complexity for a demo
- Enables instant view transitions with Framer Motion's `AnimatePresence`
- Centralizes state in one store (`useAppStore`)

### Forced Dark Theme

The dark theme is enforced globally via CSS variables in `globals.css` and `<html className="dark">` in `layout.tsx`. No light mode toggle — the premium dark aesthetic is part of the product identity.

### Deterministic Demo Data

All demo data lives in `/src/lib/data/*.ts` as TypeScript modules with typed exports. This ensures:
- Reproducible demo across sessions
- Type safety for components
- Easy to swap for real API data later

### Custom Charts over Recharts

Sparklines, bar charts, and funnels are implemented as lightweight custom SVG components instead of pulling in a chart library. This keeps the bundle small and gives precise visual control.

### Shared Primitives over Inline Styles

All UI atoms (`KpiCard`, `StatusBadge`, `Avatar`, `ProgressBar`, etc.) live in `/src/components/gtos/shared/` and are reused across views for visual consistency.

---

## Security & Compliance Posture

This is a demo platform — not production-ready for real trade. However, the design respects these principles:

- **Human-in-the-loop AI** — AI agents never sign contracts, transfer funds, or make binding commitments without explicit human approval
- **Self-reported vs verified distinction** — verification levels clearly separate self-reported information from verified facts
- **Immutable commission ledger** — adjustments recorded as new entries, never silently overwritten
- **No real credentials** — no production API keys, no real customer data, no real payment integrations
- **International focus** — no Iran-specific features, no Persian content, no RTL layouts
- **Configurable compliance** — sanctions screening and restricted-party checks are framework concepts, not implemented integrations

**Not claimed**: GDPR auto-compliance, worldwide legal compliance, certification, or any guarantee of business performance.

---

## Roadmap

### Phase 1 — Foundation (CURRENT)
- ✅ Premium dark UI design system
- ✅ Application shell with 19 nav items
- ✅ Public landing page
- ✅ Overview dashboard
- ✅ Marketplace + RFQ + Supplier/Buyer directories
- ✅ Representatives + Commission Center
- ✅ AI Copilot (rule-based replies)
- ✅ 20 functional views

### Phase 2 — Backend & Persistence
- ⬜ Real backend with FastAPI / Next.js API routes
- ⬜ Prisma schema for trade entities (companies, RFQs, quotations, deals, commissions)
- ⬜ Authentication (NextAuth.js) with role-based access control
- ⬜ Organization membership and tenant isolation
- ⬜ Server-side authorization for all critical operations

### Phase 3 — Trust & Deal Execution
- ⬜ Business verification workflows (with real document upload)
- ⬜ Trade Passport with verifiable credentials
- ⬜ Digital Deal Rooms with real document version control
- ⬜ Electronic signature integration (DocuSign / Adobe Sign boundary)
- ⬜ Delivery tracking with logistics provider integrations

### Phase 4 — AI & Intelligence
- ⬜ Real LLM integration via z-ai-web-dev-sdk
- ⬜ Explainable matching engine with verified facts vs inferences
- ⬜ Quotation comparison agent
- ⬜ Document extraction (OCR + classification)
- ⬜ Trade intelligence with real market data sources
- ⬜ Landed-cost simulator with real freight benchmarks

### Phase 5 — Enterprise Integrations
- ⬜ ERP integrations (SAP, Oracle, Microsoft Dynamics)
- ⬜ CRM integrations (Salesforce, HubSpot)
- ⬜ Verification provider integrations (Kompass, Dun & Bradstreet)
- ⬜ Logistics intelligence (project44, FourKites)
- ⬜ Webhooks + API gateway with rate limits
- ⬜ Sandbox mode for integration testing

---

## Known Limitations

- **No backend persistence** — state lives in Zustand only; refreshing the page resets view to landing
- **AI Copilot uses rule-based replies** — not connected to a real LLM
- **No real integrations** — all third-party integrations (ERP, CRM, document signature, verification, payment) are mock / boundary-only
- **Dev server (Turbopack) instability** — in some sandbox environments, the dev server may crash after compile bursts; restart with `pkill -9 -f next && rm -rf .next && bun run dev`
- **Some views may throw runtime errors during HMR transitions** — refresh the page if this happens
- **All metrics are illustrative** — clearly labelled as demo data, not real-world verified statistics

---

## License

This project is provided as-is for demonstration purposes. All demo data is fictional.

---

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Zustand](https://github.com/pmndrs/zustand)

---

**© 2026 Global Trade OS (demo). All content is illustrative and not a real business offer.**
