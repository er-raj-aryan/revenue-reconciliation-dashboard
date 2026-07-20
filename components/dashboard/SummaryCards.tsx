"use client";

import {
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
} from "lucide-react";

interface Summary {
  totalOrders: number;
  matched: number;
  mismatched: number;
  missing: number;
  revenueAtRisk: number;
}

interface Props {
  summary: Summary;
}

const cards = [
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: ShoppingCart,
    color: "text-violet-400",
    bg: "from-violet-500/20 to-violet-500/5",
  },
  {
    key: "matched",
    title: "Matched",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    key: "mismatched",
    title: "Amount Mismatch",
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "from-amber-500/20 to-amber-500/5",
  },
  {
    key: "missing",
    title: "Missing Payments",
    icon: ShieldAlert,
    color: "text-rose-400",
    bg: "from-rose-500/20 to-rose-500/5",
  },
  {
    key: "revenueAtRisk",
    title: "Revenue At Risk",
    icon: DollarSign,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-500/5",
  },
];

export default function SummaryCards({
  summary,
}: Props) {
  return (
    <div className="mb-6 grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        const value =
          summary[
            card.key as keyof Summary
          ];

        return (
          <div
            key={card.key}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,.15)]`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-60`}
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ${card.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
              </div>

              <h2 className="mt-8 text-4xl font-bold tracking-tight">
                {card.key === "revenueAtRisk"
                  ? `$${Number(value).toLocaleString()}`
                  : Number(value).toLocaleString()}
              </h2>

              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${card.bg.replace(
                    "/20",
                    ""
                  )}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}