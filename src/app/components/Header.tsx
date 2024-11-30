import { Button } from '@/components/ui/button'
import { postCriteriaIntentType } from '@/helper/post'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex w-full justify-evenly'>

      <Link href={{
        pathname: '/',
      }}>Feed</Link>

      <Link href={{
        pathname: '/users',
      }}>Users</Link>

      <Link href={{
        pathname: '/chat',
      }}>Chat</Link>

      <Link href={{
        pathname: '/me',
      }}>Me</Link>

      <Link href={{
        pathname: '/about',
      }}>About</Link>
    </div>
  )
}

export default Header