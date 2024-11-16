"use server";

import { signIn, signOut } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export const doCredentialLogin = async (formData: FormData) => {
    console.log("formDataformData");
    console.log(formData);
  
    try {
        const response = await signIn("credentials", {
            password: formData.get("password"), 
            email: formData.get("email"), 
            redirect: false,
        });
  
        console.log("vvvvvvvvvv");
        console.log('sean_log response: ' + response);
  
    } catch (err) {
        console.log("serverMethods_errorrrrrr");
        console.log(err);
  
        throw err;
    }

    redirect('/users', RedirectType.replace);

};
  

export async function doGoogleLogin() {
    await signIn("google", { redirectTo: "/users" });
}


export async function signOutAction() {
    console.log('88888888888888888888');
    await signOut({ redirectTo: "/authenticate", redirect: true })

}