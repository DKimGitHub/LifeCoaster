import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { year, value } = JSON.parse(req.body)

  switch (method) {
    case "POST":
      const createNode = await prisma.testNode.create({
        data: {
          year: year,
          value: value
        },
      });
      res.status(200).json(createNode);
    default: 
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
