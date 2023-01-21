import Link from "next/link";
import LifeChart from "../../components/ListPageGraph";
import ListPageCard from "../../components/ListPageCard";
import PageModal from "../../components/PostPage";
import ListPageSorter from "../../components/ListPageSorter";
import prisma from "../../lib/prisma";
import { dataType } from "../../lib/types";

async function fetchData() {
  const feed = await prisma.post.findMany({
    take: 8,
    // where: {
    //   published:true,
    // },
    select: {
      user: true,
      usersWhoHearted: true,
      comments: true,
      graph: {
        include: {
          nodes: {
            select: {
              xValue: true,
              yValue: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  // const filtered = feed.filter(
  //   (e) => e.graph?.nodes && e.graph?.nodes.length > 0
  // );
  // return filtered;
  console.log(feed);
  return feed;
}
export default async function Page() {
  const postList = await fetchData();
  const colorTheme = "cupcake";
  return (
    <>
      <div className="float-right my-5">
        <ListPageSorter />
      </div>
      <div className="my-5 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        {postList.map((data: any, index: number) => (
          <ListPageCard key={index} data={data} />
        ))}
      </div>
    </>
  );
}
