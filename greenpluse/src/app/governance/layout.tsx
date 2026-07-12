import { AppShell } from "@/components/layout/AppShell";
export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Governance" subtitle="Policies, Audits & Compliance">{children}</AppShell>;
}
