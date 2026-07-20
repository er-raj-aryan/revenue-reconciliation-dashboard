"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export default function PasswordInput({
  label,
  placeholder,
  error,
  registration,
}: Props) {
  const [show, setShow] =
    useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-violet-500">
        <input
          {...registration}
          type={
            show
              ? "text"
              : "password"
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />

        <button
          type="button"
          onClick={() =>
            setShow(!show)
          }
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}