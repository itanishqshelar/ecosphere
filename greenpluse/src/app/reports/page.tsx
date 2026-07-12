
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default function ReportsPage() {
  return (
    <div className="page-wrapper">
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Report Builder</h2>
      <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">Generate custom ESG reports with filters</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {[
          { label: "Environmental Report", icon: "🌿", color: "from-primary-500/20 to-emerald-500/10" },
          { label: "Social Report",        icon: "🤝", color: "from-accent-500/20 to-blue-400/10"    },
          { label: "Governance Report",    icon: "🏛️", color: "from-purple-500/20 to-pink-500/10"    },
          { label: "Full ESG Report",      icon: "📊", color: "from-amber-500/20 to-yellow-500/10"   },
        ].map((r) => (
          <button key={r.label} className={`card p-6 text-center bg-gradient-to-br ${r.color} hover:scale-105 transition-transform`}>
            <p className="text-4xl mb-3">{r.icon}</p>
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{r.label}</p>
            <p className="text-xs text-primary-500 mt-1">Generate →</p>
          </button>
        ))}
      </div>
    </div>
  );
}



