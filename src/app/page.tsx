"use client";

import { useAppStore } from "@/lib/store/app-store";
import { LandingPage } from "@/components/gtos/landing/LandingPage";
import { AppShell } from "@/components/gtos/shell/AppShell";

export default function Home() {
  const view = useAppStore((s) => s.view);

  if (view === "landing") return <LandingPage />;
  return <AppShell />;
}
// rebuilt at Thu Oct 29 15:28:02 UTC 2026
