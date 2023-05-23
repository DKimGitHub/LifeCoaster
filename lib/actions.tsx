"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function addComment(text: string, email: string, postId: string) {
  const userData = await prisma.user.findUnique({ where: { email: email } });
  if (!userData?.id) {
    throw "e";
  }
  const res = await prisma.comment.create({
    data: {
      text: text,

      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: userData.id },
      },
    },
  });
  
  revalidatePath(`/p/${postId}`);
}

export async function clickHeart(email: string, postId: string) {
  const currentPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  const isHearted = currentPost?.usersWhoHearted.includes(email)
    ? true
    : false;
  if (isHearted) {
    const updatedList = currentPost?.usersWhoHearted.filter(
      (item: string) => item !== email
    );
    await prisma.post.update({
      where: { id: postId },
      data: {
        usersWhoHearted: updatedList,
        numOfHearts: { decrement: 1 },
      },
      select: {
        id: true,
        numOfHearts: true,
        usersWhoHearted: true,
      },
    });
  } else {
    await prisma.post.update({
      where: { id: postId },
      data: {
        usersWhoHearted: { push: email },
        numOfHearts: { increment: 1 },
      },
      select: {
        id: true,
        numOfHearts: true,
        usersWhoHearted: true,
      },
    });
  }
  revalidatePath(`/p/${postId}`);
}
