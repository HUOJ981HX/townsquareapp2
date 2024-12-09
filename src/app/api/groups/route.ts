// app/api/groups/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { prisma } from '@/lib/prisma'
// import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const groups = await prisma.group.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        userGroups: true,
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}
