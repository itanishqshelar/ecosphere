"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
  RadialBarChart, RadialBar, PieChart, Pie, Legend,
} from "recharts";
import { mockCarbonTrend, mockDeptESG, mockGovernance, mockCSRParticipation } from "@/lib/mock-data";

// ── Custom Tooltip ───────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-3 py-2 text-xs shadow-glass-lg">
      <p className="font-semibold text-[hsl(var(--foreground))] mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[hsl(var(--foreground-muted))]">{p.name}:</span>
          <span className="font-semibold text-[hsl(var(--foreground))]">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Carbon Trend (Area Chart) ────────────────────────────────
export function CarbonTrendChart() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Carbon Emission Trend</h3>
          <p className="section-subtitle">Monthly tCO₂ vs Target</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-primary-500 inline-block" />
            <span className="text-[hsl(var(--foreground-muted))]">Emission</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-accent-500 inline-block" style={{borderStyle:"dashed"}} />
            <span className="text-[hsl(var(--foreground-muted))]">Target</span>
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={mockCarbonTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="emissionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="emission" name="Emission" stroke="#22c55e" strokeWidth={2} fill="url(#emissionGrad)" dot={false} activeDot={{ r: 5, fill: "#22c55e" }} />
          <Area type="monotone" dataKey="target"   name="Target"   stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 3" fill="url(#targetGrad)" dot={false} activeDot={{ r: 5, fill: "#3b82f6" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Department ESG Comparison (Bar Chart) ────────────────────
const DEPT_COLORS = { environmental: "#22c55e", social: "#3b82f6", governance: "#a855f7" };

export function DeptESGChart() {
  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="section-title">Department ESG Comparison</h3>
        <p className="section-subtitle">E / S / G scores by department</p>
      </div>
      <div className="flex items-center gap-4 text-xs mb-4">
        {Object.entries(DEPT_COLORS).map(([key, color]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />
            <span className="text-[hsl(var(--foreground-muted))] capitalize">{key}</span>
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={mockDeptESG} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} vertical={false} />
          <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--foreground-muted))" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="environmental" name="Environmental" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={14} />
          <Bar dataKey="social"        name="Social"        fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={14} />
          <Bar dataKey="governance"    name="Governance"    fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Governance Donut ─────────────────────────────────────────
export function GovernanceDonutChart() {
  return (
    <div className="card p-5">
      <div className="mb-2">
        <h3 className="section-title">Governance Compliance</h3>
        <p className="section-subtitle">Policy acceptance overview</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={mockGovernance}
            cx="50%" cy="50%"
            innerRadius={55} outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {mockGovernance.map((entry, i) => (
              <Cell key={i} fill={entry.fill} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-[hsl(var(--foreground-muted))]">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── CSR Radial Chart ─────────────────────────────────────────
export function CSRRadialChart() {
  return (
    <div className="card p-5">
      <div className="mb-2">
        <h3 className="section-title">CSR Participation</h3>
        <p className="section-subtitle">Employee engagement rate</p>
      </div>
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="55%" outerRadius="80%"
            barSize={16}
            data={[{ name: "Participation", value: 74, fill: "#22c55e" }]}
            startAngle={225} endAngle={-45}
          >
            <RadialBar background={{ fill: "hsl(var(--surface-overlay))" }} dataKey="value" cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[hsl(var(--foreground))]">74%</span>
          <span className="text-xs text-[hsl(var(--foreground-muted))]">Joined</span>
        </div>
      </div>
    </div>
  );
}
