"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a password reset link."
    >
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email Address
          </label>

          <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-violet-500">
            <Mail
              size={18}
              className="mr-3 text-slate-500"
            />

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-transparent outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <button className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition hover:scale-[1.02]">
          Send Reset Link
        </button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-violet-400 transition hover:text-violet-300"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  );
}