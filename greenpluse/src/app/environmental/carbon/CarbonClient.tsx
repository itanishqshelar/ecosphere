"use client";

import { motion } from "framer-motion";
import { Plus, Wind, TrendingDown, Flame, Zap, X } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { CarbonTransaction, EmissionFactor, Department } from "@/lib/types";

interface Props {
  transactions: CarbonTransaction[];
  emissionFactors: EmissionFactor[];
  stats: { totalKg: number; savedKg: number; fuelKg: number; electricKg: number };
  departments: Department[];
}

export function CarbonClient({ transactions, emissionFactors, stats, departments }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [txns, setTxns] = useState(transactions);
  const [form, setForm] = useState({
    department_id: departments[0]?.id ?? "",
    activity: "Electricity",
    emission_factor_id: emissionFactors[0]?.id ?? "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
  });

  const selectedFactor = emissionFactors.find((f) => f.id === form.emission_factor_id);
  const estimatedCO2 = selectedFactor && form.quantity
    ? (parseFloat(form.quantity) * selectedFactor.co2_per_unit).toFixed(2)
    : "—";

  const handleSubmit = async () => {
    if (!form.quantity || !form.department_id) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const supabase = createClient();
      const co2_kg = parseFloat(form.quantity) * (selectedFactor?.co2_per_unit ?? 0);
      const { data, error } = await supabase
        .from("carbon_transactions")
        .insert({ ...form, quantity: parseFloat(form.quantity), unit: selectedFactor?.unit ?? "unit", co2_kg, status: "pending" })
        .select(`*, department:departments(id,name), emission_factor:emission_factors(id,name,unit)`)
        .single();
      if (error) throw error;
      setTxns([data as CarbonTransaction, ...txns]);
      setShowModal(false);
      toast.success("Carbon transaction recorded!");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save");
    }
  };

  const statCards = [
    { label: "Total Emissions",  value: `${(stats.totalKg/1000).toFixed(1)} tCO₂`, icon: Wind,        color: "text-primary-500", bg: "bg-primary-500/10" },
    { label: "Carbon Saved",     value: `${(stats.savedKg/1000).toFixed(1)} tCO₂`, icon: TrendingDown, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Fuel Emissions",   value: `${(stats.fuelKg/1000).toFixed(1)} tCO₂`,  icon: Flame,        color: "text-orange-500",  bg: "bg-orange-500/10"  },
    { label: "Electricity",      value: `${(stats.electricKg/1000).toFixed(1)} tCO₂`,icon: Zap,        color: "text-accent-500",  bg: "bg-accent-500/10"  },
  ];

  return (
    <div className="page-wrapper">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{s.label}</p>
              <p className="text-base font-bold" style={{ color: "hsl(var(--foreground))" }}>{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <div>
            <h3 className="section-title">Carbon Transactions</h3>
            <p className="section-subtitle">{txns.length} records found</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--border-muted))", background: "hsl(var(--surface-overlay))" }}>
                <th className="table-header text-left">Department</th>
                <th className="table-header text-left">Activity</th>
                <th className="table-header text-left">Factor</th>
                <th className="table-header text-right">Qty</th>
                <th className="table-header text-right">CO₂ (kg)</th>
                <th className="table-header text-left">Date</th>
                <th className="table-header text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="table-row">
                  <td className="table-cell font-medium">{t.department?.name ?? "—"}</td>
                  <td className="table-cell">{t.activity}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{t.emission_factor?.name ?? "—"}</td>
                  <td className="table-cell text-right">{t.quantity.toLocaleString()} {t.unit}</td>
                  <td className="table-cell text-right font-semibold" style={{ color: "hsl(var(--foreground))" }}>{t.co2_kg.toLocaleString()}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{t.date}</td>
                  <td className="table-cell">
                    <span className={cn("badge capitalize", getStatusColor(t.status))}>{t.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emission Factors */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <h3 className="section-title">Emission Factors</h3>
          <p className="section-subtitle">CO₂ per unit reference ({emissionFactors.length} factors)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--border-muted))", background: "hsl(var(--surface-overlay))" }}>
                <th className="table-header text-left">Name</th>
                <th className="table-header text-left">Category</th>
                <th className="table-header text-right">CO₂/Unit</th>
                <th className="table-header text-left">Unit</th>
                <th className="table-header text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {emissionFactors.map((f, i) => (
                <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 + 0.2 }} className="table-row">
                  <td className="table-cell font-medium">{f.name}</td>
                  <td className="table-cell"><span className="badge-blue badge">{f.category}</span></td>
                  <td className="table-cell text-right font-mono" style={{ color: "#22c55e" }}>{f.co2_per_unit}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{f.unit}</td>
                  <td className="table-cell"><span className={cn("badge capitalize", getStatusColor(f.status))}>{f.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: "hsl(var(--foreground))" }}>Add Carbon Transaction</h3>
              <button onClick={() => setShowModal(false)} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground-muted))" }}>Department</label>
                <select className="input" value={form.department_id} onChange={(e) => setForm({...form, department_id: e.target.value})}>
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground-muted))" }}>Activity</label>
                <input className="input" value={form.activity} onChange={(e) => setForm({...form, activity: e.target.value})} placeholder="e.g. Diesel Fuel" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground-muted))" }}>Emission Factor</label>
                <select className="input" value={form.emission_factor_id} onChange={(e) => setForm({...form, emission_factor_id: e.target.value})}>
                  {emissionFactors.map((f) => <option key={f.id} value={f.id}>{f.name} ({f.co2_per_unit} CO₂/{f.unit})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground-muted))" }}>Quantity ({selectedFactor?.unit ?? "unit"})</label>
                <input type="number" className="input" placeholder="e.g. 500" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(var(--foreground-muted))" }}>Date</label>
                <input type="date" className="input" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
              </div>
              <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>Estimated CO₂</p>
                <p className="text-lg font-bold" style={{ color: "#22c55e" }}>{estimatedCO2} kg</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSubmit} className="btn-primary flex-1">Save Transaction</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
