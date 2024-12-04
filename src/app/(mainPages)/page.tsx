import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
import HomeClient from "./HomeClient";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  const filter = await prisma.filters.findFirst({
    where: {
      userId: session?.user?.id!,
    },
    include: {
      filterableUserAttributes: true,
      filterablePostAttributes: {
        include: {
          filterablePostAttributesFilters: true,
        },
      },
    },
  });

  let posts = null;

  posts = await prisma.post.findMany();

  if (filter && filter.filterOff) {
    posts = await prisma.post.findMany();
  } else {
    const cleanedFilter = cleanObject(filter, [
      "id",
      "userId",
      "postId",
      "filtersId",
      "filterablePostAttributesId",
    ]);

    const {
      filterablePostAttributesFilters,
      ...cleanFilterablePostAttributes
    } = cleanedFilter.filterablePostAttributes;

    const postQueryObj: Prisma.PostWhereInput = {
      filterablePostAttributes: {
        ...cleanFilterablePostAttributes,
        OR: filterablePostAttributesFilters,
      },
      user: {
        filterableUserAttributes: cleanedFilter.filterableUserAttributes,
      },
    };

    posts = await prisma.post.findMany({
      where: postQueryObj,
      include: {
        filterablePostAttributes: true,
        user: true
      }
    });

    return (
      <>{posts ? <HomeClient posts={posts} filter={filter} /> : <p>No post to display</p>}</>
    );
  }
}
