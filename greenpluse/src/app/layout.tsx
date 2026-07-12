import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenPulse AI – ESG Management Platform",
  description:
    "Enterprise-grade AI-powered ESG Management & Employee Engagement Platform. Monitor sustainability metrics, carbon emissions, CSR participation, and governance compliance.",
  keywords: ["ESG", "sustainability", "carbon accounting", "CSR", "governance", "AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('gp-theme') || 'dark';
                  if (t === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
