# Demo — Real-vs-Simulated Inventory

Full inventory of what's actually running vs. what's simulated in this demo. Read this first if you're evaluating the platform.

## What's actually running

### Real frontend code

- ✅ Next.js 16 (App Router) with Turbopack dev server
- ✅ React 19 + TypeScript 5
- ✅ Tailwind CSS 4 with custom dark theme tokens
- ✅ shadcn/ui (New York style) — 40+ components in `src/components/ui/`
- ✅ Framer Motion for view transitions and entrance animations
- ✅ Zustand store for client state (view, detailId, command palette, sidebar)
- ✅ Lucide React icons throughout
- ✅ Premium dark palette (`#080D18` bg, `#4D8DFF` primary, `#35D6C5` accent, `#8B7BFF` violet)
- ✅ Custom SVG charts (sparklines, bar charts, conversion funnels) — no charting library

### Real interactions

- ✅ View switching via sidebar (19 nav items)
- ✅ Command palette (⌘K) with fuzzy search across nav + companies + opportunities + RFQs + representatives
- ✅ Working filters on every list view (search input, status dropdown, category/country dropdowns)
- ✅ Sortable tables (click column headers)
- ✅ Empty states when filters return no results
- ✅ Detail navigation (click company → Trade Passport profile, click RFQ → detail, etc.)
- ✅ Sidebar collapse toggle
- ✅ Notifications dropdown
- ✅ User menu dropdown
- ✅ AI Copilot interactive chat with 4 worked example prompts
- ✅ Mobile-responsive layout (Tailwind responsive classes)

### Real data structures

- ✅ 10 fictional companies with full verification history (typed)
- ✅ 8 marketplace opportunities with specs, confidentiality, tags
- ✅ 4 RFQs with line items, evaluation criteria, timelines
- ✅ 6 quotations with match scores, match reasons, weighted criteria
- ✅ 6 representatives with agreement types, territories, commission summaries
- ✅ 7 commission agreements + 12 ledger entries (including 1 reversal)
- ✅ 3 deals with milestones, documents, participants
- ✅ 8 CRM activities
- ✅ 5 purchase orders with status pipeline
- ✅ 6 trade intelligence records
- ✅ 5 risk indicators
- ✅ 8 country coverage nodes

## What's simulated

### Backend

- ❌ No backend server — all data is static TypeScript modules in `src/lib/data/`
- ❌ No database — Prisma schema is included but unused
- ❌ No API routes — the `/api/route.ts` file is the Next.js default
- ❌ No persistence — refreshing the page resets the view to landing
- ❌ No real-time updates — all data is static

### Authentication

- ❌ No authentication — anyone with the URL can access
- ❌ No login required — "Sign in" button just navigates to dashboard
- ❌ No user accounts — "M. van Dijk" is a fictional demo persona
- ❌ No role-based access control — all views visible to all users
- ❌ No organization isolation — no concept of tenants

### AI

- ❌ No real LLM integration — Copilot uses rule-based reply generator
- ❌ No real matching engine — match scores are hand-assigned demo values
- ❌ No real document extraction — no OCR
- ❌ No real translation — no language models
- ❌ No real risk scoring — risk indicators are hand-authored

### Verification

- ❌ No real sanctions screening — verification statuses are hand-assigned
- ❌ No real business verification — checks are fictional
- ❌ No real document authentication — uploaded documents aren't real
- ❌ No real reference checking — references are fictional

### Payments & signatures

- ❌ No real payment processing — commission figures are illustrative
- ❌ No real e-signature — "Contract execution" milestones are visual only
- ❌ No real escrow — no money is held or transferred
- ❌ No real wire transfers — payment references are fictional

### Integrations

- ❌ No real ERP integration — SAP, Oracle, Microsoft Dynamics cards are visual only
- ❌ No real CRM integration — Salesforce, HubSpot cards are visual only
- ❌ No real logistics integration — project44, FourKites cards are visual only
- ❌ No real webhook delivery — webhook deliveries table is static demo data
- ❌ No real market data — Panjiva, ImportGenius cards are visual only

### Documents

- ❌ No real document upload — "Upload document" buttons don't open file pickers
- ❌ No real document storage — documents listed are fictional
- ❌ No real version control — version numbers are static
- ❌ No real cross-document consistency checks — issues are hand-authored

### Communications

- ❌ No real email — "Send RFQ" / "Invite suppliers" buttons don't send anything
- ❌ No real notifications — notification dropdown shows static demo items
- ❌ No real chat — deal room notes textarea doesn't persist

## Worked example prompts for AI Copilot

The Copilot generates realistic structured responses for exactly 4 input patterns:

1. **"pump" or "rotterdam"** → industrial pump RFQ draft + 3 supplier matches (RheinTech 94, Meridian 86, Tidewater 81) + 3 clarification questions + recommended next actions
2. **"medical" or "pcb" or "iso 13485"** → Meridian Manufacturing match with 5 match reasons
3. **"red sea" or "route" or "disruption"** → logistics disruption analysis with 3 affected POs + mitigation recommendations
4. **"steel" or "en 1090" or "fabrication"** → Vega Industries + Tidewater backup comparison

Any other input returns a fallback response suggesting the quick prompts.

## How to verify what's real

1. **View source** — all data is in `src/lib/data/*.ts` as plain TypeScript
2. **Check the network tab** — no API calls are made (except Next.js HMR in dev)
3. **Refresh the page** — state resets to landing view (Zustand is in-memory only)
4. **Try to upload a document** — buttons are present but don't open file pickers
5. **Try to submit a form** — search inputs work (filtering) but no data is submitted anywhere
6. **Check `.env`** — no API keys, no database URLs beyond the local SQLite default

## Demo persona

The demo uses a single fictional user persona throughout:

- **Name:** Marieke van Dijk
- **Role:** Procurement Lead
- **Organization:** Nordport Logistics B.V. (Netherlands)
- **Timezone:** Europe/Amsterdam (NOT Asia/Tehran — see master prompt §2)
- **Active deals:** 4 (including the 5,000 industrial pump RFQ)

This persona is hardcoded in `Topbar.tsx` and `DashboardView.tsx`. A real implementation would pull this from the authenticated session.

## International scope (per master prompt §2)

The demo deliberately uses diverse international examples and avoids Iran-specific anything:

- **Companies:** Germany (RheinTech, Vega), Netherlands (Nordport), Singapore (Meridian, Kaiyo), UK (Elysian, Sapphire), UAE (PortLight), US (Tidewater, Hudson Bay)
- **Languages:** English only (no Persian, no RTL)
- **Markets:** EU, APAC, MENA, North America
- **Timezone:** Europe/Amsterdam (default user)
- **No Iran-specific features, companies, payment providers, or trade routes**

## Refresh behavior

- **Refresh the page** → view resets to "landing" (Zustand state is in-memory)
- **Click "Enter Platform"** → navigates to dashboard
- **Click any nav item** → view switches via Zustand
- **Open a detail page** → detailId set in Zustand, detail view renders
- **Click "Back to directory"** → detailId cleared, list view renders
- **Press ⌘K** → command palette opens
- **Click outside command palette** → closes
