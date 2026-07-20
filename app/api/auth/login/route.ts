import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/validations/auth";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const parsed =
      loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } =
      parsed.data;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const valid =
      await comparePassword(
        password,
        user.password
      );

    if (!valid) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      await createSession(user.id);

    const cookieStore =
      await cookies();

    cookieStore.set(
      "session",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge:
          60 * 60 * 24 * 7,
      }
    );

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