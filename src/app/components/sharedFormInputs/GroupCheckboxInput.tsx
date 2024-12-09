import { FilterFormInputs } from "@/types/filter";
import React from "react";

const GroupCheckboxInput = ({ groups, groupIds }: any) => {
  return (
    <div className="space-y-2">
      <p className="text-[1.5rem]">Group input</p>
      <div className="flex">
        {groups.map((group: any) => (
          <div key={group.id} className="flex items-center">
            <input
              type="checkbox"
              name={FilterFormInputs.GroupsUsers}
              id={group.id}
              value={group.id}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={groupIds.includes(group?.id) ? true : false}
            />
            <label
              htmlFor={group.id}
              className="ml-2 block text-sm text-gray-900"
            >
              {group.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCheckboxInput;
