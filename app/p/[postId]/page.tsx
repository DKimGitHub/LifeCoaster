import AuthButtonHeader from "../../../components/AuthButtonHeader";
import Navigation from "../../../components/Navigation";
import PostPage from "../../../components/postPage/PostPage";
import prisma from "../../../lib/prisma";

async function getData(postid: string) {
  const postData = await prisma.post.findUnique({
    where: {
      id: postid,
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
            },
          },
        },
      },
    },
  });
  return { postData };
}

export default async function Page({ params }: { params: { postid: string } }) {
  console.log(params);
  const { postid } = params;
  console.log(postid);
  const { postData } = await getData(postid);
  console.log(postData);
  return (
    <>
      <Navigation />
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="p-10" />
        <PostPage postData={postData} data-superjson />
      </div>
    </>
  );
}
