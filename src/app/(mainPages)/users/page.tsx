import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Users from "../../components/users/Users";
import { Prisma } from "@prisma/client";
import { cleanObject } from "@/helper";
import { buildUserFilter } from "@/helper/filter";
import UserClient from "./UserClient";

async function UsersPage() {
  const session = await auth();

  const filter = await prisma.filter.findFirst({
    where: {
      userId: session?.user?.id!,
    },
  });

  let users = null;

  const userQuery: Prisma.UserWhereInput = buildUserFilter(filter!.filterJson);

  console.log("uuuuuuuuuuuuuuuuuuuuu");
  console.log("qqqqqqqqqqqqqqqqqqq");
  console.log("sean_log userQuery: " + JSON.stringify(userQuery));
  console.log("sean_log filter: " + JSON.stringify(filter));

  if (filter?.filterOff || !filter || !filter?.filterJson) {
    console.log("vvvvvvvvvvvvvvvvvvv");

    users = await prisma.user.findMany({
      include: {
        filterableUserAttributes: true,
      },
    });
  } else {
    const cleanedFilter = cleanObject(filter, [
      "id",
      "userId",
      "postId",
      "filtersId",
    ]);

    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("sean_log userQuery: " + JSON.stringify(userQuery));
    users = await prisma.user.findMany({
        where: userQuery,
    //   where: {
    //     userGroups: {
    //         some: {
    //           groupId: {
    //             in: ["5d37edb0-eb62-4b5f-80a8-94133e3299ee"]
    //           }
    //         }
    //       },
    //     filterableUserAttributes: {
    //       age: { gte: 18, lte: 100 },
    //       gender: { in: ["Male", "Non-binary"] },
    //     },
    //   },
      include: {
        filterableUserAttributes: true,
      },
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users ? (
        <UserClient users={users} filter={filter} />
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
}

export default UsersPage;
