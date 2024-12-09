"use client";

import Filter from "@/app/components/filter/filter.compo";
import Users from "@/app/components/users/Users";
import { useGlobalContext } from "@/context/GlobalContext";
import { postCriteriaIntentType } from "@/helper/post";
import { Gender } from "@/types/filter";
import Link from "next/link";
import React from "react";

function UserClient({ users, filter, groups }: any) {
  const { openFilter } = useGlobalContext();

  return (
    <div>
      {openFilter ? (
        <Filter
          groups={groups}
          purpose={postCriteriaIntentType.FILTER}
          filterOff={filter?.filterOff}
          filterJson={
            filter?.filterJson || {
              PostMood: "Happy",
              UserAgeMin: 18,
              UserAgeMax: 100,
              UserGender: [Gender.Female, Gender.Male, Gender.NonBinary],
              PostPurpose: [],
            }
          }
        />
      ) : (
        // <Users users={users} />
        <div>
          {users.map((user: any, index: number) => (
            <Link href={`/users/${user.id}`} key={index}>
              <p>{user.username}</p>
              <p>{user.filterableUserAttributes.age}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserClient;
