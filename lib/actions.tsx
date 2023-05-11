'use server';

import prisma from "../lib/prisma";

 
export async function addComment(text : string, email : string, postId: string) {
    const userData = await prisma.user.findUnique({where: {email: email}});
    const res = await prisma.comment.create({data: {text: text, userId: userData?.id, postId: postId}});
}