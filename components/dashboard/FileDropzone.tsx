"use client";

import { useRef } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

interface Props {
  title: string;
  file: File | null;
  loading?: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
  onUpload: () => void;
}

export default function FileDropzone({
  title,
  file,
  loading = false,
  onSelect,
  onRemove,
  onUpload
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file?: File) {
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file.");
      return;
    }

    onSelect(file);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-8 transition hover:border-violet-500"
    >
      {!file ? (
        <>
          <UploadCloud
            className="mx-auto mb-4 text-violet-400"
            size={48}
          />

          <h3 className="text-lg font-semibold text-center">
            {title}
          </h3>

          <p className="mt-2 text-center text-sm text-slate-400">
            Drag & Drop your CSV here
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-medium hover:bg-violet-500"
          >
            Browse CSV
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-emerald-400" />

              <div>
                <p className="font-medium">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRemove}
            >
              <X className="text-red-400" />
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold"
            onClick={onUpload}
          >
            {loading
              ? "Uploading..."
              : "Ready to Upload"}
          </button>
        </div>
      )}

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={(e) =>
          handleFile(e.target.files?.[0])
        }
      />
    </div>
  );
}