"use client";

import React, { useState, useActionState, useEffect } from "react";
import prisma from "@/lib/prisma";
import { createMessageAction } from "@/actions/message.action";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { sendMessage } from "@/helper/chat/server";

function ConvoClient({ convoId, loadedMessages, session }: any) {
  const [state, formAction] = useActionState(createMessageAction, {
    status: "",
    message: "",
  });

  const [messages, setMessages] = useState(loadedMessages);


  useEffect(() => {
    pusherClient.subscribe(convoId);

    pusherClient.bind("convo-message", (data: any) => {

      console.log('bbbbbbbbbbbbbbbbbb');
      console.log('bbbbbbbbbbbbbbbbbb'); // bad here
      console.log('sean_log data: ' + JSON.stringify(data));

      setMessages((prev: any) => [...prev, data]);
    });

    return () => pusherClient.unsubscribe(convoId);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      sendMessage({
        messageObj: state.convoMessage,
        chatId: state.convoMessage?.chatId,
        channel: "convo-message"
      });

      // await sendMessage(state.convoMessage.text)
    } else if (state.status === "error") {
      console.log("eeeeeeeeeeeeeeeeeeeeee");
      console.log("sean_log error: " + JSON.stringify(state.message));
    }
  }, [state]);

  console.log('mmmmmmmmmmmmmmmmmm');
  console.log('eeeeeeeeeeeeeeeeeeeeee');
  console.log('sean_log messages: ' + JSON.stringify(messages));

  return (
    <>
      <div>
        {messages.map((msg: any) => (
          <div key={msg.id}>
            <p>
              {msg.text} - {msg.userName}
            </p>
          </div>
        ))}
      </div>
      <form action={formAction}>
        <input type="hidden" id="convoId" name="convoId" value={convoId} />
        <input type="hidden" id="userId" name="userId" value={session?.user?.id!} />
        <input type="hidden" id="userName" name="userName" value={session?.user?.name!} />
        <input type="text" id="msg" name="msg" />
        <Button>Submit</Button>
      </form>
    </>
  );
}

export default ConvoClient;
