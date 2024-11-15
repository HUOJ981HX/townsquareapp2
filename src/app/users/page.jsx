import prisma from '@/libs/prisma';
import UserList from './components/UserList';

async function Users() {
    const users = await prisma.user.findMany({
        select: {
            username: true,
        },
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <UserList users={users} />
        </div>
    );
}

export default Users