# Screenshots

Visual showcase of the Global Trade OS platform. All screenshots captured at 1440×900 viewport on the premium dark theme.

| File | View | Description |
|------|------|-------------|
| `01_landing_hero.png` | Public Landing | Hero section with gradient headline, trust stats (1,200+ verified companies, 38 countries, $40.6M YTD volume, 92% on-time delivery), and live dashboard preview card |
| `01_landing_full.png` | Public Landing | Full landing page — hero, 6 value propositions, 20-module grid, 4-step workflow, 3 personas (buyers/suppliers/representatives), AI Copilot demo dialogue, Trade Passport preview, 4-tier pricing, FAQ, footer |
| `02_dashboard.png` | Overview Dashboard | Welcome header, date range selector (7D/30D/90D/YTD), 5 KPI cards with sparklines (Active Opportunities, Open RFQs, Active Deals, Est. Commission, Outstanding Tasks), Trade Volume Trend chart, Opportunity Conversion Funnel |
| `02_dashboard_full.png` | Overview Dashboard | Full dashboard including active trade opportunities, recent activity feed, risk alerts, representative network coverage, upcoming deliveries, and AI suggestion banner |
| `03_marketplace_full.png` | Global Marketplace | 8 trade opportunity cards with type filters (Buy RFQ / Supply Offer / Distribution / Capacity / Contract Mfg), category and country filters, opportunity cards showing quantity, target price, lead time, incoterms, applicants, status |
| `09_copilot.png` | AI Sourcing Copilot | Interactive chat panel with structured response blocks: RFQ draft (extracted fields), clarification questions, supplier match (top 3 candidates with match scores), recommended next actions. Includes 12 specialized agents sidebar and human-in-the-loop safety panel |
| `09_copilot_full.png` | AI Sourcing Copilot | Full Copilot view showing recent AI jobs and the safety panel highlighting "Every consequential action requires your approval" |

## How to Capture Additional Screenshots

```bash
# Start dev server
bun run dev

# In another terminal, use agent-browser:
agent-browser open http://localhost:3000/
agent-browser set viewport 1440 900
agent-browser screenshot ./screenshots/<name>.png
# For full page:
agent-browser screenshot ./screenshots/<name>.png --full
```

## Notes

- All screenshots reflect the demo environment with fictional international companies (Germany, Netherlands, Singapore, UAE, UK, US)
- Some views may throw runtime errors during HMR transitions in certain sandbox environments — refresh the page if this happens
- Metrics shown are illustrative demo data, not real-world verified statistics
