import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import HomeClient from "./HomeClient";
import { buildPostFilter } from "@/helper/filter";

export default async function Home() {
  const session = await auth();

  console.log('hhhhhhhhhhhhhhhhhhhhh');
  console.log('hhhhhhhhhhhhhhhhhhhhh');
  console.log('sean_log session: ' + JSON.stringify(session));

  if (!session?.user) redirect("/authenticate");

  const sessionUserId = parseInt(session?.user?.id!);

  const filter = await prisma.filter.findFirst({
    where: {
      userId: sessionUserId,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      userId: sessionUserId,
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

    console.log('pppppppppppppppppp');
    console.log('qqqqqqqqqqqqqqqqqqq');
    console.log('sean_log postQuery: ' + JSON.stringify(postQuery));

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
      //           in: ["028e5436-fcff-4196-b48a-f267fc0fe30b"],
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
