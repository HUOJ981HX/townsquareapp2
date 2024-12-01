'use server';

import { pusherServer } from "@/lib/pusher";


export const sendMessage = async ({ messageObj, chatId, channel }: any) => {
    try {
        await pusherServer.trigger(chatId, channel, messageObj);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
