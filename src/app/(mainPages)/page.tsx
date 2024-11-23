import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostAction } from "../../actions/post";
import PostForm from "../components/posts/PostForm";
import Posts from "../components/posts/Posts";
import prisma from "@/lib/prisma"
import ClientErrorButton from "../components/Button";

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  let queryObj = {
    description: "Exploring new opportunities in tech.",
    postFilterDisplay: {
      contains: "work > looking > Service, Manufacturing > 50-75k",
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

  const posts = await prisma.post.findMany({
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
