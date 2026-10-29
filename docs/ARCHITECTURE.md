# Architecture Documentation

## High-Level Architecture

Global Trade OS is a **single-page Next.js application** that switches between two top-level modes via a Zustand store:

```
                    ┌─────────────────────┐
                    │   page.tsx (route)  │
                    │   useAppStore.view  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
       view === "landing"            view !== "landing"
                │                             │
                ▼                             ▼
        ┌──────────────┐              ┌──────────────┐
        │ LandingPage  │              │  AppShell    │
        │  (public)    │              │  (authed)    │
        └──────────────┘              └──────┬───────┘
                                              │
                              ┌───────────────┼───────────────┐
                              │               │               │
                          Sidebar          Topbar          main
                                              │
                                       renderView(view)
                                              │
                            ┌────────┬────────┼────────┬────────┐
                            │        │        │        │        │
                         Dashboard  Market  RFQs   Commission  Copilot
                                                     ...16 more
```

## State Management

### Zustand Store (`src/lib/store/app-store.ts`)

```typescript
interface AppState {
  view: ViewId;              // current view (landing, dashboard, ...)
  detailId?: string;         // for detail pages (company, RFQ, deal, rep)
  commandOpen: boolean;       // ⌘K command palette visibility
  sidebarCollapsed: boolean;  // sidebar state
  setView(v): void;
  openDetail(v, id): void;
  closeDetail(): void;
  setCommandOpen(open): void;
  toggleSidebar(): void;
}
```

**Why Zustand over Context?**
- No provider boilerplate
- Selectors prevent unnecessary re-renders
- Direct access from anywhere (including command palette, navigation handlers)

## View Rendering

`AppShell` uses Framer Motion's `AnimatePresence` with `mode="wait"` for smooth view transitions:

```tsx
<AnimatePresence mode="wait">
  <motion.div key={view} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
    {renderView(view)}
  </motion.div>
</AnimatePresence>
```

When `view` changes, the old view fades out, then the new view fades in.

## Data Flow

All demo data lives in `/src/lib/data/*.ts` as static TypeScript modules. Views import the data directly — no API calls, no async loading.

```
src/lib/data/
├── companies.ts          → companies, getCompany(id), companyCategories, countries
├── opportunities.ts      → opportunities, getOpportunity(id)
├── rfqs.ts               → rfqs, getRFQ(id), getQuotationsForRFQ(rfqId), rfqQuotations
├── representatives.ts    → representatives, getRepresentative(id)
├── commissions.ts        → commissionAgreements, commissionLedger, commissionSummary
├── deals.ts              → deals, getDeal(id), crmActivities, orders
├── intelligence.ts       → tradeIntelRecords, riskIndicators, countryCoverage
└── navigation.ts         → navItems, navGroups
```

## Design Tokens

All design tokens are defined as CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #080D18;
  --foreground: #F3F6FC;
  --card: #121D30;
  --primary: #4D8DFF;
  --accent: #35D6C5;
  /* ... */
}

html { color-scheme: dark; }
```

Components consume these via Tailwind classes:
- `bg-background` → `var(--background)`
- `text-foreground` → `var(--foreground)`
- `border-border` → `var(--border)`
- Custom: `bg-[#4D8DFF]/10`, `text-[#35D6C5]`

## Component Hierarchy

```
page.tsx
└── AppShell
    ├── Sidebar
    │   └── NavItem × 19 (grouped: core / trade / intelligence / system)
    ├── Topbar
    │   ├── Search trigger → opens CommandPalette
    │   ├── New RFQ button → setView("rfqs")
    │   ├── AI Copilot shortcut → setView("copilot")
    │   ├── Notifications dropdown
    │   └── User menu
    ├── CommandPalette (⌘K)
    │   └── Fuzzy search across nav + companies + opportunities + RFQs + reps
    └── main
        └── renderView(view)
            └── View component (Dashboard, Marketplace, RFQs, etc.)
                └── PageContainer
                    ├── KpiCard × N
                    ├── PageCard
                    │   ├── SectionHeader
                    │   ├── Table (shadcn/ui)
                    │   └── StatusBadge / Avatar / ProgressBar / Rating
                    └── EmptyState (conditional)
```

## AI Copilot Architecture

The AI Copilot uses a **rule-based reply generator** (not a real LLM) to simulate the agent orchestration:

```
User input
  ↓
generateReply(text)
  ↓
Pattern matching on keywords:
  - "pump" / "rotterdam" → industrial pump RFQ draft + supplier match
  - "medical" / "pcb"    → Meridian Manufacturing match
  - "red sea" / "route"  → logistics disruption analysis
  - "steel" / "en 1090"  → structural steel supplier comparison
  - default              → fallback suggestion
  ↓
Return ChatMessage with structured blocks:
  - rfq-draft       → extracted fields + actions
  - clarification   → questions for missing info
  - supplier-match  → top 3 candidates with match scores
  - next-action     → recommended steps
  - warning         → risk alerts
```

**Human-in-the-loop safety**:
- Every action button requires explicit click
- No automatic RFQ publishing
- No automatic supplier invitations
- All actions route through `setView()` (navigation only)
- Real consequential actions would require backend approval in Phase 2+

## Future Architecture (Phase 2+)

When backend persistence is added:

```
Browser
  ↓ HTTPS
Caddy Gateway (port 81)
  ↓ reverse proxy
Next.js API Routes (/api/*)
  ↓ Prisma Client
PostgreSQL
  ↓
Zustand store ← TanStack Query ← API responses
```

Planned additions:
- NextAuth.js for authentication
- Server actions for mutations
- TanStack Query for server state
- Webhook delivery system
- Background job queue (BullMQ / Inngest)
