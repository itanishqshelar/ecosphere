import { AppShell } from "@/components/layout/AppShell";
export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Social" subtitle="CSR Activities & Employee Welfare">{children}</AppShell>;
}
