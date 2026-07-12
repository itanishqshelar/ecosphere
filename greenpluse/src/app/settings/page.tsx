"use client";
export default function SettingsPage() {
  return (
    <div className="page-wrapper">
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {["Organization","Departments","Categories","Emission Factors","Theme","Notifications","Language","Profile"].map((s) => (
          <button key={s} className="card p-4 text-left hover:border-primary-500/30 transition-colors">
            <p className="font-medium text-[hsl(var(--foreground))]">{s}</p>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">Configure {s.toLowerCase()} settings →</p>
          </button>
        ))}
      </div>
    </div>
  );
}
