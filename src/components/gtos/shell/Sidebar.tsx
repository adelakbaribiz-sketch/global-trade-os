"use client";

import { useMemo, useState, useEffect } from "react";
import { useAppStore, type ViewId } from "@/lib/store/app-store";
import { navItems, navGroups } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Globe2, LogOut } from "lucide-react";

export function Sidebar() {
  const { view, setView, sidebarCollapsed, toggleSidebar } = useAppStore();
  const collapsed = sidebarCollapsed;

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#4D8DFF] to-[#35D6C5]">
          <Globe2 className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-foreground">Global Trade OS</p>
            <p className="truncate text-[10px] text-muted-foreground">Demo environment</p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="hidden flex-shrink-0 rounded p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground lg:block"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {navGroups.map((g) => {
          const items = navItems.filter((n) => n.group === g.group);
          return (
            <div key={g.group} className="mb-4">
              {!collapsed && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {g.label}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    active={view === item.id}
                    collapsed={collapsed}
                    onClick={() => setView(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer — user */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={() => setView("landing")}
          className={cn(
            "flex w-full items-center gap-2 rounded-md p-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
          {!collapsed && <span>Back to site</span>}
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: (typeof navItems)[number];
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
        collapsed && "justify-center",
        active
          ? "bg-[#4D8DFF]/10 text-[#4D8DFF]"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r bg-[#4D8DFF]" style={{ width: "2px" }} />
      )}
      <Icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-[#4D8DFF]" : "text-muted-foreground group-hover:text-foreground")} />
      {!collapsed && (
        <span className="flex-1 truncate text-left">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span
          className={cn(
            "rounded px-1 py-0 text-[10px] font-semibold",
            active ? "bg-[#4D8DFF]/20 text-[#4D8DFF]" : "bg-muted text-muted-foreground",
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
