"use server";

import { signIn, signOut } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export const doCredentialLogin = async (formData: FormData) => {
    try {
        const response = await signIn("credentials", {
            password: formData.get("password"), 
            email: formData.get("email"), 
            redirect: false,
        });
    } catch (err) {
        throw err;
    }

    redirect('/users', RedirectType.replace);
};
  

export async function doGoogleLogin() {
    await signIn("google", { redirectTo: "/users" });
}


export async function signOutAction() {
    await signOut({ redirectTo: "/authenticate", redirect: true })

}