"use server"

import prisma from "@/libs/prisma";
import { AccountType } from "@/types";

// export async function submitEmail(formData: FormData) {
//     const email = formData.get("email");
// }

export const submitEmail = async (formData: FormData) => {

    console.log('cccccccccccccccccccc');
    console.log('sean_log: ' + formData.get("email"));

    const user = await prisma.user.findUnique({
        where: {
            email: formData.get("email"),
        },
    });

    
    return user ? true : false;
}

export const handleEmailSubmit = async (formData: FormData, setAccountType: any) => {
    const haveUser = await submitEmail(formData);

    if (haveUser) {
      console.log('vvvvvvvvvvvvvvvvvvv');
      // setAccountType(AccountType.Google);
      setAccountType(AccountType.Email);
    }
    else {
      console.log('xxxxxxxxxxxxxxxxxxxxxx');
    }
  };


  