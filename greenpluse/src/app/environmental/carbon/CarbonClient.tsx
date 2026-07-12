"use client";

import { motion } from "framer-motion";
import {
  FileImage,
  Flame,
  Loader2,
  Plus,
  TrendingDown,
  Upload,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn, getStatusColor } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { CarbonTransaction, Department, EmissionFactor } from "@/lib/types";

interface Props {
  transactions: CarbonTransaction[];
  emissionFactors: EmissionFactor[];
  stats: { totalKg: number; savedKg: number; fuelKg: number; electricKg: number };
  departments: Department[];
}

type ReceiptAutofillResponse = {
  activity?: string;
  emission_factor_id?: string;
  quantity?: number;
  date?: string;
  note?: string;
};

const createInitialForm = (departments: Department[], emissionFactors: EmissionFactor[]) => ({
  department_id: departments[0]?.id ?? "",
  activity: "Electricity",
  emission_factor_id: emissionFactors[0]?.id ?? "",
  quantity: "",
  date: new Date().toISOString().split("T")[0],
});

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function CarbonClient({ transactions, emissionFactors, stats, departments }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [showModal, setShowModal] = useState(false);
  const [txns, setTxns] = useState(transactions);
  const [form, setForm] = useState(() => createInitialForm(departments, emissionFactors));
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [receiptNote, setReceiptNote] = useState("");
  const [isAnalyzingReceipt, setIsAnalyzingReceipt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [decisionLoadingId, setDecisionLoadingId] = useState<string | null>(null);

  const selectedFactor = emissionFactors.find((factor) => factor.id === form.emission_factor_id);
  const estimatedCO2 = selectedFactor && form.quantity
    ? (parseFloat(form.quantity) * selectedFactor.co2_per_unit).toFixed(2)
    : "--";

  const resetModal = () => {
    setShowModal(false);
    setForm(createInitialForm(departments, emissionFactors));
    setReceiptFile(null);
    setReceiptName("");
    setReceiptNote("");
    setIsAnalyzingReceipt(false);
    setIsSaving(false);
  };

  const handleReceiptUpload = async (file: File) => {
    setReceiptFile(file);
    setReceiptName(file.name);
    setReceiptNote("");
    setIsAnalyzingReceipt(true);

    try {
      const body = new FormData();
      body.append("receipt", file);
      body.append(
        "emissionFactors",
        JSON.stringify(
          emissionFactors.map((factor) => ({
            id: factor.id,
            name: factor.name,
            category: factor.category,
            unit: factor.unit,
            co2_per_unit: factor.co2_per_unit,
          })),
        ),
      );

      const response = await fetch("/api/carbon/receipt-analyze", {
        method: "POST",
        body,
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not analyze the receipt");
      }

      const autofill = payload as ReceiptAutofillResponse;
      setForm((current) => ({
        ...current,
        activity: autofill.activity ?? current.activity,
        emission_factor_id: autofill.emission_factor_id ?? current.emission_factor_id,
        quantity: typeof autofill.quantity === "number" ? String(autofill.quantity) : current.quantity,
        date: autofill.date ?? current.date,
      }));
      setReceiptNote(autofill.note ?? "Receipt analyzed. Please review the autofilled values before saving.");
      toast.success("Receipt analyzed and form autofilled");
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Could not analyze the receipt");
      setReceiptNote(message);
      toast.error(message);
    } finally {
      setIsAnalyzingReceipt(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.quantity || !form.department_id) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsSaving(true);
      const supabase = createClient();
      const co2Kg = parseFloat(form.quantity) * (selectedFactor?.co2_per_unit ?? 0);
      const { data, error } = await supabase
        .from("carbon_transactions")
        .insert({
          ...form,
          quantity: parseFloat(form.quantity),
          unit: selectedFactor?.unit ?? "unit",
          co2_kg: co2Kg,
          status: "pending",
        })
        .select("*, department:departments(id,name), emission_factor:emission_factors(id,name,unit)")
        .single();

      if (error) {
        throw error;
      }

      setTxns([data as CarbonTransaction, ...txns]);
      resetModal();
      toast.success("Carbon transaction recorded for admin approval");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to save"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDecision = async (transactionId: string, status: "approved" | "rejected") => {
    setDecisionLoadingId(transactionId);
    try {
      const response = await fetch("/api/carbon/transactions/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, status }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to update transaction status");
      }

      setTxns((current) =>
        current.map((transaction) =>
          transaction.id === transactionId ? { ...transaction, status } : transaction,
        ),
      );
      toast.success(`Transaction ${status}`);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to update transaction status"));
    } finally {
      setDecisionLoadingId(null);
    }
  };

  const statCards = [
    { label: "Total Emissions", value: `${(stats.totalKg / 1000).toFixed(1)} tCO2`, icon: Wind, color: "text-primary-500", bg: "bg-primary-500/10" },
    { label: "Carbon Saved", value: `${(stats.savedKg / 1000).toFixed(1)} tCO2`, icon: TrendingDown, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Fuel Emissions", value: `${(stats.fuelKg / 1000).toFixed(1)} tCO2`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Electricity", value: `${(stats.electricKg / 1000).toFixed(1)} tCO2`, icon: Zap, color: "text-accent-500", bg: "bg-accent-500/10" },
  ];

  return (
    <div className="page-wrapper">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="card flex items-center gap-3 p-4"
          >
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", stat.bg)}>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>{stat.label}</p>
              <p className="text-base font-bold" style={{ color: "hsl(var(--foreground))" }}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b p-5" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <div>
            <h3 className="section-title">Carbon Transactions</h3>
            <p className="section-subtitle">{txns.length} records found</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Transaction
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
                <th className="table-header text-right">CO2 (kg)</th>
                <th className="table-header text-left">Date</th>
                <th className="table-header text-left">Status</th>
                {isAdmin && <th className="table-header text-right">Approval</th>}
              </tr>
            </thead>
            <tbody>
              {txns.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="table-row"
                >
                  <td className="table-cell font-medium">{transaction.department?.name ?? "--"}</td>
                  <td className="table-cell">{transaction.activity}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{transaction.emission_factor?.name ?? "--"}</td>
                  <td className="table-cell text-right">{transaction.quantity.toLocaleString()} {transaction.unit}</td>
                  <td className="table-cell text-right font-semibold" style={{ color: "hsl(var(--foreground))" }}>{transaction.co2_kg.toLocaleString()}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{transaction.date}</td>
                  <td className="table-cell">
                    <span className={cn("badge capitalize", getStatusColor(transaction.status))}>{transaction.status}</span>
                  </td>
                  {isAdmin && (
                    <td className="table-cell text-right">
                      {transaction.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => void handleDecision(transaction.id, "rejected")}
                            disabled={decisionLoadingId === transaction.id}
                            className="btn-secondary px-3 py-1 text-xs disabled:pointer-events-none disabled:opacity-60"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => void handleDecision(transaction.id, "approved")}
                            disabled={decisionLoadingId === transaction.id}
                            className="btn-primary px-3 py-1 text-xs disabled:pointer-events-none disabled:opacity-60"
                          >
                            {decisionLoadingId === transaction.id ? "Saving..." : "Approve"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>Reviewed</span>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b p-5" style={{ borderColor: "hsl(var(--border-muted))" }}>
          <h3 className="section-title">Emission Factors</h3>
          <p className="section-subtitle">CO2 per unit reference ({emissionFactors.length} factors)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--border-muted))", background: "hsl(var(--surface-overlay))" }}>
                <th className="table-header text-left">Name</th>
                <th className="table-header text-left">Category</th>
                <th className="table-header text-right">CO2/Unit</th>
                <th className="table-header text-left">Unit</th>
                <th className="table-header text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {emissionFactors.map((factor, index) => (
                <motion.tr
                  key={factor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.04 + 0.2 }}
                  className="table-row"
                >
                  <td className="table-cell font-medium">{factor.name}</td>
                  <td className="table-cell"><span className="badge badge-blue">{factor.category}</span></td>
                  <td className="table-cell text-right font-mono" style={{ color: "#22c55e" }}>{factor.co2_per_unit}</td>
                  <td className="table-cell" style={{ color: "hsl(var(--foreground-muted))" }}>{factor.unit}</td>
                  <td className="table-cell"><span className={cn("badge capitalize", getStatusColor(factor.status))}>{factor.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card mx-4 w-full max-w-md p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold" style={{ color: "hsl(var(--foreground))" }}>Add Carbon Transaction</h3>
              <button onClick={resetModal} className="btn-ghost flex h-8 w-8 items-center justify-center p-0">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>Department</label>
                <select className="input" value={form.department_id} onChange={(event) => setForm({ ...form, department_id: event.target.value })}>
                  {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>Activity</label>
                <input
                  className="input"
                  value={form.activity}
                  onChange={(event) => setForm({ ...form, activity: event.target.value })}
                  placeholder="e.g. Diesel Fuel"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>Emission Factor</label>
                <select className="input" value={form.emission_factor_id} onChange={(event) => setForm({ ...form, emission_factor_id: event.target.value })}>
                  {emissionFactors.map((factor) => (
                    <option key={factor.id} value={factor.id}>
                      {factor.name} ({factor.co2_per_unit} CO2/{factor.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>Receipt Upload</label>
                <label
                  className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed p-4 transition-colors hover:border-primary-500/50"
                  style={{ borderColor: "hsl(var(--border-muted))", background: "hsl(var(--surface-overlay))" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
                      {isAnalyzingReceipt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                        {receiptName || "Upload receipt image"}
                      </p>
                      <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                        JPG, PNG, or WEBP. We will extract quantity, activity, date, and estimate CO2.
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void handleReceiptUpload(file);
                      }
                    }}
                  />
                </label>
                {(receiptFile || receiptNote) && (
                  <div className="mt-2 flex items-start gap-2 text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>
                    <FileImage className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <p>{receiptNote || `${receiptFile?.name} selected. Review the autofilled values.`}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>
                  Quantity ({selectedFactor?.unit ?? "unit"})
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="e.g. 500"
                  value={form.quantity}
                  onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "hsl(var(--foreground-muted))" }}>Date</label>
                <input
                  type="date"
                  className="input"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                />
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs" style={{ color: "hsl(var(--foreground-muted))" }}>Estimated CO2</p>
                <p className="text-lg font-bold" style={{ color: "#22c55e" }}>{estimatedCO2} kg</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={resetModal} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={isSaving || isAnalyzingReceipt}
                className="btn-primary flex-1 disabled:pointer-events-none disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Transaction"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
