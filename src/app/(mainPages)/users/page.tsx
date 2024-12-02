import { auth } from "@/auth";
import prisma from '@/lib/prisma';
import Users from '../../components/users/Users';
import { Prisma } from '@prisma/client';
import { cleanObject } from "@/helper";


async function UsersPage() {

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

    let users = null;

    if(filter) {
        const cleanedFilter = cleanObject(filter, ["id", "userId", "postId", "filtersId"]);

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
    
        users = await prisma.user.findMany({
            where: userQueryObj,
            include: {
                filterableUserAttributes: true
            }
        });
    }


    users = await prisma.user.findMany({
        include: {
            filterableUserAttributes: true
        }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <Users users={users}/>
        </div>
    );
}

export default UsersPage