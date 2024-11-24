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

    // const filter: Prisma.PostWhereInput = {
    //     postFilterDisplay: {
    //       contains: formData.get('postFilterDisplay') as any,
    //     },
    //     postFilterQueryRole: formData.get('postFilterQueryRole') as any,
    //     user: {
    //       accountType: formData.get('email') as any,
    //       userAttributes: {
    //         gender: formData.get('UserAttributesGender') as any,
    //         age: formData.get('UserAttributesAge') as any,
    //       },
    //     },
    // }

    const postFilter: Prisma.FiltersUpdateInput = {
      postFilter: {
        postFilterDisplay: {
          contains: formData.get('postFilterDisplay') as any,
        },
        postFilterQueryRole: formData.get('postFilterQueryRole') as any,
      }
    }

    const userFilter: Prisma.FiltersUpdateInput = {
      userFilter: {
        userAttributes: {
          gender: formData.get('UserAttributesGender') as any,
          age: parseInt(formData.get('UserAttributesAge')?.toString()!) as any,
        },
      },
    }

    // console.log('sean_log removeEmptyObjValues(postFilter): ' + removeEmptyObjValues(postFilter));
    // console.log('sean_log removeEmptyObjValues(userFilter): ' + removeEmptyObjValues(userFilter));
    console.log('sean_log removeEmptyObjValues(postFilter): ' + JSON.stringify(removeEmptyObjValues(postFilter)));
    console.log('sean_log removeEmptyObjValues(userFilter): ' + JSON.stringify(removeEmptyObjValues(userFilter)));

    const postFilterObj = removeEmptyObjValues(postFilter) || { postFilter: null };
    const userFilterObj = removeEmptyObjValues(userFilter) || { userFilter: null };


    // To fix db so we can use .update
    const updatedUser = await prisma.filters.updateMany({
        where: {
          userId: session?.user?.id!
        },
        data: {
            // filter: {
            //     description: "Exploring new opportunities in tech.",
            //     postFilterDisplay: {
            //       contains: "work > looking > Service, Manufacturing > 50-75k",
            //     },
            //     user: {
            //       username: "Alice",
            //       accountType: "Email",
            //       userAttributes: {
            //         gender: "Male",
            //         age: 25,
            //       },
            //     },
            // }, // New JSON object to save
            // ...removeEmptyObjValues(postFilter),
            // postFilter: null as any,
            // ...removeEmptyObjValues(userFilter)
            ...postFilterObj,
            ...userFilterObj,
            // userFilter : {
            //   userAttributes: {
            //     gender: "Male",
            //     age: 56,
            //   },
            // }
        },
    });

    console.log('sean_log updatedUser: ' + JSON.stringify(updatedUser));
    revalidatePath('/');
    // const referer = headers.get('referer') || '/'; // Fallback to root if referer is not present
    redirect('/');
    // console.log('sean_log referer: ' + referer);
    // console.log("Redirecting back to:", referer);
}