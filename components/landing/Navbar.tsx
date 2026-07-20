"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navigation = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Dashboard",
    href: "#dashboard",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/70 px-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-zinc-950/60">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
              R
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                RevenueSync
              </h1>

              <p className="text-xs text-muted-foreground">
                AI Reconciliation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-500/40"
            >
              Get Started

              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 transition hover:bg-muted md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-zinc-950/90 md:hidden">
            <div className="flex flex-col p-5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-5 flex flex-col gap-3 border-t pt-5">
                <Link
                  href="/login"
                  className="rounded-xl border px-4 py-3 text-center text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  Get Started

                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}