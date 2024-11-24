'use server';

import { uploadImage } from '@/lib/cloudinary';
import { redirect } from 'next/navigation';
// import { storePost } from '@/lib/posts';
import { auth } from "@/auth";
import { savePost } from '@/lib/prisma/posts';
import { revalidatePath } from 'next/cache';
// import {  } from '@/lib/exceptions';

export const createPostAction = async (prevState: any,formData: FormData) => {

    const session = await auth();

    // let errors = [];
    // if (!title || title.trim().length === 0) {
    //     errors.push('Title is required.');
    // }
    // if (!content || content.trim().length === 0) {
    //     errors.push('Content is required.');
    // }
    // if (!image || image.size === 0) {
    //     errors.push('Image is required.');
    // }
    // if (errors.length > 0) {
    //     return { errors };
    // }

    let imageUrl;

    throw new Error('Username already taken');

    try {
        imageUrl = await uploadImage(formData.get('image'));

        const postDto = {
            userId: session?.user?.id!,
            title: formData.get('title')?.toString(),
            description: formData.get('description')?.toString(),
            image: imageUrl,
            mood: formData.get('mood')?.toString(),
        }
    
        const result = await savePost(postDto);

        console.log('666666666666666666');
        console.log('666666666666666666');
        console.log('sean_log result: ' + result);

        revalidatePath('/');

        return { status: 'success' };

    } catch (error) {
        throw new Error(
            'Image upload failed, post was not created. Please try again later.'
        );
    }

};
