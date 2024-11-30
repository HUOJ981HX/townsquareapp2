'use server';

import { uploadImage } from '@/lib/cloudinary';
import { redirect } from 'next/navigation';
// import { storePost } from '@/lib/posts';
import { auth } from "@/auth";
import { savePost } from '@/lib/prisma/posts';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
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

    // throw new Error('Username already taken');

    try {
        // imageUrl = await uploadImage(formData.get('image'));

        const newPost = await prisma.post.create({
            data: {
                userId: session?.user?.id!,
                title: formData.get('title')?.toString()!,
                description: formData.get('description')?.toString(),
            }
        });

        await prisma.filterablePostAttributes.create({
            data: {
                mood: formData.get('mood')?.toString(),
                postId: newPost.id, // Link it to the newly created post
            },
        });
    
        // await savePost(postDto);

        revalidatePath('/');

        return { 
            status: 'success', 
            message: 'Post created successfully!' 
        };

    } catch (error) {
        console.error('Post creation error:', error);
        return { 
            status: 'error', 
            message: 'Failed to create post. Please try again later.' 
        };
    }

};
