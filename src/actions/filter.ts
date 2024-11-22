"use server";

import { redirect } from 'next/navigation';


export const doFilterSubmit = async (formData: FormData) => {
    console.log("formDataformDataformDataformDataformDataformDataformDataformDataformDataformData");
    // const referer = headers.get('referer') || '/'; // Fallback to root if referer is not present
    redirect('/');
    // console.log('sean_log referer: ' + referer);
    // console.log("Redirecting back to:", referer);
}