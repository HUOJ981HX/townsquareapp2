import prisma from '@/lib/prisma';
import UserList from './components/UserList';
import Users from '../components/users/Users';

async function UsersPage() {
    // const users = await prisma.user.findMany({
    //     select: {
    //         username: true,
    //         publicId: true,
    //         age: true
    //     },
    // });

    const users = await prisma.user.findMany({
        include: {
          userAttributes: true, // Include the related UserAttributes data
        },
      });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {/* <UserList users={users} /> */}
            <Users users={
                users
            } />
        </div>
    );
}

export default UsersPage