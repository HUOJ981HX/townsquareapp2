"use server";

import prisma from "@/lib/prisma";
import {
  createChatSendMessage,
  sendExistingChatMessage,
} from "@/lib/prisma/chat";
// import { auth } from "@/auth";

export const createMessageAction = async (
  context: any,
  prevState: any,
  formData: FormData
) => {
  const { convo, convoId, sessionUserId, sessionUserName } = context;
  // const session = await auth();
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const text = formData.get("msg")!.toString();

  try {
    // const convoMessage = await prisma.message.create({
    //     data: {
    //         chatId,
    //         text,
    //         userId,
    //         userName
    //     }
    // })

    console.log("cccccccccccccccccccc");
    console.log("mmmmmmmmmmmmmmmmmm");
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log('sean_log convo: ' + JSON.stringify(convo));
    console.log('sean_log convoId: ' + JSON.stringify(convoId));
    console.log('sean_log sessionUserId: ' + JSON.stringify(sessionUserId));
    console.log('sean_log sessionUserName: ' + JSON.stringify(sessionUserName));
    console.log('sean_log text: ' + JSON.stringify(text));

    let messageResult = null;

    if (convo) {
      console.log("sean_log haveConvo sendExistingChatMessage: ");
      messageResult = await sendExistingChatMessage({
        messageText: text,
        chatId: convoId,
        userId: sessionUserId,
        userName: sessionUserName,
      });
    } else {
      console.log("sean_log no Convo createChatSendMessage: ");

      messageResult = await createChatSendMessage({
        chatId: convoId,
        userId: sessionUserId,
        messageText: text,
        userName: sessionUserName,
      });
    }

    return {
      status: "success",
      message: "Message sent successfully!",
      result: messageResult,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to send message. Please try again later. " + error,
    };
  }
};
