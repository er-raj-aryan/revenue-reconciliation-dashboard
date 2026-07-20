"use client";

interface Props {
  rows: any[];

  onSelect: (row: any) => void;

  selected?: string;

  page: number;

  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };

  onPageChange: (page: number) => void;
}

export default function DiscrepancyTable({ rows, onSelect, selected ,pagination, onPageChange,page}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-bold">Reconciliation Results</h2>
      </div>

      <table className="w-full">
        <thead className="bg-white/5 text-left">
          <tr>
            <th className="p-4">Order</th>

            <th className="p-4">Status</th>

            <th className="p-4">Revenue Risk</th>

            <th className="p-4">AI</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(rows) &&
            rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelect(row)}
                className={`cursor-pointer transition ${
                  selected === row.id ? "bg-violet-500/20" : "hover:bg-white/5"
                }`}
              >
                <td className="p-4">{row.orderId}</td>

                <td className="p-4">{row.status}</td>

                <td className="p-4">${row.revenueAtRisk}</td>

                <td className="p-4">
                  <button
                    onClick={() => onSelect(row)}
                    className="rounded-lg bg-violet-600 px-4 py-2"
                  >
                    Explain
                  </button>
                </td>
              </tr>
            ))}


          {!rows.length && (
            <tr>
              <td colSpan={4} className="p-10 text-center text-slate-400">
                Upload CSV files and run reconciliation to see results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-white/10 p-4">

  <p className="text-sm text-slate-400">

    Total Records : {pagination.total}

  </p>

  <div className="flex gap-2">

    <button
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
      className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-40"
    >
      Previous
    </button>

    <span className="flex items-center px-4">

      {page} / {pagination.totalPages}

    </span>

    <button
      disabled={page >= pagination.totalPages}
      onClick={() => onPageChange(page + 1)}
      className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-40"
    >
      Next
    </button>

  </div>

</div>
    </div>
  );
}
