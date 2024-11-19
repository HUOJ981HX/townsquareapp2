import prisma from '@/lib/prisma';
import Users from '../../components/users/Users';

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
    //       userAttributes: true, // Include the related UserAttributes data
    //     },
    //   });

    const users = await prisma.user.findMany({
        include: {
            userAttributes: {
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