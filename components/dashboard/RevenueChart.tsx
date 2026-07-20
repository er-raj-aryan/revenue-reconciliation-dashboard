"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  summary: any;
}

export default function RevenueChart({
  summary,
}: Props) {
  const data = [
    {
      name: "Orders",
      value:
        summary.totalOrders,
    },
    {
      name: "Payments",
      value:
        summary.totalPayments,
    },
    {
      name: "Matched",
      value: summary.matched,
    },
    {
      name: "Risk",
      value:
        summary.revenueAtRisk,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Reconciliation Overview
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}