import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;
  const offset = Number(query.offset);
  const sortBy = query.sortby;
  const sortByQuery =
    sortBy === "RU"
      ? {
          orderBy: {
            updatedAt: "desc",
          },
        }
      : sortBy === "RC"
      ? {
          orderBy: {
            createdAt: "desc",
          },
        }
      : {
          orderBy: {
            numOfHearts: "desc",
          },
        };

  switch (method) {
    case "GET":
      if (!query.offset) res.status(400).end("need offset in query");
      const data = await prisma.post.findMany({
        take: 6,
        skip: offset,
        select: {
          user: true,
          usersWhoHearted: true,
          comments: true,
          updatedAt: true,
          createdAt: true,
          graph: {
            include: {
              nodes: {
                select: {
                  xValue: true,
                  yValue: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      res.status(200).json(data);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
