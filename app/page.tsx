import Image from "next/image";
import { Inter } from "@next/font/google";
import prisma from "../lib/prisma";

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
  console.log(postList);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="m-5 max-w-full rounded-3xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
        Project by Kimbros
      </div>
      <div className="flex w-full items-center justify-evenly">
        <div className="space-x-5 rounded-3xl border bg-white p-6 text-center text-4xl text-red-900">
          hello world
        </div>
        <button className="btn-primary btn-circle btn mt-8 h-28 w-28 text-yellow-200">
          fking useless button
        </button>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">AMC projected price</div>
            <div className="stat-value">$500,000</div>
            <div className="stat-desc">literally on the moon</div>
          </div>
        </div>
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
    </div>
  );
}
