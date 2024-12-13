import prisma from "./index";

export async function sendExistingChatMessage({
  text,
  userId,
  userName,
  chatId,
}: any) {
  const message = await prisma.message.create({
    data: {
      text,
      userId,
      userName,
      chatId,
    },
  });

  return message;
}

export async function createChatSendMessage({
  chatId,
  // userIds: number[],
  userId,
  messageText,
  userName,
}: any) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // If chat doesn't exist, create it and add user associations
      // Create the chat

      console.log('cccccccccccccccccccc');
      console.log('cccccccccccccccccccc');
      console.log('sssssssssssssssssssssssss');
      console.log('mmmmmmmmmmmmmmmmmm');
      console.log('sean_log chatId: ' + JSON.stringify(chatId));
      console.log('sean_log userId: ' + JSON.stringify(userId));
      console.log('sean_log messageText: ' + JSON.stringify(messageText));
      console.log('sean_log userName: ' + JSON.stringify(userName));

      await tx.chat.create({
        data: {
          id: chatId,
        },
      });

      const participantsArrays = chatId.split(",");

      // Create UserChat entries for all provided users
      // await tx.userChat.createMany({
      //   data: participantsArrays.map((userId: string) => ({
      //     userId,
      //     chatId,
      //   })),
      // });

      // DON'T USE THIS!
      // Create the message in the chat
      //   const message = await tx.message.create({
      //     data: {
      //       text: messageText,
      //       userName,
      //       userId, // Assumes the first user is the sender
      //       chatId,
      //     },
      //   });


      // Try this again
      // const message = await sendExistingChatMessage({
      //   data: {
      //     messageText,
      //     chatId,
      //     userId,
      //     userName,
      //   },
      // });

      return "message";
    });

    return result;
  } catch (error) {
    console.error("Error sending group message:", error);
    throw error;
  }
}

export async function sendIfNewChatMessage({
  chatId,
  // userIds: number[],
  messageText,
  userName,
}: any) {
  try {
    // Start a transaction to ensure atomic operations
    const result = await prisma.$transaction(async (tx) => {
      // First, check if the chat exists
      let chat = await tx.chat.findUnique({
        where: { id: chatId },
      });

      // If chat doesn't exist, create it and add user associations
      if (!chat) {
        // Create the chat
        chat = await tx.chat.create({
          data: {
            id: chatId,
          },
        });

        // Create UserChat entries for all provided users
        await tx.userChat.createMany({
          data: userIds.map((userId) => ({
            userId,
            chatId: chatId,
          })),
        });
      }

      // Create the message in the chat
      const message = await tx.message.create({
        data: {
          text: messageText,
          userName: userName,
          userId: userIds[0], // Assumes the first user is the sender
          chatId: chatId,
        },
      });

      return message;
    });

    return result;
  } catch (error) {
    console.error("Error sending group message:", error);
    throw error;
  } finally {
    // Always disconnect the Prisma client
    await prisma.$disconnect();
  }
}
