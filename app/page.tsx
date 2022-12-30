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
  const postList = await fetchData();

  return (
    <>
      <h1 className="self-start p-5 text-7xl">Cards for List Page</h1>
      <div className="grid w-full grid-cols-2">
        {postList.map((data) => (
          <div className="card m-5 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{data.title} <span className="italic">{data.author?.name}</span></h2>
              <p>{data.content}</p>
            </div>
            <div className="h-72 m-4 mt-0">
              <LifeGraph />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
