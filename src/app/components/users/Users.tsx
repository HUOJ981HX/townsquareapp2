import prisma from '@/lib/prisma'
import Link from 'next/link';
import React from 'react'

async function Users({ users }: any) {
    return (
        <div>
            {users.map((user: any, index: number) => (
                <Link href={`/users/${user.id}`} key={index}>
                    <p>{user.username}</p>
                    <p>{user.filterableUserAttributes.age}</p>
                </Link> 
            ))}
        </div>
    )
}

export default Users