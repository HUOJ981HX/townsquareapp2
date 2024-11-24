import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostAction } from "../../actions/post";
import PostForm from "../components/posts/PostForm";
import Posts from "../components/posts/Posts";
import prisma from "@/lib/prisma"
import ClientErrorButton from "../components/Button";
import { Prisma } from "@prisma/client";
import { removeEmptyObjValues } from "@/helper";

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  const filter = await prisma.filters.findFirst({
    where: {
      userId: session?.user?.id!
    }
  });

  console.log('fffffffffffffffffffffff');
  console.log('fffffffffffffffffffffff_1');
  // console.log('sean_log filter: ' + filter?.postFilter);

  console.log('sean_log ___1: ' + JSON.stringify(filter?.postFilter));
  console.log('sean_log ___2: ' + JSON.stringify(filter?.userFilter));


  // const postFilter = JSON.parse(filter?.postFilter?.toString()!);
  // const userFilter = JSON.parse(filter?.userFilter?.toString()!);

  // console.log('sean_log postFilter: ' + JSON.stringify(postFilter));
  // console.log('sean_log userFilter: ' + JSON.stringify(userFilter));

  let queryFilterObj: Prisma.PostWhereInput = {
    ...JSON.parse(JSON.stringify(filter?.postFilter)),
    user: {
      ...JSON.parse(JSON.stringify(filter?.userFilter)),
    }
  }


  let queryObj: Prisma.PostWhereInput = {
    description: "Exploring new opportunities in tech.",
    postFilterDisplay: {
      contains: "work > lookingd > Service, Manufacturing > 50-75k",
    },
    user: {
      username: "Alice",
      accountType: "Email",
      userAttributes: {
        gender: "Male",
        age: 25,
      },
    },
  };

  console.log('vvvvvvvvvvvvvvvvvvv');
  console.log('vvvvvvvvvvvvvvvvvvv');

  const wherePostFilter = removeEmptyObjValues(queryFilterObj);
  console.log('sean_log removeEmptyObjValues(queryFilterObj): ' + wherePostFilter);

  let posts = null;

  if (wherePostFilter) {
    posts = await prisma.post.findMany({
      where: wherePostFilter,
    });
  }

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
