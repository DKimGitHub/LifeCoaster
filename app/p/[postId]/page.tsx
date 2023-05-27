import AuthButtonHeader from "../../../components/AuthButtonHeader";
import Navigation from "../../../components/Navigation";
import PostPage from "../../../components/postPage/PostPage";
import getPostPageData from "../../../lib/getPostPageData"

//WARNING it's postId for p\ and it's postid for (..)p\ 
export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const { postData } = await getPostPageData(postId);
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
