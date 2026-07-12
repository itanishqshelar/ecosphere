import { AppShell } from "@/components/layout/AppShell";
export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Reports" subtitle="ESG Reports & Analytics Export">{children}</AppShell>;
}
