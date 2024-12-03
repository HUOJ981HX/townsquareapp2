"use server";

import { updateUserGroups } from "@/lib/prisma/group";
// import { auth } from "@/auth";

export const updateGroupsAction = async (
  prevState: any,
  formData: FormData
) => {
  // const session = await auth();
//   console.log("uuuuuuuuuuuuuuuuuuuuu");
//   console.log("uuuuuuuuuuuuuuuuuuuuu");
//   for (var pair of formData.entries()) {
//     console.log(pair[0] + ", " + pair[1]);
//   }

  let targetGroupIds = formData.getAll("targetGroups");
  let oldGroupIds = formData.get("oldGroupIds");
  let targetUserId = formData.get("targetUserId")!.toString();

  console.log("sean_log targetGroupIds: " + targetGroupIds);
  console.log('sean_log targetGroupIds: ' + JSON.stringify(targetGroupIds));
  console.log("sean_log oldGroupIds: " + oldGroupIds);
  console.log('sean_log oldGroupIds: ' + JSON.stringify(oldGroupIds)); // Issue here "be0ab1d1-4691-444b-af6f-3c7b7a48ab83,d838f99b-3a5e-4c6e-8f82-12102a2ba104"
  console.log("sean_log targetUserId: " + targetUserId);

  try {
    let result = updateUserGroups({targetGroupIds, targetUserId, oldGroupIds});

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
