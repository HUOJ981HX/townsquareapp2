import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostAction } from "../actions/post";
import PostForm from "./components/PostForm";

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  console.log('1111111111111111111111');
  console.log(session);
  return (
    <div>

      <PostForm action={createPostAction} />
    </div>
  );
}
