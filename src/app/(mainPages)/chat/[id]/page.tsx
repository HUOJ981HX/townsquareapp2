import React from "react";
import prisma from "@/lib/prisma";
import ConvoClient from "./ConvoClient";
import { auth } from "@/auth";

async function ConvoPage({ params }: any) {

    const session = await auth();

  const { id } = await params;

  const convo = await prisma.chat.findFirst({
    where: {
      id,
    },
    include: {
      messages: true,
      userChats: true
    },
  });

  return (
    <>
      {/* <div>
        {convo?.messages.map((msg) => (
          <div key={msg.id}>
            <p>
              {msg.text} - {msg.userName}
            </p>
          </div>
        ))}
      </div> */}
      <ConvoClient convo={convo} session={session}/>
    </>
  );
}

export default ConvoPage;
