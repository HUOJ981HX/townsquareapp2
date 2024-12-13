"use server";

import { pusherServer } from "../pusher";
import prisma from "./index";

export async function createOrSendChatMessage(chatObj: {
  chatId: any;
  userId: any;
  messageText: any;
  userName: any;
}) {
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatObj.chatId,
    },
  });

  if (chat) {
    // console.log(`Chat found: ${chat.name}`);
    sendExistingChatMessage(chatObj);
  } else {
    createChatSendMessage(chatObj);
  }
}

export async function sendExistingChatMessage({
  messageText,
  userId,
  userName,
  chatId,
  tx,
}: any) {
  console.log("wwwwwwwwwwwwwwwwwwwwwww");
  console.log("ttttttttttttttttttt");
  console.log("fffffffffffffffffffffff");
  console.log("sean_log messageText: " + JSON.stringify(messageText));
  console.log("sean_log userId: " + JSON.stringify(userId));
  console.log("sean_log userName: " + JSON.stringify(userName));
  console.log("sean_log chatId: " + JSON.stringify(chatId));
  const prismaClient = tx || prisma;

  const message = await prismaClient.message.create({
    data: {
      text: messageText,
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

      console.log("cccccccccccccccccccc");
      console.log("cccccccccccccccccccc");
      console.log("sssssssssssssssssssssssss");
      console.log("mmmmmmmmmmmmmmmmmm");

      await tx.chat.create({
        data: {
          id: chatId,
        },
      });

      const participantsArrays = chatId.split(",");

      console.log("1111111111111111111111");
      console.log(
        "sean_log participantsArrays: " + JSON.stringify(participantsArrays)
      );

      // Create UserChat entries for all provided users
      const userChatResult = await tx.userChat.createMany({
        data: participantsArrays.map((userId: string) => ({
          userId: parseInt(userId),
          chatId,
        })),
      });

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

      console.log("2222222222222222");
      console.log("sean_log userChatResult: " + JSON.stringify(userChatResult));
      console.log(
        "sean_log All parems for null: " +
          JSON.stringify({
            messageText,
            chatId,
            userId,
            userName,
          })
      );

      // Try this again
      const message = await sendExistingChatMessage({
        messageText,
        chatId,
        userId,
        userName,
        tx,
      });

      // console.log("3333333333333333");
      // console.log("sean_log message: " + JSON.stringify(message));

      return message;
    });

    console.log("rrrrrrrrrrrrrrrrrrr");
    console.log("rrrrrrrrrrrrrrrrrrr");
    console.log("sean_log result: " + JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error creating/sending message message:", error);
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

export async function createOrFindChatAndSendMessage(
  userIds: string[],
  messageText: string,
  senderUserId: string
) {
  if (!userIds.includes(senderUserId)) {
    userIds.push(senderUserId);
  }
  // Sort user IDs to ensure consistent chat matching
  const sortedUserIds = userIds.sort();
  console.log("sssssssssssssssssssssssss");
  console.log("uuuuuuuuuuuuuuuuuuuuu");
  console.log("iiiiiiiiiiiiiiiiiii");
  console.log("sean_log sortedUserIds: " + JSON.stringify(sortedUserIds));

  // Transaction to ensure atomic operations
  return prisma.$transaction(async (tx) => {
    // Find existing chat with exactly these users
    const existingChat = await tx.chat.findMany({
      where: {
        userChats: {
          every: {
            userId: { in: sortedUserIds },
          },
          // Ensure the number of users matches exactly
          some: {
            userId: { in: sortedUserIds },
          },
        },
      },
      include: {
        userChats: true,
      },
    });

    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log("sean_log existingChat: " + JSON.stringify(existingChat));

    // let chatId: string;

    // if (existingChat) {

    //   console.log('eeeeeeeeeeeeeeeeeeeeee');
    //   console.log('eeeeeeeeeeeeeeeeeeeeee');
    //   console.log('cccccccccccccccccccc');
    //   // Use existing chat
    //   chatId = existingChat.id;
    // } else {

    //   console.log('nnnnnnnnnnnnnnnnnnnnnnnnn');
    //   console.log('nnnnnnnnnnnnnnnnnnnnnnnnn');
    //   console.log('cccccccccccccccccccc');
    //   // Create new chat
    //   const newChat = await tx.chat.create({
    //     data: {
    //       name: `Group Chat (${new Date().toLocaleString()})`,
    //       userChats: {
    //         create: sortedUserIds.map(userId => ({
    //           user: { connect: { id: userId } }
    //         }))
    //       }
    //     }
    //   });
    //   chatId = newChat.id;
    // }

    // // Create message in the chat
    // const message = await tx.message.create({
    //   data: {
    //     text: messageText,
    //     userId: senderUserId,
    //     userName: (await tx.user.findUnique({
    //       where: { id: senderUserId },
    //       select: { username: true }
    //     }))?.username || 'Unknown User',
    //     chatId: chatId
    //   }
    // });

    // return { chat: { id: chatId }, message };

    return { chat: { id: "test" } };
  });
}

export const sendLiveMessage = async ({ messageObj, chatId, channel }: any) => {
  try {
    console.log("jjjjjjjjjjjjjjjjjjj");
    console.log("sean_log messageObj: " + JSON.stringify(messageObj));
    await pusherServer.trigger(chatId, channel, messageObj);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function sendPrivateMessageToUsers(
  senderId: string,
  recipientUserIds: string[],
  messageText: string
) {
  try {
    // Find existing one-on-one chats between the sender and each recipient
    const existingChats = await Promise.all(
      recipientUserIds.map(async (recipientId) => {
        return await prisma.chat.findFirst({
          where: {
            AND: [
              { userChats: { some: { userId: senderId } } },
              { userChats: { some: { userId: recipientId } } },
              {
                userChats: {
                  every: { user: { id: { in: [senderId, recipientId] } } },
                },
              },
            ],
            messages: { some: {} }, // Ensures it's not an empty chat
          },
          include: {
            userChats: true,
          },
        });
      })
    );

    // Process each recipient
    const results = await Promise.all(
      recipientUserIds.map(async (recipientId, index) => {
        let chatId: string;

        // If no existing chat found, create a new one
        if (!existingChats[index]) {
          const newChat = await prisma.chat.create({
            data: {
              userChats: {
                create: [
                  { userId: parseInt(senderId) },
                  { userId: parseInt(recipientId) },
                ],
              },
            },
          });
          chatId = newChat.id;
        } else {
          // Use existing chat
          chatId = existingChats[index].id;
        }

        // Create the message
        const message = await prisma.message.create({
          data: {
            text: messageText,
            userId: senderId,
            userName: await getUsernameById(senderId), // You'll need to implement this
            chatId: chatId,
          },
        });

        return {
          recipientId,
          chatId,
          messageId: message.id,
        };
      })
    );

    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log("sean_log results: " + JSON.stringify(results));
    return results;
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
}

export async function sendMessageToGroupChat(
  senderId: string,
  recipientUserIds: string[],
  messageText: string
) {
  try {
    // Include the sender in the list of users for the chat
    const allUserIds = Array.from(new Set([senderId, ...recipientUserIds]));

    // If no existing group chat, create a new one
    const newGroupChat = await prisma.chat.create({
      data: {
        name: `Group Chat (${new Date().toLocaleString()})`,
        userChats: {
          create: allUserIds.map((userId) => ({
            userId: userId,
          })),
        },
      },
    });
    let chatId: string = newGroupChat.id;
    // Create the message in the group chat
    const message = await prisma.message.create({
      data: {
        text: messageText,
        userId: senderId,
        userName: "Bob",
        chatId: chatId,
      },
    });

    return {
      chatId,
      messageId: message.id,
      users: allUserIds,
    };
  } catch (error) {
    console.error("Error creating group chat and sending message:", error);
    throw error;
  }
}

// Helper function to get username (you'll need to implement this based on your User model)
async function getUsernameById(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });
  return user?.username || "Unknown User";
}
