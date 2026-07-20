import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { signupSchema } from "@/validations/auth";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const parsed =
      signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const {
      fullName,
      email,
      password,
    } = parsed.data;

    const existing =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Email already registered",
        },
        {
          status: 409,
        }
      );
    }

    const hashed =
      await hashPassword(password);

    const user = await prisma.user.create({
  data: {
    fullName,
    email,
    password: hashed,
  },
});

    return NextResponse.json({
  success: true,
  user: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  },
});
  } catch {
    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}