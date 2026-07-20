"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useSignup() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function signup(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      toast.success("Account created successfully");

      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    signup,
    loading,
  };
}