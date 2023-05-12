import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.query;
  const getData = await prisma.post.findMany({
    where: {
      id: postId?.toString(),
    },
    select: {
      graph: {
        select: {
          event: {
            select: {
              nextYear: true,
              type: true,
              period: {
                select: {
                  value: true,
                  description: true,
                },
              },
              specificYear: {
                select: {
                  year: true,
                  value: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });
  res.status(200).json(getData);
}
