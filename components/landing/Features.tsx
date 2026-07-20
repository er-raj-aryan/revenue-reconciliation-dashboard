"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileSpreadsheet,
  ShieldCheck,
  BarChart3,
  SearchCheck,
  Sparkles,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <FileSpreadsheet size={26} />,
    title: "CSV Import",
    description:
      "Import Orders and Payments from CSV files in seconds. Our parser validates and stores records automatically.",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    icon: <SearchCheck size={26} />,
    title: "Smart Reconciliation",
    description:
      "Automatically detect amount mismatches, duplicate payments, missing orders, refunds and failed transactions.",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: <BrainCircuit size={26} />,
    title: "AI Explanations",
    description:
      "Generate plain-English explanations for every discrepancy with suggested actions for finance teams.",
    gradient: "from-fuchsia-500 to-violet-600",
  },
  {
    icon: <BarChart3 size={26} />,
    title: "Interactive Dashboard",
    description:
      "Visualize financial health using charts, KPIs, filters and searchable reconciliation reports.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure Authentication",
    description:
      "Role-based access ensures every user only sees and manages their own reconciliation data.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <Sparkles size={26} />,
    title: "Enterprise Ready",
    description:
      "Built with scalability, clean architecture and modern engineering practices suitable for production environments.",
    gradient: "from-pink-500 to-purple-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#7c3aed10,transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-black lg:text-6xl">
            Everything You Need for
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Revenue Reconciliation
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Designed for finance teams, operations, and analysts to identify
            discrepancies quickly and make better business decisions.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}