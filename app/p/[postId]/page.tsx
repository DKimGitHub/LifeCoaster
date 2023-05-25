import AuthButtonHeader from "../../../components/AuthButtonHeader";
import Navigation from "../../../components/Navigation";
import PostPage from "../../../components/postPage/PostPage";
import getPostPageData from "../../../lib/getPostPageData"

export default async function Page({ params }: { params: { postid: string } }) {
  const { postid } = params;
  //const { postData } = await getPostPageData(postid);
  console.log(postid);
  //console.log(postData);
  return (
    <>
      <Navigation />
      <div className="absolute right-8 top-6">
        <AuthButtonHeader />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="p-10" />
        {/* <PostPage postData={postData} data-superjson /> */}
      </div>
    </>
  );
}
