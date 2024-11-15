import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/authenticate");

  console.log('1111111111111111111111');
  console.log(session);
  return (
    <div>
      <p>Post page</p>
    </div>
  );
}
