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
        
        
        res.status(200).json( );
      } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
