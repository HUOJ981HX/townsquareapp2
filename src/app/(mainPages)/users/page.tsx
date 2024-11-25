import { auth } from "@/auth";
import prisma from '@/lib/prisma';
import Users from '../../components/users/Users';
import { Prisma } from '@prisma/client';
import { cleanObject } from "@/helper";


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

    const session = await auth();

    const filter = await prisma.filters.findFirst({
        where: {
            userId: session?.user?.id!
        },
        include: {
            filterableUserAttributes: true,
            filterablePostAttributes: true,
        }
    });

    const cleanedFilter = cleanObject(filter, ["id", "userId", "postId", "filtersId"]);
    console.log('88888888888888888888');
    console.log('88888888888888888888');

    console.log('sean_log cleanedFilter: ' + JSON.stringify(cleanedFilter));

    const userQueryObj: Prisma.UserWhereInput = {
        posts: { // Find users who made posts satisfying the following attribute 
            some: {
                filterablePostAttributes: {
                    AND: cleanedFilter.filterablePostAttributes,
                }
            }
        },
        filterableUserAttributes: cleanedFilter.filterableUserAttributes
    }

    // const userQueryObj: Prisma.UserWhereInput = {
    //     posts: {
    //         some: { // Check if at least one post satisfies the condition
    //             filterablePostAttributes: {
    //                 postFilterDisplay: "work > Manufacturing, Service > 50-75k",
    //                 postFilterQueryRole: "provider",
    //             },
    //         },
    //     },
    //     filterableUserAttributes: cleanedFilter.filterableUserAttributes
    // }


    console.log('sean_log userQueryObj__1: ' + JSON.stringify(userQueryObj));
    // let queryObj: Prisma.UserWhereInput = { // IUserQuery
    //     username: "Alice",
    //     accountType: "Email",
    //     filterableUserAttributes: {
    //         AND: [
    //             {
    //                 gender: "Male",
    //             },
    //             {
    //                 age: 25,
    //             },
    //             {
    //                 relationship: {
    //                     AND: [
    //                         {
    //                             description: "looking for someone",
    //                         },
    //                         {
    //                             openTo: "female, non-binary",
    //                         },
    //                     ],
    //                 },
    //             },
    //         ],
    //     },
    //     posts: {
    //         some: {
    //             AND: [
    //                 {
    //                     title: "tech opportunities"
    //                 },
    //                 {
    //                     description: "Exploring new opportunities in tech."
    //                 },
    //             ]
    //         }
    //     }
    // };

    const users = await prisma.user.findMany({
        where: userQueryObj,
        include: {
            filterableUserAttributes: true
        }
    });

    console.log('vvvvvvvvvvvvvvvvvvv');
    console.log('vvvvvvvvvvvvvvvvvvv');
    console.log('sean_log users: ' + JSON.stringify(users));

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