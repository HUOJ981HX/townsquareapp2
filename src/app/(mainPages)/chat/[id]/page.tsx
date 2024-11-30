import React from "react";
import prisma from "@/lib/prisma";

async function ConvoPage({ params }: any) {
  const { id } = params;

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
    <div>
      {convo?.messages.map((msg) => (
        <div>
          <p>
            {msg.text} - {msg.userName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ConvoPage;
