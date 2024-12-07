import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
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

  console.log('fffffffffffffffffffffff');
  console.log('1111111111111111111111');
  console.log('sean_log filter: ' + JSON.stringify(filter));

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

  // console.log("fffffffffffffffffffffff");
  // console.log("fffffffffffffffffffffff");
  // console.log("sean_log filter?.filterOff: " + JSON.stringify(filter?.filterOff));

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

    console.log("yyyyyyyyyyyyyyyyyyyyy");
    console.log("yyyyyyyyyyyyyyyyyyyyy");
    console.log("sean_log posts: " + JSON.stringify(posts));
  } else {
    const postQuery: Prisma.PostWhereInput = buildPostFilter(filter!.filterJson);

    console.log("pppppppppppppppppp");
    console.log("qqqqqqqqqqqqqqqqqqq");
    console.log("sean_log postQuery: " + JSON.stringify(postQuery));
    posts = await prisma.post.findMany({
      where: postQuery,
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
        <HomeClient posts={posts} filter={filter} />
      ) : (
        <p>No post to display</p>
      )}
    </>
  );
}
