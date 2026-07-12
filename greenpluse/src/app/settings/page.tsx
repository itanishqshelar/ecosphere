"use client";


import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { signOut } from "@/lib/auth/actions";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {(isAdmin 
          ? ["Organization","Departments","Categories","Emission Factors","Theme","Notifications","Language","Profile"]
          : ["Theme","Notifications","Language","Profile"]
        ).map((s) => (
          <button key={s} className="card p-4 text-left hover:border-primary-500/30 transition-colors">
            <p className="font-medium text-[hsl(var(--foreground))]">{s}</p>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">Configure {s.toLowerCase()} settings →</p>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}



