"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Loader2,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: any;
}

export default function AiPanel({
  issue,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!issue) {
      setText("");
      setError("");
      return;
    }

    async function loadExplanation() {
      try {
        setLoading(true);
        setError("");
        setText("");

        const response = await fetch(
          "/api/dashboard/explain",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reconciliationId: issue.id,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to generate explanation."
          );
        }

        setText(data.explanation);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExplanation();
  }, [issue]);

  return (
    <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center gap-3">
        <Bot className="h-7 w-7 text-violet-400" />

        <div>
          <h2 className="text-xl font-bold">
            AI Explanation
          </h2>

          <p className="text-xs text-slate-400">
            Powered by AI Revenue Assistant
          </p>
        </div>
      </div>

      {!issue && (
        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">

          <Sparkles className="mx-auto mb-3 h-10 w-10 text-violet-500" />

          <p className="text-slate-400">
            Select a reconciliation record to generate
            an AI explanation.
          </p>

        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 rounded-xl bg-black/20 p-4">
          <Loader2 className="h-5 w-5 animate-spin text-violet-400" />

          <span>
            Generating AI explanation...
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {!loading && text && (
        <div className="rounded-2xl bg-black/20 p-5 leading-8 text-slate-300 whitespace-pre-wrap">
         <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}