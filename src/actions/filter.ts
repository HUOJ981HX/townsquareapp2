"use server";

import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { removeEmptyObjValues } from '@/helper';

export const doFilterSubmit = async (formData: FormData) => {
    console.log("formDataformDataformDataformDataformDataformDataformDataformDataformDataformData");

    const session = await auth();

    console.log('sean_log session: ' + JSON.stringify(session));
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }

    const filter: Prisma.PostWhereInput = {
        postFilterDisplay: {
          contains: formData.get('postFilterDisplay') as any,
        },
        postFilterQueryRole: formData.get('postFilterQueryRole') as any,
        user: {
          accountType: formData.get('email') as any,
          userAttributes: {
            gender: formData.get('UserAttributesGender') as any,
            age: formData.get('UserAttributesAge') as any,
          },
        },
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(session?.user?.id as string)
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
            filter : removeEmptyObjValues(filter) as any
        },
    });

    console.log('sean_log updatedUser: ' + JSON.stringify(updatedUser));

    // const referer = headers.get('referer') || '/'; // Fallback to root if referer is not present
    // redirect('/');
    // console.log('sean_log referer: ' + referer);
    // console.log("Redirecting back to:", referer);
}