"use server";

import { signIn } from "@/auth";
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
        redirect('/users', RedirectType.replace);
  
    } catch (err) {
        console.log("serverMethods_errorrrrrr");
  
        throw err;
    }
};
  

export async function doGoogleLogin() {
    await signIn("google", { redirectTo: "/users" });
}
