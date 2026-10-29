"use client";

import { useAppStore } from "@/lib/store/app-store";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DashboardView } from "../views/DashboardView";
import { MarketplaceView } from "../views/MarketplaceView";
import { SuppliersView } from "../views/SuppliersView";
import { BuyersView } from "../views/BuyersView";
import { RFQsView } from "../views/RFQsView";
import { OpportunitiesView } from "../views/OpportunitiesView";
import { RepresentativesView } from "../views/RepresentativesView";
import { CRMView } from "../views/CRMView";
import { DealRoomsView } from "../views/DealRoomsView";
import { OrdersView } from "../views/OrdersView";
import { DocumentsView } from "../views/DocumentsView";
import { IntelligenceView } from "../views/IntelligenceView";
import { RiskView } from "../views/RiskView";
import { CommissionView } from "../views/CommissionView";
import { ServicePartnersView } from "../views/ServicePartnersView";
import { AICopilotView } from "../views/AICopilotView";
import { IntegrationsView } from "../views/IntegrationsView";
import { ReportsView } from "../views/ReportsView";
import { SettingsView } from "../views/SettingsView";
import { AdminView } from "../views/AdminView";
import { motion, AnimatePresence } from "framer-motion";

export function AppShell() {
  const view = useAppStore((s) => s.view);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="min-h-full"
            >
              {renderView(view)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function renderView(view: string) {
  switch (view) {
    case "dashboard": return <DashboardView />;
    case "marketplace": return <MarketplaceView />;
    case "suppliers": return <SuppliersView />;
    case "buyers": return <BuyersView />;
    case "rfqs": return <RFQsView />;
    case "opportunities": return <OpportunitiesView />;
    case "representatives": return <RepresentativesView />;
    case "crm": return <CRMView />;
    case "deals": return <DealRoomsView />;
    case "orders": return <OrdersView />;
    case "documents": return <DocumentsView />;
    case "intelligence": return <IntelligenceView />;
    case "risk": return <RiskView />;
    case "commissions": return <CommissionView />;
    case "services": return <ServicePartnersView />;
    case "copilot": return <AICopilotView />;
    case "integrations": return <IntegrationsView />;
    case "reports": return <ReportsView />;
    case "settings": return <SettingsView />;
    case "admin": return <AdminView />;
    default: return <DashboardView />;
  }
}
