"use server";

// import { createOrFindChatAndSendMessage, sendMessageToGroupChat } from "@/helper/chat";
import { MassChatType } from "@/types";
import { auth } from "@/auth";
import { createOrFindChatAndSendMessage } from "@/lib/prisma/chat";

export const groupMessageAction = async (
  context: any,
  prevState: any,
  formData: FormData
) => {
  const session = await auth();
  const userId = session?.user?.id;

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const users = context.allGroupUsers.map((user: any) => {
    return user.id;
  });

  console.log("uuuuuuuuuuuuuuuuuuuuu");
  console.log("iiiiiiiiiiiiiiiiiii");
  console.log("sean_log users: " + JSON.stringify(users));

  const message = formData.get("msg") as string;

  if (userId && message) {
    if (context.messageType === MassChatType.Group) {
      const groupChat = await createOrFindChatAndSendMessage(users, message, userId );

      console.log('ggggggggggggggggggggggg');
      console.log('cccccccccccccccccccc');
      console.log('sean_log groupChat: ' + JSON.stringify(groupChat));

      try {
        return {
          status: "success",
          message: "Message sent successfully!",
          groupChat,
        };
      } catch (error) {
        return {
          status: "error",
          message: "Failed to add to group. Please try again later. " + error,
        };
      }
    }
  }

  return {
    status: "error",
    message: "Failed to add to group. Please try again later. ",
  };
};
