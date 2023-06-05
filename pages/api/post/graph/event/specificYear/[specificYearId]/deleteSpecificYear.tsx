import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { specificYearId } = req.query;
  const deleteData = await prisma.specificYear.delete({
    where: {
      id: specificYearId?.toString(),
    }
  });
  res.status(200).json(deleteData);
}
