import { FilterFormInputs, Gender } from "@/types/filter";
import { Prisma } from "@prisma/client";

export const buildPostFilter = (formData: any) => {
  const queryObj: Prisma.PostWhereInput = {
    // ...(formData.get("UserAttributesAge") && {
    //   age: formData.get("UserAttributesAge"),
    // }),
    // ...(formData.get("UserAttributesGender") && {
    //   gender: formData.get("UserAttributesGender"),
    // }),
    filterablePostAttributes: {
      ...(formData.get(FilterFormInputs.PostMood) && {
        mood: formData.get(FilterFormInputs.PostMood),
      }),
      // OR: JSON.parse(formData.get(FilterFormInputs.PostPurpose) as string),
      ...(JSON.parse(formData.get(FilterFormInputs.PostPurpose) as string)
        .length && {
        OR: JSON.parse(formData.get(FilterFormInputs.PostPurpose) as string),
      }),
    },
    user: {
      filterableUserAttributes: {
        age: {
          gte: parseInt(formData.get(FilterFormInputs.UserAgeMin)) || 18, // Age greater than or equal to 18
          lte: parseInt(formData.get(FilterFormInputs.UserAgeMax)) || 100, // Age less than or equal to 35
        },
        gender: {
          in: formData.getAll(FilterFormInputs.UserGender).length
            ? formData.getAll(FilterFormInputs.UserGender)
            : [Gender.Female, Gender.Male, Gender.NonBinary],
        },
        // ...(formData.get(FilterFormInputs.UserGender) && {
        //   gender: formData.getAll(FilterFormInputs.UserGender),
        // }),
      },
    },
  };

  return queryObj;
};
