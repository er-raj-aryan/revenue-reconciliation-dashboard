"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthHero from "./AuthHero";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[160px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl">
        {/* Left Side */}
        <div className="hidden w-1/2 items-start justify-center px-12 lg:flex flex-col">
             <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          <AuthHero />
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-full max-w-md"
          >
           

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,.15)]">
              <div className="mb-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold shadow-lg shadow-violet-500/30">
                  R
                </div>

                <h1 className="text-4xl font-black tracking-tight">
                  {title}
                </h1>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}