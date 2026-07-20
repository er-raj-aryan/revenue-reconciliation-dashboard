"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const discrepancyData = [
  {
    order: "#ORD-1021",
    issue: "Amount Mismatch",
    amount: "$120",
    status: "High",
  },
  {
    order: "#ORD-1025",
    issue: "Missing Payment",
    amount: "$450",
    status: "Critical",
  },
  {
    order: "#ORD-1032",
    issue: "Duplicate Payment",
    amount: "$85",
    status: "Medium",
  },
];

const chartHeights = [60, 95, 70, 120, 90, 135, 110, 150];

export default function DashboardPreview() {
  return (
   <motion.div
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 0.35 }}
    className="
        relative
        w-full
        max-w-[580px]
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        shadow-[0_0_80px_rgba(124,58,237,0.15)]
        backdrop-blur-2xl
    "
>
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />

      <div className="relative p-6">
        {/* Window Header */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h3 className="text-lg font-bold">
              Revenue Dashboard
            </h3>

            <p className="text-sm text-muted-foreground">
              Real-time reconciliation overview
            </p>
          </div>

          <div className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-400">
            ● Live
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Orders"
            value="12,456"
            icon={<ShoppingCart size={18} />}
            color="text-violet-400"
            change="+12.8%"
            positive
          />

          <MetricCard
            title="Payments"
            value="12,438"
            icon={<CreditCard size={18} />}
            color="text-cyan-400"
            change="+9.4%"
            positive
          />

          <MetricCard
            title="Revenue"
            value="$2.8M"
            icon={<DollarSign size={18} />}
            color="text-emerald-400"
            change="+18%"
            positive
          />

          <MetricCard
            title="Discrepancies"
            value="18"
            icon={<AlertTriangle size={18} />}
            color="text-red-400"
            change="-6%"
            positive={false}
          />
        </div>

        {/* Revenue Chart */}
        {/* <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">
                Revenue Trend
              </h4>

              <p className="text-xs text-muted-foreground">
                Last 8 weeks
              </p>
            </div>

            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
              +18%
            </span>
          </div>

          <div className="flex h-40 items-end justify-between gap-3">
            {chartHeights.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                }}
                className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400"
              />
            ))}
          </div>
        </div> */}

        {/* Discrepancy Table */}
        {/* <div className="mt-8 rounded-2xl border border-white/10 bg-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h4 className="font-semibold">
              Recent Discrepancies
            </h4>
          </div>

          <div className="divide-y divide-white/10">
            {discrepancyData.map((item) => (
              <div
                key={item.order}
                className="flex items-center justify-between px-5 py-4 transition hover:bg-white/5"
              >
                <div>
                  <p className="font-medium">{item.order}</p>

                  <p className="text-xs text-muted-foreground">
                    {item.issue}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{item.amount}</p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.status === "Critical"
                        ? "bg-red-500/20 text-red-300"
                        : item.status === "High"
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400" />

            <div>
              <p className="font-medium">
                99.8% Match Accuracy
              </p>

              <p className="text-xs text-muted-foreground">
                AI verified reconciliation
              </p>
            </div>
          </div>

          <div className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-300">
            Revenue at Risk: $27.4K
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
  change,
  positive,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center justify-between">
        <div className={`${color}`}>{icon}</div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
            positive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}

          {change}
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold">{value}</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {title}
      </p>
    </div>
  );
}