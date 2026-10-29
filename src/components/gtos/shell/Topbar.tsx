"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store/app-store";
import { navItems } from "@/lib/data/navigation";
import {
  Search,
  Bell,
  Command,
  Menu,
  Plus,
  Sparkles,
  Globe2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";
import { Avatar } from "../shared/Primitives";

export function Topbar() {
  const { view, setView, setCommandOpen, toggleSidebar } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const currentItem = navItems.find((n) => n.id === view);

  // Keyboard shortcut: Cmd+K / Ctrl+K to open command palette
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useAppStore.getState().setCommandOpen(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm">
        <button
          onClick={toggleSidebar}
          className="hidden rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:block"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">
            {currentItem?.label ?? "Overview"}
          </h1>
          <span className="hidden text-xs text-muted-foreground/60 sm:inline">
            · {currentItem?.description}
          </span>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground hover:border-[#4D8DFF]/40 hover:bg-card/80 transition-colors sm:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search…</span>
          <kbd className="ml-1 inline-flex items-center gap-0.5 rounded border border-border px-1 py-0 text-[10px] text-muted-foreground">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>

        {/* Quick action */}
        <button
          onClick={() => setView("rfqs")}
          className="hidden items-center gap-1.5 rounded-md bg-[#4D8DFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3a7af0] transition-colors md:inline-flex"
        >
          <Plus className="h-3.5 w-3.5" />
          New RFQ
        </button>

        {/* AI Copilot shortcut */}
        <button
          onClick={() => setView("copilot")}
          className="flex items-center gap-1.5 rounded-md border border-[#8B7BFF]/40 bg-[#8B7BFF]/10 px-2.5 py-1.5 text-xs font-medium text-[#8B7BFF] hover:bg-[#8B7BFF]/15 transition-colors"
          aria-label="AI Copilot"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setUserOpen(false);
            }}
            className="relative rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#F45B6B]" />
          </button>
          {notifOpen && (
            <NotifDropdown onClose={() => setNotifOpen(false)} />
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-md border border-border bg-card/40 px-2 py-1 hover:border-[#4D8DFF]/40 hover:bg-card/80 transition-colors"
          >
            <Avatar initials="MD" size="sm" />
            <span className="hidden text-xs text-foreground lg:inline">M. van Dijk</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          {userOpen && <UserDropdown onClose={() => setUserOpen(false)} />}
        </div>
      </header>

      <CommandPalette />
    </>
  );
}

function NotifDropdown({ onClose }: { onClose: () => void }) {
  const notifs = [
    { id: 1, title: "New quotation received from RheinTech", time: "2h ago", type: "info" as const, unread: true },
    { id: 2, title: "Commission approved: $16,800 (Daniel Tan)", time: "4h ago", type: "success" as const, unread: true },
    { id: 3, title: "RFQ-2026-1147 closing in 3 days", time: "1d ago", type: "warning" as const, unread: true },
    { id: 4, title: "Red Sea route disruption — review active deals", time: "1d ago", type: "danger" as const, unread: false },
    { id: 5, title: "Meridian ISO 13485 certificate verified", time: "2d ago", type: "success" as const, unread: false },
  ];
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <p className="text-xs font-semibold text-foreground">Notifications</p>
          <button className="text-[10px] text-[#4D8DFF] hover:underline">Mark all read</button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifs.map((n) => (
            <button
              key={n.id}
              onClick={onClose}
              className={cn(
                "flex w-full items-start gap-2.5 border-b border-border/50 px-3 py-2 text-left hover:bg-muted/40 transition-colors",
                n.unread && "bg-[#4D8DFF]/5",
              )}
            >
              <span
                className={cn(
                  "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                  n.type === "info" && "bg-[#4D8DFF]",
                  n.type === "success" && "bg-[#34D399]",
                  n.type === "warning" && "bg-[#F2B441]",
                  n.type === "danger" && "bg-[#F45B6B]",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground">{n.title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function UserDropdown({ onClose }: { onClose: () => void }) {
  const setView = useAppStore((s) => s.setView);
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div className="border-b border-border px-3 py-2.5">
          <p className="text-xs font-semibold text-foreground">Marieke van Dijk</p>
          <p className="text-[10px] text-muted-foreground">Procurement Lead · Nordport Logistics</p>
        </div>
        <div className="p-1">
          {[
            { label: "My Profile", view: "settings" as ViewId },
            { label: "Workspace Settings", view: "settings" as ViewId },
            { label: "My Commission Center", view: "commissions" as ViewId },
            { label: "AI Copilot", view: "copilot" as ViewId },
            { label: "Integrations", view: "integrations" as ViewId },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setView(item.view);
                onClose();
              }}
              className="block w-full rounded px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="border-t border-border p-1">
          <button
            onClick={() => {
              setView("landing");
              onClose();
            }}
            className="block w-full rounded px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
