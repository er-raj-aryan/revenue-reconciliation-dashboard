import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { parseCSV } from "@/lib/parser";
import { fileToString } from "@/lib/upload";
import { getCurrentUser } from "@/lib/auth";
import { parseCSVDate } from "@/lib/date";

// 1. Define the shape of your raw row data based on your CSV structure
interface CSVRow {
  transaction_ref?: string;
  processed_at?: string;
  order_reference?: string;
  currency?: string;
  amount?: string;
  fee?: string;
  net_settled?: string;
  type?: string;
  status?: string;
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const form = await request.formData();

    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const csv = await fileToString(file);

    const rows = parseCSV(csv);

    const upload = await prisma.upload.create({
      data: {
        fileName: file.name,
        fileType: "PAYMENTS",
        status: "PROCESSING",
        userId: user.id,
      },
    });

    let imported = 0;
    let skipped = 0;

    for (const row of rows as CSVRow[]) {
      try {
        // Skip rows without transaction reference
        if (!row.transaction_ref) {
          skipped++;
          continue;
        }

        // Skip rows without processed_at
        if (
          !row.processed_at ||
          row.processed_at.trim() === ""
        ) {
          console.log(
            `Skipping ${row.transaction_ref}: Missing processed_at`
          );

          skipped++;
          continue;
        }

        const existing =
          await prisma.payment.findUnique({
            where: {
              transactionRef:
                row.transaction_ref,
            },
          });

        if (existing) {
          skipped++;
          continue;
        }

        const processedDate =
          parseCSVDate(row.processed_at);

        await prisma.payment.create({
          data: {
            uploadId: upload.id,

            userId: user.id,

            transactionRef:
              row.transaction_ref,

            processedAt: processedDate,

            orderReference:
              row.order_reference || null,

            currency:
              row.currency || "",

            amount:
              new Prisma.Decimal(
                row.amount || "0"
              ),

            fee:
              new Prisma.Decimal(
                row.fee || "0"
              ),

            netSettled:
              new Prisma.Decimal(
                row.net_settled || "0"
              ),

            type:
              row.type || "",

            status:
              row.status || "",
          },
        });

        imported++;
      } catch (err) {
        console.log(
          "Skipping row:",
          row.transaction_ref,
          err
        );

        skipped++;
      }
    }

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
      imported,
      skipped,
      total: rows.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}