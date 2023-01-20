import Link from "next/link";
import LifeChart from "../../components/ListPageGraph";
import ListPageCard from "../../components/ListPageCard";
import PageModal from "../../components/PostPage";
import ListPageSorter from "../../components/ListPageSorter";
//import prisma from "../../lib/prisma";

async function fetchData() {
  const feed = await prisma.post.findMany({
    select: {
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
  });
  return feed;
}

export default async function Page() {
  const postList = JSON.stringify(await fetchData());
  const colorTheme = "cupcake";
  return (
    <>
  <div className="float-right my-5">
      <ListPageSorter />
      </div>
      <div className="my-5 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        {postList.map((data, index) => (
          <ListPageCard />
        ))}
      </div>
    </>
  );
}
