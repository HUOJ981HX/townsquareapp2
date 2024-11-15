"use client"

import { AccountType } from "@/types";
import { submitEmail } from "./server";

export const handleEmailSubmit = async (formData: FormData, setAccountType: Function, setEmail: Function) => {
    const email = formData.get("email");
    if (email) {
        setEmail(email.toString());
        
        const haveUser = await submitEmail(email);

        if (haveUser) {
            console.log('vvvvvvvvvvvvvvvvvvv');
            // setAccountType(AccountType.Google);
            setAccountType(AccountType.Email);
        }
        else {
            console.log('xxxxxxxxxxxxxxxxxxxxxx');
        }
    }


};