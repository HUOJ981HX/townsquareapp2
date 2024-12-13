"use client";

import React, { useState, useActionState, useEffect } from "react";
import prisma from "@/lib/prisma";
import { createMessageAction } from "@/actions/message.action";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { sendLiveMessage } from "@/helper/realtime/chat";
import { sendChatNotification } from "@/helper/realtime/notification";


function ConvoClient({ convo, convoParamId, session }: any) {

  const createMessageActionWithData = createMessageAction.bind(null, {
    convo,
    convoId: convoParamId,
    sessionUserId: session?.user?.id!,
    sessionUserName: session?.user?.name!
  });

  const [state, formAction] = useActionState(createMessageActionWithData, {
    status: "",
    message: "",
  });

  const [messages, setMessages] = useState(convo?.messages);

  useEffect(() => {
    pusherClient.subscribe(convoParamId);
    // pusherClient.subscribe("8cd435e1-6190-4553-b965-512d37bdac0c");

    pusherClient.bind("convo-message", (data: any) => {
      setMessages((prev: any) => [...prev, data]);
    });

    return () => pusherClient.unsubscribe(convoParamId);
    // return () => pusherClient.unsubscribe("8cd435e1-6190-4553-b965-512d37bdac0c");
  }, []);

  useEffect(() => {
    if (state.status === "success") {

      console.log('cccccccccccccccccccc');
      console.log('sssssssssssssssssssssssss');
      console.log('oooooooooooooooo');
      console.log('sean_log result: ' + JSON.stringify(state.result));
      
      // sendLiveMessage({
      //   messageObj: state.convoMessage,
      //   chatId: state.convoMessage?.chatId,
      //   channel: "convo-message",
      // });

      const userIds = convo?.userChats
        .map((chat: any) => chat.userId)
        .filter((userId: string) => userId !== session?.user?.id);

      sendChatNotification({
        noticeObj: {
          text: `${session?.user?.name!} sent a message in chat`,
        },
        channel: "notification",
        userIdArray: userIds,
      });

      // await sendLiveMessage(state.convoMessage.text)
    } else if (state.status === "error") {
      console.log("eeeeeeeeeeeeeeeeeeeeee");
      console.log("sean_log error: " + JSON.stringify(state.message));
    }
  }, [state]);

  console.log("cccccccccccccccccccc");
  console.log("cccccccccccccccccccc");
  console.log("sean_log convo: " + JSON.stringify(convo));

  return (
    <>
      <div>
        <p>Participants</p>
        <div className="flex">
          {convo?.userChats.map((chat: any) => (
            <p>{chat.user.username}, </p>
          ))}
        </div>
        <p>--------</p>
      </div>

      <div>
        {messages?.map((msg: any) => (
          <div key={msg.id}>
            <p>
              {msg.text} - {msg.userName}
            </p>
          </div>
        ))}
      </div>

      <form action={formAction}>
        {/* <input type="hidden" id="convoId" name="convoId" value={convo!.id} /> */}
        {/* <input
          type="hidden"
          id="userId"
          name="userId"
          value={session?.user?.id!}
        /> */}
        {/* <input
          type="hidden"
          id="userName"
          name="userName"
          value={session?.user?.name!}
        /> */}
        <input type="text" id="msg" name="msg" />
        <Button>Submit</Button>
      </form>
    </>
  );
}

export default ConvoClient;
