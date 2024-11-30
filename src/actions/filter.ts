"use server";

import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { removeEmptyObjValues } from '@/helper';
import { revalidatePath } from 'next/cache';

export const doFilterSubmit = async (prevState: any, formData: FormData) => {

  try {
    const session = await auth();
    const userId = session?.user?.id!;
  
    const filtersObj = await prisma.filters.findFirst({ // {"id":2}
      where: { userId },
      select: { id: true }, // Only fetch the `id` of posts
    });
  
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
    }
  
    await prisma.filterableUserAttributes.upsert(userFilter);
  
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

    return { 
        status: 'success', 
        message: 'Filter submitted successfully!' 
    };

  } catch (error) {

    return { 
      status: 'error', 
      message: 'Failed to submit filter. Please try again later.' 
    };

  }

  // revalidatePath('/');

  // redirect('/');
}