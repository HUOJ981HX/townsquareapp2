import prisma from '@/lib/prisma'
import React from 'react'
import { auth } from "@/auth";
import Link from 'next/link';

enum ChatSubHeaders {
  MyChat = "MyChat",
  Halls = "Halls"
}

async function Chat() {

  const session = await auth();

  const convos = await prisma.conversation.findMany({
    where: {
      userId: session?.user?.id!
    },
    include: {
      messages: {
        take: 1, 
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  console.log('cccccccccccccccccccc');
  console.log('cccccccccccccccccccc');
  console.log('sean_log convos: ' + JSON.stringify(convos));

  return (
    <div>
      <h2>Your chat</h2>
      {convos.map((convo: any, index: number) => (
        <div className='p-4 border-[solid]'>
          <Link href={`/chat/${convo.id}`}>{convo.messages[0].text}</Link>
        </div>
      ))}
    </div>
  )
}

export default Chat