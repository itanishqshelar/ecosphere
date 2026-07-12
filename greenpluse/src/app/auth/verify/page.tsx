"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormInput } from "@/components/auth/FormInput";
import { resendVerification } from "@/lib/auth/actions";
import { ArrowRight, Mail, RefreshCw } from "lucide-react";

type FormState = { resent: boolean; error: string | null };

export default function VerifyPage() {
  const [state, formAction, pending] = useActionState(async (_prev: FormState, formData: FormData) => {
    const result = await resendVerification(formData);
    if (result.success) return { resent: true, error: null };
    return { resent: false, error: result.error?.message ?? "Failed to resend verification" };
  }, { resent: false, error: null });

  return (
    <AuthLayout>
      <AuthCard
        title="Verify your email"
        description="We sent a verification link. Check your inbox and click the link to activate your account."
      >
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-accent-500" />
          </div>
          <p className="text-sm text-center text-[hsl(var(--foreground-muted))] leading-relaxed">
            {state.resent
              ? "Verification email resent successfully."
              : "If you don't see the email, check your spam folder or request a new one."}
          </p>

          <form action={formAction} className="w-full mt-6 space-y-4">
            {state?.error && (
              <div className="rounded-xl p-3 text-sm bg-danger-500/10 border border-danger-500/20 text-danger-500">
                {state.error}
              </div>
            )}

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@company.com"
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
                  <RefreshCw className="w-4 h-4" />
                  Resend verification
                </>
              )}
            </button>
          </form>

          <Link
            href="/auth/login"
            className="flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-400 transition-colors mt-6"
          >
            Back to sign in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
