"use client";

import { forwardRef, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showStrength?: boolean;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 25, label: "Weak", color: "bg-danger-500" };
  if (score <= 3) return { score: 50, label: "Fair", color: "bg-warning-500" };
  if (score <= 4) return { score: 75, label: "Good", color: "bg-accent-500" };
  return { score: 100, label: "Strong", color: "bg-primary-500" };
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength, value, className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const strength = getStrength(typeof value === "string" ? value : "");

    // Only bind `value` when the parent controls it (i.e. also passes onChange).
    // Otherwise leave the input uncontrolled so it stays typeable and submits via FormData.
    const controlledValue = value !== undefined ? { value } : {};

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id ?? "password"}
          className="block text-sm font-medium text-[hsl(var(--foreground))]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id ?? "password"}
            type={show ? "text" : "password"}
            className={cn(
              "input h-10 pr-10",
              error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
              className
            )}
            {...controlledValue}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-subtle))] hover:text-[hsl(var(--foreground-muted))] transition-colors"
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && (
          <p className="text-xs text-danger-500 mt-1">{error}</p>
        )}
        {showStrength && value && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((segment) => (
                <div
                  key={segment}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    strength.score >= segment * 25 ? strength.color : "bg-[hsl(var(--border-muted))]"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-[hsl(var(--foreground-subtle))] mt-1">
              Password strength: <span className="font-medium" style={{ color: strength.score >= 75 ? "#22c55e" : strength.score >= 50 ? "#f59e0b" : "#ef4444" }}>{strength.label}</span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
