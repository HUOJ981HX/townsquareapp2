import React from "react";
import prisma from "@/lib/prisma";
import ConvoClient from "./ConvoClient";
import { auth } from "@/auth";

async function ConvoPage({ params }: any) {

    const session = await auth();

  const { id } = await params;

  const convo = await prisma.conversation.findFirst({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });

  console.log("lllllllllllllllllll");
  console.log("sean_log convo: " + JSON.stringify(convo));

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
      <ConvoClient convoId={convo!.id} loadedMessages={convo?.messages} session={session}/>
    </>
  );
}

export default ConvoPage;
