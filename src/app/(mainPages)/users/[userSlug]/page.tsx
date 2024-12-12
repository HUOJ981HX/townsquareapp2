import Link from "next/link";
import Image from "next/image";
import Users from "@/app/components/users/Users";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import GroupForm from "./GroupFormClient";
import { getPrivateChatId } from "@/helper/realtime/chat";

export default async function UserPage({ params }: any) {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  console.log("uuuuuuuuuuuuuuuuuuuuu");
  console.log("iiiiiiiiiiiiiiiiiii");
  console.log("sean_log SESSION: " + JSON.stringify(session));
  // const privateUserId = session?.user?.privateId;

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
      userId: sessionUserId,
    },
    include: {
      userGroups: true,
    },
  });

  const handleChat = async () => {
    if (user && session) {
      const privateChatId = getPrivateChatId([
        session!.user!.privateId!,
        user?.privateId,
      ]);

      console.log('cccccccccccccccccccc');
      console.log('mmmmmmmmmmmmmmmmmm');
      console.log('sean_log privateChatId: ' + JSON.stringify(privateChatId));
      
      // const existingChat = await prisma.chat.findFirst({
      //   where: {
      //     privateId: privateChatId,
      //   },
      // });
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <p>{user?.username}</p>
          <p>{user?.filterableUserAttributes?.age}</p>
          <p>{user?.filterableUserAttributes?.gender}</p>
        </div>
        <Button onClick={() => handleChat()}>Chat</Button>
        <GroupForm userSlug={userSlug} groups={groups} />
      </div>
    </>
  );
}
