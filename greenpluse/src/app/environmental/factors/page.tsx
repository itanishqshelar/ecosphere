
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { mockEmissionFactors } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

export default function FactorsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Emission Factors</h2>
          <p className="text-sm text-[hsl(var(--foreground-muted))] mt-0.5">CO₂ reference data for calculations</p>
        </div>
        {isAdmin && <button className="btn-primary"><Plus className="w-4 h-4" /> Add Factor</button>}
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(var(--border-muted))] bg-[hsl(var(--surface-overlay))]/50">
              <th className="table-header text-left">Factor Name</th>
              <th className="table-header text-left">Category</th>
              <th className="table-header text-right">CO₂/Unit</th>
              <th className="table-header text-left">Unit</th>
              <th className="table-header text-left">Status</th>
              <th className="table-header text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockEmissionFactors.map((f, i) => (
              <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="table-row">
                <td className="table-cell font-medium">{f.name}</td>
                <td className="table-cell"><span className="badge-blue badge">{f.category}</span></td>
                <td className="table-cell text-right font-mono text-primary-500">{f.co2PerUnit}</td>
                <td className="table-cell text-[hsl(var(--foreground-muted))]">{f.unit}</td>
                <td className="table-cell"><span className={cn("badge capitalize", getStatusColor(f.status))}>{f.status}</span></td>
                <td className="table-cell">
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button className="btn-ghost text-xs py-1 px-2">Edit</button>
                      <button className="btn-ghost text-xs py-1 px-2 text-danger-500">Delete</button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



