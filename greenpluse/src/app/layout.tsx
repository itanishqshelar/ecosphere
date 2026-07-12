import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "GreenPulse AI – Enterprise ESG Management Platform",
  description:
    "Enterprise-grade ESG Management & Employee Engagement Platform for Odoo. Monitor sustainability metrics, carbon emissions, CSR participation, governance compliance, and workforce gamification.",
  keywords: ["ESG", "sustainability", "carbon accounting", "CSR", "governance", "gamification", "Odoo", "enterprise"],
  openGraph: {
    title: "GreenPulse AI – Enterprise ESG Management Platform",
    description: "Measure, manage, and improve your organization's ESG performance with real-time dashboards, carbon accounting, and employee engagement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `dark` is the default theme; AppShell reconciles with the saved
    // localStorage preference on mount. Setting it here avoids a flash of
    // light content without needing an inline <script> in the React tree.
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
