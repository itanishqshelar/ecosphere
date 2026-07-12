import { AppShell } from "@/components/layout/AppShell";
export default function EnvironmentalLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Environmental" subtitle="Carbon Accounting & ESG Goals">{children}</AppShell>;
}
