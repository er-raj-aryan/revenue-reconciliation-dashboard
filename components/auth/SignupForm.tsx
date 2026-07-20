"use client";

import Link from "next/link";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "./Divider";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

import {
  signupSchema,
  SignupForm as SignupFormType,
} from "@/validations/auth";

import { useSignup } from "@/hooks/useSignup";

export default function SignupForm() {
  const { signup, loading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(signup)}
      className="space-y-6"
    >
      <SocialLogin />

      <Divider text="or continue with email" />

      {/* Full Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-violet-500">
          <User
            size={18}
            className="mr-3 text-slate-500"
          />

          <input
            {...register("fullName")}
            placeholder="Raj Aryan"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {errors.fullName && (
          <p className="mt-2 text-sm text-red-400">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-violet-500">
          <Mail
            size={18}
            className="mr-3 text-slate-500"
          />

          <input
            {...register("email")}
            placeholder="john@example.com"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <PasswordInput
        label="Password"
        placeholder="Create password"
        registration={register("password")}
        error={errors.password?.message}
      />

      {/* Confirm Password */}

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        registration={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {/* Terms */}

      <label className="flex items-start gap-3 text-sm text-slate-400">
        <input
          type="checkbox"
          className="mt-1 rounded"
        />

        <span>
          I agree to the Terms of Service and Privacy Policy.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition hover:scale-[1.01] disabled:opacity-50"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-violet-400"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}