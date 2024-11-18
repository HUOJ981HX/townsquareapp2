import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div>
        <Link href="/">Posts</Link>
        <Link href="/users">Users</Link>
        <Link href="/chat">Chat</Link>
        <p>Setting</p>
    </div>
  )
}

export default Footer