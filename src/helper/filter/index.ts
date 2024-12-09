import { FilterFormInputs, Gender } from "@/types/filter";
import { Prisma } from "@prisma/client";

const getGroupQuery = (idArray: string[]) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("rrrrrrrrrrrrrrrrrrr");
  console.log("sean_log idArray: " + JSON.stringify(idArray));
  if (!idArray || idArray.length === 0) {
    console.log("000000000000000000000");
    return {};
  }
  console.log("999999999999999999999");
  return {
    some: {
      groupId: {
        in: idArray,
      },
    },
  };
};

const getFilterablePostAttributes = (jsonObj: any, isUsers: Boolean) => {
  const filterablePostAttributes = {
    ...(jsonObj[FilterFormInputs.PostMood] && {
      mood: jsonObj[FilterFormInputs.PostMood],
    }),
    ...(JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose]))
      .length && {
      OR: JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose])),
    }),
  };

  let filterObj = {};

  if(Object.keys(filterablePostAttributes).length) {
    if (isUsers) {
      filterObj = {
        posts: {
          some: {
            filterablePostAttributes,
          },
        },
      }
    }
    else {
      filterObj = {
        filterablePostAttributes
      }
    }
  }

  return filterObj;
};

export const buildPostFilter = (jsonObj: any) => {
  const queryObj = {
    // filterablePostAttributes: {
    //   ...(jsonObj[FilterFormInputs.PostMood] && {
    //     mood: jsonObj[FilterFormInputs.PostMood],
    //   }),
    //   ...(JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose]))
    //     .length && {
    //     OR: JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose])),
    //   }),
    // },
    ...getFilterablePostAttributes(jsonObj, false),
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
      ...(Object.keys(getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers])) && {
        userGroups: getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers]),
      }),
    },
  };

  return queryObj;
};

export const buildUserFilter = (jsonObj: any) => {


  const queryObj = {
    ...(Object.keys(getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers])) && {
      userGroups: getGroupQuery(jsonObj[FilterFormInputs.GroupsUsers]),
    }),
    // posts: {
    //   some: {
    //     filterablePostAttributes: {
    //       ...(jsonObj[FilterFormInputs.PostMood] && {
    //         mood: jsonObj[FilterFormInputs.PostMood],
    //       }),
    //       ...(JSON.parse(JSON.stringify(jsonObj[FilterFormInputs.PostPurpose]))
    //         .length && {
    //         OR: JSON.parse(
    //           JSON.stringify(jsonObj[FilterFormInputs.PostPurpose])
    //         ),
    //       }),
    //     },
    //   },
    // },
    ...getFilterablePostAttributes(jsonObj, true),
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

  console.log('cccccccccccccccccccc');
  console.log('ddddddddddddddddddddddd');
  console.log('ggggggggggggggggggggggg');
  console.log('sean_log queryObj: ' + JSON.stringify(queryObj));

  return queryObj;
};
