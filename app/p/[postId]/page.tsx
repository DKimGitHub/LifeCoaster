import PostPage from "../../../components/postPage/PostPage";
import prisma from "../../../lib/prisma";

async function getData(postId: string) {
  const postData = await prisma.post.findUnique({
    where: {
      id: postId,
    },
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
  });
  return { postData };
}

export default async function Page({ params }: { params: { postId: string } }) {
  //
  const { postId } = params;
  const { postData } = await getData(postId);
  return (
    <div className="">
      <div className="p-2" />
      <PostPage postData={postData} data-superjson />
    </div>
  );
}
