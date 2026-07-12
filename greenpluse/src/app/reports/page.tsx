"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { REPORT_LABELS, REPORT_FILE_PREFIX, type ReportKind } from "@/lib/reports/branding";
import { ShieldAlert, Download, Loader2, FileText } from "lucide-react";

const reportTypes: { kind: ReportKind; icon: string; color: string }[] = [
  { kind: "environmental", icon: "🌿", color: "from-primary-500/20 to-emerald-500/10" },
  { kind: "social",        icon: "🤝", color: "from-accent-500/20 to-blue-400/10"    },
  { kind: "governance",    icon: "🏛️", color: "from-purple-500/20 to-pink-500/10"    },
  { kind: "esg",           icon: "📊", color: "from-amber-500/20 to-yellow-500/10"   },
];

export default function ReportsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [loadingKind, setLoadingKind] = useState<ReportKind | null>(null);

  const handleDownload = async (kind: ReportKind) => {
    if (!isAdmin) return;
    setLoadingKind(kind);
    try {
      const [{ pdf }, { ReportDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/reports/pdf/ReportDocument"),
      ]);
      const blob = await pdf(<ReportDocument kind={kind} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${REPORT_FILE_PREFIX[kind]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoadingKind(null);
    }
  };

  if (authLoading) {
    return (
      <div className="page-wrapper flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Report Builder</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">
            Generate and download custom ESG reports as PDF
          </p>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-medium">
            <ShieldAlert className="w-3.5 h-3.5" />
            Admin — Download Enabled
          </div>
        )}
      </div>

      {!isAdmin ? (
        <div className="card p-8 text-center">
          <ShieldAlert className="w-10 h-10 text-[hsl(var(--foreground-muted))] mx-auto mb-3" />
          <p className="font-semibold text-[hsl(var(--foreground))]">Admin Access Required</p>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-1 max-w-sm mx-auto">
            Only administrators can generate and download ESG reports. Contact your ESG admin to
            request access or report generation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {reportTypes.map(({ kind, icon, color }) => {
            const isGenerating = loadingKind === kind;
            return (
              <button
                key={kind}
                disabled={isGenerating}
                onClick={() => handleDownload(kind)}
                className={`card p-6 text-center bg-gradient-to-br ${color} hover:scale-105 transition-all disabled:opacity-60 disabled:hover:scale-100 relative overflow-hidden`}
              >
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  </div>
                )}
                <p className="text-4xl mb-3">{icon}</p>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {REPORT_LABELS[kind]}
                </p>
                <p className="text-xs text-primary-500 mt-2 flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" />
                  Download PDF
                </p>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-primary-500" />
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">About Reports</p>
        </div>
        <p className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">
          Reports are generated on-demand using live ESG data and include key metrics, departmental
          breakdowns, compliance status, and emission trends. All reports are confidential and
          intended for internal use only.
        </p>
      </div>
    </div>
  );
}
