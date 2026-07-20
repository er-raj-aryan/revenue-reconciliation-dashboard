"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UploadSection from "@/components/dashboard/UploadSection";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ReconcileButton from "@/components/dashboard/ReconcileButton";
import DiscrepancyTable from "@/components/dashboard/DiscrepancyTable";
import AiPanel from "@/components/dashboard/AiPanel";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState<any>(null);

  const [discrepancies, setDiscrepancies] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [summaryRes, discrepancyRes] = await Promise.all([
        fetch("/api/dashboard/summary", {
          cache: "no-store",
        }),
        fetch(`/api/dashboard/discrepancies?page=${page}&limit=10`, {
          cache: "no-store",
        }),
      ]);

      if (!summaryRes.ok || !discrepancyRes.ok) {
        throw new Error("Failed to load dashboard.");
      }

      const summaryData = await summaryRes.json();

      setSummary(summaryData);

      const discrepancyData = await discrepancyRes.json();

      setDiscrepancies(discrepancyData.data);

      setPagination(discrepancyData.pagination);

      if (selectedIssue) {
        const updated = discrepancyData.find(
          (item: any) => item.id === selectedIssue.id,
        );

        setSelectedIssue(updated || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [page]);

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
        <DashboardHeader />

        <div className="flex gap-8">
          <div className="flex-1 space-y-8"> 
         {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-400">
            Loading Dashboard...
          </div>
        ) : (
          <>
            {summary && (
              <> 
                <SummaryCards summary={summary} /> 

                <RevenueChart summary={summary} />
              </>
            )}

            <div className=" flex gap-8">
              <div className="">
                {discrepancies && (
                  <DiscrepancyTable
                    rows={discrepancies}
                    selected={selectedIssue?.id}
                    onSelect={setSelectedIssue}
                    page={page}
                    pagination={pagination}
                    onPageChange={setPage}
                  />
                )}
              </div>

              <AiPanel issue={selectedIssue} />
            </div>
          </>
        )}
          </div>

        <div className=" flex flex-col gap-4">
        <UploadSection refresh={loadDashboard} />
        <ReconcileButton onSuccess={loadDashboard} />


       </div>
        </div>
      </div>
    </main>
  );
}
