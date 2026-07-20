import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);

    const limit = Number(searchParams.get("limit") ?? 10);

    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      prisma.reconciliation.findMany({
        where: {
          order: {
            userId: user.id,
          },
        },

        include: {
          order: {
            select: {
              orderId: true,
              customerEmail: true,
              netAmount: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limit,
      }),

      prisma.reconciliation.count({
        where: {
          order: {
            userId: user.id,
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: rows,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}