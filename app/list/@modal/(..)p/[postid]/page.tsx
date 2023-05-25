import AuthButtonHeader from "../../../../../components/AuthButtonHeader";
import Navigation from "../../../../../components/Navigation";
import PostPage from "../../../../../components/postPage/PostPage";
import ListPageModal from "../../../../../components/listPage/ListPageModal";
import prisma from "../../../../../lib/prisma";



async function getData(postid: string) {
  console.log(postid);
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
            }
          }
        },
      },
    },
  });
  return { postData };
}

export default async function Page({ params }: { params: { postid: string } }) {
  console.log(params);
  const { postid } = params;
  const { postData } = await getData(postid);
  return (
    <>
      <ListPageModal>
        <PostPage postData={postData} />
      </ListPageModal>
    </>
  );
}
