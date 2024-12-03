import Link from "next/link";
import Image from "next/image";
import Users from "@/app/components/users/Users";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import GroupForm from "./GroupFormClient";

export default async function UserPage({ params }: any) {
  const session = await auth();
  const userId = session?.user?.id;

  const userSlug = (await params).userSlug;

  const user = await prisma.user.findFirst({
    where: {
      id: userSlug,
    },
    include: {
      filterableUserAttributes: true, // Join and include FilterableUserAttributes
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      userId,
    },
    include: {
      userGroups: true, 
    },
  });



  return (
    <>
      <div className="flex">
        <div>
          <p>{user?.username}</p>
          <p>{user?.filterableUserAttributes?.age}</p>
          <p>{user?.filterableUserAttributes?.gender}</p>
        </div>
        <GroupForm userSlug={userSlug} groups={groups} />
      </div>
    </>
  );
}
