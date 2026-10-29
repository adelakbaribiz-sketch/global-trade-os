# Security

What was checked in this demo, what's explicitly out of scope, and what a real Global Trade OS would need.

## What this demo implements

### Forced dark theme (no XSS via theme toggle)

The dark theme is enforced globally via CSS variables in `globals.css` and `<html className="dark">` in `layout.tsx`. No theme toggle means no user-controlled class injection.

### No user input persistence

All "forms" in the demo (search inputs, filter dropdowns, AI Copilot textarea) keep state in React's `useState` only — no backend submissions, no localStorage persistence, no cookies beyond what Next.js sets for its own dev tools.

### Static demo data

All data shown comes from TypeScript modules in `src/lib/data/`. No external API calls, no database queries, no user-generated content. This means:

- No SQL injection risk (no SQL)
- No XSS via stored content (no stored content)
- No CSRF risk (no state-changing requests)
- No IDOR risk (no object-level authorization to bypass)

### No secrets in source

- No API keys, tokens, or passwords in any source file
- No real customer data
- No production credentials
- `.env` is gitignored (and was removed from tracking in the cleanup commit)

### AI Copilot safety boundaries

The demo Copilot is rule-based, not LLM-powered, but the safety design is documented and visible in the UI:

- **Human approval required** for every consequential action (RFQ publication, supplier invitations, outreach messages)
- **Action buttons route only through `setView()`** (navigation) — no actual state mutations
- **No document execution** — Copilot cannot sign contracts, transfer funds, or make binding commitments
- **Untrusted data principle** — uploaded documents and external tool responses are treated as untrusted (would be enforced in real backend)
- **Safety panel** in the Copilot sidebar documents these constraints visibly

## What this demo does NOT implement

### Authentication & authorization

- ❌ No authentication (anyone with the URL can access)
- ❌ No role-based access control
- ❌ No organization-level tenant isolation
- ❌ No server-side authorization (no server)
- ❌ No session management
- ❌ No password handling
- ❌ No multi-factor authentication
- ❌ No SSO / SAML / OIDC

### Input validation

- ❌ No server-side input validation (no server)
- ⚠️ Client-side validation only (search inputs sanitize via React's controlled components)

### Network security

- ❌ No HTTPS enforcement (depends on deployment)
- ❌ No CORS configuration (no API to CORS-protect)
- ❌ No CSP headers (would add in `next.config.ts` for production)
- ❌ No rate limiting (no API to rate-limit)

### Data protection

- ❌ No encryption at rest (no persisted data)
- ❌ No encryption in transit (no API)
- ❌ No data retention policies
- ❌ No GDPR data subject access workflows
- ❌ No data deletion workflows
- ❌ No backup / recovery procedures

### Verification & sanctions

- ❌ No real sanctions screening
- ❌ No real restricted-party checks
- ❌ No real business verification
- ❌ No real document authentication
- All verification statuses in the demo are hand-assigned values

### File upload security

- ❌ No file upload (UI buttons present, no file picker wired)
- A real implementation would need: file type validation, size limits, malware scanning, virus scan integration, signed URLs for S3 upload

### Audit logging

- ❌ No audit log persistence (the Administration → Audit Log tab shows static demo entries)
- A real implementation would need: append-only audit table, immutable storage, field-level diff tracking, retention policies

## Target-state security design

When this becomes a real product:

### Authentication

- NextAuth.js v4 with email/password + optional SSO (Google Workspace, Microsoft Entra ID)
- Multi-factor authentication required for: contract execution, commission approval, payment initiation, verification review
- Session timeout: 8 hours idle, 24 hours absolute
- Password requirements: 12+ chars, breached-password check via HaveIBeenPwned API

### Authorization

- Role-based access control (RBAC) with 16+ roles per the master prompt §8 Module T
- Attribute-based restrictions where needed (e.g., territory-scoped representatives)
- Server-side authorization on every API endpoint (never trust client)
- Organization-level tenant isolation via row-level security in PostgreSQL

### Network security

- HTTPS-only (HSTS, secure cookies)
- Strict CSP with no `unsafe-inline` (use nonces for any inline scripts)
- CORS allow-list per tenant
- Rate limiting at API gateway (per-tenant quotas)
- WAF in front of API

### Data protection

- Encryption at rest (PostgreSQL TDE + S3 server-side encryption)
- Encryption in transit (TLS 1.3 minimum)
- Pseudonymization for analytics
- Data retention policies per data type (verification documents: 7 years; activities: 2 years; audit logs: 10 years)
- GDPR data subject access workflows (export, deletion)
- Backup encryption + tested recovery procedures

### Verification & sanctions

- Real sanctions screening via Dow Jones Risk & Compliance or Refinitiv World-Check
- Restricted-party screening before every transaction milestone
- Real business verification via Kompass, Dun & Bradstreet, or local registry APIs
- Document authentication via Onfido or Jumio
- Re-verification schedule (annual for enhanced, biennial for basic)

### File upload security

- File type allow-list (PDF, PNG, JPG, DOCX only)
- Size limit: 25 MB per file
- Malware scanning via ClamAV or AWS GuardDuty Malware Protection
- Signed S3 URLs for direct upload (no files through API server)
- Virus scan required before document classification

### Audit logging

- Append-only `AuditEvent` table with no UPDATE/DELETE permissions
- Field-level diffs for sensitive entities (commission ledger, verification status, role assignments)
- Immutable storage (S3 Object Lock in compliance mode)
- Real-time streaming to SIEM (Splunk, Datadog, or similar)
- Retention: 10 years for audit events

### Secret management

- API keys in AWS Secrets Manager or HashiCorp Vault
- Database credentials rotated quarterly
- Per-tenant API keys with scoped permissions
- Webhook signing secrets per webhook endpoint

## Compliance posture (NOT claimed)

This demo does NOT claim:

- GDPR compliance (no real data processing)
- SOC 2 compliance (no real controls)
- ISO 27001 compliance (no real ISMS)
- Any certification or attestation

A real Global Trade OS would need:

- GDPR Data Processing Agreement with every customer
- SOC 2 Type II attestation (12+ months of audit evidence)
- Country-specific compliance (e.g., BaFin for Germany, MAS for Singapore, FCA for UK)
- Trade-specific compliance (OFAC sanctions, EU dual-use export controls, customs regulations per jurisdiction)

## Reporting a vulnerability

This is a demo repository — no vulnerability disclosure program. For a real deployment, a coordinated disclosure process with a security@ email address and PGP key would be established.
