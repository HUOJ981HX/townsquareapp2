"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export const sendMessage = async ({ messageObj, chatId, channel }: any) => {
  try {
    console.log('jjjjjjjjjjjjjjjjjjj');
    console.log('sean_log messageObj: ' + JSON.stringify(messageObj));
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
                create: [{ userId: senderId }, { userId: recipientId }],
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
