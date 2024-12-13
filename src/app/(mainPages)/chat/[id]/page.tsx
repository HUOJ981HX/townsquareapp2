import React from "react";
import prisma from "@/lib/prisma";
import ConvoClient from "./ConvoClient";
import { auth } from "@/auth";

async function ConvoPage({ params }: any) {

    const session = await auth();

  const { id } = await params;

  let convo = null;
  convo = await prisma.chat.findFirst({
    where: {
      id: decodeURIComponent(id),
    },
    include: {
      messages: true,
      userChats: {
        include: {
          user: true
        }
      }
    },
  });

  console.log('cccccccccccccccccccc');
  console.log('vvvvvvvvvvvvvvvvvvv');
  console.log('sean_log convo: ' + convo);

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
      <ConvoClient convo={convo} convoParamId={id} session={session}/>
    </>
  );
}

export default ConvoPage;
