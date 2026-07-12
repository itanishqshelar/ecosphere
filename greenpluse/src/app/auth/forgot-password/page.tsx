"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormInput } from "@/components/auth/FormInput";
import { forgotPassword } from "@/lib/auth/actions";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

type FormState = { sent: boolean; error: string | null };

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(async (_prev: FormState, formData: FormData) => {
    const result = await forgotPassword(formData);
    if (result.success) return { sent: true, error: null };
    return { sent: false, error: result.error?.message ?? "Something went wrong" };
  }, { sent: false, error: null });

  if (state.sent) {
    return (
      <AuthLayout>
        <AuthCard title="Check your email" description="We sent a password reset link to your email address.">
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-accent-500" />
            </div>
            <p className="text-sm text-center text-[hsl(var(--foreground-muted))] leading-relaxed">
              Click the link in the email to reset your password. The link expires in 1 hour.
            </p>
            <Link href="/auth/login" className="btn-primary mt-6">
              Back to sign in
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
        title="Reset your password"
        description="Enter your email address and we'll send you a reset link."
      >
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-xl p-3 text-sm bg-danger-500/10 border border-danger-500/20 text-danger-500">
              {state.error}
            </div>
          )}

          <FormInput
            label="Work Email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
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
                Send reset link
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-1.5 text-sm text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </AuthCard>
    </AuthLayout>
  );
}
