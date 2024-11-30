
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostForm from "../components/posts/PostForm";
import prisma from "@/lib/prisma"
import ClientErrorButton from "../components/Button";
import { Prisma } from "@prisma/client";
import { cleanObject, removeEmptyObjValues } from "@/helper";
import { Gender, Mood } from "@/types";
import { filterPostRoles } from "@/helper/post";
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

  console.log('fffffffffffffffffffffff');
  console.log('fffffffffffffffffffffff');
  console.log('sean_log filter: ' + JSON.stringify(filter));

  if(filter && filter.filterOff) {

    console.log('1111111111111111111111');
    console.log('sean_log filterOff: ' + filter.filterOff);
    posts = await prisma.post.findMany();
  }

  else {
    console.log('2222222222222222');
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
