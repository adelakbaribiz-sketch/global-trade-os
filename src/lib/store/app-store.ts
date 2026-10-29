import { create } from "zustand";

export type ViewId =
  | "landing"
  | "dashboard"
  | "marketplace"
  | "suppliers"
  | "buyers"
  | "rfqs"
  | "opportunities"
  | "representatives"
  | "crm"
  | "deals"
  | "orders"
  | "documents"
  | "intelligence"
  | "risk"
  | "commissions"
  | "services"
  | "copilot"
  | "integrations"
  | "reports"
  | "settings"
  | "admin";

interface AppState {
  view: ViewId;
  detailId?: string;
  commandOpen: boolean;
  sidebarCollapsed: boolean;
  setView: (v: ViewId) => void;
  openDetail: (v: ViewId, id: string) => void;
  closeDetail: () => void;
  setCommandOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: "landing",
  detailId: undefined,
  commandOpen: false,
  sidebarCollapsed: false,
  setView: (view) => set({ view, detailId: undefined }),
  openDetail: (view, id) => set({ view, detailId: id }),
  closeDetail: () => set({ detailId: undefined }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
}));
