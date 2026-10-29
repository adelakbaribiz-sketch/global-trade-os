"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bot,
  User,
  ChevronRight,
  Clock,
  ShieldCheck,
  Search,
  TrendingUp,
  Network,
} from "lucide-react";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { SectionHeader } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { useAppStore } from "@/lib/store/app-store";
import { companies } from "@/lib/data/companies";
import { opportunities } from "@/lib/data/opportunities";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  blocks?: ChatBlock[];
}

interface ChatBlock {
  type: "rfq-draft" | "supplier-match" | "clarification" | "next-action" | "warning";
  title: string;
  items?: { label: string; value: string; status?: "match" | "partial" | "gap" | "info" }[];
  actions?: { label: string; variant: "primary" | "ghost"; view?: string }[];
}

const quickPrompts = [
  { label: "Source 5,000 industrial pumps", text: "I need 5,000 industrial centrifugal pumps delivered to Rotterdam within 60 days, with PED compliance and a maximum landed-cost budget.", icon: Search },
  { label: "Find medical PCB contract manufacturer", text: "Find a contract manufacturer for 50,000 medical device PCB assemblies per year, ISO 13485 and IPC-A-610 Class 3 required, delivered to UK.", icon: Network },
  { label: "Compare steel fabrication suppliers", text: "Compare suppliers for EN 1090 structural steel fabrications for an energy infrastructure project in the GCC region.", icon: TrendingUp },
  { label: "Analyze Red Sea route impact", text: "How does the current Red Sea routing disruption affect my active Asia-EU shipments? Recommend mitigation steps.", icon: AlertTriangle },
];

const agentCapabilities = [
  { name: "Trade Requirement Analyst", icon: FileText, desc: "Extract structured fields from natural-language requirements" },
  { name: "Supplier Discovery Agent", icon: Search, desc: "Surface qualified suppliers matched to capability and verification" },
  { name: "Supplier Qualification Assistant", icon: ShieldCheck, desc: "Verify certifications, capacity, references, sanctions" },
  { name: "RFQ Preparation Agent", icon: FileText, desc: "Draft structured RFQ with all required fields" },
  { name: "Quotation Comparison Agent", icon: TrendingUp, desc: "Weighted scoring across cost, quality, risk, delivery" },
  { name: "Representative Matching Agent", icon: Network, desc: "Connect buyers with country reps by territory and industry" },
  { name: "Trade Document Assistant", icon: FileText, desc: "OCR, classification, cross-document consistency" },
  { name: "Contract Drafting Assistant", icon: FileText, desc: "Generate draft contract clauses with review queue" },
  { name: "Market Intelligence Agent", icon: TrendingUp, desc: "Demand, supply, route, and capacity alerts" },
  { name: "Logistics Planning Assistant", icon: TrendingUp, desc: "Route options, landed-cost scenarios, lead-time sensitivity" },
  { name: "Trade Risk Assistant", icon: AlertTriangle, desc: "Supplier dependency, geographic concentration, sanctions" },
  { name: "Follow-up & CRM Assistant", icon: Clock, desc: "Tasks, reminders, meeting summaries, next actions" },
];

export function AICopilotView() {
  const setView = useAppStore((s) => s.setView);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hi Marieke. I'm the AI Sourcing Copilot — I help you turn business requirements into structured sourcing workflows. I can draft RFQs, surface qualified suppliers, compare quotations, and prepare outreach — but every consequential action requires your explicit approval. How can I help?",
      timestamp: nowTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isThinking]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const reply = generateReply(text);
      setMessages((prev) => [...prev, reply]);
      setIsThinking(false);
    }, 1100);
  }

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B7BFF]" /> AI Sourcing Copilot
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Specialized AI agents for sourcing, qualification, comparison, and trade intelligence — under human approval for every consequential action.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main chat panel */}
        <div className="lg:col-span-2">
          <PageCard padded={false} className="flex h-[640px] flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#8B7BFF]/15 text-[#8B7BFF]">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Sourcing Copilot</p>
                  <p className="text-[10px] text-muted-foreground">Orchestrator · 12 specialized agents</p>
                </div>
              </div>
              <StatusBadge variant="success" dot>Online</StatusBadge>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} onAction={(view) => setView(view as any)} />
                ))}
                {isThinking && (
                  <div className="flex gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#8B7BFF]/15 text-[#8B7BFF]">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-lg rounded-tl-none border border-[#8B7BFF]/30 bg-[#8B7BFF]/5 p-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B7BFF] pulse-dot" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B7BFF] pulse-dot" style={{ animationDelay: "300ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B7BFF] pulse-dot" style={{ animationDelay: "600ms" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              {messages.length <= 1 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {quickPrompts.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => send(p.text)}
                      className="flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-[#8B7BFF]/40 hover:text-foreground transition-colors"
                    >
                      <p.icon className="h-3 w-3 text-[#8B7BFF]" />
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Describe a sourcing requirement, ask about suppliers, or request an analysis…"
                  className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#8B7BFF]/50 focus:outline-none"
                  rows={2}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || isThinking}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-[#8B7BFF] text-white hover:bg-[#7266e6] disabled:opacity-40 disabled:hover:bg-[#8B7BFF] transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground/60">
                AI agents never sign contracts, transfer funds, or make binding commitments without your approval.
              </p>
            </div>
          </PageCard>
        </div>

        {/* Right sidebar: agents + safety */}
        <div className="space-y-4">
          <PageCard>
            <SectionHeader title="Specialized agents" subtitle="12 orchestrated agents" />
            <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {agentCapabilities.map((agent) => (
                <div key={agent.name} className="flex items-start gap-2 rounded-md border border-border bg-background/40 p-2 hover:border-[#8B7BFF]/40 transition-colors">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[#8B7BFF]/10 text-[#8B7BFF]">
                    <agent.icon className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium text-foreground">{agent.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>

          <PageCard className="border-[#F2B441]/30 bg-[#F2B441]/5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F2B441]" />
              <div>
                <p className="text-xs font-semibold text-foreground">Human-in-the-loop safety</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-muted-foreground">
                  <li>• Every consequential action requires your approval</li>
                  <li>• Documents &amp; external responses are untrusted data</li>
                  <li>• AI cannot override system permissions</li>
                  <li>• Full audit log of every agent step</li>
                </ul>
              </div>
            </div>
          </PageCard>

          <PageCard>
            <SectionHeader title="Recent AI jobs" />
            <div className="space-y-2">
              {[
                { id: "aj-1", title: "Sourcing copilot — pump RFQ draft", agent: "RFQ Prep", status: "Complete", time: "2h ago" },
                { id: "aj-2", title: "Supplier match — Elysian medical PCB", agent: "Discovery", status: "Complete", time: "4h ago" },
                { id: "aj-3", title: "Quotation comparison — RFQ-1142", agent: "Comparison", status: "Awaiting review", time: "1d ago" },
                { id: "aj-4", title: "Route disruption analysis — Asia-EU", agent: "Logistics", status: "Complete", time: "1d ago" },
              ].map((job) => (
                <div key={job.id} className="rounded-md border border-border bg-background/40 p-2">
                  <p className="text-[11px] font-medium text-foreground">{job.title}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{job.agent} · {job.time}</span>
                    <StatusBadge variant={job.status === "Complete" ? "success" : "warning"} dot>{job.status}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>
        </div>
      </div>
    </PageContainer>
  );
}

function MessageBubble({ msg, onAction }: { msg: ChatMessage; onAction: (view?: string) => void }) {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2.5 justify-end"
      >
        <div className="max-w-[80%] rounded-lg rounded-tr-none bg-[#4D8DFF] px-3 py-2 text-xs text-white">
          <p>{msg.content}</p>
          <p className="mt-1 text-[9px] opacity-70">{msg.timestamp}</p>
        </div>
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#4D8DFF]/15 text-[#4D8DFF]">
          <User className="h-3.5 w-3.5" />
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5"
    >
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#8B7BFF]/15 text-[#8B7BFF]">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[85%] flex-1">
        <div className="rounded-lg rounded-tl-none border border-[#8B7BFF]/30 bg-[#8B7BFF]/5 px-3 py-2">
          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">{msg.content}</p>
          <p className="mt-1 text-[9px] text-muted-foreground">{msg.timestamp}</p>
        </div>

        {msg.blocks?.map((block, i) => (
          <BlockCard key={i} block={block} onAction={onAction} />
        ))}
      </div>
    </motion.div>
  );
}

function BlockCard({ block, onAction }: { block: ChatBlock; onAction: (view?: string) => void }) {
  const blockStyles: Record<ChatBlock["type"], string> = {
    "rfq-draft": "border-[#4D8DFF]/30 bg-[#4D8DFF]/5",
    "supplier-match": "border-[#35D6C5]/30 bg-[#35D6C5]/5",
    "clarification": "border-[#F2B441]/30 bg-[#F2B441]/5",
    "next-action": "border-[#8B7BFF]/30 bg-[#8B7BFF]/5",
    "warning": "border-[#F45B6B]/30 bg-[#F45B6B]/5",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`mt-2 rounded-md border p-3 ${blockStyles[block.type]}`}
    >
      <p className="text-[11px] font-semibold text-foreground">{block.title}</p>
      {block.items && (
        <div className="mt-2 space-y-1.5">
          {block.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px]">
              {item.status === "match" && <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-[#34D399]" />}
              {item.status === "partial" && <AlertTriangle className="h-3 w-3 flex-shrink-0 text-[#F2B441]" />}
              {item.status === "gap" && <AlertTriangle className="h-3 w-3 flex-shrink-0 text-[#F45B6B]" />}
              {!item.status && <ChevronRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />}
              <span className="text-muted-foreground">{item.label}:</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {block.actions && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {block.actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onAction(action.view)}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                action.variant === "primary"
                  ? "bg-[#4D8DFF] text-white hover:bg-[#3a7af0]"
                  : "border border-border text-foreground hover:border-[#4D8DFF]/40"
              }`}
            >
              {action.label}
              <ArrowRight className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function generateReply(text: string): ChatMessage {
  const t = text.toLowerCase();
  if (t.includes("pump") || t.includes("rotterdam")) {
    return {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: `Got it. I've extracted the structured fields from your request, drafted RFQ-2026-1142 with all required specifications, and identified 3 qualified suppliers. Top match: RheinTech Industries (94) — enhanced verified, PED 2014/68/EU confirmed, production capacity audited (Jan 2025).`,
      timestamp: nowTime(),
      blocks: [
        {
          type: "rfq-draft",
          title: "RFQ draft created — RFQ-2026-1142",
          items: [
            { label: "Product", value: "Centrifugal process pumps (stainless steel, 75 kW)", status: "match" },
            { label: "Quantity", value: "5,000 units", status: "match" },
            { label: "Delivery", value: "DAP Rotterdam, Netherlands", status: "match" },
            { label: "Lead time", value: "60 days or less", status: "match" },
            { label: "Compliance", value: "PED 2014/68/EU, ISO 9001, EN 10204 3.1", status: "match" },
            { label: "Sourcing type", value: "Public (qualified suppliers)", status: "info" },
          ],
          actions: [
            { label: "Open RFQ", variant: "primary", view: "rfqs" },
            { label: "Edit draft", variant: "ghost" },
          ],
        },
        {
          type: "clarification",
          title: "3 clarification questions before publishing",
          items: [
            { label: "1", value: "Specify flow rate & head pressure (e.g., >= 280 m3/h @ 60 m)?", status: "partial" },
            { label: "2", value: "Material preference — AISI 316L vs duplex stainless?", status: "partial" },
            { label: "3", value: "Maximum landed-cost budget per unit?", status: "gap" },
          ],
        },
        {
          type: "supplier-match",
          title: "Top 3 qualified supplier matches",
          items: [
            { label: "1. RheinTech (DE)", value: "Match 94 · $18M vol · 4h response · Enhanced verified", status: "match" },
            { label: "2. Meridian (SG)", value: "Match 86 · $26M vol · 3h response · Enhanced verified", status: "partial" },
            { label: "3. Tidewater (US)", value: "Match 81 · $16M vol · 8h response · Enhanced verified", status: "partial" },
          ],
          actions: [
            { label: "Invite all 3", variant: "primary", view: "rfqs" },
            { label: "Compare side-by-side", variant: "ghost", view: "suppliers" },
          ],
        },
        {
          type: "next-action",
          title: "Recommended next actions",
          items: [
            { label: "1", value: "Answer 3 clarification questions", status: "info" },
            { label: "2", value: "Publish RFQ-2026-1142 with invited suppliers", status: "info" },
            { label: "3", value: "Set reminder to follow up in 72h", status: "info" },
          ],
          actions: [
            { label: "Publish RFQ", variant: "primary", view: "rfqs" },
            { label: "Save draft", variant: "ghost" },
          ],
        },
      ],
    };
  }
  if (t.includes("medical") || t.includes("pcb") || t.includes("iso 13485")) {
    return {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: `Found 1 ideal partner: Meridian Manufacturing Pte. Ltd. (Singapore) — ISO 13485, IPC-A-610 Class 3, conflict-minerals reporting in place. Capacity: 25,000 PCB assemblies/week across 5 SMT lanes. Pilot batch of 1,000 pcs within 4 weeks.`,
      timestamp: nowTime(),
      blocks: [
        {
          type: "supplier-match",
          title: "Best match — Meridian Manufacturing",
          items: [
            { label: "Quality", value: "ISO 13485 + IPC-A-610 Class 3", status: "match" },
            { label: "Traceability", value: "3TG conflict-minerals reporting", status: "match" },
            { label: "Capacity", value: "25,000 assemblies/week (5 SMT lanes)", status: "match" },
            { label: "References", value: "Medical device customers confirmed", status: "match" },
            { label: "Geography", value: "Singapore — ocean transit ~28 days to UK", status: "partial" },
          ],
          actions: [
            { label: "View profile", variant: "primary", view: "suppliers" },
            { label: "Draft RFQ", variant: "ghost", view: "rfqs" },
          ],
        },
      ],
    };
  }
  if (t.includes("red sea") || t.includes("route") || t.includes("disruption")) {
    return {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: `Current Red Sea routing disruption continues to affect Asia-EU cargo via Cape of Good Hope rerouting. Verified carrier data: +8-12 day transit extension vs baseline; FCL rates elevated ~35%. 3 of your active deals use affected routes.`,
      timestamp: nowTime(),
      blocks: [
        {
          type: "warning",
          title: "Risk to active deals",
          items: [
            { label: "PO-2026-0061", value: "Singapore to Cleveland (via LA) — Not affected", status: "match" },
            { label: "PO-2026-0074", value: "Houston to Rotterdam — Not affected (trans-Atlantic)", status: "match" },
            { label: "PO-2026-0089", value: "Singapore to UK (via Suez) — AFFECTED · +10 days", status: "gap" },
          ],
        },
        {
          type: "next-action",
          title: "Recommended mitigation",
          items: [
            { label: "1", value: "Pre-position inventory via air freight for PO-2026-0089 pilot batch", status: "info" },
            { label: "2", value: "Update landed-cost simulation with current freight benchmark", status: "info" },
            { label: "3", value: "Review backup suppliers in alternative geography (Malaysia/Mexico)", status: "info" },
          ],
          actions: [
            { label: "Open risk center", variant: "primary", view: "risk" },
            { label: "View orders", variant: "ghost", view: "orders" },
          ],
        },
      ],
    };
  }
  if (t.includes("steel") || t.includes("en 1090") || t.includes("fabrication")) {
    return {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: `For EN 1090 EXC3 structural steel fabrications in the GCC region, I recommend comparing 2 verified suppliers: Vega Industries (UK) and 1 alternate from shortlist. Both have CE marking and BS EN ISO 3834 welding quality.`,
      timestamp: nowTime(),
      blocks: [
        {
          type: "supplier-match",
          title: "Verified suppliers",
          items: [
            { label: "Vega Industries (UK)", value: "EN 1090 EXC3 · ISO 3834 · Enhanced verified · $7.6M vol", status: "match" },
            { label: "Backup (Tidewater US)", value: "AS9100D · ITAR · Could supply structural sub-assemblies", status: "partial" },
          ],
          actions: [
            { label: "Open RFQ-1153", variant: "primary", view: "rfqs" },
            { label: "Compare suppliers", variant: "ghost", view: "suppliers" },
          ],
        },
      ],
    };
  }
  return {
    id: `a-${Date.now()}`,
    role: "assistant",
    content: `I can help with that. I have access to ${opportunities.length} open opportunities, ${companies.length} verified companies, and 12 specialized agents. Tell me more about what you'd like to source, compare, or analyze — or pick one of the quick prompts above to see a worked example.`,
    timestamp: nowTime(),
  };
}
