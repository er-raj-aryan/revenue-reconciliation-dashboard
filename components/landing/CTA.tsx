"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

export default function CTA() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{
          once: true,
        }}
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(124,58,237,.15)] lg:p-16">
          {/* Floating Glow */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              <Sparkles size={16} />
              AI Powered Financial Reconciliation
            </div> */}

            <h2 className="mt-8 text-5xl font-black leading-tight tracking-tight lg:text-6xl">
              Ready to Simplify Your
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Revenue Operations?
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              Upload your Orders and Payments CSV files, detect discrepancies
              instantly, visualize financial health, and let AI explain every
              issue in plain English.
            </p>

            {/* Benefits */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                "CSV Upload",
                "AI Explanations",
                "Secure Authentication",
                "Interactive Dashboard",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            {/* <div className="mt-14 flex flex-wrap justify-center gap-5">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/50"
              >
                <UploadCloud size={22} />

                Get Started

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium backdrop-blur-xl transition hover:bg-white/10"
              >
                View Dashboard
              </Link>
            </div> */}

            {/* Bottom Stats */}
            <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
              <div>
                <h3 className="text-4xl font-black text-violet-400">
                  99.8%
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Matching Accuracy
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-cyan-400">
                  &lt; 2 sec
                </h3>

                <p className="mt-2 text-muted-foreground">
                  AI Explanation Time
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-emerald-400">
                  24/7
                </h3>

                <p className="mt-2 text-muted-foreground">
                  Always Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}