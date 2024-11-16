import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostAction } from "../actions/post";
import PostForm from "./components/post/PostForm";
import Posts from "./components/post/Posts";
import prisma from "@/libs/prisma"

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  console.log('1111111111111111111111');
  console.log(session);
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      userId: true,
      image: true,
      createdAt: true,
      mood: true,
    }
  })

  return (
    <div>
      <PostForm action={createPostAction} />
      <Posts posts={posts} />
    </div>
  );
}
