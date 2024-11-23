import prisma from '@/lib/prisma'
import Link from 'next/link';
import React from 'react'

async function Users({ users }: any) {
    // const users = await prisma.user.findMany({
    //     where: {
    //         username: "Cindy",
    //         accountType: "Google",
    //         userAttributes: {
    //             is: {
    //                 //   relationship: "looking for someone",
    //                 //   age: 20,
    //                 //   friendship: { not: null, notEmpty: true },
    //                 //   collaboration: { not: null, notEmpty: true },
    //                 relationship: { not: null },
    //             },
    //         },
    //     },
    //     include: {
    //         userAttributes: true, // Join and include UserAttributes
    //     },
    // });

    // const users = await prisma.user.findMany({
    //     where: {
    //         username: {
    //             not: null, // Filters users where username is not null
    //         },
    //     },
    //     include: {
    //         userAttributes: true, // Join and include UserAttributes
    //     },
    // });

    return (
        <div>
            {users.map((user: any, index: number) => (
                // <li
                //     key={index}
                //     className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
                // >
                //     {post.title}
                //     <img src={post.image} width="200" height="100" />
                // </li>
                <Link href={`/users/${user.publicId}`} key={index}>
                    <p>{user.username}</p>
                    <p>{user.userAttributes.age}</p>
                </Link> 
            ))}
        </div>
    )
}

export default Users