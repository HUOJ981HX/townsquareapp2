"use server";

import { updateUserGroups } from "@/lib/prisma/group";
// import { auth } from "@/auth";

export const updateGroupsAction = async (
  prevState: any,
  formData: FormData
) => {

  let targetGroupIds = formData.getAll("targetGroups");
  let oldGroupIds = JSON.parse(formData.get("oldGroupIds") as string);
  let targetUserId = formData.get("targetUserId")!.toString();

  try {
    updateUserGroups({
      targetGroupIds,
      targetUserId,
      oldGroupIds,
    });

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
