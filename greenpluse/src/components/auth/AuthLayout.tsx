"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { AuthIllustration } from "./AuthIllustration";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[hsl(var(--background))]">
      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div className="relative z-10 flex flex-col w-full h-full p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white/90">GreenPulse AI</span>
          </Link>

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[520px]">
              <AuthIllustration />
            </div>
          </div>

          {/* Quote */}
          <div className="mt-auto">
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              {"“Measure, manage, and improve your organization’s ESG performance with real-time insights and employee engagement.”"}
            </p>
          </div>
        </div>
      </div>

      {/* Right — Content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-[hsl(var(--foreground))]">GreenPulse AI</span>
          </Link>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
