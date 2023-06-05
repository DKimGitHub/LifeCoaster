import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "GET":
      const getData = await prisma.event.findMany(req.body.query);
      res.status(200).json(getData);  
      break;
    case "POST":
      const data = JSON.parse(req.body);
      const postData = await prisma.event.create({
        ...data
      });
      res.status(200).json(postData);
      break
    case "PUT":
      const putData = await prisma.event.update({
        ... JSON.parse(req.body)
      });
      res.status(200).json(putData);
      break
    case "DELETE":
      const deleteData = await prisma.event.delete({
        ... JSON.parse(req.body)
      });
      res.status(200).json(deleteData);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break; 
  } 
}
