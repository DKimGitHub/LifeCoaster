import AuthButtonHeader from "../../../components/AuthButtonHeader";
import Navigation from "../../../components/Navigation";
import PostPage from "../../../components/postPage/PostPage";
import getPostPageData from "../../../lib/getPostPageData"

export default async function Page({ params }: { params: { postid: string } }) {
  const { postid } = params;
  const { postData } = await getPostPageData(postid);
  return (
    <>

        <PostPage postData={postData} data-superjson />
    </>
  );
}
