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
import { signUp } from "@/lib/auth/actions";
import { ArrowRight } from "lucide-react";

type FormState = { error: string | null };

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [state, formAction, pending] = useActionState(async (_prev: FormState, formData: FormData) => {
    setFormErrors({});

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const passwordVal = formData.get("password") as string;
    const confirm = formData.get("confirm-password") as string;
    const terms = formData.get("terms") === "on";

    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) errors.name = "Full name is required";
    if (!email || !email.includes("@")) errors.email = "Valid work email is required";
    if (!passwordVal || passwordVal.length < 8) errors.password = "Password must be at least 8 characters";
    if (passwordVal !== confirm) errors["confirm-password"] = "Passwords do not match";
    if (!terms) errors.terms = "You must agree to the terms";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return { error: null };
    }

    const result = await signUp(formData);
    if (result.success) {
      // Account created and signed in — go straight to the app.
      router.push("/dashboard");
      router.refresh();
      return { error: null };
    }
    return { error: result.error?.message ?? "Registration failed" };
  }, { error: null });

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        description="Set up your ESG management workspace."
      >
        <GoogleButton />

        <Divider text="or register with email" />

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-xl p-3 text-sm bg-danger-500/10 border border-danger-500/20 text-danger-500">
              {state.error}
            </div>
          )}

          <FormInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            error={formErrors.name}
            required
          />

          <FormInput
            label="Work Email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            error={formErrors.email}
            required
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            showStrength
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            required
          />

          <PasswordInput
            label="Confirm Password"
            name="confirm-password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            error={formErrors["confirm-password"]}
            required
          />

          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                className="w-4 h-4 rounded-lg border-[hsl(var(--border))] text-primary-500 focus:ring-primary-500/20 mt-0.5"
              />
              <span className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">Privacy Policy</a>
              </span>
            </label>
            {formErrors.terms && (
              <p className="text-xs text-danger-500 ml-6">{formErrors.terms}</p>
            )}
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
                Create account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center text-[hsl(var(--foreground-muted))]">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary-500 hover:text-primary-400 transition-colors">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}



