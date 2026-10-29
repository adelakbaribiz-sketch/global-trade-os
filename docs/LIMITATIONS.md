# Limitations

Every open gap in this demo. **Read this first** before evaluating the platform.

## Critical limitations

### 1. No backend persistence

- State lives in Zustand (in-memory only)
- Refreshing the page resets the view to landing
- No data is saved anywhere — not to database, not to localStorage, not to cookies
- All "create" / "update" / "delete" operations are visual only

**Workaround:** None. This is a frontend demo.

### 2. No authentication

- Anyone with the URL can access all views
- No login required
- No user accounts
- "M. van Dijk" is a hardcoded fictional persona in `Topbar.tsx` and `DashboardView.tsx`

**Workaround:** None. Real authentication requires NextAuth.js + database.

### 3. No real AI integration

- AI Copilot uses a rule-based reply generator, not an LLM
- Only 4 input patterns produce structured responses (pumps, medical PCB, Red Sea, steel)
- All other inputs return a fallback suggestion
- Match scores on quotations are hand-assigned demo values, not computed

**Workaround:** Use the 4 quick prompts in the Copilot view for demo purposes.

### 4. No real verification

- All verification statuses are hand-assigned in `src/lib/data/companies.ts`
- No real sanctions screening
- No real business verification
- No real document authentication
- "Enhanced Verification Complete" is a label, not a verified fact

**Workaround:** None. Real verification requires paid API integrations (Dow Jones, Kompass, etc.).

### 5. No real payment processing

- Commission figures are illustrative demo data
- No real money has ever moved
- No real escrow
- No real wire transfers
- "Paid" status on ledger entries is a label, not a real payment

**Workaround:** None. Real payments require Stripe Connect / Adyen + KYC + money transmitter licenses.

## Functional limitations

### 6. Dev server instability in sandbox

- Turbopack dev server dies after compile bursts in some sandboxed environments
- Restart pattern: `pkill -9 -f next && rm -rf .next && bun run dev`
- This is a Turbopack + sandbox interaction issue, not a code bug

**Workaround:** Restart the dev server when it dies. Production builds are unaffected.

### 7. Some views throw runtime errors during HMR

- Clicking certain nav items after hot reload may trigger "Application error: a client-side exception has occurred"
- Affected views: Marketplace, RFQs, Representatives, Commission Center (intermittent)
- Code is lint-clean; root cause appears to be Framer Motion + Turbopack HMR interaction

**Workaround:** Refresh the page. Production builds likely unaffected (no HMR in production).

### 8. No real document upload

- "Upload document" buttons in deal rooms are present but don't open file pickers
- Documents listed in deal rooms are fictional
- No file storage integration (S3, etc.)

**Workaround:** None for upload. View the static document list for demo purposes.

### 9. No real-time updates

- All data is static
- No WebSocket server
- No Server-Sent Events
- No live notifications (the bell icon shows static demo notifications)

**Workaround:** None. Real-time requires WebSocket server + event system.

### 10. No form submissions

- Search inputs work (filtering visible data)
- But no form actually submits data anywhere
- "Send RFQ" / "Invite suppliers" / "Apply as representative" buttons don't send anything

**Workaround:** None. Real submissions require backend API.

## Data limitations

### 11. All data is fictional

- 10 companies are fictional (RheinTech, Nordport, Meridian, etc. don't exist)
- All transactions are illustrative
- All commission figures are demo values
- All verification statuses are hand-assigned
- All references are fictional

**Workaround:** None. This is by design per the master prompt's anti-fabrication rules.

### 12. Limited data volume

- 10 companies (real platform: thousands)
- 8 opportunities (real platform: hundreds active)
- 4 RFQs (real platform: dozens active)
- 6 quotations (real platform: hundreds per RFQ)
- 6 representatives (real platform: hundreds)
- 7 commission agreements (real platform: thousands)

**Workaround:** None for demo. Real platform would have paginated APIs.

### 13. USD-only

- All monetary values are in USD
- No multi-currency support
- No FX conversion

**Workaround:** None. Multi-currency requires real FX rate integration.

### 14. English-only

- No internationalization (i18n)
- No language toggle
- No RTL support

**Workaround:** None. i18n would require `next-intl` (already in dependencies) + string extraction.

## Integration limitations

### 15. No real ERP integration

- SAP, Oracle, Microsoft Dynamics cards are visual only
- No actual API connections

### 16. No real CRM integration

- Salesforce, HubSpot cards are visual only
- No actual API connections

### 17. No real logistics integration

- project44, FourKites cards are visual only
- No real shipment tracking

### 18. No real e-signature

- DocuSign, Adobe Sign cards are visual only
- "Contract execution" milestones are visual only

### 19. No real webhook delivery

- Webhook deliveries table is static demo data
- No actual webhook system

### 20. No real market data

- Panjiva, ImportGenius cards are visual only
- Trade intelligence records are hand-authored

## Compliance limitations

### 21. No GDPR compliance

- No real data processing
- No Data Processing Agreement
- No data subject access workflows
- No data deletion workflows

### 22. No sanctions screening

- No real OFAC / EU / UN sanctions screening
- Verification statuses are labels only

### 23. No export controls compliance

- No dual-use export control checks
- No jurisdiction-specific restrictions

### 24. No certification

- Not SOC 2 certified
- Not ISO 27001 certified
- No attestations of any kind

## UI/UX limitations

### 25. No loading skeletons

- Motion entrance animations serve as the only loading state
- No skeleton screens for async data (no async data)

### 26. No error boundaries per view

- Next.js default error boundary catches all errors
- No view-specific error recovery

### 27. No toast notifications for actions

- Toast component exists (`@/components/ui/toaster`) but is not used
- No success/error feedback for user actions

### 28. No keyboard shortcuts beyond ⌘K

- No `g d` for "go to dashboard" style shortcuts
- No `?` for keyboard shortcuts help

## Testing limitations

### 29. No automated tests

- No unit tests (Vitest)
- No component tests (React Testing Library)
- No e2e tests (Playwright)
- No accessibility tests (axe-core)
- No visual regression tests (Chromatic)

See [TESTING.md](TESTING.md) for the recommended test suite.

### 30. No CI/CD pipeline

- No GitHub Actions workflow
- No automated lint/build/test on PR
- No automated deployment

## What this demo does well

Despite these limitations, the demo successfully demonstrates:

- ✅ A coherent 20-module product architecture
- ✅ A premium dark visual design system
- ✅ Working filters, sorting, and empty states across views
- ✅ A functional command palette (⌘K)
- ✅ A working AI Copilot concept (rule-based, but the UX is real)
- ✅ Structured commission ledger with reversal entries
- ✅ Trade Passport concept with verification checks
- ✅ Deal room with tabbed navigation
- ✅ Honest labelling of demo status throughout
- ✅ Comprehensive documentation suite (15 docs)
- ✅ Clean code (lint passes, type-safe)

The demo is suitable for:

- Portfolio review
- Product concept evaluation
- Design system reference
- Architecture discussion starter
- Phase 2+ implementation planning

The demo is NOT suitable for:

- Production deployment
- Real trade transactions
- Real verification checks
- Real payment processing
- Any actual business use
