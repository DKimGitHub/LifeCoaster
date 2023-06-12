import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { graphId } = req.query;
  const deleteData = await prisma.graph.update({
    where: {
      id: graphId?.toString(),
    },
    data: {
      event: {
        deleteMany: {},
      }
    }
  });
  res.status(200).json(deleteData);
}
