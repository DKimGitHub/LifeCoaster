import prisma from "../../lib/prisma";
import ListPageContent from "../../components/listPage/ListPageContent";
import AuthButtonHeader from "../../components/AuthButtonHeader";
import backArrow from "../../public/rounded-square-left-direction-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";

export const dynamic = "force-dynamic";

async function fetchData() {
  const listOfPosts = await prisma.post.findMany({
    take: 6,
    // where: {
    //   published:true,
    // },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      graph: {
        include: {
          event: {
            include: {
              specificYear: true,
              period: true,
            },
          },
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
      {/* <Link href="/" className="absolute left-8 top-6">
        <Image height="48" width="48" alt="back-arrow" src={backArrow} />
      </Link> */}
      <Navigation/>
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4">
      <ListPageContent listOfPosts={listOfPosts} data-superjson />
      </div>
    </>
  );
}
