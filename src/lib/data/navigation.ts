import {
  LayoutDashboard,
  Store,
  Factory,
  Users,
  FileText,
  Target,
  Network,
  Briefcase,
  Boxes,
  Truck,
  FolderClosed,
  BarChart3,
  ShieldAlert,
  BadgeDollarSign,
  Wrench,
  Sparkles,
  Plug,
  FileBarChart,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { ViewId } from "@/lib/store/app-store";

export interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
  group: "core" | "trade" | "intelligence" | "system";
}

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard, description: "Command center dashboard", group: "core" },
  { id: "marketplace", label: "Global Marketplace", icon: Store, description: "Discover trade opportunities", group: "core" },
  { id: "suppliers", label: "Find Suppliers", icon: Factory, description: "Verified supplier directory", group: "core" },
  { id: "buyers", label: "Find Buyers", icon: Users, description: "Verified buyer directory", group: "core" },
  { id: "rfqs", label: "RFQs & Sourcing", icon: FileText, description: "Request-for-quotation workflow", badge: "4", group: "trade" },
  { id: "opportunities", label: "Opportunities", icon: Target, description: "Leads and trade opportunities", badge: "12", group: "trade" },
  { id: "representatives", label: "Representatives", icon: Network, description: "Country rep network", group: "trade" },
  { id: "crm", label: "CRM", icon: Briefcase, description: "Trade-focused CRM", group: "trade" },
  { id: "deals", label: "Deal Rooms", icon: Boxes, description: "Secure deal collaboration", badge: "3", group: "trade" },
  { id: "orders", label: "Orders & Deliveries", icon: Truck, description: "PO and shipment tracking", group: "trade" },
  { id: "documents", label: "Trade Documents", icon: FolderClosed, description: "Document intelligence", group: "trade" },
  { id: "intelligence", label: "Trade Intelligence", icon: BarChart3, description: "Demand, supply & route intel", group: "intelligence" },
  { id: "risk", label: "Risk & Resilience", icon: ShieldAlert, description: "Risk indicators & mitigation", group: "intelligence" },
  { id: "commissions", label: "Commission Center", icon: BadgeDollarSign, description: "Agreements & ledger", badge: "$166K", group: "intelligence" },
  { id: "services", label: "Service Partners", icon: Wrench, description: "Logistics, inspection & finance", group: "intelligence" },
  { id: "copilot", label: "AI Copilot", icon: Sparkles, description: "Sourcing & research assistant", group: "intelligence" },
  { id: "integrations", label: "Integrations", icon: Plug, description: "ERP, CRM, document providers", group: "system" },
  { id: "reports", label: "Reports", icon: FileBarChart, description: "Analytics & exports", group: "system" },
  { id: "settings", label: "Settings", icon: Settings, description: "Workspace & preferences", group: "system" },
  { id: "admin", label: "Administration", icon: ShieldCheck, description: "Verification & audit", group: "system" },
];

export const navGroups: { group: NavItem["group"]; label: string }[] = [
  { group: "core", label: "Core" },
  { group: "trade", label: "Trade Operations" },
  { group: "intelligence", label: "Intelligence & Revenue" },
  { group: "system", label: "System" },
];
