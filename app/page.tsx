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
      <div className="h-96 w-full">
        <LifeGraph/>
      </div>
      <h1 className="self-start p-5 pt-20 text-7xl text-gray-100">
        Cards for List Page
      </h1>
      <div className="grid w-full grid-cols-2">
        {postList.map((data) => (
          <div className="card m-5 bg-base-100 shadow-xl">
            <div className="card-body bg-gray-500">
              <div className="flex justify-between">
                <p className="card-title text-2xl">{data.title} </p>
                <div className="italic">{data.author?.name}</div>
              </div>
              <p>{data.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="toast">
        <div className="alert alert-info">
          <div>
            <span>New mail arrived.</span>
          </div>
        </div>
      </div>
    </>
  );
}
