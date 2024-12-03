"use client";

import { updateGroupsAction } from "@/actions/group.action";
import { Button } from "@/components/ui/button";
import React, { useState, useActionState, useEffect } from "react";

function GroupForm({ userSlug, groups }: any) {
  const [state, formAction] = useActionState(updateGroupsAction, {
    status: "",
    message: "",
  });

  const oldGroupIds = groups.map((item: any) => item.id);

  console.log("cccccccccccccccccccc");
  console.log("sean_log arrayGroupIds: " + oldGroupIds);
  console.log('sean_log arrayGroupIds_json: ' + JSON.stringify(oldGroupIds));

  useEffect(() => {
    if (state.status === "success") {
      console.log('sssssssssssssssssssssssss');
      console.log('sean_log state.message: ' + state.message);
    } else if (state.status === "error") {
      console.log("eeeeeeeeeeeeeeeeeeeeee");
      console.log("sean_log error: " + JSON.stringify(state.message));
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <input
          type="hidden"
          id="targetUserId"
          name="targetUserId"
          value={userSlug}
        />

        <input
          type="hidden"
          id="oldGroupIds"
          name="oldGroupIds"
          value={JSON.stringify(oldGroupIds)}
        />

        {groups.map((group: any) => {
          const isChecked = group.userGroups.some(
            (userGroup: any) => userGroup.userId === userSlug.toString()
          );

          return (
            <div key={group.id} className="flex items-center">
              <input
                type="checkbox"
                id={group.id}
                value={group.id}
                defaultChecked={isChecked}
                className="checkbox-input"
                name="targetGroups"
              />
              <label htmlFor={group.id} className="ml-2">
                {group.name} - {group.id}
              </label>
            </div>
          );
        })}
      </div>
      <Button>Submit</Button>
    </form>
  );
}

export default GroupForm;