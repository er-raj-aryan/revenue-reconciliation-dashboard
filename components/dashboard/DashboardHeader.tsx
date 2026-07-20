"use client";

import { useEffect, useState } from "react";
import { Bell, UserCircle2 } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { Avatar } from "../ui/avatar";
interface User {
  fullName: string;
  email: string;
}

export default function DashboardHeader() {
  const [user, setUser] =
    useState<User | null>(null);
    const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(setUser);
  }, []);

   async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-4xl font-bold">
          Revenue Reconciliation
        </h1>

        <p className="mt-2 text-slate-400">
          Upload datasets and reconcile financial transactions.
        </p>
      </div>

      <div className="flex items-center gap-4">

          <Avatar className="font-semibold items-center justify-center" size="lg">
            {user?.fullName?.slice(0, 2)?.toUpperCase() ?? "Loading..."}
          </Avatar>
        <div>


          <p className="text-sm text-slate-400">
            {user?.email}
          </p>

          <p 
            onClick={logout}
            className="cursor-pointer text-red-400 hover:text-red-300"
          >
            Logout
          </p>

        </div>

      </div>

    </div>
  );
}