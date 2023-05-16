"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function addComment(text: string, email: string, postId: string) {
  const userData = await prisma.user.findUnique({ where: { email: email } });
  if (!userData?.id) {throw "e"}
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
