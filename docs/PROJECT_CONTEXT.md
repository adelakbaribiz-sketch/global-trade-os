# Project Context

## What this is

**Global Trade OS** is a portfolio-grade frontend demo of an international trade operating system. It exists because a 23-section master prompt — describing a "world-class global trade operating system" with 21 modules, an AI agent architecture, a commission ledger, and a representative network — needed to be turned into something a reviewer could actually evaluate.

## Why it's built this way

The master prompt was unstructured: it specified what the product *should* do, but provided no design system, no implementation, no concrete data model, and no real customers. The brief prohibited fabricating capabilities (real verifications, real transactions, real AI integrations, real customer logos) — yet demanded a "visually outstanding, English-language, dark-themed Global Trade OS that can evolve into a serious international B2B platform."

The only honest way to satisfy both constraints was:

1. **Build a maximum-credible frontend** — a fully click-through, navigable, professionally-designed UI across 20 modules, with realistic but explicitly synthetic demo data.
2. **Document everything that isn't real** — every doc page distinguishes what's running from what's target-state design.
3. **Make the demo status impossible to miss** — "Demo environment" label in the sidebar, "Illustrative metrics based on demonstrative demo data" disclaimer under every trust stat, persistent status block at the top of the README.

## What this is not

- **Not a live product.** No revenue, no users, no funding.
- **Not a backend.** State lives in Zustand; nothing persists across page refreshes.
- **Not an AI integration.** The AI Copilot uses a rule-based reply generator, not a real LLM.
- **Not a verification provider.** All verification statuses are hand-assigned demo values, not computed from real checks.
- **Not a payment system.** The commission ledger shows illustrative figures; no real money has ever moved.
- **Not a regulatory product.** No GDPR auto-compliance, no sanctions screening, no e-signature integrations.

## Source material

The original master prompt is preserved in [`docs/DOSSIER_SOURCE.md`](DOSSIER_SOURCE.md). It is 23 sections long and covers product vision, design system, modules, AI agent architecture, revenue model, technical architecture, data model, security, business workflows, required UX pages, dashboard requirements, demo data rules, functional implementation rules, implementation roadmap, definition of done, repository/documentation requirements, working method, final deliverables, and first tasks.

This demo implements Phase 1 of the roadmap specified in §18 of the dossier: product foundation and premium UI, plus as much of Phase 2 (marketplace and sourcing) and Phase 3 (representatives and revenue) as fits a frontend-only scope.

## Target audience

Reviewers evaluating:

- Whether the product concept is legible and credible
- Whether the design quality meets enterprise SaaS standards
- Whether the demo honestly represents what's real vs. what's simulated
- Whether the architecture and module decomposition make sense for a future real build

## What "done" means for this demo

Per the master prompt's §19 "Definition of Done", the demo satisfies:

- ✅ The application starts using documented instructions (`bun run dev`)
- ✅ Demo data loads correctly (8 deterministic data modules)
- ✅ Main workflows work end to end (landing → dashboard → marketplace → RFQ → quotations → deal room → commission)
- ✅ The UI has been checked at desktop and mobile sizes (responsive Tailwind classes throughout)
- ✅ Environment variables are documented (none required — see `docs/SETUP.md`)
- ✅ Setup and deployment instructions are updated (see `docs/SETUP.md` and `docs/DEPLOYMENT.md`)

Not satisfied (and explicitly flagged in `docs/LIMITATIONS.md`):

- ❌ Frontend and backend integrate correctly (no backend exists)
- ❌ Database migrations run successfully (Prisma schema is unused)
- ❌ Permissions are enforced (no authentication)
- ❌ Critical tests pass (no test suite — see `docs/TESTING.md`)
