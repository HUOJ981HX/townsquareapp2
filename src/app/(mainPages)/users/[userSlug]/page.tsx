import Link from "next/link";
import Image from "next/image";
import Users from "@/app/components/users/Users";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function UserPage({ params }: any) {
  const userSlug = (await params).userSlug;

  const user = await prisma.user.findFirst({
    where: {
      id: userSlug,
    },
    include: {
      filterableUserAttributes: true, // Join and include FilterableUserAttributes
    },
  });

  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("sean_log user: " + JSON.stringify(user));

  return (
    <>
      <div className="flex">
        <div>
          <p>{user?.username}</p>
          <p>{user?.filterableUserAttributes?.age}</p>
          <p>{user?.filterableUserAttributes?.gender}</p>
        </div>
        <Button>add to group</Button>
      </div>
    </>
  );
}
