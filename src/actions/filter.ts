"use server";

import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { removeEmptyObjValues } from '@/helper';
import { revalidatePath } from 'next/cache';

export const doFilterSubmit = async (formData: FormData) => {
  console.log("formDataformDataformDataformDataformDataformDataformDataformDataformDataformData");

  const session = await auth();
  const userId = session?.user?.id!;

  const filtersObj = await prisma.filters.findFirst({ // {"id":2}
    where: { userId },
    select: { id: true }, // Only fetch the `id` of posts
  });


  // const filter: Prisma.PostWhereInput = {
  //     postFilterDisplay: {
  //       contains: formData.get('postFilterDisplay') as any,
  //     },
  //     postFilterQueryRole: formData.get('postFilterQueryRole') as any,
  //     user: {
  //       accountType: formData.get('email') as any,
  //       filterableUserAttributes: {
  //         gender: formData.get('UserAttributesGender') as any,
  //         age: formData.get('UserAttributesAge') as any,
  //       },
  //     },
  // }

  // const postFilter: Prisma.FiltersUpdateInput = {
  //   postFilter: {
  //     postFilterDisplay: {
  //       contains: formData.get('postFilterDisplay') as any,
  //     },
  //     postFilterQueryRole: formData.get('postFilterQueryRole') as any,
  //   }
  // }

  const filterableUserAttributesData = {
    age: parseInt(formData.get('UserAttributesAge')?.toString()!) as any,
    gender: formData.get('UserAttributesGender') as any,
    ethnicity: formData.get('UserAttributesEthnicity') as any,
    personalityType: formData.get('UserAttributesPersonalityType') as any,
  };

  const userFilter: Prisma.FilterableUserAttributesUpsertArgs = {
    where: { filtersId: filtersObj!.id },
    update: filterableUserAttributesData,
    create: {
      ...filterableUserAttributesData,
      userId,
    },
    // userFilter: {
    //   filterableUserAttributes: {
    //     gender: formData.get('UserAttributesGender') as any,
    //     age: parseInt(formData.get('UserAttributesAge')?.toString()!) as any,
    //   },
    // },
  }

  const upsertUserAttributes = await prisma.filterableUserAttributes.upsert(userFilter);

  const filterablePostAttributesData = {
    postFilterDisplay: formData.get('postFilterDisplay') as any,
    postFilterQueryRole: formData.get('postFilterQueryRole') as any,
    mood: formData.get('postFilterQueryMood') as any,
  };

  const postFilter: Prisma.FilterablePostAttributesUpsertArgs = {
    where: { filtersId: filtersObj!.id },
    update: filterablePostAttributesData,
    create: {
      ...filterablePostAttributesData,
    },
  }

  await prisma.filterablePostAttributes.upsert(postFilter);

  console.log('sean_log upsertUserAttributes: ' + JSON.stringify(upsertUserAttributes));

  // console.log('sean_log removeEmptyObjValues(postFilter): ' + JSON.stringify(removeEmptyObjValues(postFilter)));
  // console.log('sean_log removeEmptyObjValues(userFilter): ' + JSON.stringify(removeEmptyObjValues(userFilter)));

  // const postFilterObj = removeEmptyObjValues(postFilter) || { postFilter: null };
  // const userFilterObj = removeEmptyObjValues(userFilter) || { userFilter: null };


  // To fix db so we can use .update
  // const updatedUser = await prisma.filters.updateMany({
  //     where: {
  //       userId: session?.user?.id!
  //     },
  //     data: {
  //         // filter: {
  //         //     description: "Exploring new opportunities in tech.",
  //         //     postFilterDisplay: {
  //         //       contains: "work > looking > Service, Manufacturing > 50-75k",
  //         //     },
  //         //     user: {
  //         //       username: "Alice",
  //         //       accountType: "Email",
  //         //       filterableUserAttributes: {
  //         //         gender: "Male",
  //         //         age: 25,
  //         //       },
  //         //     },
  //         // }, // New JSON object to save
  //         // ...removeEmptyObjValues(postFilter),
  //         // postFilter: null as any,
  //         // ...removeEmptyObjValues(userFilter)
  //         ...postFilterObj,
  //         ...userFilterObj,
  //         // userFilter : {
  //         //   filterableUserAttributes: {
  //         //     gender: "Male",
  //         //     age: 56,
  //         //   },
  //         // }
  //     },
  // });

  revalidatePath('/');
  // const referer = headers.get('referer') || '/'; // Fallback to root if referer is not present
  redirect('/');
  // console.log('sean_log referer: ' + referer);
  // console.log("Redirecting back to:", referer);
}