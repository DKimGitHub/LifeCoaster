import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;
  const deleteData = await prisma.event.delete({
    where: {
      id: eventId?.toString(),
    }
  });
  res.status(200).json(deleteData);
}
