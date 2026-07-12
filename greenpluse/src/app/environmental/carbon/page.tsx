"use client";

import { motion } from "framer-motion";
import { mockEmissionFactors, mockDepartments } from "@/lib/mock-data";
import { Plus, Wind, TrendingDown, Flame, Zap, Plane, Factory } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { useState } from "react";

const transactions = [
  { id: "t1", dept: "Operations",  activity: "Diesel Fuel",  factor: "Diesel Fuel", quantity: 500,  unit: "litres", co2: 1340, status: "approved", date: "2026-07-10" },
  { id: "t2", dept: "Engineering", activity: "Electricity",  factor: "Grid Electricity", quantity: 12000, unit: "kWh", co2: 9840, status: "pending",  date: "2026-07-09" },
  { id: "t3", dept: "Sales",       activity: "Air Travel",   factor: "Air Travel (Short)", quantity: 2400, unit: "km", co2: 612, status: "approved", date: "2026-07-08" },
  { id: "t4", dept: "HR",          activity: "Electricity",  factor: "Grid Electricity", quantity: 3200,  unit: "kWh", co2: 2624, status: "approved", date: "2026-07-07" },
  { id: "t5", dept: "Finance",     activity: "Air Travel",   factor: "Air Travel (Long)", quantity: 8000, unit: "km", co2: 1560, status: "rejected",  date: "2026-07-06" },
  { id: "t6", dept: "Operations",  activity: "Manufacturing",factor: "Manufacturing",    quantity: 300,  unit: "units",co2: 426, status: "pending",  date: "2026-07-05" },
];

const stats = [
  { label: "Total Emissions", value: "1,240 tCO₂", icon: Wind,         color: "text-primary-500", bg: "bg-primary-500/10" },
  { label: "Carbon Saved",    value: "140 tCO₂",   icon: TrendingDown, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Fuel Emissions",  value: "486 tCO₂",   icon: Flame,        color: "text-orange-500",  bg: "bg-orange-500/10"  },
  { label: "Electricity",     value: "589 tCO₂",   icon: Zap,          color: "text-accent-500",  bg: "bg-accent-500/10"  },
];

export default function CarbonPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-wrapper">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 flex items-center gap-3"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", s.bg)}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">{s.label}</p>
              <p className="text-base font-bold text-[hsl(var(--foreground))]">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-muted))]">
          <div>
            <h3 className="section-title">Carbon Transactions</h3>
            <p className="section-subtitle">All emission records</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border-muted))] bg-[hsl(var(--surface-overlay))]/50">
                <th className="table-header text-left">Department</th>
                <th className="table-header text-left">Activity</th>
                <th className="table-header text-left">Emission Factor</th>
                <th className="table-header text-right">Qty</th>
                <th className="table-header text-right">CO₂ (kg)</th>
                <th className="table-header text-left">Date</th>
                <th className="table-header text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="table-row"
                >
                  <td className="table-cell font-medium">{t.dept}</td>
                  <td className="table-cell">{t.activity}</td>
                  <td className="table-cell text-[hsl(var(--foreground-muted))]">{t.factor}</td>
                  <td className="table-cell text-right">{t.quantity.toLocaleString()} {t.unit}</td>
                  <td className="table-cell text-right font-semibold text-[hsl(var(--foreground))]">
                    {t.co2.toLocaleString()}
                  </td>
                  <td className="table-cell text-[hsl(var(--foreground-muted))]">{t.date}</td>
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
        <div className="p-5 border-b border-[hsl(var(--border-muted))]">
          <h3 className="section-title">Emission Factors</h3>
          <p className="section-subtitle">CO₂ per unit reference</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[hsl(var(--border-muted))] bg-[hsl(var(--surface-overlay))]/50">
                <th className="table-header text-left">Factor Name</th>
                <th className="table-header text-left">Category</th>
                <th className="table-header text-right">CO₂/Unit</th>
                <th className="table-header text-left">Unit</th>
                <th className="table-header text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEmissionFactors.map((f, i) => (
                <motion.tr
                  key={f.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="table-row"
                >
                  <td className="table-cell font-medium">{f.name}</td>
                  <td className="table-cell">
                    <span className="badge-blue badge">{f.category}</span>
                  </td>
                  <td className="table-cell text-right font-mono text-primary-500">{f.co2PerUnit}</td>
                  <td className="table-cell text-[hsl(var(--foreground-muted))]">{f.unit}</td>
                  <td className="table-cell">
                    <span className={cn("badge capitalize", getStatusColor(f.status))}>{f.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card w-full max-w-md mx-4 p-6"
          >
            <h3 className="text-base font-bold text-[hsl(var(--foreground))] mb-5">Add Carbon Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1.5">Department</label>
                <select className="input">
                  {mockDepartments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1.5">Activity Type</label>
                <select className="input">
                  <option>Fuel</option>
                  <option>Electricity</option>
                  <option>Travel</option>
                  <option>Manufacturing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1.5">Emission Factor</label>
                <select className="input">
                  {mockEmissionFactors.map((f) => <option key={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1.5">Quantity</label>
                <input type="number" placeholder="e.g. 500" className="input" />
              </div>
              <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <p className="text-xs text-[hsl(var(--foreground-muted))]">Estimated CO₂</p>
                <p className="text-lg font-bold text-primary-500">— kg CO₂</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button className="btn-primary flex-1">Save Transaction</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
