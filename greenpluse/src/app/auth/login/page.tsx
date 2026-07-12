"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormInput } from "@/components/auth/FormInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Divider } from "@/components/auth/Divider";
import { signIn } from "@/lib/auth/actions";
import { ArrowRight } from "lucide-react";

type FormState = { error: string | null };

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async (_prev: FormState, formData: FormData) => {
    const result = await signIn(formData);
    if (result.success) {
      router.push("/dashboard");
      return { error: null };
    }
    return { error: result.error?.message ?? "Invalid credentials" };
  }, { error: null });

  const [showCapsLock, setShowCapsLock] = useState(false);

  return (
    <AuthLayout>
      <AuthCard
        title="Sign in to your account"
        description="Enter your credentials to access your ESG dashboard."
      >
        <GoogleButton />

        <Divider />

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

          <div>
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              onKeyDown={(e) => setShowCapsLock(e.getModifierState("CapsLock"))}
            />
            {showCapsLock && (
              <p className="text-xs text-warning-500 mt-1">⚠ Caps Lock is on</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                className="w-4 h-4 rounded-lg border-[hsl(var(--border))] text-primary-500 focus:ring-primary-500/20"
              />
              <span className="text-sm text-[hsl(var(--foreground-muted))]">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

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
                Sign in
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center text-[hsl(var(--foreground-muted))]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-primary-500 hover:text-primary-400 transition-colors">
            Create one
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
