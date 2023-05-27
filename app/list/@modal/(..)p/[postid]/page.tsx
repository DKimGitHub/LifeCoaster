import PostPage from "../../../../../components/postPage/PostPage";
import ListPageModal from "../../../../../components/listPage/ListPageModal";
import getPostPageData from "../../../../../lib/getPostPageData"

export default async function Page({ params }: { params: { postid: string } }) {
  const { postid } = params;
  const { postData } = await getPostPageData(postid);
  return (
    <>
      <ListPageModal>
        <PostPage postData={postData} data-superjson/>
      </ListPageModal>
    </>
  );
}
