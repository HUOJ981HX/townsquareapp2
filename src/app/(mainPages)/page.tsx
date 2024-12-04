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

  console.log("fffffffffffffffffffffff");
  console.log("fffffffffffffffffffffff");
  console.log("sean_log filter: " + JSON.stringify(filter));

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

    console.log("cccccccccccccccccccc");
    console.log("cccccccccccccccccccc");
    console.log("sean_log cleanedFilter: " + JSON.stringify(cleanedFilter));
    const {
      filterablePostAttributesFilters,
      ...cleanFilterablePostAttributes
    } = cleanedFilter.filterablePostAttributes;

    console.log('eeeeeeeeeeeeeeeeeeeeee');
    console.log('eeeeeeeeeeeeeeeeeeeeee');
    // console.log("sean_log filterablePostAttributesFilters: " + JSON.stringify(filterablePostAttributesFilters));
    // console.log("sean_log cleanFilterablePostAttributes: " + JSON.stringify(cleanFilterablePostAttributes));
    console.log('sean_log cleanedFilter: ' + JSON.stringify(cleanedFilter));


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
    // }

    return (
      <>{posts ? <HomeClient posts={posts} /> : <p>No post to display</p>}</>
    );
  }
}
