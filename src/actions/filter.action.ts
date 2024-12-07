"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { convertFormDataToObject, removeEmptyObjValues } from "@/helper";
import { revalidatePath } from "next/cache";
import { buildPostFilter } from "@/helper/filter";

export const filterSubmitAction = async (
  prevState: any,
  formData: FormData
) => {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  try {
    const session = await auth();
    const userId = session?.user?.id!;

    const filtersObj = await prisma.filter.findFirst({
      // {"id":2}
      where: { userId },
      select: { id: true }, // Only fetch the `id` of posts
    });

    let filterOff = false;

    console.log("bbbbbbbbbbbbbbbbbb");
    console.log("bbbbbbbbbbbbbbbbbb");
    console.log("fffffffffffffffffffffff");
    console.log("fffffffffffffffffffffff");

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let objToSave = convertFormDataToObject(formData);

    console.log("sean_log objToSave: " + JSON.stringify(objToSave));
    console.log(
      "sean_log buildPostFilter: " + JSON.stringify(buildPostFilter(objToSave))
    );

    // const filterJson = buildPostFilter(objToSave);

    if (formData.get("filterOff")) {
      filterOff = true;
    }

    // await prisma.filter.update({
    //   where: {userId: session?.user?.id!},
    //   data: {
    //     filterOff,
    //     filterJson: objToSave,
    //   }
    // });

    await prisma.filter.upsert({
      where: { userId: session?.user?.id! },
      update: {
        filterOff,
        filterJson: objToSave,
      },
      create: {
        userId: session?.user?.id!,
        filterOff,
        filterJson: objToSave,
      },
    });

    // const filterableUserAttributesData = {
    //   age: parseInt(formData.get('UserAttributesAge')?.toString()!) as any, // Modify here
    //   gender: formData.get('UserAttributesGender') as any,
    //   ethnicity: formData.get('UserAttributesEthnicity') as any,
    //   personalityType: formData.get('UserAttributesPersonalityType') as any,
    // };

    // const userFilter: Prisma.FilterableUserAttributesUpsertArgs = {
    //   where: { filtersId: filtersObj!.id },
    //   update: filterableUserAttributesData,
    //   create: {
    //     ...filterableUserAttributesData,
    //     userId,
    //   },
    // }

    // DON'T DELETE
    // await prisma.filterableUserAttributes.upsert(userFilter);

    // const filterablePostAttributesData = {
    //   postFilterDisplay: formData.get('postFilterDisplay') as any,
    //   postFilterQueryRole: formData.get('postFilterQueryRole') as any,
    //   mood: formData.get('postFilterQueryMood') as any,
    // };

    // const postFilter: Prisma.FilterablePostAttributesUpsertArgs = {
    //   where: { filtersId: filtersObj!.id },
    //   update: filterablePostAttributesData,
    //   create: {
    //     ...filterablePostAttributesData,
    //   },
    // }

    // DON'T DELETE
    // await prisma.filterablePostAttributes.upsert(postFilter);

    revalidatePath("/");

    return {
      status: "success",
      message: "Filter submitted successfully!",
    };
  } catch (error: any) {
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log("sean_log error: " + JSON.stringify(error));

    return {
      status: "error",
      message: "Failed to submit filter. Please try again later.",
    };
  }

  // redirect('/');
};
