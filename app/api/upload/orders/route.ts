import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCSV } from "@/lib/parser";
import { fileToString } from "@/lib/upload";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const user =
      await getCurrentUser();

    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const form =
      await request.formData();

    const file =
      form.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          error: "CSV missing",
        },
        {
          status: 400,
        }
      );
    }

    const csv =
      await fileToString(file);

    const rows =
      parseCSV(csv);

    const upload =
      await prisma.upload.create({
        data: {
          fileName: file.name,
          fileType: "ORDERS",
          status: "PROCESSING",
          userId,
        },
      });

    await prisma.order.createMany({
  data: rows.map((row:any) => ({
    uploadId: upload.id,
    userId,

    orderId: row.order_id,

    orderDate: new Date(row.order_date),

    customerEmail: row.customer_email,

    currency: row.currency,

    grossAmount: Number(row.gross_amount),

    discount: Number(row.discount),

    netAmount: Number(row.net_amount),

    status: row.status,
  })),
  skipDuplicates: true,
});

    await prisma.upload.update({
      where: {
        id: upload.id,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      success: true,
      total: rows.length,
    });
  } catch (error) {
  console.error("UPLOAD ERROR");
  console.error(error);

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Upload failed",
    },
    {
      status: 500,
    }
  );
}
}