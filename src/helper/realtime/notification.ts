"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export const sendChatNotification = async ({
  noticeObj,
  userIdArray,
  channel,
}: any) => {
  try {
    await Promise.all(
      userIdArray.map((userId: string) => {

        console.log('mmmmmmmmmmmmmmmmmm');
        console.log('mmmmmmmmmmmmmmmmmm');
        console.log('sean_log userId: ' + JSON.stringify(userId));
        console.log('sean_log channel: ' + JSON.stringify(channel));
        console.log('sean_log noticeObj: ' + JSON.stringify(noticeObj));
          return pusherServer.trigger(userId, channel, noticeObj)
      }
      )
    );

    console.log('oooooooooooooooo');
    console.log('oooooooooooooooo');
    console.log('sean_log noticeObj: ' + JSON.stringify(noticeObj));
    // await pusherServer.trigger("8cd435e1-6190-4553-b965-512d37bdac0c", "convo-message", noticeObj)

  } catch (error: any) {
    console.log('sean_log sendChatNotification_error: ' + JSON.stringify(error));
    throw new Error(error.message);
  }
};


// export const sendMessage = async ({ messageObj, chatId, channel }: any) => {
//     console.log('ttttttttttttttttttt');
//     try {
//       await pusherServer.trigger(chatId, channel, messageObj);
//     } catch (error: any) {
//         console.log('eeeeeeeeeeeeeeeeeeeeee');
//         console.log('sean_log error: ' + JSON.stringify(error));
//       throw new Error(error.message);
//     }
//   };