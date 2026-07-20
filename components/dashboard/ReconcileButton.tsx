"use client";

import { useState } from "react";

import {
  Loader2,
  Sparkles,
} from "lucide-react";

interface Props {
  onSuccess(data: any): void;
}

export default function ReconcileButton({
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function reconcile() {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/reconcile",
        {
          method: "POST",
        }
      );

      const data =
        await res.json();

      onSuccess(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-end">
      <button
        disabled={loading}
        onClick={reconcile}
        className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-lg font-semibold transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Reconciling...
          </>
        ) : (
          <>
            <Sparkles />
            Start Reconciliation
          </>
        )}
      </button>
    </div>
  );
}