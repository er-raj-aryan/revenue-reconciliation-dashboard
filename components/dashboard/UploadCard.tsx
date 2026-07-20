"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  FileSpreadsheet,
  UploadCloud,
} from "lucide-react";

interface Props {
  title: string;
  type: "ORDERS" | "PAYMENTS";
  refresh(): void;
}

export default function UploadCard({
  title,
  type,
  refresh,
}: Props) {

  const input =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  async function upload(file: File) {

    setLoading(true);

    const form = new FormData();

    form.append("file", file);

    form.append("type", type);

    const res = await fetch(
      "/api/dashboard/upload",
      {
        method: "POST",
        body: form,
      }
    );

    if (res.ok) {

      setFileName(file.name);

      refresh();
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

      <div className="mb-5 flex items-center gap-3">

        <FileSpreadsheet className="text-violet-400" />

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

      </div>

      <button
        onClick={() => input.current?.click()}
        className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-500/30 bg-violet-500/5 transition hover:border-violet-400"
      >

        <UploadCloud size={42} />

        <p className="mt-5 font-semibold">
          Click to Upload CSV
        </p>

        <p className="text-sm text-slate-400">
          CSV files only
        </p>

      </button>

      <input
        hidden
        ref={input}
        type="file"
        accept=".csv"
        onChange={(e) => {

          const file =
            e.target.files?.[0];

          if (file)
            upload(file);

        }}
      />

      {loading && (
        <p className="mt-5 text-violet-400">
          Uploading...
        </p>
      )}

      {fileName && (
        <div className="mt-5 flex items-center gap-2 text-emerald-400">

          <CheckCircle2 size={18} />

          <span>{fileName}</span>

        </div>
      )}

    </div>
  );
}