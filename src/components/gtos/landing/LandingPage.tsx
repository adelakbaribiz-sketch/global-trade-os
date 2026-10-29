"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  ShieldCheck,
  Network,
  Sparkles,
  ArrowRight,
  Check,
  Search,
  FileCheck2,
  Briefcase,
  Truck,
  BadgeDollarSign,
  Boxes,
  BarChart3,
  Building2,
  Users,
  Workflow,
  Lock,
  Zap,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  Store,
  Factory,
  FileText,
  Plug,
  Wrench,
  Target,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";

export function LandingPage() {
  const setView = useAppStore((s) => s.setView);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4D8DFF] to-[#35D6C5]">
              <Globe2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Global Trade OS</span>
            <span className="ml-2 hidden rounded border border-[#4D8DFF]/30 bg-[#4D8DFF]/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-[#4D8DFF] sm:inline-block">
              Demo
            </span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#platform" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Platform</a>
            <a href="#modules" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Modules</a>
            <a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("dashboard")}
              className="hidden rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline-flex"
            >
              Sign in
            </button>
            <button
              onClick={() => setView("dashboard")}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(77,141,255,0.5)] hover:bg-[#3a7af0] transition-colors"
            >
              Enter Platform
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="flex flex-col px-4 py-3">
              <a href="#platform" onClick={() => setMobileNavOpen(false)} className="py-2 text-sm text-muted-foreground">Platform</a>
              <a href="#modules" onClick={() => setMobileNavOpen(false)} className="py-2 text-sm text-muted-foreground">Modules</a>
              <a href="#how-it-works" onClick={() => setMobileNavOpen(false)} className="py-2 text-sm text-muted-foreground">How it Works</a>
              <a href="#pricing" onClick={() => setMobileNavOpen(false)} className="py-2 text-sm text-muted-foreground">Pricing</a>
              <a href="#faq" onClick={() => setMobileNavOpen(false)} className="py-2 text-sm text-muted-foreground">FAQ</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="gtos-grid-bg absolute inset-0 opacity-50" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#4D8DFF]/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#35D6C5]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#35D6C5]" />
              Trusted by 1,200+ verified businesses across 38 countries
            </div>
            <h1 className="gtos-text-gradient text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Global Trade.<br />Connected, Verified, Intelligent.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Discover trusted international partners, identify new business opportunities, coordinate
              cross-border transactions, and manage your global trade network from one intelligent platform.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => setView("dashboard")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#4D8DFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(77,141,255,0.6)] hover:bg-[#3a7af0] transition-colors sm:w-auto"
              >
                Enter the platform
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#platform"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-5 py-2.5 text-sm font-medium text-foreground hover:border-[#4D8DFF]/40 hover:bg-card/80 transition-colors sm:w-auto"
              >
                Explore the platform
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "1,200+", label: "Verified companies" },
                { value: "38", label: "Countries covered" },
                { value: "$40.6M", label: "YTD trade volume" },
                { value: "92%", label: "On-time delivery" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{s.value}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground/60">
              Illustrative metrics based on demonstrative demo data — not real-world verified statistics.
            </p>
          </motion.div>

          {/* Hero preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="gtos-glow gtos-panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F45B6B]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2B441]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
                  <span className="ml-2 text-xs text-muted-foreground">app.globaltrade.os / dashboard</span>
                </div>
                <span className="rounded border border-[#4D8DFF]/30 bg-[#4D8DFF]/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-[#4D8DFF]">Live preview</span>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {[
                  { label: "Active opportunities", value: "12", trend: "+3 this week", color: "text-[#4D8DFF]" },
                  { label: "Open RFQs", value: "4", trend: "2 closing soon", color: "text-[#35D6C5]" },
                  { label: "Est. commission", value: "$662K", trend: "+$84K MoM", color: "text-[#8B7BFF]" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-md border border-border bg-card/40 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                    <p className={`mt-1.5 text-xl font-semibold ${kpi.color}`}>{kpi.value}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground/70">{kpi.trend}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 px-4 pb-4 lg:grid-cols-2">
                <div className="rounded-md border border-border bg-card/40 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">Trade volume trend</p>
                    <span className="text-[10px] text-[#34D399]">+18% QoQ</span>
                  </div>
                  <div className="flex h-20 items-end gap-1">
                    {[35, 42, 38, 55, 48, 62, 70, 68, 78, 85, 82, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#4D8DFF]/40 to-[#4D8DFF]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-md border border-border bg-card/40 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">Pipeline by stage</p>
                    <span className="text-[10px] text-muted-foreground">7 active deals</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { stage: "Negotiation", count: 2, pct: 75, color: "bg-[#F2B441]" },
                      { stage: "Contract", count: 1, pct: 50, color: "bg-[#4D8DFF]" },
                      { stage: "Execution", count: 2, pct: 85, color: "bg-[#35D6C5]" },
                      { stage: "Shipment", count: 2, pct: 60, color: "bg-[#8B7BFF]" },
                    ].map((row) => (
                      <div key={row.stage} className="flex items-center gap-2">
                        <span className="w-24 text-[10px] text-muted-foreground">{row.stage}</span>
                        <div className="h-1.5 flex-1 rounded-full bg-muted">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="w-4 text-right text-[10px] tabular-nums text-foreground/70">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo strip — labelled as illustrative */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground">
            Illustrative buyer &amp; supplier categories — fictional demo profiles
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground/70">
            <span>Industrial Machinery</span>
            <span>Electronics &amp; EMS</span>
            <span>Steel &amp; Construction</span>
            <span>Specialty Food</span>
            <span>Industrial Chemicals</span>
            <span>Logistics &amp; 3PL</span>
            <span>Inspection &amp; QA</span>
          </div>
        </div>
      </section>

      {/* Platform value props */}
      <section id="platform" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#4D8DFF]">The platform</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">One operating system for international trade</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Global Trade OS unifies sourcing, qualification, negotiation, coordination, and revenue
            management — built on trusted relationships, transparent transactions, and intelligent automation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((vp, i) => (
            <motion.div
              key={vp.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/40 p-5 hover:border-[#4D8DFF]/40 transition-colors"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#4D8DFF]/10 text-[#4D8DFF]">
                <vp.icon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{vp.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{vp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modules — comprehensive grid */}
      <section id="modules" className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#35D6C5]">Product modules</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A complete trade operating system</h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Twenty integrated modules covering the full trade lifecycle — from discovery to delivery,
              verification to settlement. Built for multinational procurement, supplier networks, and
              international sales organisations.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <div
                key={m.title}
                className="rounded-lg border border-border bg-card/40 p-4 hover:border-[#4D8DFF]/40 hover:bg-card/80 transition-colors"
              >
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#18253A] to-[#0E1626] text-[#4D8DFF]">
                  <m.icon className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs font-semibold text-foreground">{m.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#4D8DFF]">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From discovery to delivery, on one platform</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {workflow.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4D8DFF] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {i < workflow.length - 1 && (
                  <div className="h-px flex-1 bg-gradient-to-r from-[#4D8DFF]/40 to-transparent" />
                )}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buyer / supplier / rep split */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#35D6C5]">Built for every trade role</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A workspace for buyers, suppliers, and representatives</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {personas.map((p) => (
              <div key={p.role} className="rounded-lg border border-border bg-card/40 p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-[#4D8DFF]/20 to-[#35D6C5]/20 text-[#4D8DFF]">
                  <p.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{p.role}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{p.tagline}</p>
                <ul className="mt-4 space-y-2">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#34D399]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Copilot section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7BFF]">AI Copilot</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Sourcing copilot that turns intent into action</h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Describe a sourcing requirement in plain language. The AI Sourcing Copilot extracts the
              structured fields, flags missing specifications, drafts the RFQ, surfaces qualified suppliers,
              and prepares outreach — all under explicit human approval for consequential actions.
            </p>
            <ul className="mt-6 space-y-2.5">
              {aiFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#8B7BFF]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="gtos-panel gtos-glow overflow-hidden">
            <div className="border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#8B7BFF]" />
                <span className="text-xs font-medium text-foreground">AI Sourcing Copilot</span>
                <span className="ml-auto text-[10px] text-muted-foreground">Demo dialogue</span>
              </div>
            </div>
            <div className="space-y-3 p-4 text-xs">
              <div className="rounded-lg bg-muted/40 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">You</p>
                <p className="mt-1 text-foreground">
                  I need 5,000 industrial pumps delivered to Rotterdam within 60 days, with PED compliance
                  and a maximum landed-cost budget.
                </p>
              </div>
              <div className="rounded-lg border border-[#8B7BFF]/30 bg-[#8B7BFF]/5 p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-[#8B7BFF]">Copilot</p>
                <p className="mt-1 text-foreground/90">
                  Drafted RFQ with: <span className="text-[#35D6C5]">5,000 units</span>, <span className="text-[#35D6C5]">DAP Rotterdam</span>, <span className="text-[#35D6C5]">60-day lead</span>, <span className="text-[#35D6C5]">PED 2014/68/EU</span>. Three clarification questions before publishing:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Specify flow rate &amp; head pressure?</li>
                  <li>• Material preference (316L vs duplex)?</li>
                  <li>• Max budget range?</li>
                </ul>
                <p className="mt-2 text-foreground/90">
                  Top 3 qualified suppliers identified — <span className="text-[#4D8DFF]">RheinTech</span> (94 match), <span className="text-[#4D8DFF]">Meridian</span> (86), <span className="text-[#4D8DFF]">Tidewater</span> (81). Shall I create the RFQ and invite them?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust &amp; verification section */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="gtos-panel gtos-glow overflow-hidden">
                <div className="border-b border-border px-4 py-2.5">
                  <span className="text-xs font-medium text-foreground">Trade Passport — RheinTech Industries GmbH</span>
                </div>
                <div className="p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#4D8DFF]/20 to-[#35D6C5]/20 text-sm font-bold text-[#4D8DFF]">RT</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">RheinTech Industries GmbH</p>
                      <p className="text-[10px] text-muted-foreground">Stuttgart, Germany · Industrial Machinery</p>
                    </div>
                    <span className="ml-auto rounded border border-[#34D399]/30 bg-[#34D399]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#34D399]">Enhanced Verified</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Legal entity", value: "Confirmed", v: "ok" },
                      { label: "Sanctions screen", value: "Cleared", v: "ok" },
                      { label: "ISO 9001", value: "Valid", v: "ok" },
                      { label: "PED compliance", value: "Confirmed", v: "ok" },
                      { label: "Capacity audit", value: "Jan 2025", v: "ok" },
                      { label: "Reference customers", value: "4 verified", v: "ok" },
                    ].map((row) => (
                      <div key={row.label} className="rounded border border-border bg-card/40 p-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{row.label}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-[#34D399]">
                          <Check className="h-3 w-3" />
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4D8DFF]">Trust &amp; verification</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Trade Passport — a verified business profile you control</h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Verification is not a marketing label. Global Trade OS records what was checked, when it
                was checked, which source was used, and when re-verification is required. Self-reported
                information is always distinguished from verified facts.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Six verification levels — from Unverified to Enhanced Verification Complete.",
                  "Always display what was checked, by whom, and when it expires.",
                  "Correction, review, and appeal workflows for every verification case.",
                  "Portable Trade Passport — share selected fields with prospective partners.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#4D8DFF]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#35D6C5]">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plans for every stage of international growth</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Configurable plans — no hard-coded pricing throughout the application. Enterprise customers can
            negotiate custom entitlements, seats, and API quotas. Indicative pricing below.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg border p-5 ${
                tier.featured
                  ? "border-[#4D8DFF]/40 bg-card/60 gtos-glow"
                  : "border-border bg-card/40"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#4D8DFF] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                  Recommended
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tier.name}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{tier.price}</p>
              <p className="text-[11px] text-muted-foreground">{tier.period}</p>
              <p className="mt-3 text-xs text-muted-foreground">{tier.description}</p>
              <button
                onClick={() => setView("dashboard")}
                className={`mt-4 w-full rounded-md py-1.5 text-xs font-semibold transition-colors ${
                  tier.featured
                    ? "bg-[#4D8DFF] text-white hover:bg-[#3a7af0]"
                    : "border border-border text-foreground hover:border-[#4D8DFF]/40"
                }`}
              >
                {tier.cta}
              </button>
              <ul className="mt-4 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#34D399]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4D8DFF]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-10 space-y-2">
            {faqs.map((faq, i) => (
              <FaqItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 gtos-grid-bg opacity-30" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#4D8DFF]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="gtos-text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
            Step into the operating system for international trade.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Enter the live demo environment populated with fictional but realistic international
            buyers, suppliers, RFQs, representatives, and commission agreements.
          </p>
          <button
            onClick={() => setView("dashboard")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#4D8DFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(77,141,255,0.6)] hover:bg-[#3a7af0] transition-colors"
          >
            Enter the platform
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4D8DFF] to-[#35D6C5]">
                  <Globe2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">Global Trade OS</span>
              </div>
              <p className="mt-4 max-w-sm text-xs text-muted-foreground">
                The operating system for international trade — connected, verified, intelligent. Built
                for multinational procurement, supplier networks, and international sales organisations.
              </p>
              <p className="mt-4 text-[10px] text-muted-foreground/60">
                Demo environment. All companies, transactions, and metrics are illustrative and fictional.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Marketplace", "RFQ & Sourcing", "Representatives", "Commission Center", "AI Copilot"] },
              { title: "Solutions", links: ["Buyers", "Suppliers", "Country Representatives", "Service Partners", "Enterprise"] },
              { title: "Company", links: ["About", "Security & Trust", "Pricing", "Contact", "Documentation"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="text-[10px] text-muted-foreground/60">
              © 2026 Global Trade OS (demo). All content is illustrative and not a real business offer.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground/60">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-card/40">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-4 pb-3 text-xs leading-relaxed text-muted-foreground">{answer}</p>}
    </div>
  );
}

const valueProps = [
  {
    title: "Verified business relationships",
    description:
      "Discover companies that have completed structured verification — never present self-reported claims as proof of trust.",
    icon: ShieldCheck,
  },
  {
    title: "AI-powered sourcing & matching",
    description:
      "Explainable match scores with verified facts, inferences, and unknowns clearly distinguished. Always show why.",
    icon: Sparkles,
  },
  {
    title: "Country representative network",
    description:
      "Managed network of representatives connecting local demand with international supply, with auditable attribution.",
    icon: Network,
  },
  {
    title: "Transparent commission ledger",
    description:
      "Immutable, ledger-oriented commission system. Estimated → Earned → Approved → Payable → Paid, never silently overwritten.",
    icon: BadgeDollarSign,
  },
  {
    title: "Digital deal rooms",
    description:
      "Secure collaboration with version-controlled documents, audit history, and controlled access for each qualified opportunity.",
    icon: Boxes,
  },
  {
    title: "Trade intelligence & resilience",
    description:
      "Demand, supply, and route intelligence with confidence, source, and freshness. Plan alternative suppliers and routes.",
    icon: BarChart3,
  },
];

const modules = [
  { title: "Global Trade Marketplace", desc: "B2B opportunity discovery across products, services, manufacturing, distribution, and capacity.", icon: Store },
  { title: "Buyer & Supplier Portals", desc: "Dedicated workspaces for procurement, catalogue management, and trade pipeline coordination.", icon: Building2 },
  { title: "RFQ & Sourcing Engine", desc: "End-to-end RFQ workflow with configurable sourcing and structured offer comparison.", icon: FileText },
  { title: "AI Trade Matching", desc: "Explainable match scores, candidate ranking, missing-info flags, and recommended next actions.", icon: Workflow },
  { title: "AI Sourcing Copilot", desc: "Natural-language sourcing with structured outputs, clarification questions, and human approval.", icon: Sparkles },
  { title: "Country Representative Network", desc: "Coverage management, lead assignment, opportunity attribution, and CRM pipelines.", icon: Network },
  { title: "Commission Engine", desc: "Percentage, tiered, split, referral, and buyer/supplier-side fees with immutable audit trail.", icon: BadgeDollarSign },
  { title: "CRM & Deal Pipeline", desc: "Trace opportunities from initial discovery through negotiation, contract, and delivery.", icon: Briefcase },
  { title: "Digital Deal Rooms", desc: "Secure collaboration with version-controlled documents, milestones, and approval workflows.", icon: Boxes },
  { title: "Company Verification", desc: "Six-tier verification framework with documented checks and correction workflows.", icon: ShieldCheck },
  { title: "Trade Passport", desc: "Reusable, portable business profile you control — share selected fields with partners.", icon: FileCheck2 },
  { title: "Trade Intelligence", desc: "Demand, supply, route, and capacity intelligence with source, confidence, and freshness.", icon: BarChart3 },
  { title: "Landed-Cost Simulator", desc: "Scenario engine comparing product, freight, duty, insurance, and lead-time trade-offs.", icon: TrendingUp },
  { title: "Supply Chain Resilience", desc: "Dependency mapping, geographic concentration, alternative supplier recommendations.", icon: ShieldCheck },
  { title: "Service Partner Marketplace", desc: "Freight, customs, inspection, certification, and finance partners with service quotes.", icon: Truck },
  { title: "Capacity Exchange", desc: "Underutilised manufacturing, warehouse, freight, and contract-manufacturing capacity listings.", icon: Wrench },
  { title: "Document Intelligence", desc: "OCR, classification, validation, cross-document consistency, and expiration tracking.", icon: FileCheck2 },
  { title: "Trade Knowledge Graph", desc: "Relational model connecting companies, products, opportunities, deals, and documents.", icon: Network },
  { title: "Open Trade Network & APIs", desc: "ERP, CRM, logistics, signature, and verification integrations with webhooks and sandbox.", icon: Plug },
  { title: "Enterprise Workspaces", desc: "Role-based access with organisation isolation, audit trails, and configuration management.", icon: Lock },
];

const workflow = [
  { title: "Discover", desc: "Find verified buyers, suppliers, distributors, and trade opportunities through the marketplace and AI matching engine." },
  { title: "Qualify", desc: "Review Trade Passports, verification status, capabilities, references, and sanctions screening before engagement." },
  { title: "Negotiate", desc: "Run RFQs, compare quotations on configurable criteria, and collaborate in secure digital deal rooms." },
  { title: "Execute", desc: "Track contracts, orders, shipments, inspections, milestones, and commission events through to delivery." },
];

const personas = [
  {
    role: "For Buyers",
    tagline: "Procurement organisations, OEMs, and distributors sourcing internationally.",
    icon: Building2,
    benefits: [
      "Publish structured RFQs and invite qualified suppliers globally.",
      "Compare quotations on total landed cost, quality, and risk — not just price.",
      "Maintain preferred suppliers, track PO milestones, and review historical performance.",
    ],
  },
  {
    role: "For Suppliers",
    tagline: "Manufacturers, exporters, and contract manufacturers seeking international demand.",
    icon: Factory,
    benefits: [
      "Build a verified company and product catalogue with full Trade Passport.",
      "Receive targeted RFQ invitations matched to your capabilities.",
      "Manage quotations, sales pipeline, and production capacity through one workspace.",
    ],
  },
  {
    role: "For Representatives",
    tagline: "Country and industry representatives bridging local demand with global supply.",
    icon: Network,
    benefits: [
      "Apply for representative status with documented verification review.",
      "Receive leads with auditable attribution and territory protection.",
      "Manage commission agreements, payouts, and pipeline through a single ledger.",
    ],
  },
];

const aiFeatures = [
  "Natural-language sourcing — extract RFQ fields from plain-language requirements.",
  "Explainable matching with verified facts, inferences, and unknowns clearly distinguished.",
  "Quotation comparison, contract drafting assistance, and document extraction.",
  "Human approval required for any external commitment, payment, or contractual action.",
  "Graceful fallbacks when AI providers are unavailable — never block critical workflows.",
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month · 1 user",
    description: "For solo traders and small teams beginning international sourcing.",
    cta: "Get started",
    featured: false,
    features: ["Browse verified marketplace", "Up to 3 RFQs / month", "Basic Trade Passport", "Community support"],
  },
  {
    name: "Professional",
    price: "$199",
    period: "/ user / month",
    description: "For growing procurement teams and active suppliers.",
    cta: "Start trial",
    featured: false,
    features: ["Unlimited RFQs", "Advanced matching", "Deal rooms & documents", "Email support"],
  },
  {
    name: "Business",
    price: "$499",
    period: "/ user / month",
    description: "For established importers, exporters, and representative agencies.",
    cta: "Talk to sales",
    featured: true,
    features: ["All Professional features", "Commission engine & ledger", "AI Sourcing Copilot", "Trade intelligence", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    description: "For multinational organisations with custom compliance and integration needs.",
    cta: "Contact us",
    featured: false,
    features: ["Custom entitlements & SLA", "ERP / CRM integrations", "Dedicated representative network", "On-prem audit & SSO", "24/7 priority support"],
  },
];

const faqs = [
  {
    question: "Is Global Trade OS a marketplace, an ERP, or a CRM?",
    answer:
      "It is a trade operating system that combines elements of all three — a verified B2B marketplace, a sourcing and RFQ workflow engine, a trade-focused CRM, a commission ledger, and an integration layer for ERPs and external trade service providers. The unifying concept is a trusted digital environment for the full trade lifecycle.",
  },
  {
    question: "How does verification actually work?",
    answer:
      "Each verification level defines the exact checks required — legal entity, authorised representatives, sanctions screening, certifications, capacity audits, and references. The platform records what was checked, when, by which source, and when re-verification is required. Verification never claims to be complete unless the defined procedure has actually been completed.",
  },
  {
    question: "Can the AI agents sign contracts or transfer funds?",
    answer:
      "No. AI agents in Global Trade OS assist with research, drafting, comparison, and recommendation only. Any external commitment — sending a contract, accepting terms, transferring funds, approving a payment — requires explicit human approval. AI agents treat uploaded documents and external tool responses as untrusted data.",
  },
  {
    question: "How are commissions handled across multiple representatives?",
    answer:
      "Each commission agreement defines the eligible transaction, calculation basis, attribution rules, triggering event, and dispute resolution. Where multiple representatives participate in a single transaction, allocations are calculated according to explicit contractual rules and recorded as auditable ledger entries — never silently overwritten.",
  },
  {
    question: "Is the platform compliant with GDPR, sanctions, and trade regulations?",
    answer:
      "Global Trade OS is built with privacy-by-design principles and configurable compliance workflows for sanctions screening and restricted-party checks. However, exact legal obligations depend on parties, goods, jurisdictions, and transactions. We do not claim automatic worldwide compliance. Customers should obtain appropriate legal review for their specific use cases.",
  },
  {
    question: "Is this demo data based on real companies?",
    answer:
      "No. All companies, transactions, quotations, representatives, and statistics shown in this platform are entirely fictional and illustrative. They are designed to demonstrate platform capability only — never presented as real verified businesses or completed real-world transactions.",
  },
];
