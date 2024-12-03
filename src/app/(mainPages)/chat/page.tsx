import prisma from "@/lib/prisma";
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import TestButton from "./client/TestButton";


enum ChatSubHeaders {
  MyChat = "MyChat",
  Halls = "Halls",
}

async function Chat() {
  const session = await auth();
  const userId = session?.user?.id;

  const groups = await prisma.group.findMany({
    where: {
      userId,
    },
    include: {
      userGroups: true, 
    },
  });

  const convos = await prisma.chat.findMany({
    where: {
      userChats: {
        some: {
          userId: session?.user?.id!,
        },
      },
    },
    include: {
      userChats: {
        include: {
          user: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          userName: true,
          userId: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const getChatUsers = (users: any) => {
    return (
      <div className="flex">
        {users.map((user: any) => {
          return <p> {user.user.username} | </p>;
        })}
      </div>
    );
  };

  return (
    <div>
      <h2>Your chat</h2>
      <div className="flex">
        <p>test buttons</p>
        <TestButton groups={groups} />
      </div>
      {convos.map((convo: any, index: number) => (
        <div className="p-4 border-[solid]" id={convo.id}>
          <Link href={`/chat/${convo.id}`}>{convo.messages[0].text}</Link>
          {getChatUsers(convo.userChats)}
        </div>
      ))}
    </div>
  );
}

export default Chat;
