# Deployment

How to run, build, and deploy Global Trade OS.

## Local development

### Prerequisites

- **Node.js 20+** or **Bun 1.3+**
- npm / pnpm / bun package manager

### Start dev server

```bash
git clone https://github.com/adelakbaribiz-sketch/global-trade-os.git
cd global-trade-os
bun install     # or npm install
bun run dev     # or npm run dev
```

Open http://localhost:3000 in your browser.

The dev server uses Next.js 16 with Turbopack. First compile takes ~8-10 seconds; subsequent compiles are near-instant via HMR.

### Health check

```bash
curl http://localhost:3000
# Should return HTML with HTTP 200
```

## Production build

### Build

```bash
bun run build
```

This produces a standalone build in `.next/standalone/` (configured in `next.config.ts`):

```
.next/
├── standalone/          Self-contained server (no node_modules needed)
│   ├── server.js
│   └── .next/
└── static/              Static assets (copied to standalone/.next/static/)
```

### Start production server

```bash
bun run start
# or
node .next/standalone/server.js
```

The production server listens on port 3000 by default. Override with `PORT`:

```bash
PORT=8080 bun run start
```

### Verify production build

```bash
curl http://localhost:3000
# Should return minified HTML with HTTP 200
```

## Environment variables

### Required for production

None — the demo runs entirely on in-repo mock data.

### Optional (for future backend integration)

Create a `.env` file (gitignored):

```env
# Database (when Prisma is wired up)
DATABASE_URL="postgresql://user:pass@localhost:5432/globaltradeos"

# Authentication (when NextAuth is wired up)
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI integration (when Copilot is wired to real LLM)
ZAI_API_KEY="your-z-ai-api-key"

# File storage (when document upload is wired up)
S3_ENDPOINT="https://s3.amazonaws.com"
S3_BUCKET="globaltradeos-docs"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."

# Verification providers (when sanctions screening is wired up)
DOW_JONES_API_KEY="..."
KOMPASS_API_KEY="..."

# E-signature (when deal room signatures are wired up)
DOCUSIGN_API_KEY="..."
```

See `docs/API_SPEC.md` for the full target-state integration surface.

## Deployment platforms

### Vercel (recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

The `next.config.ts` is already configured for Vercel's standalone output.

### Self-hosted (Docker)

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t global-trade-os .
docker run -p 3000:3000 global-trade-os
```

### Self-hosted (PM2)

```bash
npm install -g pm2
bun run build
pm2 start "node .next/standalone/server.js" --name global-trade-os
pm2 save
pm2 startup
```

### Coolify (mentioned in master prompt §10)

Coolify is compatible with Next.js standalone builds. Configure:

1. Connect your Git repository
2. Set build command: `bun run build`
3. Set start command: `node .next/standalone/server.js`
4. Set port: 3000
5. Add environment variables as needed

## Reverse proxy (Caddy)

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

For production, replace with your domain:

```
your-domain.com {
  reverse_proxy localhost:3000 {
    header_up Host {host}
    header_up X-Forwarded-For {remote_host}
    header_up X-Forwarded-Proto {scheme}
  }
}
```

Caddy handles HTTPS automatically via Let's Encrypt.

## Production checklist

Before deploying to production:

- [ ] Set `NEXTAUTH_SECRET` to a strong random value
- [ ] Configure HTTPS (via Caddy, Nginx, or Vercel's automatic TLS)
- [ ] Set up error monitoring (Sentry, Datadog, or similar)
- [ ] Set up logging (structured JSON logs to stdout)
- [ ] Configure backup strategy (if using database)
- [ ] Set up health checks (`/api/health` endpoint)
- [ ] Configure rate limiting (if exposing API)
- [ ] Set up CDN for static assets (Vercel does this automatically)
- [ ] Configure CSP headers in `next.config.ts`
- [ ] Remove demo data and wire up real backend
- [ ] Add authentication
- [ ] Add audit logging
- [ ] Test backup restoration

## Health check endpoint

Add to `src/app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

## Monitoring

### Recommended metrics

- **Application:** request count, response time, error rate (per route)
- **Business:** active users, RFQs published, quotations submitted, deals closed, commission paid
- **Infrastructure:** CPU, memory, disk, network
- **AI:** token usage, cost per Copilot session, agent execution time

### Recommended tools

- **APM:** Sentry, Datadog APM, or New Relic
- **Logs:** structured JSON to stdout, collected by your log aggregator
- **Uptime:** Pingdom, UptimeRobot, or Better Stack
- **Error tracking:** Sentry (free tier covers small projects)

## Rollback strategy

### Vercel

```bash
vercel promote <previous-deployment-url>
```

### Self-hosted

Keep previous Docker image tagged:

```bash
docker tag global-trade-os:latest global-trade-os:rollback
docker build -t global-trade-os:latest .
# If rollback needed:
docker stop global-trade-os-latest
docker run -d --name global-trade-os-latest -p 3000:3000 global-trade-os:rollback
```

## Database migrations (when wired up)

```bash
# Create migration from schema changes
bun run db:migrate

# Reset database (DESTRUCTIVE)
bun run db:reset

# Push schema without migration (dev only)
bun run db:push

# Generate Prisma client after schema changes
bun run db:generate
```

Migrations live in `prisma/migrations/` and should be committed to the repository.
