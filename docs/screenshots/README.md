# Screenshots

Visual showcase of the Global Trade OS platform. All screenshots captured at 1440×900 viewport on the premium dark theme.

| File | View | Description |
|------|------|-------------|
| `landing-hero.png` | Public Landing | Hero section with gradient headline, trust stats (1,200+ verified companies, 38 countries, $40.6M YTD volume, 92% on-time delivery), and live dashboard preview card |
| `landing-full.png` | Public Landing | Full landing page — hero, 6 value propositions, 20-module grid, 4-step workflow, 3 personas (buyers/suppliers/representatives), AI Copilot demo dialogue, Trade Passport preview, 4-tier pricing, FAQ, footer |
| `dashboard.png` | Overview Dashboard | Welcome header, date range selector (7D/30D/90D/YTD), 5 KPI cards with sparklines (Active Opportunities, Open RFQs, Active Deals, Est. Commission, Outstanding Tasks), Trade Volume Trend chart, Opportunity Conversion Funnel |
| `dashboard-full.png` | Overview Dashboard | Full dashboard including active trade opportunities, recent activity feed, risk alerts, representative network coverage, upcoming deliveries, and AI suggestion banner |
| `marketplace.png` | Global Marketplace | 8 trade opportunity cards with type filters (Buy RFQ / Supply Offer / Distribution / Capacity / Contract Mfg), category and country filters, opportunity cards showing quantity, target price, lead time, incoterms, applicants, status |
| `ai-copilot.png` | AI Sourcing Copilot | Interactive chat panel with structured response blocks: RFQ draft (extracted fields), clarification questions, supplier match (top 3 candidates with match scores), recommended next actions. Includes 12 specialized agents sidebar and human-in-the-loop safety panel |
| `ai-copilot-full.png` | AI Sourcing Copilot | Full Copilot view showing recent AI jobs and the safety panel highlighting "Every consequential action requires your approval" |
| `intelligence.png` | Trade Intelligence | Intel feed with source/freshness/confidence badges, sortable country coverage map showing buyers/suppliers/representatives/deals per country |
| `risk.png` | Risk & Resilience | Risk indicators with severity-colored cards (high/medium/low), supplier dependency map showing % of category spend per supplier |
| `orders.png` | Orders & Deliveries | Purchase order status pipeline (Awaiting Contract → In Production → Ready for Shipment → In Transit → Customs Clearance → Delivered → Closed), expandable milestone timeline, upcoming deliveries |
| `integrations.png` | Integrations | Integration catalog grouped by category (ERP, CRM, Document, Verification, Logistics, Market Data), webhook deliveries table, integration health monitoring cards |
| `settings.png` | Settings | 8-section vertical-tab settings (Profile, Organization, Notifications, Security, Billing, API Keys, Localization, Appearance) |
| `admin.png` | Administration | 6-tab admin interface (Verification Queue, Representative Approvals, Marketplace Moderation, Audit Log, Feature Flags, System Health) |

## How to Capture Additional Screenshots

```bash
# Start dev server
bun run dev

# In another terminal, use agent-browser:
agent-browser open http://localhost:3000/
agent-browser set viewport 1440 900
agent-browser screenshot ./docs/screenshots/<name>.png
# For full page:
agent-browser screenshot ./docs/screenshots/<name>.png --full
```

## Notes

- All screenshots reflect the demo environment with fictional international companies (Germany, Netherlands, Singapore, UAE, UK, US)
- Some views (CRM, Deal Rooms, Service Partners, Trade Documents, Reports) may throw runtime errors during HMR transitions in certain sandbox environments — see [`docs/TESTING.md`](../TESTING.md) for details
- Refreshing the page typically resolves any HMR-related runtime errors
- Metrics shown are illustrative demo data, not real-world verified statistics
