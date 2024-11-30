
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
import HomeClient from "./HomeClient";

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  const filter = await prisma.filters.findFirst({
    where: {
      userId: session?.user?.id!
    },
    include: {
      filterableUserAttributes: true,
      filterablePostAttributes: true,
    }
  });

  let posts = null;

  if(filter && filter.filterOff) {
    posts = await prisma.post.findMany();
  }

  else {
    const cleanedFilter = cleanObject(filter, ["id", "userId", "postId", "filtersId"]);

    const postQueryObj: Prisma.PostWhereInput = {
      filterablePostAttributes: {
        AND: cleanedFilter.filterablePostAttributes
      },
      user: {
        filterableUserAttributes: cleanedFilter.filterableUserAttributes
      }
    }
  
    posts = await prisma.post.findMany({
      where: postQueryObj,
    });
  }

  return (
    <>
      {
        posts
          ?
          <HomeClient posts={posts} />
          :
          <p>No post to display</p>
      }
    </>

  );
}
