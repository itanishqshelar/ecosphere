import { AppShell } from "@/components/layout/AppShell";
export default function AILayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="AI Assistant" subtitle="Powered by Groq">{children}</AppShell>;
}
