"use server";

// import { createOrFindChatAndSendMessage, sendMessageToGroupChat } from "@/helper/chat";
import { MassChatType } from "@/types";
import { auth } from "@/auth";
import { createChatSendMessage, createOrFindChatAndSendMessage, createOrSendChatMessage, sendExistingChatMessage } from "@/lib/prisma/chat";
import { getPrivateChatId } from "@/helper/chat";
import prisma from "@/lib/prisma";

export const groupMessageAction = async (
  context: any,
  prevState: any,
  formData: FormData
) => {
  const session = await auth();
  const sessionUserId = session?.user?.id;
  const sessionUserName = session?.user?.name;

  console.log('sssssssssssssssssssssssss');
  console.log('sssssssssssssssssssssssss');
  console.log('sssssssssssssssssssssssss');
  console.log('sssssssssssssssssssssssss');
  console.log('sean_log context: ' + JSON.stringify(context));

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const users = context.allGroupUsers.map((user: any) => {
    return user.id;
  });

  const userIdsArray = context.allGroupUsers.map((user: any) => user.id);

  console.log('sean_log userIdsArray: ' + JSON.stringify(userIdsArray));
  // console.log('cccccccccccccccccccc');
  // console.log('xxxxxxxxxxxxxxxxxxxxxx');
  // console.log("sean_log context: " + JSON.stringify(context));

  const message = formData.get("msg") as string;

  if (sessionUserId && message) {
    if (context.messageType === MassChatType.Group) {

      // const chatId = getPrivateChatId(userIdsArray.push(sessionUserId));
      const chatId = getPrivateChatId([...userIdsArray, sessionUserId]);

      const chatObj = {
        chatId,
        userId: sessionUserId,
        messageText: message,
        userName: sessionUserName
      };

      console.log('ggggggggggggggggggggggg');
      console.log('ggggggggggggggggggggggg');
      console.log('cccccccccccccccccccc');
      console.log('oooooooooooooooo');

      await createOrSendChatMessage(chatObj);

      // const groupChat = await createOrFindChatAndSendMessage(users, message, sessionUserId );

      // console.log('ggggggggggggggggggggggg');
      // console.log('cccccccccccccccccccc');
      // console.log('sean_log groupChat: ' + JSON.stringify(groupChat));

      try {
        return {
          status: "success",
          message: "Group message sent successfully!",
          groupChat: chatId
        };
      } catch (error) {
        return {
          status: "error",
          message: "Failed to add to group. Please try again later. " + error,
        };
      }
    }
    else {
      const chatIdsArray = userIdsArray.flatMap((id: number) => {
        if (id !== 2) {
          return [getPrivateChatId([2, id])];
        }
        return [];
      });


      for (const chatId of chatIdsArray) {
        const chatObj = {
          chatId,
          userId: sessionUserId,
          messageText: message,
          userName: sessionUserName
        };

        await createOrSendChatMessage(chatObj);

        // const chat = await prisma.chat.findUnique({
        //     where: {
        //         id: chatId,
        //     },
        // });

        // if (chat) {
        //     // console.log(`Chat found: ${chat.name}`);
        //     sendExistingChatMessage(chatObj);
        // } else {
        //     createChatSendMessage(chatObj);
        // }
      }

      console.log('cccccccccccccccccccc');
      console.log('iiiiiiiiiiiiiiiiiii');
      console.log('iiiiiiiiiiiiiiiiiii');
      console.log('sean_log chatIdsArray: ' + JSON.stringify(chatIdsArray));

      return {
        status: "success",
        message: "Individual messages sent successfully!",
      }
    }
  }

  return {
    status: "error",
    message: "Failed to add to group. Please try again later. ",
  };
};
