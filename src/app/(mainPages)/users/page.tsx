import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Users from "../../components/users/Users";
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
import { buildUserFilter } from "@/helper/filter";
import UserClient from "./UserClient";

async function UsersPage() {
  const session = await auth();

  console.log('sssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssss');
console.log('sssssssssssssssssssssssss');
console.log('sean_log session: ' + JSON.stringify(session));

  const filter = await prisma.filter.findFirst({
    where: {
      userId: session?.user?.id!,
    },
  });


  const groups = await prisma.group.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  let users = null;


  if (filter?.filterOff || !filter || !filter?.filterJson) {

    users = await prisma.user.findMany({
      include: {
        filterableUserAttributes: true,
      },
    });
  } else {
    const userQuery: Prisma.UserWhereInput = buildUserFilter(filter!.filterJson);

    users = await prisma.user.findMany({
      where: userQuery,
      // where: {
      //   userGroups: {
      //     some: { groupId: { in: ["028e5436-fcff-4196-b48a-f267fc0fe30b"] } },
      //   },
      //   posts: { some: { filterablePostAttributes: {} } },
      //   filterableUserAttributes: {
      //     age: { gte: 18, lte: 100 },
      //     gender: { in: ["Female", "Male", "Non-binary"] },
      //   },
      // },
      include: {
        filterableUserAttributes: true,
      },
    });
  }

  console.log('uuuuuuuuuuuuuuuuuuuuu');
  console.log('uuuuuuuuuuuuuuuuuuuuu');
  console.log('sssssssssssssssssssssssss');
  console.log('sean_log users: ' + JSON.stringify(users));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users ? (
        <UserClient users={users} filter={filter} groups={groups} />
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
}

export default UsersPage;
