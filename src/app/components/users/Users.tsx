"use client";

import Link from "next/link";
import React from "react";

function Users({ users }: any) {
  return (
    <div>
      {users.map((user: any, index: number) => (
        <Link href={`/users/${user.id}`} key={index}>
          <p>{user.username}</p>
          {user.filterableUserAttributes && (
            <>
              <p>{user.filterableUserAttributes.age}</p>
            </>
          )}
        </Link>
      ))}
    </div>
  );
}

// function Users() {
//     return (
//         <div>
//             <p>WHYYYYY</p>
//         </div>
//     )
// }

export default Users;
