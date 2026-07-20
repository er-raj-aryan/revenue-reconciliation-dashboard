"use client";

import Link from "next/link";
import {
//   Github,
//   Linkedin,
//   Twitter,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const productLinks = [
  {
    title: "Dashboard",
    href: "#dashboard",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Analytics",
    href: "#",
  },
  {
    title: "AI Insights",
    href: "#",
  },
];

const companyLinks = [
  {
    title: "About",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
  {
    title: "Terms",
    href: "#",
  },
  {
    title: "Contact",
    href: "#",
  },
];

const resourceLinks = [
  {
    title: "Documentation",
    href: "#",
  },
  {
    title: "API",
    href: "#",
  },
  {
    title: "Support",
    href: "#",
  },
  {
    title: "Status",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/30">
                R
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  RevenueSync
                </h2>

                <p className="text-sm text-muted-foreground">
                  AI Revenue Reconciliation Platform
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-md leading-8 text-muted-foreground">
              Automate order and payment reconciliation, detect discrepancies,
              visualize financial insights, and leverage AI explanations to
              resolve issues faster.
            </p>

            <div className="mt-8 flex gap-4">
              {[
                // {
                //   icon: Github,
                //   href: "#",
                // },
                // {
                //   icon: Linkedin,
                //   href: "#",
                // },
                // {
                //   icon: Twitter,
                //   href: "#",
                // },
                {
                  icon: Mail,
                  href: "#",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/10"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={productLinks}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RevenueSync. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Built with Next.js</span>
            <span>•</span>
            <span>Prisma</span>
            <span>•</span>
            <span>OpenAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold">
        {title}
      </h3>

      <div className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group flex items-center gap-2 text-muted-foreground transition hover:text-white"
          >
            {link.title}

            <ArrowUpRight
              size={14}
              className="opacity-0 transition group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}