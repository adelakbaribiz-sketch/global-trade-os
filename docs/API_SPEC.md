# API Specification

The Open Trade Network API surface that a real Global Trade OS backend would expose. None of these endpoints are implemented in the demo — this is the target-state design that would plug into the Next.js API routes or a separate FastAPI service.

## Design principles

- **REST + webhooks** for synchronous reads and asynchronous event delivery
- **Tenant-aware** — every endpoint scoped by organization membership
- **Idempotent writes** — `Idempotency-Key` header required on all POST/PUT operations
- **Versioned** — URL prefix `/api/v1/` with backward-compatible changes only
- **Rate-limited** — per-tenant quotas enforced at the gateway
- **Sandbox mode** — `/api/v1/sandbox/` mirrors production endpoints with synthetic data

## Authentication

```
Authorization: Bearer <tenant-api-key>
Idempotency-Key: <uuid>    # required on writes
X-Tenant-Id: <org-id>      # auto-injected from API key
```

API keys are issued per organization in **Settings → API Keys** and can be scoped to read-only or read-write.

## Rate limits

| Plan | Requests/min | Requests/day | Webhook deliveries/day |
|------|--------------|--------------|------------------------|
| Starter | 10 | 1,000 | 100 |
| Professional | 60 | 10,000 | 1,000 |
| Business | 300 | 100,000 | 10,000 |
| Enterprise | Custom | Custom | Custom |

Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Endpoints

### Identity & Access

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/auth/session` | Create session (email + password or SSO) |
| DELETE | `/api/v1/auth/session` | End session |
| GET | `/api/v1/me` | Current user profile |
| GET | `/api/v1/organizations/:orgId` | Organization details |
| GET | `/api/v1/organizations/:orgId/members` | List members |
| POST | `/api/v1/organizations/:orgId/invitations` | Invite user to org |
| DELETE | `/api/v1/organizations/:orgId/members/:userId` | Remove member |

### Companies & Verification

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/companies` | List companies (filter by type, country, category, verification) |
| GET | `/api/v1/companies/:companyId` | Company details + Trade Passport |
| POST | `/api/v1/companies` | Create company profile |
| PATCH | `/api/v1/companies/:companyId` | Update company profile |
| GET | `/api/v1/companies/:companyId/verification` | Verification history |
| POST | `/api/v1/companies/:companyId/verification/cases` | Submit verification request |
| GET | `/api/v1/companies/:companyId/documents` | List verification documents |
| POST | `/api/v1/companies/:companyId/documents` | Upload verification document |

### Marketplace & Opportunities

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/opportunities` | List opportunities (filter by type, category, country, status) |
| GET | `/api/v1/opportunities/:oppId` | Opportunity details |
| POST | `/api/v1/opportunities` | Publish opportunity |
| PATCH | `/api/v1/opportunities/:oppId` | Update opportunity |
| DELETE | `/api/v1/opportunities/:oppId` | Cancel opportunity |
| POST | `/api/v1/opportunities/:oppId/save` | Save to favorites |
| DELETE | `/api/v1/opportunities/:oppId/save` | Unsave |

### RFQ & Sourcing

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/rfqs` | List RFQs (filter by status, buyer, supplier) |
| GET | `/api/v1/rfqs/:rfqId` | RFQ details with line items |
| POST | `/api/v1/rfqs` | Create RFQ draft |
| POST | `/api/v1/rfqs/:rfqId/publish` | Publish RFQ (triggers matching & invitations) |
| POST | `/api/v1/rfqs/:rfqId/invitations` | Invite suppliers |
| GET | `/api/v1/rfqs/:rfqId/quotations` | List quotations received |
| POST | `/api/v1/rfqs/:rfqId/quotations` | Submit quotation (supplier-side) |
| POST | `/api/v1/rfqs/:rfqId/shortlist` | Shortlist suppliers |
| POST | `/api/v1/rfqs/:rfqId/award` | Award RFQ to supplier (creates Deal Room) |
| POST | `/api/v1/rfqs/:rfqId/cancel` | Cancel RFQ |

### AI Matching & Copilot

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/matching/suppliers` | Match suppliers to RFQ requirements |
| GET | `/api/v1/matching/suppliers/:matchId` | Match details with explanations |
| POST | `/api/v1/copilot/sessions` | Start Copilot session |
| POST | `/api/v1/copilot/sessions/:sessionId/messages` | Send message to Copilot |
| GET | `/api/v1/copilot/sessions/:sessionId` | Session history |
| POST | `/api/v1/copilot/jobs/:jobId/approve` | Approve consequential action |

All consequential Copilot actions (publishing RFQ, inviting suppliers, sending outreach) require explicit `POST /approve` calls.

### Representatives & Commissions

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/representatives` | List representatives (filter by region, industry, agreement) |
| GET | `/api/v1/representatives/:repId` | Representative profile |
| POST | `/api/v1/representatives/applications` | Apply as representative |
| GET | `/api/v1/commission-agreements` | List commission agreements |
| POST | `/api/v1/commission-agreements` | Create agreement |
| GET | `/api/v1/commission-ledger` | List ledger entries (filter by status, party, date) |
| POST | `/api/v1/commission-ledger/entries` | Create ledger entry |
| POST | `/api/v1/commission-ledger/entries/:entryId/approve` | Approve entry |
| POST | `/api/v1/commission-ledger/entries/:entryId/reverse` | Reverse entry (creates new audit entry, never modifies original) |

### Deal Rooms & Documents

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/deals` | List deals |
| GET | `/api/v1/deals/:dealId` | Deal details |
| GET | `/api/v1/deals/:dealId/participants` | List participants |
| POST | `/api/v1/deals/:dealId/participants` | Add participant |
| GET | `/api/v1/deals/:dealId/documents` | List documents |
| POST | `/api/v1/deals/:dealId/documents` | Upload document (versioned) |
| GET | `/api/v1/deals/:dealId/milestones` | List milestones |
| POST | `/api/v1/deals/:dealId/milestones/:milestoneId/advance` | Advance milestone |

### Trade Intelligence

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/intelligence` | List intelligence records |
| GET | `/api/v1/intelligence/:recordId` | Record details |
| GET | `/api/v1/intelligence/countries` | Country coverage data |
| POST | `/api/v1/intelligence/saved-dashboards` | Save dashboard |

### Webhooks

| Event | Payload |
|-------|---------|
| `rfq.published` | RFQ details + invited suppliers |
| `rfq.quotation_received` | RFQ + quotation details |
| `rfq.awarded` | RFQ + winning supplier + deal room ID |
| `deal.milestone_advanced` | Deal + milestone details |
| `deal.document_uploaded` | Deal + document metadata |
| `commission.earned` | Agreement + ledger entry |
| `commission.approved` | Ledger entry + approver |
| `commission.paid` | Ledger entry + payment reference |
| `verification.completed` | Company + verification level + checks |
| `intelligence.alert` | Intelligence record + affected entities |

Webhook delivery:
- POST to configured endpoint with `X-GTOS-Signature` HMAC header
- Retry with exponential backoff (1m, 5m, 30m, 2h, 12h)
- Dead-letter queue after 5 failed attempts
- Sandbox mode: webhooks delivered to `/sandbox` prefix

## SDK examples (proposed)

### JavaScript / TypeScript

```typescript
import { GTOSClient } from '@globaltrade-os/sdk';

const client = new GTOSClient({
  apiKey: process.env.GTOS_API_KEY,
  sandbox: true,
});

const rfq = await client.rfqs.create({
  title: '5,000 Industrial Centrifugal Pumps',
  lines: [{ /* ... */ }],
  sourcingType: 'qualified_suppliers',
});

await client.rfqs.publish(rfq.id);
```

### Webhook signature verification

```typescript
import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

## Status codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No content (delete success) |
| 400 | Bad request (validation failed) |
| 401 | Unauthorized (missing/invalid API key) |
| 403 | Forbidden (no access to resource) |
| 404 | Not found |
| 409 | Conflict (duplicate Idempotency-Key) |
| 422 | Unprocessable entity |
| 429 | Rate limited |
| 500 | Server error |

## Open questions

- **GraphQL?** — REST chosen for simplicity; GraphQL could be added as `/api/v1/graphql` for complex queries
- **Streaming?** — Copilot responses should stream via SSE for real-time token display
- **Real-time updates?** — WebSocket or Server-Sent Events for deal room collaboration, notification delivery
- **Bulk operations?** — `/api/v1/bulk/` endpoints for batch quotation submission, batch document upload
