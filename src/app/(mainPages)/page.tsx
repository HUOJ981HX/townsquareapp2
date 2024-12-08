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

    console.log('ttttttttttttttttttt');
    console.log('ttttttttttttttttttt');
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
