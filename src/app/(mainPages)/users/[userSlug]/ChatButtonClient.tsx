
import Link from 'next/link'
import React from 'react'

function ChatButtonClient({privateChatId}: any) {
  return (
    <div>
        <p>ChatButtonClient</p>    
        <p>{privateChatId}</p>
        <Link href={`/chat/${privateChatId}`}>Chat</Link>
    </div>
  )
}

export default ChatButtonClient