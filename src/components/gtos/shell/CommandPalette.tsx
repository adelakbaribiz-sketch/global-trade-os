"use client";

import { useEffect, useState } from "react";
import { useAppStore, type ViewId } from "@/lib/store/app-store";
import { navItems } from "@/lib/data/navigation";
import { companies } from "@/lib/data/companies";
import { opportunities } from "@/lib/data/opportunities";
import { rfqs } from "@/lib/data/rfqs";
import { representatives } from "@/lib/data/representatives";
import { Search, ArrowRight, CornerDownLeft, Sparkles, FileText, Store, Network, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandResult {
  id: string;
  label: string;
  sublabel?: string;
  view: ViewId;
  detailId?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function CommandPalette() {
  const { commandOpen, setCommandOpen, openDetail, setView } = useAppStore();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  // Build all searchable results
  const allResults: CommandResult[] = [
    ...navItems.map((n) => ({
      id: `nav-${n.id}`,
      label: n.label,
      sublabel: n.description,
      view: n.id as ViewId,
      icon: n.icon,
    })),
    ...companies.map((c) => ({
      id: `co-${c.id}`,
      label: c.name,
      sublabel: `${c.type} · ${c.city}, ${c.country}`,
      view: (c.type === "Buyer" ? "buyers" : c.type === "Supplier" ? "suppliers" : c.type === "Service Partner" ? "services" : "suppliers") as ViewId,
      detailId: c.id,
      icon: Store,
    })),
    ...opportunities.map((o) => ({
      id: `opp-${o.id}`,
      label: o.title,
      sublabel: `${o.type} · ${o.postedBy}`,
      view: "marketplace" as ViewId,
      detailId: o.id,
      icon: Store,
    })),
    ...rfqs.map((r) => ({
      id: `rfq-${r.id}`,
      label: r.title,
      sublabel: `${r.reference} · ${r.buyerName}`,
      view: "rfqs" as ViewId,
      detailId: r.id,
      icon: FileText,
    })),
    ...representatives.map((rep) => ({
      id: `rep-${rep.id}`,
      label: rep.name,
      sublabel: `${rep.companyName} · ${rep.country}`,
      view: "representatives" as ViewId,
      detailId: rep.id,
      icon: Network,
    })),
  ];

  const filtered = useMemoFilter(allResults, query);

  function close() {
    setCommandOpen(false);
    setQuery("");
    setActiveIdx(0);
  }

  function select(item?: CommandResult) {
    if (!item) return;
    if (item.detailId) {
      openDetail(item.view, item.detailId);
    } else {
      setView(item.view);
    }
    close();
  }

  useEffect(() => {
    if (commandOpen) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          close();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIdx((i) => Math.max(0, i - 1));
        } else if (e.key === "Enter") {
          e.preventDefault();
          select(filtered[activeIdx]);
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandOpen, filtered, activeIdx]);

  if (!commandOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Search opportunities, suppliers, RFQs, representatives…"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="rounded border border-border px-1.5 py-0 text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-96 overflow-y-auto p-1">
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-xs text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => select(item)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors",
                  i === activeIdx ? "bg-[#4D8DFF]/10" : "hover:bg-muted/40",
                )}
              >
                <Icon className={cn("h-3.5 w-3.5 flex-shrink-0", i === activeIdx ? "text-[#4D8DFF]" : "text-muted-foreground")} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">{item.label}</p>
                  {item.sublabel && <p className="truncate text-[10px] text-muted-foreground">{item.sublabel}</p>}
                </div>
                {i === activeIdx && <CornerDownLeft className="h-3 w-3 text-[#4D8DFF]" />}
              </button>
            );
          })}
        </div>
        <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>{filtered.length} results</span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#8B7BFF]" />
              Tip: ask the AI Copilot for natural-language sourcing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function useMemoFilter(results: CommandResult[], q: string): CommandResult[] {
  const query = q.toLowerCase().trim();
  if (!query) return results.slice(0, 8);
  return results
    .filter((r) => {
      const haystack = `${r.label} ${r.sublabel ?? ""}`.toLowerCase();
      return haystack.includes(query);
    })
    .slice(0, 20);
}
