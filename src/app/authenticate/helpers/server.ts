"use server"

import { signIn } from "@/auth";
import prisma from "@/libs/prisma";
import { AccountType } from "@/types";
import { redirect, RedirectType } from "next/navigation";

// export async function submitEmail(formData: FormData) {
//     const email = formData.get("email");
// }

export const submitEmail = async (email: FormDataEntryValue) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    
    return user ? true : false;
}

export const handlePasswordLogin = async (formData: FormData, email: string) => {
  console.log("formDataformData");
  console.log(formData);

  try {
      const response = await signIn("credentials", {
          email,
          password: formData.get("password"), 
          redirect: false,
      });

      console.log("vvvvvvvvvv");
      console.log('sean_log response: ' + response);
      redirect('/users', RedirectType.replace);

  } catch (err) {
      console.log("serverMethods_errorrrrrr");

      throw err;
  }
};


  