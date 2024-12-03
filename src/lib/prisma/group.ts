import prisma from "@/lib/prisma";

export async function updateUserGroups(
{  targetGroupIds,
  targetUserId,
  oldGroupIds}: any
) {

  // Start a transaction to ensure atomicity
  const result = await prisma.$transaction(async (tx) => {

    const groupIdsToDelete = oldGroupIds.filter((groupId: any) => !targetGroupIds.includes(groupId));
    // console.log('sean_log groupIdsToDelete: ' + groupIdsToDelete);
    // console.log('sean_log groupIdsToDeleteJSON: ' + JSON.stringify(groupIdsToDelete));

    console.log('ggggggggggggggggggggggg');
    console.log('ggggggggggggggggggggggg');
    console.log('sean_log groupIdsToDelete: ' + groupIdsToDelete);
    console.log('sean_log groupIdsToDelete: ' + JSON.stringify(groupIdsToDelete));
    // Remove user from groups not in target groups
    await tx.userGroup.deleteMany({
      where: {
        userId: targetUserId,
        groupId: {
            // notIn: targetGroupIds, // Where you do want to add
            // ["d838f99b-3a5e-4c6e-8f82-12102a2ba104"]

            in: groupIdsToDelete,
            // in: ["be0ab1d1-4691-444b-af6f-3c7b7a48ab83", "d838f99b-3a5e-4c6e-8f82-12102a2ba104"],
            // Current groups belonging to logged in user
            // ["be0ab1d1-4691-444b-af6f-3c7b7a48ab83,d838f99b-3a5e-4c6e-8f82-12102a2ba104"]


        //   in: targetGroupIds,
        //   notIn: oldGroupIds,
        },
      },
    });

    // Add user to target groups where they're not already a member
    const existingMemberships = await tx.userGroup.findMany({
      where: {
        userId: targetUserId,
        groupId: {
          in: targetGroupIds,
        },
      },
      select: {
        groupId: true,
      },
    });

    // Determine which target groups the user is not yet a member of
    const groupsToJoin = targetGroupIds.filter(
      (groupId: any) => !existingMemberships.some((m) => m.groupId === groupId)
    );

    // Bulk create new UserGroup entries
    if (groupsToJoin.length > 0) {
      await tx.userGroup.createMany({
        data: groupsToJoin.map((groupId: any) => ({
          userId: targetUserId,
          groupId: groupId,
        })),
      });
    }

    // Retrieve and return the updated groups
    return tx.group.findMany({
      where: {
        userId: "2", // Assuming this is the original user ID from the context
      },
    //   include: {
    //     oldGroupIds: true,
    //   },
    });
  });

  return result;
}
