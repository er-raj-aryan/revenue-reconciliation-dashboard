"use client";

// import { Github } from "lucide-react";

interface SocialLoginProps {
  showGithub?: boolean;
}

export default function SocialLogin({
  showGithub = false,
}: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] font-medium transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.08]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.2 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.2 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2c-2.1 1.6-4.6 2.5-7.3 2.5-5.3 0-9.8-3.3-11.5-8l-6.5 5C9.4 39.5 16.1 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.6-6.7 7.1l6.2 5.2C39.4 37.2 44 31.2 44 24c0-1.3-.1-2.7-.4-3.5z"
          />
        </svg>

        Continue with Google
      </button>

      {showGithub && (
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] font-medium transition hover:border-violet-500/40 hover:bg-white/[0.08]"
        >
          {/* <Github size={18} /> */}
          Continue with GitHub
        </button>
      )}
    </div>
  );
}