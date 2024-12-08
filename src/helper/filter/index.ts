import { FilterFormInputs, Gender } from "@/types/filter";
import { Prisma } from "@prisma/client";

const getGroupQuery = (idArray: string[]) => {
  if (!idArray || idArray.length === 0) {
    return {};
  }
  return {
    some: {
      groupId: {
        in: idArray,
      },
    },
  };
};

export const buildPostFilter = (jsonObj: any) => {

  const queryObj = {
    filterablePostAttributes: {
      ...(jsonObj[FilterFormInputs.PostMood] && {
        mood: jsonObj[FilterFormInputs.PostMood],
      }),
      ...(JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose]))
        .length && {
        OR: JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose])),
      }),
    },
    user: {
      filterableUserAttributes: {
        age: {
          gte: parseInt(jsonObj[FilterFormInputs.UserAgeMin]) || 18,
          lte: parseInt(jsonObj[FilterFormInputs.UserAgeMax]) || 100,
        },
        ...(jsonObj[FilterFormInputs.UserGender] && {
          gender: {
            in: JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.UserGender]))
              .length
              ? JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.UserGender]))
              : [Gender.Female, Gender.Male, Gender.NonBinary],
          },
        }),
      },
      ...(Object.keys(getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers])) && {userGroups: getGroupQuery(jsonObj.userGroupsArray)}),
    },
  };

  return queryObj;
};

export const buildUserFilter = (jsonObj: any) => {
  const queryObj = {
    ...(Object.keys(getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers])) && {userGroups: getGroupQuery(jsonObj.userGroupsArray)}),
    posts: {
      some: {
        filterablePostAttributes: {
          ...(jsonObj[FilterFormInputs.PostMood] && {
            mood: jsonObj[FilterFormInputs.PostMood],
          }),
          ...(JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose]))
            .length && {
            OR: JSON.parse(
              JSON.stringify(jsonObj[FilterFormInputs.PostPurpose])
            ),
          }),
        },
      },
    },
    filterableUserAttributes: {
      age: {
        gte: parseInt(jsonObj[FilterFormInputs.UserAgeMin]) || 18,
        lte: parseInt(jsonObj[FilterFormInputs.UserAgeMax]) || 100,
      },
      ...(jsonObj[FilterFormInputs.UserGender] && {
        gender: {
          in: JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.UserGender]))
            .length
            ? JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.UserGender]))
            : [Gender.Female, Gender.Male, Gender.NonBinary],
        },
      }),
    },
  };

  return queryObj;
};
