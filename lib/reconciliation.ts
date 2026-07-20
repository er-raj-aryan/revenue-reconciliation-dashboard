import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function reconcileUser(
  userId: string
) {
  const orders =
    await prisma.order.findMany({
      where: {
        userId,
      },
    });

  const payments =
    await prisma.payment.findMany({
      where: {
        userId,
      },
    });

  let matched = 0;
  let mismatched = 0;
  let missing = 0;

  for (const order of orders) {
    const payment =
      payments.find(
        (p) =>
          p.orderReference ===
          order.orderId
      );

    if (!payment) {
      await prisma.reconciliation.upsert({
        where: {
          orderId: order.id,
        },
        create: {
          orderId: order.id,

          revenueAtRisk:
            order.netAmount,

          status:
            "MISSING_PAYMENT",

          explanation:
            "No payment found for this order.",
        },
        update: {
          revenueAtRisk:
            order.netAmount,

          status:
            "MISSING_PAYMENT",

          explanation:
            "No payment found for this order.",
        },
      });

      missing++;

      continue;
    }

    const diff =
      Number(order.netAmount) -
      Number(payment.amount);

    if (
      Math.abs(diff) <= 0.01
    ) {
      await prisma.reconciliation.upsert({
        where: {
          orderId: order.id,
        },
        create: {
          orderId: order.id,

          matchedPaymentId:
            payment.id,

          revenueAtRisk: 0,

          status: "MATCHED",

          explanation:
            "Amounts match successfully.",
        },
        update: {
          matchedPaymentId:
            payment.id,

          revenueAtRisk: 0,

          status: "MATCHED",

          explanation:
            "Amounts match successfully.",
        },
      });

      matched++;
    } else {
      await prisma.reconciliation.upsert({
        where: {
          orderId: order.id,
        },
        create: {
          orderId: order.id,

          matchedPaymentId:
            payment.id,

          revenueAtRisk:
            new Prisma.Decimal(
              Math.abs(diff)
            ),

          status: "MISMATCH",

          explanation:
            `Order Amount ${order.netAmount} but payment received ${payment.amount}`,
        },
        update: {
          matchedPaymentId:
            payment.id,

          revenueAtRisk:
            new Prisma.Decimal(
              Math.abs(diff)
            ),

          status: "MISMATCH",

          explanation:
            `Order Amount ${order.netAmount} but payment received ${payment.amount}`,
        },
      });

      mismatched++;
    }
  }

  return {
    matched,
    mismatched,
    missing,
  };
}