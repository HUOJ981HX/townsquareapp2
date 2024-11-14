"use client"

import { AccountType } from "@/types";
import { submitEmail } from "./server";

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