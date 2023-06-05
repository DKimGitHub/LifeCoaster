import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { graphId } = req.query;
  const getData = await prisma.event.findMany({
    where: {
      graphId: graphId?.toString(),
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true
    }
  });
  res.status(200).json(getData);
}
