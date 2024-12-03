import prisma from "@/lib/prisma";

export async function updateUserGroups(
  targetGroups: any[], 
  userIdToAdd: string
) {
  // Start a transaction to ensure atomicity
  const result = await prisma.$transaction(async (tx) => {
    // Remove user from groups not in target groups
    await tx.userGroup.deleteMany({
      where: {
        userId: userIdToAdd,
        groupId: {
          notIn: targetGroups
        }
      }
    });

    // Add user to target groups where they're not already a member
    const existingMemberships = await tx.userGroup.findMany({
      where: {
        userId: userIdToAdd,
        groupId: {
          in: targetGroups
        }
      },
      select: {
        groupId: true
      }
    });

    // Determine which target groups the user is not yet a member of
    const groupsToJoin = targetGroups.filter(
      groupId => !existingMemberships.some(m => m.groupId === groupId)
    );

    // Bulk create new UserGroup entries
    if (groupsToJoin.length > 0) {
      await tx.userGroup.createMany({
        data: groupsToJoin.map(groupId => ({
          userId: userIdToAdd,
          groupId: groupId
        }))
      });
    }

    // Retrieve and return the updated groups
    return tx.group.findMany({
      where: {
        userId: "2", // Assuming this is the original user ID from the context
      },
      include: {
        userGroups: true,
      },
    });
  });

  return result;
}
