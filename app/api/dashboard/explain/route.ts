import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { reconciliationId } = await request.json();

    if (!reconciliationId) {
      return NextResponse.json(
        { error: "Missing reconciliationId" },
        { status: 400 }
      );
    }

    const item =
      await prisma.reconciliation.findUnique({
        where: {
          id: reconciliationId,
        },
        include: {
          order: true,
        },
      });

    if (!item) {
      return NextResponse.json(
        { error: "Record not found" },
        { status:404 }
      );
    }

    let explanation = "";

    switch (item.status) {

      case "MATCHED":
        explanation =
`Order ${item.order.orderId} was successfully matched with a payment.
The payment amount equals the order amount.
No action is required.`;
        break;

      case "MISMATCH":
        explanation =
`The order exists but the payment amount does not match.

Expected Amount:
${item.order.netAmount}

Revenue At Risk:
${item.revenueAtRisk}

Possible Reasons

• Partial payment
• Incorrect payment amount
• Currency conversion issue
• Manual adjustment

Recommended Action

Review the payment gateway settlement and compare against the order invoice.`;
        break;

      case "MISSING_PAYMENT":
        explanation =
`No payment could be found for Order ${item.order.orderId}.

Possible Reasons

• Customer abandoned checkout
• Payment gateway failed
• Settlement delay
• Import file missing transactions

Recommended Action

Verify payment gateway records and retry reconciliation.`;
        break;

      case "DUPLICATE_PAYMENT":
        explanation =
`Multiple payments appear to exist for the same order.

Possible Reasons

• Customer paid twice
• Gateway retry
• Duplicate import

Recommended Action

Verify duplicate transactions before issuing a refund.`;
        break;

      default:
        explanation =
          "No explanation available.";
    }

    return NextResponse.json({
      explanation,
    });

  } catch (e) {

    console.log(e);

    return NextResponse.json(
      {
        error:"Internal Server Error"
      },
      {
        status:500
      }
    );
  }
}