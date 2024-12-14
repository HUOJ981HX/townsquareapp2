import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const groupIds = searchParams.get("groupIds")?.split(",") || [];

    const users = await prisma.user.findMany({
      where: {
        OR: groupIds.map((groupId) => ({
          userGroups: {
            some: {
              groupId,
            },
          },
        })),
      },
      include: {
        filterableUserAttributes: true,
      },
      distinct: ["id"], // Remove duplicate users
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}
