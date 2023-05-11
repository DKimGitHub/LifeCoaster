import prisma from "../../lib/prisma";
import ListPageContent from "../../components/listPage/ListPageContent";

export const dynamic = 'force-dynamic';

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
