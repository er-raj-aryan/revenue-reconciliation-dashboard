"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  BadgeDollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Orders Processed",
    value: "128,546",
    icon: ShoppingBag,
    color: "from-violet-500 to-indigo-500",
    description: "Imported from CSV files",
  },
  {
    title: "Payments Matched",
    value: "127,981",
    icon: CreditCard,
    color: "from-cyan-500 to-sky-500",
    description: "Successfully reconciled",
  },
  {
    title: "Revenue At Risk",
    value: "$82.4K",
    icon: BadgeDollarSign,
    color: "from-emerald-500 to-green-500",
    description: "Potential financial impact",
  },
  {
    title: "Discrepancies",
    value: "565",
    icon: AlertTriangle,
    color: "from-rose-500 to-orange-500",
    description: "Require investigation",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            Platform Overview
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Built for Finance Teams
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Automatically reconcile thousands of transactions, detect issues,
            and gain real-time financial visibility from a single dashboard.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition duration-500 group-hover:opacity-10`}
                />

                <div
                  className={`inline-flex rounded-2xl bg-gradient-to-r ${item.color} p-4 text-white shadow-xl`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mt-8 text-4xl font-black">
                  {item.value}
                </h3>

                <h4 className="mt-3 text-lg font-semibold">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{
                      delay: 0.3 + index * 0.2,
                      duration: 1,
                    }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}