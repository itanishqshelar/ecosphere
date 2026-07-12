"use client";


import { useState, useActionState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { resetPassword } from "@/lib/auth/actions";
import { ArrowRight, CheckCircle } from "lucide-react";

type FormState = { error: string | null };

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [state, formAction, pending] = useActionState(async (_prev: FormState, formData: FormData) => {
    const newPassword = formData.get("password") as string;
    const confirm = formData.get("confirm-password") as string;

    if (newPassword !== confirm) {
      return { error: "Passwords do not match" };
    }
    if (newPassword.length < 8) {
      return { error: "Password must be at least 8 characters" };
    }

    const result = await resetPassword(formData);
    if (result.success) {
      setSuccess(true);
      return { error: null };
    }
    return { error: result.error?.message ?? "Failed to reset password" };
  }, { error: null });

  if (success) {
    return (
      <AuthLayout>
        <AuthCard title="Password updated" description="Your password has been successfully reset.">
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary-500" />
            </div>
            <Link href="/auth/login" className="btn-primary mt-2">
              Sign in with new password
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Set new password"
        description="Choose a strong password for your account."
      >
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-xl p-3 text-sm bg-danger-500/10 border border-danger-500/20 text-danger-500">
              {state.error}
            </div>
          )}

          <PasswordInput
            label="New Password"
            name="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            showStrength
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            label="Confirm Password"
            name="confirm-password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full justify-center h-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                Reset password
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}



