import Image from "next/image";
import LifeGraph from "../components/LifeGraph";
import prisma from "../lib/prisma";

export const dynamic = "force-dynamic";

async function fetchData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return feed;
}

export default async function Home() {
  return (
    <>
      <div className="m-4 max-w-full rounded-xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
        Project by Kimbros
      </div>
    </>
  );
}
