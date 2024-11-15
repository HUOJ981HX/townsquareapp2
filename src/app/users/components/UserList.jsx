"use client";

import { useRouter } from 'next/navigation';

const UserList = ({ users }) => {
    const router = useRouter();

    const handleUserClick = (username) => {
        router.push(`/chat?username=${username}`);
    };

    return (
        <ul className="space-y-2">
            {users.map((user, index) => (
                <li
                    key={index}
                    className="text-lg text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleUserClick(user.username)}
                >
                    {user.username}
                </li>
            ))}
        </ul>
    );
};

export default UserList;
