// ── EcoSphere Report Branding ────────────────────────────────────────────
// Central branding config for every generated report. Change once, applies
// everywhere. Kept separate so future white-label / org overrides are trivial.

export const BRAND = {
  platform: "EcoSphere",
  platformFull: "EcoSphere ESG Intelligence Platform",
  tagline: "Enterprise Sustainability, Measured.",
  organization: "GreenCo Industries Pvt. Ltd.",
  organizationShort: "GreenCo",
  website: "ecosphere.greenco.in",
  confidentiality: "Confidential — For Internal Use Only",
} as const;

// Report accent palette — one signature colour per report family.
export const REPORT_ACCENTS = {
  environmental: "#16a34a",
  social: "#2563eb",
  governance: "#7c3aed",
  esg: "#0f766e",
  custom: "#0891b2",
} as const;

export type ReportKind =
  | "environmental"
  | "social"
  | "governance"
  | "esg"
  | "custom";

export const REPORT_LABELS: Record<ReportKind, string> = {
  environmental: "Environmental Report",
  social: "Social Report",
  governance: "Governance Report",
  esg: "ESG Summary Report",
  custom: "Custom ESG Report",
};

export const REPORT_FILE_PREFIX: Record<ReportKind, string> = {
  environmental: "Environmental_Report",
  social: "Social_Report",
  governance: "Governance_Report",
  esg: "ESG_Summary",
  custom: "Custom_ESG_Report",
};
