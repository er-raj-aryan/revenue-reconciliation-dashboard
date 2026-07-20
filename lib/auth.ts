import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { verifySession } from "./session";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const session =
    cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const payload =
      await verifySession(session);

    return prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  } catch {
    return null;
  }
}