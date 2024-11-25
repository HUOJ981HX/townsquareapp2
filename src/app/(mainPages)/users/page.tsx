import prisma from '@/lib/prisma';
import Users from '../../components/users/Users';
import { Prisma } from '@prisma/client';


async function UsersPage() {
    // const users = await prisma.user.findMany({
    //     select: {
    //         username: true,
    //         publicId: true,
    //         age: true
    //     },
    // });

    // const users = await prisma.user.findMany({
    //     include: {
    //       filterableUserAttributes: true, // Include the related FilterableUserAttributes data
    //     },
    //   });

    let queryObj: Prisma.UserWhereInput = { // IUserQuery
        username: "Alice",
        accountType: "Email",
        filterableUserAttributes: {
            AND: [
                {
                    gender: "Male",
                },
                {
                    age: 25,
                },
                {
                    relationship: {
                        AND: [
                            {
                                description: "looking for someone",
                            },
                            {
                                openTo: "female, non-binary",
                            },
                        ],
                    },
                },
            ],
        },
        posts: {
            some: {
                AND: [
                    {
                        title: "tech opportunities"
                    },
                    {
                        description: "Exploring new opportunities in tech."
                    },
                ]
            }
        }
    };

    const users = await prisma.user.findMany({
        where: queryObj,
        include: {
            filterableUserAttributes: {
                include: {
                    relationship: true, // Include the related relationship data
                },
            },
        },
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <Users users={
                users
            } />
        </div>
    );
}

export default UsersPage