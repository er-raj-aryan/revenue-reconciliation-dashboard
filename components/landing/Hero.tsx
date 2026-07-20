"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";
import DashboardPreview from "./DashboardPreview";

const features = ["CSV Upload", "AI Insights", "Revenue Analytics"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute right-0 top-32 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-[180px]" />

        <div className="absolute bottom-0 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            <Sparkles size={16} />
            AI Powered Revenue Operations
          </div> */}

          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight lg:text-7xl">
            Reconcile
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              Orders & Payments{" "}
            </span>
            with Confidence
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
            Upload your Orders and Payments CSV files, automatically detect
            mismatches, calculate revenue at risk, and receive AI-powered
            explanations for every discrepancy.
          </p>

          {/* Feature Pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 backdrop-blur"
              >
                <CheckCircle2 size={16} className="text-emerald-500" />

                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-500/30 transition hover:scale-105"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white/10 bg-background/60 px-7 py-4 font-medium backdrop-blur transition hover:bg-muted"
            >
              Sign In
            </Link>
          </div>

          {/* Bottom Stats */}
          {/* <div className="mt-14 grid grid-cols-3 gap-6">
            <div>
              <h2 className="text-3xl font-bold">99.8%</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Match Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Orders Processed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">&lt;2s</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                AI Explanation
              </p>
            </div>
          </div> */}
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="relative z-10"
        >
          {/* Floating Cards */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -left-8 top-10 hidden rounded-2xl border border-white/10 bg-background/70 p-5 shadow-2xl backdrop-blur lg:block"
          >
            <ShieldCheck className="mb-3 text-emerald-500" />

            <p className="font-semibold">99.8% Accuracy</p>

            <span className="text-sm text-muted-foreground">
              Deterministic Matching
            </span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute -right-8 bottom-10 hidden rounded-2xl border border-white/10 bg-background/70 p-5 shadow-2xl backdrop-blur lg:block"
          >
            <BrainCircuit className="mb-3 text-violet-500" />

            <p className="font-semibold">AI Explanation</p>

            <span className="text-sm text-muted-foreground">GPT Powered</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-0 hidden -translate-x-1/2 rounded-xl border border-white/10 bg-background/70 px-5 py-3 shadow-xl backdrop-blur lg:flex items-center gap-3"
          >
            <UploadCloud className="text-cyan-400" />
            CSV Upload Ready
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[600px]">
              <DashboardPreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
