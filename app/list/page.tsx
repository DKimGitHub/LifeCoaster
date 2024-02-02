import prisma from "../../lib/prisma";
import ListPageContent from "../../components/listPage/ListPageContent";

export const dynamic = "force-dynamic";

async function fetchData() {

  const listOfPosts = await prisma.post.findMany({
    take: 6,
    include: {
      user: {
        select: {
          name: true
        }
      },
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
  return { listOfPosts };
}
export default async function Page() {
  const { listOfPosts } = await fetchData();
  return (
    <>
      <ListPageContent listOfPosts={listOfPosts} data-superjson />
    </>
  );
}
