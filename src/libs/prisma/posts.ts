import prisma from "./index"

export async function savePost(post: any) {
    const newPost = await prisma.post.create({
        data: {
            userId: 1, 
            title: "first post title",
            description: "first post description",
            image: "Software Engineer at TechCorp",
        },
    });
}