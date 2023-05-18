import AuthButtonHeader from "../../../components/AuthButtonHeader";
import Navigation from "../../../components/Navigation";
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
          event: {
            include: {
              specificYear: true,
              period: true,
            }
          }
        },
      },
    },
  });
  return { postData };
}

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const { postData } = await getData(postId);
  return (
    <>
    <Navigation/>
    <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="p-6" />
      <PostPage postData={postData} data-superjson />
    </div>
    </>
  );
}
