'use server';

import prisma from "@/lib/prisma";
// import { auth } from "@/auth";

export const createMessageAction = async (prevState: any,formData: FormData) => {

    // const session = await auth();
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    
    let chatId = formData.get('convoId')!.toString();
    let text = formData.get('msg')!.toString();
    let userId = formData.get('userId')!.toString();
    let userName = formData.get('userName')!.toString();

    try {
        const convoMessage = await prisma.message.create({
            data: {
                chatId,
                text,
                userId,
                userName
            }
        })

        return { 
            status: 'success', 
            message: 'Message sent successfully!',
            convoMessage,
        };
    } catch (error) {
        return { 
            status: 'error', 
            message: 'Failed to send message. Please try again later. ' + error 
        };
    }
} 