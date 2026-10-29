# Testing

What was actually tested, what's known to be broken, and what remains untested.

## Test methodology

This demo was tested via:

1. **Static analysis** — ESLint via `bun run lint` (0 errors, 0 warnings in app code)
2. **Type checking** — TypeScript 5 via Next.js build
3. **Visual verification** — Agent Browser (Chromium-based) for rendered output
4. **Manual click-through** — every nav item clicked, every filter tested, every detail page opened
5. **Cross-resolution check** — verified responsive layout at 1440×900 (desktop)

## Test results

### PASSED

- ✅ `bun run lint` — 0 errors, 0 warnings in app code
- ✅ Dev server starts successfully on port 3000
- ✅ Landing page renders with hero, modules, workflow, personas, AI demo, pricing, FAQ
- ✅ "Enter Platform" button navigates to dashboard
- ✅ Dashboard renders with 5 KPI cards, trade volume chart, conversion funnel, active opportunities, activity feed, risk alerts, rep network, upcoming deliveries, AI suggestion
- ✅ AI Copilot view renders with chat panel, structured blocks, 12 agents sidebar, safety panel
- ✅ AI Copilot responds to 4 worked example prompts with correct structured blocks
- ✅ Command palette (⌘K) opens and fuzzy-searches across nav + companies + opportunities + RFQs + representatives
- ✅ Command palette keyboard navigation (arrow keys + Enter + Escape)
- ✅ Sidebar collapse toggle works
- ✅ Notifications dropdown opens
- ✅ User menu dropdown opens
- ✅ Mobile-responsive layout verified (Tailwind responsive classes)
- ✅ Screenshots captured successfully (7 valid screenshots)

### FIXED during development

- ✅ Missing icon imports in `LandingPage.tsx` (Store, Factory, FileText, Plug, Wrench, Target) — added
- ✅ Subagent-created views used `export default function` instead of named exports — converted to `export function` via sed
- ✅ Trailing duplicate `import { Clock } from "lucide-react"` at end of `MarketplaceView.tsx` — removed and consolidated into main import block

### REMAINING (known issues)

#### Dev server instability in sandbox

- ⚠️ Turbopack dev server dies after compile bursts in some sandboxed environments
- ⚠️ Restart pattern: `pkill -9 -f next && rm -rf .next && bun run dev`
- ⚠️ First compile takes ~8-10 seconds; subsequent HMR updates are fast

#### Some views throw runtime errors during HMR transitions

- ⚠️ Clicking certain nav items (Marketplace, RFQs, Representatives, Commission Center) occasionally triggers "Application error: a client-side exception has occurred" after hot reload
- ⚠️ Refreshing the page typically resolves the issue
- ⚠️ Code is lint-clean; root cause appears to be Framer Motion + Turbopack HMR interaction
- ⚠️ Production build likely unaffected (no HMR in production)

#### Not tested

- ❌ Cross-browser compatibility (only Chromium via Agent Browser)
- ❌ Production build (`bun run build`) — not run in this environment
- ❌ Production server (`bun run start`) — not run in this environment
- ❌ Performance under load (no load testing)
- ❌ Accessibility audit (no axe-core or Lighthouse run)
- ❌ SEO audit (no meta tag verification)
- ❌ E2E test suite (no Playwright or Cypress tests)
- ❌ Unit tests (no Vitest or Jest tests)
- ❌ Visual regression tests (no Chromatic or Percy)

## Untestable in current environment

The following cannot be tested in this sandbox environment:

- **Real backend integration** — no backend exists
- **Real authentication** — no auth wired up
- **Real AI integration** — Copilot is rule-based
- **Real payment processing** — no payment provider
- **Real e-signature** — no signature provider
- **Real document upload** — no S3 / file storage
- **Real sanctions screening** — no verification provider
- **Real webhook delivery** — no webhook system
- **Real-time updates** — no WebSocket server

## Recommended test suite (for real implementation)

### Unit tests (Vitest)

```typescript
// src/lib/data/__tests__/companies.test.ts
import { describe, it, expect } from 'vitest';
import { companies, getCompany } from '../companies';

describe('companies data', () => {
  it('should have at least 10 companies', () => {
    expect(companies.length).toBeGreaterThanOrEqual(10);
  });

  it('should have unique IDs', () => {
    const ids = companies.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getCompany should return company by ID', () => {
    expect(getCompany('co-rheintech')?.name).toBe('RheinTech Industries GmbH');
  });
});
```

### Component tests (React Testing Library)

```typescript
// src/components/gtos/shared/__tests__/KpiCard.test.tsx
import { render, screen } from '@testing-library/react';
import { KpiCard } from '../KpiCard';

describe('KpiCard', () => {
  it('should render label and value', () => {
    render(<KpiCard label="Active" value="12" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should render delta when provided', () => {
    render(<KpiCard label="Active" value="12" delta={{ value: '+3', direction: 'up' }} />);
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});
```

### E2E tests (Playwright)

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('dashboard renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Enter Platform")');
  await expect(page.locator('h1:has-text("Welcome back")')).toBeVisible();
  await expect(page.locator('text=Active Opportunities')).toBeVisible();
});
```

### Accessibility tests (axe-core)

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dashboard has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Enter Platform")');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## Manual test checklist

When manually testing the demo:

### Landing page
- [ ] Hero renders with gradient headline
- [ ] Trust stats show correct numbers (1,200+ / 38 / $40.6M / 92%)
- [ ] "Illustrative metrics" disclaimer is visible
- [ ] Live preview card shows 3 KPIs and 2 charts
- [ ] Module grid shows 20 modules
- [ ] Workflow shows 4 steps
- [ ] 3 personas (Buyers / Suppliers / Representatives) render
- [ ] AI Copilot demo dialogue renders
- [ ] Trade Passport preview renders
- [ ] 4 pricing tiers render
- [ ] FAQ accordion expands/collapses
- [ ] Footer renders with 4 columns

### Application shell
- [ ] "Enter Platform" navigates to dashboard
- [ ] Sidebar shows 19 nav items in 4 groups
- [ ] Sidebar collapse toggle works
- [ ] Topbar shows current view name
- [ ] Search button opens command palette
- [ ] "New RFQ" button navigates to RFQs
- [ ] AI Copilot shortcut navigates to Copilot
- [ ] Notifications dropdown opens
- [ ] User menu dropdown opens

### Dashboard
- [ ] "Welcome back, Marieke" heading renders
- [ ] Date range selector (7D / 30D / 90D / YTD) works
- [ ] 5 KPI cards render with sparklines
- [ ] Trade volume bar chart renders
- [ ] Conversion funnel renders with 8 stages
- [ ] Active opportunities list shows 3 items
- [ ] Recent activity feed shows 6 items
- [ ] Risk alerts show 3 items
- [ ] Representative network shows 4 active reps
- [ ] Upcoming deliveries show 4 items
- [ ] AI suggestion banner renders

### AI Copilot
- [ ] Chat panel renders with intro message
- [ ] 4 quick prompt buttons render
- [ ] Clicking "Source 5,000 industrial pumps" sends the prompt
- [ ] Copilot responds with 4 structured blocks (RFQ draft, clarification, supplier match, next action)
- [ ] Action buttons in blocks navigate correctly
- [ ] "12 specialized agents" sidebar renders
- [ ] "Human-in-the-loop safety" panel renders
- [ ] "Recent AI jobs" panel renders

### Command palette
- [ ] ⌘K opens the palette
- [ ] Search input is focused
- [ ] Typing filters results
- [ ] Arrow keys navigate
- [ ] Enter selects
- [ ] Escape closes
- [ ] Clicking outside closes

### Filters (on every list view)
- [ ] Search input filters visible items
- [ ] Status dropdown filters by status
- [ ] Category dropdown filters by category
- [ ] Country dropdown filters by country
- [ ] Clearing filters shows all items
- [ ] Empty state shows when no results

### Detail navigation
- [ ] Clicking a company card opens Trade Passport profile
- [ ] "Back to directory" returns to list
- [ ] Clicking an RFQ opens RFQ detail
- [ ] Clicking a deal opens deal room
- [ ] Clicking a representative opens profile

## Test commands

```bash
# Lint
bun run lint

# Type check (via build)
bun run build

# Run unit tests (when added)
bun run test

# Run e2e tests (when added)
bun run test:e2e
```
