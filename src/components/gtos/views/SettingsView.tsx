"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Key,
  Globe,
  Palette,
  Save,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Chrome,
  Apple,
} from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { PageContainer, PageCard } from "@/components/gtos/shared/PageContainer";
import { SectionHeader, Avatar } from "@/components/gtos/shared/Primitives";
import { StatusBadge } from "@/components/gtos/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const sessions = [
  { id: "s-1", device: "MacBook Pro · Chrome", location: "Amsterdam, NL", ip: "84.105.x.x", lastActive: "Active now", icon: Chrome, current: true },
  { id: "s-2", device: "iPhone 15 · Safari", location: "Amsterdam, NL", ip: "84.105.x.x", lastActive: "2 hours ago", icon: Apple, current: false },
  { id: "s-3", device: "Office desktop · Edge", location: "Rotterdam, NL", ip: "94.142.x.x", lastActive: "1 day ago", icon: Monitor, current: false },
];

const loginActivity = [
  { id: "l-1", timestamp: "2026-10-26 14:23", action: "Sign in", target: "—", ip: "84.105.x.x", result: "Success" },
  { id: "l-2", timestamp: "2026-10-26 09:11", action: "Sign in", target: "—", ip: "84.105.x.x", result: "Success" },
  { id: "l-3", timestamp: "2026-10-25 22:04", action: "Sign out", target: "—", ip: "84.105.x.x", result: "Success" },
  { id: "l-4", timestamp: "2026-10-25 18:32", action: "Failed sign in", target: "—", ip: "203.0.113.x", result: "Failed (wrong password)" },
  { id: "l-5", timestamp: "2026-10-25 18:31", action: "Failed sign in", target: "—", ip: "203.0.113.x", result: "Failed (wrong password)" },
  { id: "l-6", timestamp: "2026-10-25 14:09", action: "API key rotated", target: "production-read-key", ip: "84.105.x.x", result: "Success" },
];

const notificationPrefs = [
  { id: "n-1", label: "New quotation alerts", description: "Email + in-app when a supplier submits a quotation on your RFQ", on: true },
  { id: "n-2", label: "RFQ status changes", description: "Get notified when RFQs move between stages (Published → Evaluation → Awarded)", on: true },
  { id: "n-3", label: "Commission approvals", description: "Alert when a commission moves from Estimated → Earned → Approved", on: true },
  { id: "n-4", label: "Risk alerts", description: "Immediate alert on new high-severity risk indicators affecting your deals", on: true },
  { id: "n-5", label: "Weekly digest", description: "Monday 06:00 UTC summary of last week's trade activity", on: false },
  { id: "n-6", label: "Product updates", description: "Release notes and new feature announcements (monthly)", on: false },
];

const timezones = ["Europe/Amsterdam", "Europe/London", "Europe/Berlin", "Asia/Singapore", "Asia/Dubai", "America/New_York", "America/Los_Angeles"];
const languages = ["English", "Deutsch", "Nederlands", "中文", "العربية", "Français"];

function loginResultVariant(r: string) {
  if (r.startsWith("Success")) return "success" as const;
  return "danger" as const;
}

export function SettingsView() {
  const setView = useAppStore((s) => s.setView);
  const [active, setActive] = useState("profile");
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    notificationPrefs.reduce((acc, p) => ({ ...acc, [p.id]: p.on }), {})
  );
  const [fullName, setFullName] = useState("Marieke van Dijk");
  const [email, setEmail] = useState("m.vandijk@nordport.example.com");
  const [jobTitle, setJobTitle] = useState("Procurement Lead");
  const [phone, setPhone] = useState("+31 6 1234 5678");
  const [timezone, setTimezone] = useState("Europe/Amsterdam");
  const [language, setLanguage] = useState("English");

  function togglePref(id: string) {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
  }

  return (
    <PageContainer className="space-y-5">
      <SectionHeader
        title="Settings"
        subtitle="Workspace, profile, security, and preferences"
        actions={
          <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]" onClick={() => setView("admin")}>
            <Shield className="h-3.5 w-3.5" /> Admin
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <PageCard className="lg:col-span-3 lg:sticky lg:top-4 h-fit" padded={false}>
          <nav className="flex flex-col p-2">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-[#4D8DFF]/10 text-[#4D8DFF] font-medium"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </button>
              );
            })}
          </nav>
        </PageCard>

        <div className="lg:col-span-9 space-y-4">
          {active === "profile" && (
            <>
              <PageCard>
                <SectionHeader
                  title="Profile"
                  subtitle="Your personal information and contact details"
                  actions={<Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]"><Save className="h-3.5 w-3.5" /> Save changes</Button>}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                    <Avatar initials="MD" size="lg" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{fullName}</p>
                      <p className="text-xs text-muted-foreground">{jobTitle} · Nordport Logistics B.V.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">Change avatar</Button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Full name</label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" type="email" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Job title</label>
                    <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Timezone</label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Language preference</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PageCard>

              <PageCard>
                <SectionHeader
                  title="Security"
                  subtitle="Two-factor authentication and active sessions"
                  actions={<StatusBadge variant="success" dot>2FA Enabled</StatusBadge>}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#34D399]" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                          <p className="text-xs text-muted-foreground">Authenticator app · last verified 2h ago</p>
                        </div>
                      </div>
                      <StatusBadge variant="success">Enabled</StatusBadge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 h-8">Manage 2FA</Button>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-[#4D8DFF]" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Active sessions</p>
                          <p className="text-xs text-muted-foreground">{sessions.length} devices signed in</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">Sign out all</Button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {sessions.map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-foreground">{s.device}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">{s.location}</p>
                            <p className="text-[10px] text-muted-foreground/70">{s.lastActive}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent login activity</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Timestamp</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Action</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Target</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">IP</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginActivity.map((l) => (
                        <TableRow key={l.id} className="border-border">
                          <TableCell className="text-xs tabular-nums text-muted-foreground">{l.timestamp}</TableCell>
                          <TableCell className="text-xs text-foreground">{l.action}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{l.target}</TableCell>
                          <TableCell className="text-xs tabular-nums text-muted-foreground">{l.ip}</TableCell>
                          <TableCell>
                            <StatusBadge variant={loginResultVariant(l.result)}>
                              {l.result.startsWith("Success") ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                              {l.result}
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </PageCard>
            </>
          )}

          {active === "notifications" && (
            <PageCard>
              <SectionHeader
                title="Notification Preferences"
                subtitle="Choose what you get notified about and how"
                actions={<Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]"><Save className="h-3.5 w-3.5" /> Save preferences</Button>}
              />
              <div className="space-y-3">
                {notificationPrefs.map((n, idx) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="flex items-center justify-between rounded-lg border border-border bg-card/40 p-3 hover:border-[#4D8DFF]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-md ${prefs[n.id] ? "bg-[#4D8DFF]/10" : "bg-muted"}`}>
                        {n.id === "n-1" && <Mail className={`h-3.5 w-3.5 ${prefs[n.id] ? "text-[#4D8DFF]" : "text-muted-foreground"}`} />}
                        {(n.id === "n-2" || n.id === "n-3") && <CheckCircle2 className={`h-3.5 w-3.5 ${prefs[n.id] ? "text-[#4D8DFF]" : "text-muted-foreground"}`} />}
                        {n.id === "n-4" && <AlertTriangle className={`h-3.5 w-3.5 ${prefs[n.id] ? "text-[#F45B6B]" : "text-muted-foreground"}`} />}
                        {(n.id === "n-5" || n.id === "n-6") && <Bell className={`h-3.5 w-3.5 ${prefs[n.id] ? "text-[#4D8DFF]" : "text-muted-foreground"}`} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.description}</p>
                      </div>
                    </div>
                    <Switch checked={prefs[n.id]} onCheckedChange={() => togglePref(n.id)} />
                  </motion.div>
                ))}
              </div>
            </PageCard>
          )}

          {active === "organization" && (
            <PageCard>
              <SectionHeader title="Organization" subtitle="Workspace-wide configuration" />
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Organization name</label>
                  <Input defaultValue="Nordport Logistics B.V." className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Trade licence / VAT</label>
                  <Input defaultValue="NL852749321B01" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Default incoterms</label>
                  <Select defaultValue="DAP">
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["EXW", "FCA", "FOB", "CIP", "CIF", "DAP", "DDP"].map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]"><Save className="h-3.5 w-3.5" /> Save</Button>
              </div>
            </PageCard>
          )}

          {active === "security" && (
            <PageCard>
              <SectionHeader title="Security" subtitle="Password, 2FA, and session management" />
              <p className="text-sm text-muted-foreground">Security configuration is shown in the Profile tab. Switch to Profile to view full security panel.</p>
              <Button variant="outline" size="sm" className="mt-3 h-8" onClick={() => setActive("profile")}>View security panel</Button>
            </PageCard>
          )}

          {active === "billing" && (
            <PageCard>
              <SectionHeader title="Billing" subtitle="Plan, invoices, and payment methods" />
              <div className="rounded-lg border border-[#4D8DFF]/30 bg-[#4D8DFF]/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Enterprise — Multi-region</p>
                    <p className="text-xs text-muted-foreground">Billed annually · renews 2027-03-01</p>
                  </div>
                  <StatusBadge variant="primary" dot>Active</StatusBadge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 h-8">Manage billing</Button>
            </PageCard>
          )}

          {active === "api-keys" && (
            <PageCard>
              <SectionHeader
                title="API Keys"
                subtitle="Programmatic access tokens"
                actions={<Button size="sm" className="h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]"><Key className="h-3.5 w-3.5" /> Generate key</Button>}
              />
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Label</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Prefix</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Scopes</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Last used</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-border">
                    <TableCell className="text-sm text-foreground">Production read</TableCell>
                    <TableCell className="text-xs tabular-nums text-muted-foreground">gtos_live_•••4f2a</TableCell>
                    <TableCell className="text-xs text-muted-foreground">read:deals, read:rfqs</TableCell>
                    <TableCell className="text-xs text-muted-foreground">14 min ago</TableCell>
                    <TableCell><StatusBadge variant="success">Active</StatusBadge></TableCell>
                  </TableRow>
                  <TableRow className="border-border">
                    <TableCell className="text-sm text-foreground">Webhook signer</TableCell>
                    <TableCell className="text-xs tabular-nums text-muted-foreground">gtos_live_•••91c3</TableCell>
                    <TableCell className="text-xs text-muted-foreground">webhook:sign</TableCell>
                    <TableCell className="text-xs text-muted-foreground">2 days ago</TableCell>
                    <TableCell><StatusBadge variant="success">Active</StatusBadge></TableCell>
                  </TableRow>
                  <TableRow className="border-border">
                    <TableCell className="text-sm text-foreground">Sandbox</TableCell>
                    <TableCell className="text-xs tabular-nums text-muted-foreground">gtos_test_•••0b8e</TableCell>
                    <TableCell className="text-xs text-muted-foreground">read:*, write:rfqs</TableCell>
                    <TableCell className="text-xs text-muted-foreground">5 days ago</TableCell>
                    <TableCell><StatusBadge variant="warning">Sandbox</StatusBadge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </PageCard>
          )}

          {active === "localization" && (
            <PageCard>
              <SectionHeader title="Localization" subtitle="Currency, date format, and units" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Default currency</label>
                  <Select defaultValue="USD">
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["USD", "EUR", "GBP", "AED", "SGD"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Date format</label>
                  <Select defaultValue="iso">
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iso">YYYY-MM-DD (ISO 8601)</SelectItem>
                      <SelectItem value="eu">DD/MM/YYYY</SelectItem>
                      <SelectItem value="us">MM/DD/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Measurement units</label>
                  <Select defaultValue="metric">
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, m, °C)</SelectItem>
                      <SelectItem value="imperial">Imperial (lb, ft, °F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Number format</label>
                  <Select defaultValue="eu">
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eu">1.234.567,89 (EU)</SelectItem>
                      <SelectItem value="us">1,234,567.89 (US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button size="sm" className="mt-4 h-8 bg-[#4D8DFF] hover:bg-[#3a7af0]"><Save className="h-3.5 w-3.5" /> Save</Button>
            </PageCard>
          )}

          {active === "appearance" && (
            <PageCard>
              <SectionHeader title="Appearance" subtitle="Theme and density preferences" />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { id: "dark", label: "Dark (default)" },
                  { id: "midnight", label: "Midnight" },
                  { id: "system", label: "System" },
                ].map((t) => (
                  <button
                    key={t.id}
                    className={`rounded-lg border p-4 text-left text-sm transition-colors ${t.id === "dark" ? "border-[#4D8DFF] bg-[#4D8DFF]/5 text-[#4D8DFF]" : "border-border bg-card/40 text-muted-foreground hover:border-[#4D8DFF]/40"}`}
                  >
                    <Palette className="h-4 w-4" />
                    <p className="mt-2 font-medium">{t.label}</p>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-xs font-medium text-muted-foreground">Density</label>
                <Select defaultValue="comfortable">
                  <SelectTrigger className="mt-1 w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PageCard>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
