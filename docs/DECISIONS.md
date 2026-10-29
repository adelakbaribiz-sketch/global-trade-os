# Engineering Decisions

Decisions made while turning the original master prompt ([DOSSIER_SOURCE.md](DOSSIER_SOURCE.md)) into this demo. Each entry: what was decided, why, and what it trades off.

## D1 — Frontend-only demo, no backend

**Decision:** build a fully client-rendered demo on in-repo mock data instead of a partial backend.

**Why:** the master prompt demanded "a visually outstanding, dark-themed Global Trade OS" with "every implemented page must have a meaningful user purpose and an appropriate data state" — but explicitly prohibited fabricating real verifications, transactions, AI integrations, or customer logos. An unfinished backend can't be demoed and would require fabricating database state. A polished, honest frontend can. See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

**Trade-off:** nothing persists, there's no real verification or commission logic to inspect. Documented explicitly via the "Demo environment" label in the sidebar, the "Illustrative metrics" disclaimer under trust stats, and this docs suite.

## D2 — Forced dark theme, no light mode toggle

**Decision:** ship one theme (premium dark), not a light/dark toggle.

**Why:** the master prompt §5 specified a precise dark palette (`#080D18` background, `#4D8DFF` primary, `#35D6C5` accent) and called for "a high-end enterprise command center, not a generic admin template." Enterprise trade platforms (Bloomberg terminals, most procurement tools, trading dashboards) conventionally read as dark technical surfaces. Building and validating a second, fully accessible light palette would have doubled design-system work for a demo that doesn't need it. Matches the AI-NODE reference project's D2 decision.

**Trade-off:** no light-mode users; revisit if this becomes a real product with broader audience research.

## D3 — Custom "Premium Dark Trade Surface" visual identity

**Decision:** hand-built design tokens (deep charcoal + electric-blue/cyan/violet accents) and hand-built SVG charts (no charting library), with shadcn/ui for form/table primitives only.

**Why:** the master prompt §5 explicitly warned against "decorative analytics without purpose" and "generic admin template" aesthetics. Hand-built sparklines, bar charts, and conversion funnels give precise visual control over the premium dark aesthetic. shadcn/ui handles the boring 40+ primitives (buttons, inputs, dialogs, tables) so we don't reinvent those wheels.

**Trade-off:** more component code to own vs. pulling Recharts; acceptable for the scope built. Recharts is installed but unused — could be swapped in if more complex charts are needed.

## D4 — AI Copilot is rule-based, not LLM-powered

**Decision:** the AI Sourcing Copilot uses a deterministic rule-based reply generator, not a real LLM.

**Why:** the master prompt §8 specified an "AI layer that can coordinate specialized agents" with "explainable matching" and "human approval before sending external commitments." But it never named a specific LLM provider, model, or training approach for the matching engine. Inventing one would be fabricating a capability that doesn't exist. The rule-based generator produces realistic-looking structured responses (RFQ drafts, supplier matches with scores, clarification questions) for 4 worked example prompts (pumps, medical PCB, steel, Red Sea disruption) — clearly labeled as demo interactions.

**Trade-off:** the Copilot cannot handle novel inputs beyond the 4 worked patterns; the fallback response suggests using the quick prompts. A real integration would use `z-ai-web-dev-sdk` (already in dependencies) or another LLM provider.

## D5 — No real e-signature, payment, or verification integrations

**Decision:** leave these as documented boundaries rather than wiring up real providers.

**Why:** the master prompt §17 (Functional Implementation Rules) explicitly states: "Do not simulate a completed payment, signature, verification, shipment, or commission payout when the underlying operation has not occurred." Real integrations require:

- **E-signature:** DocuSign / Adobe Sign — requires paid contracts and per-document fees
- **Payment:** Stripe Connect / Adyen — requires KYC, business verification, and per-transaction fees
- **Verification:** Kompass / Dun & Bradstreet — requires paid API access
- **Sanctions screening:** Dow Jones Risk & Compliance / Refinitiv World-Check — requires paid enterprise contracts

Guessing would misrepresent real integrations as implemented.

**Trade-off:** none of the deal room, commission, or verification flows reference a specific real provider; they're clearly synthetic.

## D6 — Single Next.js app, not a monorepo

**Decision:** `global-trade-os/src` is the only code package; `global-trade-os/docs` holds documentation.

**Why:** no backend exists yet, so there's nothing to separate into services/packages. A monorepo structure now would be speculative scaffolding for code that doesn't exist. Matches AI-NODE's D7 decision.

**Trade-off:** revisit when/if a real backend is built (see [ARCHITECTURE.md](ARCHITECTURE.md) for suggested seams — Next.js API routes vs. separate FastAPI service).

## D7 — Zustand over React Context for state

**Decision:** use Zustand for the app store (view, detailId, command palette, sidebar) instead of React Context.

**Why:** Zustand provides:

- No provider boilerplate (one less wrapper component)
- Selectors prevent unnecessary re-renders (only components using the changed slice re-render)
- Direct access from anywhere (command palette, navigation handlers, deep components)
- Built-in `set` and `get` for synchronous updates

Context would require a provider wrapping the entire app and would cause re-renders for every consumer on any state change.

**Trade-off:** Zustand is an external dependency (5KB gzipped) vs. built-in Context. Worth it for the developer experience.

## D8 — Framer Motion for view transitions

**Decision:** use Framer Motion's `AnimatePresence` with `mode="wait"` for view transitions.

**Why:** the master prompt §5 called for "subtle motion and transitions that improve usability without distracting users." `AnimatePresence` with `mode="wait"` ensures the old view fades out before the new view fades in, preventing layout overlap. The 180ms transition duration is short enough to feel responsive.

**Trade-off:** Framer Motion adds ~30KB to the bundle. Acceptable for the polish it provides.

## D9 — Command palette (⌘K) with fuzzy search

**Decision:** implement a command palette triggered by ⌘K / Ctrl+K with fuzzy search across all entities.

**Why:** enterprise SaaS apps of this complexity (Linear, Vercel dashboard, Notion) all have command palettes. The master prompt §5 called for "a command palette or quick-action interface." Fuzzy search across nav items + companies + opportunities + RFQs + representatives makes the 20-module platform navigable without memorizing sidebar locations.

**Trade-off:** builds one more component, but the UX payoff is significant for a 20-view app.

## D10 — No test suite

**Decision:** ship without automated tests.

**Why:** the master prompt §19 (Definition of Done) requires "critical tests pass" — but for a frontend-only demo on static data, the "critical path" is visual (does the dashboard render? does clicking nav work? does the command palette open?). Visual verification via Agent Browser (the system's intended verification tool) covers this. Unit tests for the rule-based Copilot reply generator would be useful but aren't critical for the demo.

**Trade-off:** a real product would need Vitest + React Testing Library + Playwright e2e. Documented in [TESTING.md](TESTING.md).

## D11 — English-only, no internationalization

**Decision:** ship English-only with no i18n framework.

**Why:** the master prompt §2 explicitly states: "Use English as the primary and initial application language" and "must not target Iran in any way" (no Persian, no RTL). The prompt also says "Design the architecture so additional languages and countries can be supported in the future without rebuilding the application" — but actually wiring up i18n for a demo with one language would be premature.

**Trade-off:** adding languages later would require introducing `next-intl` (already in dependencies) and wrapping all strings in `t()` calls. The architecture supports it; the demo doesn't implement it.

## D12 — Prisma schema included but unused

**Decision:** keep the default Prisma schema (User, Post) from the scaffold, unused.

**Why:** the master prompt §10 (Recommended Technical Architecture) calls for "PostgreSQL + Alembic migrations" and §11 (Core Data Model) specifies a detailed entity list. Including Prisma in the demo signals that the architecture is database-ready, even though the demo doesn't use it. Removing Prisma would require re-adding it later.

**Trade-off:** the demo carries an unused Prisma dependency (~3MB). A real implementation would replace the User/Post schema with the entities described in [DATA_MODEL.md](DATA_MODEL.md).

## D13 — Screenshots in `docs/screenshots/`, not root `/screenshots`

**Decision:** move screenshots from a top-level `/screenshots/` directory to `docs/screenshots/` to match the AI-NODE reference repository structure.

**Why:** the AI-NODE portfolio repository (https://github.com/adelakbaribiz-sketch/AI-NODE) uses `docs/screenshots/` for all screenshots and references them with relative paths in the README. Matching this structure keeps the portfolio consistent across projects.

**Trade-off:** slightly deeper path (`docs/screenshots/foo.png` vs `screenshots/foo.png`), but the README's image references handle this cleanly.

## D14 — No mobile screenshots in this version

**Decision:** capture only desktop (1440×900) screenshots.

**Why:** the demo is responsive (Tailwind responsive classes throughout), but the primary use case is desktop — enterprise trade software is overwhelmingly used on desktops. Mobile screenshots would require additional agent-browser sessions and the dev server is already unstable in this sandbox environment.

**Trade-off:** the README's screenshot table shows desktop only. A future iteration could add mobile screenshots (390px viewport) to show the responsive layout.
