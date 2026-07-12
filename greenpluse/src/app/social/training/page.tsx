
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default function TrainingPage() {
  return (
    <div className="page-wrapper">
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">ESG Training</h2>
      <p className="text-sm text-[hsl(var(--foreground-muted))]">Mandatory training modules and progress</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[
          { title: "Carbon Footprint Basics",   progress: 100, cert: true },
          { title: "ESG Reporting Standards",   progress: 75,  cert: false },
          { title: "CSR Best Practices",        progress: 50,  cert: false },
          { title: "Governance & Compliance",   progress: 30,  cert: false },
        ].map((m, i) => (
          <div key={m.title} className="card p-5">
            <div className="flex justify-between mb-3">
              <h4 className="font-semibold text-[hsl(var(--foreground))]">{m.title}</h4>
              {m.cert && <span className="badge-green badge">✓ Certified</span>}
            </div>
            <div className="w-full h-2 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"
                style={{ width: `${m.progress}%` }}
              />
            </div>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1.5">{m.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}



