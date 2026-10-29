# Setup Guide

## Prerequisites

- **Node.js 20+** (or **Bun 1.3+** for faster installs)
- npm, pnpm, or bun package manager

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/adelakbaribiz-sketch/global-trade-os.git
cd global-trade-os
```

### 2. Install dependencies

```bash
# With bun (recommended — faster)
bun install

# Or with npm
npm install

# Or with pnpm
pnpm install
```

### 3. Start the development server

```bash
bun run dev
# or
npm run dev
```

The app will be available at **http://localhost:3000**.

### 4. Open the platform

1. The landing page loads automatically
2. Click **"Enter Platform"** to access the application shell
3. Use the sidebar to navigate between 20 modules
4. Press **⌘K** (Mac) or **Ctrl+K** (Windows/Linux) to open the command palette

## Production Build

```bash
# Build
bun run build

# Start production server
bun run start
```

The production build outputs to `.next/standalone/` (configured in `next.config.ts`).

## Database (Optional — Not Used in Demo)

The Prisma schema is defined in `prisma/schema.prisma` (SQLite by default). To set up:

```bash
# Push schema to database
bun run db:push

# Generate Prisma client
bun run db:generate

# Run migrations (if using migrate workflow)
bun run db:migrate

# Reset database
bun run db:reset
```

The demo platform does not use the database — all data comes from static TypeScript modules in `src/lib/data/`.

## Environment Variables

Create a `.env` file (already gitignored):

```env
DATABASE_URL="file:/home/z/my-project/db/custom.db"
# Add real API keys here when integrating LLMs, e-signature, etc.
```

No environment variables are required for the demo to run.

## Gateway (Caddy)

The repository includes a `Caddyfile` for the sandbox gateway:

```
:81 {
  handle @transform_port_query {
    reverse_proxy localhost:{query.XTransformPort} { ... }
  }
  handle {
    reverse_proxy localhost:3000 { ... }
  }
}
```

This routes port 81 → port 3000 (the Next.js dev server). For local development outside the sandbox, you can ignore this and use port 3000 directly.

## Troubleshooting

### Dev server won't start

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install

# Restart
bun run dev
```

### Turbopack crashes during compile

In some sandboxed environments, Turbopack may crash after compile bursts. Restart cleanly:

```bash
pkill -9 -f next
rm -rf .next
bun run dev
```

### Page shows "Z.ai Logo" loading screen

This means the dev server is not responding. Restart it (see above).

### View throws "Application error"

Refresh the page. If the error persists:

1. Check `dev.log` for compile errors
2. Run `bun run lint` to verify code quality
3. Clear `.next/` and restart

### Port 3000 already in use

```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
PORT=3001 bun run dev
```

## Verification

After setup, verify the platform works:

```bash
# 1. Lint check
bun run lint

# 2. Dev server health
curl http://localhost:3000
# Should return HTML (HTTP 200)
```

## Demo Credentials

This is a demo platform — **no authentication required**. The user shown in the topbar (`M. van Dijk — Nordport Logistics`) is a fictional demo persona.

## File Paths

| Path | Purpose |
|------|---------|
| `src/app/page.tsx` | Single route — switches Landing ↔ AppShell |
| `src/lib/store/app-store.ts` | Zustand store |
| `src/lib/data/*.ts` | All demo data |
| `src/components/gtos/` | All Global Trade OS components |
| `screenshots/` | Platform screenshots |
| `docs/` | Architecture + module matrix + design system docs |
