"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 blur-2xl transition duration-500 group-hover:opacity-20`}
      />

      {/* Top Right Arrow */}
      <div className="absolute right-6 top-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5 text-violet-400" />
      </div>

      {/* Icon */}
      <div
        className={`inline-flex rounded-2xl bg-gradient-to-r ${gradient} p-4 text-white shadow-xl`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-8 text-2xl font-bold tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-muted-foreground">
        {description}
      </p>

      {/* Divider */}
      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-violet-400">
          Learn More
        </span>

        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
      </div>
    </motion.div>
  );
}