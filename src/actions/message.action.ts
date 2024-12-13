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
  const { chatExist, convoId, sessionUserId, sessionUserName } = context;
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
console.log('cccccccccccccccccccc');
console.log('eeeeeeeeeeeeeeeeeeeeee');
console.log('eeeeeeeeeeeeeeeeeeeeee');
    console.log('sean_log convo: ' + JSON.stringify(chatExist));

    let messageResult = null;

    const messageObj = {
        messageText: text,
        chatId: convoId,
        userId: sessionUserId,
        userName: sessionUserName,
    }

    console.log('sean_log messageObj: ' + JSON.stringify(messageObj));

    if (chatExist) {
      console.log("sean_log haveConvo sendExistingChatMessage: ");
      messageResult = await sendExistingChatMessage(messageObj);
    } else {
      console.log("sean_log no Convo createChatSendMessage: ");

      messageResult = await createChatSendMessage(messageObj);
    }

    return {
      status: "success",
      message: "Message sent successfully!",
      result: messageResult,
      chatId: convoId
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to send message. Please try again later. " + error,
    };
  }
};
