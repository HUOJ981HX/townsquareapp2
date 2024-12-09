import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import HomeClient from "./HomeClient";
import { buildPostFilter } from "@/helper/filter";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  const filter = await prisma.filter.findFirst({
    where: {
      userId: session?.user?.id!,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  let posts = null;

  posts = await prisma.post.findMany({
    include: {
      filterablePostAttributes: true,
      user: {
        include: {
          filterableUserAttributes: true,
        },
      },
    },
  });

  if (filter?.filterOff || !filter || !filter?.filterJson) {
    posts = await prisma.post.findMany({
      include: {
        filterablePostAttributes: true,
        user: {
          include: {
            filterableUserAttributes: true,
          },
        },
      },
    });
  } else {
    const postQuery: Prisma.PostWhereInput = buildPostFilter(
      filter!.filterJson
    );
    
    posts = await prisma.post.findMany({
      where: postQuery,
      // where: {
      //   filterablePostAttributes: {},
      //   user: {
      //     filterableUserAttributes: {
      //       age: { gte: 18, lte: 100 },
      //       gender: { in: ["Male", "Non-binary"] },
      //     },
      //     userGroups: {
      //       some: {
      //         groupId: {
      //           in: ["5d37edb0-eb62-4b5f-80a8-94133e3299ee"],
      //         },
      //       },
      //     },
      //   },
      // },
      include: {
        filterablePostAttributes: true,
        user: {
          include: {
            filterableUserAttributes: true,
          },
        },
      },
    });
  }

  return (
    <>
      {posts ? (
        <HomeClient posts={posts} filter={filter} groups={groups} />
      ) : (
        <p>No post to display</p>
      )}
    </>
  );
}
