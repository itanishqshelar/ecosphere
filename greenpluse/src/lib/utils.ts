import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 1): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(decimals)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(decimals)}K`;
  return num.toFixed(decimals);
}

export function formatCO2(tons: number): string {
  return `${formatNumber(tons)} tCO₂`;
}

export function getChangePercent(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getSeverityColor(severity: "low" | "medium" | "high" | "critical"): string {
  const map = {
    low:      "badge-green",
    medium:   "badge-amber",
    high:     "badge-red",
    critical: "badge-red",
  };
  return map[severity];
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active:      "badge-green",
    completed:   "badge-green",
    approved:    "badge-green",
    pending:     "badge-amber",
    in_progress: "badge-blue",
    rejected:    "badge-red",
    inactive:    "badge-gray",
    draft:       "badge-gray",
  };
  return map[status.toLowerCase()] ?? "badge-gray";
}
