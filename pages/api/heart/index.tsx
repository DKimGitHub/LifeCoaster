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
        let newNumOfHearts = body.numOfHearts;
        if (body.isHearted) {
          const updatedList = body.usersWhoHearted.filter(
            (item: string) => item !== body.email
          );
          await prisma.post.update({
            where: { id: body.postId },
            data: {
              usersWhoHearted: updatedList,
              numOfHearts: { decrement: 1 },
            },
          });
          newNumOfHearts--;
        } else {
          await prisma.post.update({
            where: { id: body.postId },
            data: {
              usersWhoHearted: { push: body.email },
              numOfHearts: { increment: 1 },
            },
          });
          newNumOfHearts++;
        }

        res.status(200).json({ newNumOfHearts });
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
