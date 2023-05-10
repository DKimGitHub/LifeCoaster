import Link from "next/link";
import LifeChart from "../../components/listPage/ListPageGraph";
import ListPageCard from "../../components/listPage/ListPageCard";
import PageModal from "../../components/PostPage";
import ListPageSorter from "../../components/listPage/ListPageSorter";
import prisma from "../../lib/prisma";
import { dataType } from "../../lib/types";
import ListPageContent from "../../components/listPage/ListPageContent";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import backArrow from "../../public/rounded-square-left-direction-svgrepo-com.svg";
import Image from "next/image";

async function fetchData() {
  const listOfPosts = await prisma.post.findMany({
    take: 6,
    // where: {
    //   published:true,
    // },
    select: {
      id: true,
      user: true,
      usersWhoHearted: true,
      numOfHearts: true,
      comments: true,
      updatedAt: true,
      createdAt: true,
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
      createdAt: 'desc'
    }
  });
  // const filtered = feed.filter(
  //   (e) => e.graph?.nodes && e.graph?.nodes.length > 0
  // );
  // return filtered;
  return {listOfPosts};
}
export default async function Page() {
  const { listOfPosts } = await fetchData();
  const colorTheme = "cupcake";
  return (
    <>
      <Link href="/" className="absolute top-6 left-8">
        <Image height="48" width="48" alt="back-arrow" src={backArrow}/>
      </Link>
      <div className="absolute top-6 right-8"><AuthButtonHeader/>
      </div>
      <ListPageContent listOfPosts={JSON.stringify(listOfPosts)}/>
    </>
  );
}
