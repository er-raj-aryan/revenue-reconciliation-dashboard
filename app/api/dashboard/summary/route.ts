import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const reconciliations =
    await prisma.reconciliation.findMany({
      where: {
        order: {
          userId: user.id,
        },
      },
      include: {
        order: true,
        // payment: true,
      },
    });

  const totalOrders =
    reconciliations.length;

  const matched =
    reconciliations.filter(
      r => r.status === "MATCHED"
    ).length;

  const mismatched =
    reconciliations.filter(
      r => r.status === "MISMATCH"
    ).length;

  const missing =
    reconciliations.filter(
      r =>
        r.status ===
        "MISSING_PAYMENT"
    ).length;

  const revenueAtRisk =
    reconciliations.reduce(
      (sum, r) =>
        sum + Number(r.revenueAtRisk),
      0
    );

  return NextResponse.json({
    totalOrders,
    matched,
    mismatched,
    missing,
    revenueAtRisk,
  });
}