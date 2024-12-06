import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
import HomeClient from "./HomeClient";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  const filter = await prisma.filters.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  let posts = null;

  // posts = await prisma.post.findMany();

  console.log('fffffffffffffffffffffff');
  console.log('fffffffffffffffffffffff');
  console.log('sean_log filter: ' + JSON.stringify(filter));

  if (filter && !filter.length && !filter[0]?.filterPostJson) {
    posts = await prisma.post.findMany();
  } else {

    const postQuery: any = filter[0].filterPostJson

    console.log('pppppppppppppppppp');
    console.log('qqqqqqqqqqqqqqqqqqq');
    console.log('sean_log postQuery: ' + JSON.stringify(postQuery));
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


    // const cleanedFilter = cleanObject(filter, [
    //   "id",
    //   "userId",
    //   "postId",
    //   "filtersId",
    //   "filterablePostAttributesId",
    // ]);

    // const {
    //   filterablePostAttributesFilters,
    //   ...cleanFilterablePostAttributes
    // } = cleanedFilter.filterablePostAttributes;

    // console.log("cccccccccccccccccccc");
    // console.log("cccccccccccccccccccc");
    // console.log("sean_log cleanedFilter: " + JSON.stringify(cleanedFilter));

    // const postQueryObj: Prisma.PostWhereInput = {
    //   filterablePostAttributes: {
    //     ...cleanFilterablePostAttributes,
    //     OR: filterablePostAttributesFilters,
    //   },
    //   user: {
    //     filterableUserAttributes: cleanedFilter.filterableUserAttributes,
    //   },
    // };

    // console.log("oooooooooooooooo");
    // console.log("sean_log postQueryObj: " + JSON.stringify(postQueryObj));

    // posts = await prisma.post.findMany({
    //   // where: postQueryObj,
    //   where: {
    //     filterablePostAttributes: {
    //       mood: "Happy",
    //       OR: [
    //         {
    //           postFilterDisplay:
    //             "personals > Casual, Friends, Relationship > Female, Male, nonBinary",
    //           postFilterQueryRole: "both",
    //         },
    //       ],
    //     },
    //     user: {
    //       filterableUserAttributes: {
    //         age: { gte: 27, lte: 50 },
    //         gender: {
    //           in: ["Male","Non-binary"]
    //         } 
    //       },
    //     },
    //   },
    //   include: {
    //     filterablePostAttributes: true,
    //     user: {
    //       include: {
    //         filterableUserAttributes: true,
    //       },
    //     },
    //   },
    // });


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
}
