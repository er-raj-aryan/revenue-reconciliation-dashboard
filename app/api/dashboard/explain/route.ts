import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reconciliationId } = await req.json();

    const reconciliation = await prisma.reconciliation.findUnique({
      where: { id: reconciliationId },
      include: { order: true },
    });

    if (!reconciliation) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const prompt = `
You are a Senior Finance Operations Analyst.
Return your answer in Markdown.
Include exactly these sections:
## Issue Summary
## Root Cause
## Business Impact
## Suggested Fix
## Confidence

Use concise business language.
Order ID: ${reconciliation.order.orderId}
Status: ${reconciliation.status}
Revenue At Risk: ${reconciliation.revenueAtRisk}
Order Amount: ${reconciliation.order.netAmount}
Currency: ${reconciliation.order.currency}
Customer: ${reconciliation.order.customerEmail}

Explain:
1. Why this issue probably occurred.
2. Business impact.
3. Recommended resolution.
4. Risk level.
Keep the response under 150 words.
`;

    // Using gemini-2.5-flash for stable free-tier testing
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    // Safe extraction fallback for the new @google/genai SDK structure
    const explanation = result.text || "Unable to generate explanation.";

    return NextResponse.json({ explanation });

  } catch (error: any) {
    console.error("Gemini Route Error:", error);

    // If the API still returns a 429, catch it gracefully instead of returning a generic 500
    if (error?.status === 429 || error?.message?.includes("429")) {
      return NextResponse.json(
        { error: "The AI service is currently busy. Please retry in a few seconds." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "AI generation failed" },
      { status: 500 }
    );
  }
}