"use client";
export default function DiversityPage() {
  return (
    <div className="page-wrapper">
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Diversity Dashboard</h2>
      <p className="text-sm text-[hsl(var(--foreground-muted))]">Gender ratio, age distribution & inclusion score</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { label: "Gender Ratio (F/M)", value: "42% / 58%", icon: "👥" },
          { label: "Inclusion Score",    value: "87/100",     icon: "🌍" },
          { label: "Age 20-30",          value: "34%",        icon: "🧑" },
          { label: "Diverse Depts",      value: "8/8",        icon: "🏢" },
        ].map((s) => (
          <div key={s.label} className="card p-5 text-center">
            <p className="text-3xl mb-2">{s.icon}</p>
            <p className="text-xl font-bold text-[hsl(var(--foreground))]">{s.value}</p>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
