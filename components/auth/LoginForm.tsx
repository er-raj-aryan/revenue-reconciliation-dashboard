"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "./PasswordInput";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";

import {
  loginSchema,
  LoginForm as LoginFormType,
} from "@/validations/auth";

import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { login, loading } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(
      loginSchema
    ),
  });

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="space-y-6"
    >
      <SocialLogin />

      <Divider text="or continue with email" />

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          {...register("email")}
          placeholder="john@example.com"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-none transition focus:border-violet-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        error={
          errors.password?.message
        }
        registration={register(
          "password"
        )}
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-violet-400 hover:text-violet-300"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        disabled={loading}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition hover:scale-[1.01] disabled:opacity-50"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-400">
       {" Don't have an account? "}
        <Link
          href="/signup"
          className="font-semibold text-violet-400"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}