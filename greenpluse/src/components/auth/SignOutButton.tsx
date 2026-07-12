"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/actions";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.push("/auth/login");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  );
}
