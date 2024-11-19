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
      <ClientErrorButton />
      <PostForm action={createPostAction} />
      <Posts posts={posts} />
    </div>
  );
}
