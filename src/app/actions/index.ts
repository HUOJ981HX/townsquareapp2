'use server';

import { uploadImage } from '@/libs/cloudinary';
import { PostDto } from '@/types';
import { redirect } from 'next/navigation';
// import { storePost } from '@/lib/posts';
import { auth } from "@/auth";

export const createPostAction = async (prevState: any,formData: FormData) => {

    const title = formData.get('title')?.toString();
    const image = formData.get('image') as any;
    const content = formData.get('content')?.toString();

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required.');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Content is required.');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required.');
    }

    if (errors.length > 0) {
        return { errors };
    }

    let imageUrl;

    // try {
    //     console.log('zzzzzzzzzzzzzzzzzzzzzzz');
    //     console.log('zzzzzzzzzzzzzzzzzzzzzzz');
    //     imageUrl = await uploadImage(image);
    //     console.log('sean_log: ' + imageUrl);

    // } catch (error) {
    //     throw new Error(
    //         'Image upload failed, post was not created. Please try again later.'
    //     );
    // }

    const session = await auth();

    // const postDto: PostDto = {

    // }

    // await storePost({
    //   imageUrl: imageUrl,
    //   title,
    //   content,
    //   userId: 1,
    // });

    redirect('/');
};
