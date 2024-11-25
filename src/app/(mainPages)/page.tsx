import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostAction } from "../../actions/post";
import PostForm from "../components/posts/PostForm";
import Posts from "../components/posts/Posts";
import prisma from "@/lib/prisma"
import ClientErrorButton from "../components/Button";
import { Prisma } from "@prisma/client";
import { cleanObject, removeEmptyObjValues } from "@/helper";
import { Gender, Mood } from "@/types";
import { filterPostRoles } from "@/helper/post";

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

  console.log('fffffffffffffffffffffff');
  console.log('fffffffffffffffffffffff_1');
  // console.log('sean_log filter: ' + filter?.postFilter);

  console.log('sean_log ___1: ' + JSON.stringify(filter));

  // let queryFilterObj: Prisma.PostWhereInput = {
  //   ...JSON.parse(JSON.stringify(filter?.postFilter)),
  //   user: {
  //     ...JSON.parse(JSON.stringify(filter?.userFilter)),
  //   }
  // }

  const cleanedFilter = cleanObject(filter, ["id", "userId", "postId", "filtersId"]);

  const postQueryObj: Prisma.PostWhereInput = {
    filterablePostAttributes: {
      AND: cleanedFilter.filterablePostAttributes
    },
    user: {
      filterableUserAttributes: cleanedFilter.filterableUserAttributes
    }
  } 

  console.log('sean_log postQueryObjpostQueryObj__: ' + JSON.stringify(postQueryObj));

  // let queryObj: Prisma.PostWhereInput = {
  //   filterablePostAttributes: {
  //     AND: [
  //       {
  //         mood: Mood.Angry,
  //         postFilterQueryRole: filterPostRoles.PROVIDER,
  //         postFilterDisplay: 'work > Manufacturing, Service > 50-75kz'
  //       }
  //     ]
  //   },
  //   user: {
  //     filterableUserAttributes: {
  //       gender: Gender.Female,
  //       age: 80,
  //     },
  //   },
  // };


  // const wherePostFilter = removeEmptyObjValues(queryFilterObj);

  let posts = null;

  // if (queryObj) {
  // }

  posts = await prisma.post.findMany({
    where: postQueryObj,
  });

  console.log('sean_log posts___1: ' + JSON.stringify(posts));

  // const posts = await prisma.post.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     userId: true,
  //     image: true,
  //     createdAt: true,
  //     mood: true,
  //   }
  // })

  return (
    <div>
      <ClientErrorButton />
      <PostForm action={createPostAction} />
      <Posts posts={posts} />
    </div>
  );
}
