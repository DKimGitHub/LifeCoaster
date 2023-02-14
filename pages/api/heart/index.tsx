import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const body = req.body;
        let updated;
        const currentPost = await prisma.post.findUnique({where: {id: body.postId}});

        const isHearted = currentPost?.usersWhoHearted.includes(body.email) ? true : false;
        if (isHearted) {
           const updatedList = currentPost?.usersWhoHearted.filter(
            (item: string) => item !== body.email
          );
          updated = await prisma.post.update({
            where: { id: body.postId },
            data: {
              usersWhoHearted: updatedList,
              numOfHearts: {decrement: 1},
            },
            select: {
              id: true,
              numOfHearts: true,
              usersWhoHearted: true,
            }
          });
        } else {
          updated = await prisma.post.update({
            where: { id: body.postId },
            data: {
              usersWhoHearted: { push: body.email },
              numOfHearts: {increment: 1},
            },
            select: {
              id: true,
              numOfHearts: true,
              usersWhoHearted: true,
            }
          });
        }
        res.status(200).json(updated);
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
