import Link from "next/link";
import { Leaf, Globe, MessageCircle, ExternalLink, Mail } from "lucide-react";

const footerLinks = [
  {
    label: "Platform",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Environmental", href: "/environmental/carbon" },
      { label: "Social", href: "/social/csr" },
      { label: "Governance", href: "/governance/policies" },
      { label: "Gamification", href: "/gamification/challenges" },
      { label: "Reports", href: "/reports" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-[hsl(var(--foreground))]">GreenPulse AI</span>
            </Link>
            <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed max-w-xs">
              Enterprise ESG Management Platform. Measure, manage, and improve your organization&apos;s sustainability performance.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--foreground-subtle))] mb-4">
                {group.label}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--foreground-subtle))]">
            &copy; {new Date().getFullYear()} GreenPulse AI. Built for the Odoo India Hiring Hackathon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground-muted))] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground-muted))] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground-muted))] transition-colors">
              MIT License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
