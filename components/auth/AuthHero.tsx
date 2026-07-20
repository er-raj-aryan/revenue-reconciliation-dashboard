"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  "Secure authentication",
  "CSV Upload & Validation",
  "Automatic Order Matching",
  "AI Powered Insights",
];

export default function AuthHero() {
  return (
    <div className="relative flex w-full max-w-2xl flex-col">
      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
      >
        <Sparkles size={16} />
        AI Revenue Reconciliation Platform
      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="max-w-xl text-6xl font-black leading-tight"
      >
        Smarter Revenue
        <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          Starts Here.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-6 max-w-lg text-lg leading-8 text-slate-400"
      >
        Upload orders and payments, detect discrepancies instantly,
        understand revenue at risk, and receive AI generated explanations
        in seconds.
      </motion.p>

      {/* Feature List */}

      <div className="mt-10 grid gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2 + index * 0.08,
            }}
            className="flex items-center gap-3"
          >
            <div className="rounded-full bg-emerald-500/15 p-1.5">
              <CheckCircle2
                size={16}
                className="text-emerald-400"
              />
            </div>

            <span className="text-slate-300">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* Dashboard Preview */}

      {/* <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_20px_80px_rgba(124,58,237,.15)]"
      >
        {/* Glow 

        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />

        <div className="relative">
          {/* Header 

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                Revenue Overview
              </h3>

              <p className="text-sm text-slate-400">
                Live reconciliation
              </p>
            </div>

            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
              ● Live
            </div>
          </div>

          {/* KPI 

          <div className="grid grid-cols-2 gap-4">
            <MiniCard
              icon={<FileSpreadsheet size={18} />}
              title="Orders"
              value="12,456"
              color="text-violet-400"
            />

            <MiniCard
              icon={<CreditCard size={18} />}
              title="Payments"
              value="12,438"
              color="text-cyan-400"
            />

            <MiniCard
              icon={<DollarSign size={18} />}
              title="Revenue"
              value="$2.8M"
              color="text-emerald-400"
            />

            <MiniCard
              icon={<ShieldCheck size={18} />}
              title="Matched"
              value="99.8%"
              color="text-orange-400"
            />
          </div>

          {/* Chart 

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-300">
                Revenue Trend
              </span>

              <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                +18%
              </span>
            </div>

            <div className="flex h-28 items-end gap-3">
              {[35, 55, 42, 70, 58, 80, 64, 92].map(
                (height, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}

interface MiniCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

function MiniCard({
  icon,
  title,
  value,
  color,
}: MiniCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <div className={color}>{icon}</div>

        <ArrowUpRight
          size={14}
          className="text-emerald-400"
        />
      </div>

      <h4 className="mt-4 text-2xl font-bold">
        {value}
      </h4>

      <p className="mt-1 text-sm text-slate-400">
        {title}
      </p>
    </div>
  );
}