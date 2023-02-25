import Link from "next/link";
import LifeChart from "../../components/listPage/ListPageGraph";
import ListPageCard from "../../components/listPage/ListPageCard";
import PageModal from "../../components/postPage/PostPage";
import ListPageSorter from "../../components/listPage/ListPageSorter";
import prisma from "../../lib/prisma";
import { dataType } from "../../lib/types";
import ListPageContent from "../../components/listPage/ListPageContent";
import PostPage from "../../components/postPage/PostPage";

async function fetchData() {
  const listOfPosts = await prisma.post.findMany({
    take: 6,
    // where: {
    //   published:true,
    // },
    include: {
      comments: true,
      graph: {
        include: {
          nodes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // const filtered = feed.filter(
  //   (e) => e.graph?.nodes && e.graph?.nodes.length > 0
  // );
  // return filtered;
  return { listOfPosts };
}
export default async function Page() {
  const { listOfPosts } = await fetchData();
  return (
    <>
      <ListPageContent listOfPosts={listOfPosts} data-superjson/>
    </>
  );
}
