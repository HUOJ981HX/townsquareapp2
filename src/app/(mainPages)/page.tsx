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


  const filtersData = await prisma.filters.findMany({
    where: {
      userId: session?.user?.id!
    },
    include: {
      userAttributes: true, // Include all related UserAttributes
      posts: true,          // Include all related Posts
    },
  });
  
  console.log('fffffffffffffffffffffff');
  console.log('fffffffffffffffffffffff_1');
  // console.log('sean_log filter: ' + filter?.postFilter);

  console.log('sean_log filtersData_1: ' + JSON.stringify(filtersData));

  // const postFilter = JSON.parse(filter?.postFilter?.toString()!);
  // const userFilter = JSON.parse(filter?.userFilter?.toString()!);

  // console.log('sean_log postFilter: ' + JSON.stringify(postFilter));
  // console.log('sean_log userFilter: ' + JSON.stringify(userFilter));

  // let queryFilterObj: Prisma.PostWhereInput = {
  //   ...JSON.parse(JSON.stringify(filter?.postFilter)),
  //   user: {
  //     ...JSON.parse(JSON.stringify(filter?.userFilter)),
  //   }
  // }


  let queryObj: Prisma.PostWhereInput = {
    description: "Exploring new opportunities in tech.",
    postFilterDisplay: {
      contains: "work > lookingd > Service, Manufacturing > 50-75k",
    },
    fitersId: null,
    user: {
      username: "Alice",
      accountType: "Email",
      // userAttributes: {
      //   gender: "Male",
      //   age: 25,
      // },
      userAttributes: {
        some: {
            AND: [
                {
                    gender: "Male",
                },
                {
                    age: 25,
                },
            ],
        }
    },
    },
  };


  // const wherePostFilter = removeEmptyObjValues(queryFilterObj);

  let posts = null;

  // if (wherePostFilter) {
  //   posts = await prisma.post.findMany({
  //     where: wherePostFilter,
  //   });
  // }

  posts = await prisma.post.findMany({
    where: queryObj,
  });

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
