import prisma from "./index"

export async function savePost(post: any) {
    const newPost = await prisma.post.create({
        data: post
    });
}