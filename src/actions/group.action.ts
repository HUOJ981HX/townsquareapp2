"use server";

import { updateUserGroups } from "@/lib/prisma/group";
// import { auth } from "@/auth";

export const updateGroupsAction = async (
  prevState: any,
  formData: FormData
) => {
  // const session = await auth();
  console.log("uuuuuuuuuuuuuuuuuuuuu");
  console.log("uuuuuuuuuuuuuuuuuuuuu");
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  let targetGroups = formData.getAll("targetGroups");
  let arrayGroupIds = formData.getAll("arrayGroupIds");
  let targetUserId = formData.get("targetUserId")!.toString();

  console.log("sean_log targetGroups: " + JSON.stringify(targetGroups));
  console.log("sean_log targetUserId: " + JSON.stringify(targetUserId));
  console.log("sean_log arrayGroupIds: " + JSON.stringify(arrayGroupIds));

  try {
    let result = updateUserGroups(targetGroups, targetUserId)

    // for (const groupId of targetGroups) {
    //   // Check if the user is already a member of the group
    //   const existingMember = await prisma.userGroup.findFirst({
    //     where: {
    //       userId: targetUserId,
    //       groupId: groupId as any,
    //     },
    //   });

    //   // If not, create a new entry
    //   if (!existingMember) {
    //     console.log('ggggggggggggggggggggggg');
    //     console.log('iiiiiiiiiiiiiiiiiii');
    //     console.log('sean_log groupId: ' + groupId);
    //     await prisma.userGroup.create({
    //       data: {
    //         userId: targetUserId,
    //         groupId: groupId as any,
    //       },
    //     });
    //   }
    // }

    console.log('vvvvvvvvvvvvvvvvvvv');
    console.log('vvvvvvvvvvvvvvvvvvv');
    console.log('sean_log result: ' + JSON.stringify(result));

    return {
      status: "success",
      message: "Users added successfully!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to add user. Please try again later. " + error,
    };
  }
};
