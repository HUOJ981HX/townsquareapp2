"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserList = ({ users }) => {
    const router = useRouter();

    const handleUserClick = (username) => {
        router.push(`/chat?username=${username}`);
    };

    return (
        <ul className="space-y-2">
            {users.map((user, index) => (
                // <li
                //     key={index}
                //     className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
                //     onClick={() => handleUserClick(user.username)}
                // >
                // </li>
                <Link href={`/users/${user.publicId}`} key={index}>
                    {user.username}
                </Link>
            ))}
        </ul>
    );
};

export default UserList;
