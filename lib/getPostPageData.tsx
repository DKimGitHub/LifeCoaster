import prisma from "../lib/prisma";

export default async function getPostPageData(postid: string) {
  const postData = await prisma.post.findUnique({
    where: {
      id: postid,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      graph: {
        include: {
          event: {
            include: {
              specificYear: true,
              period: true,
            },
          },
        },
      },
    },
  });
  return { postData };
}

