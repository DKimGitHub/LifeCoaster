export default async function Page({ params }: { params: { postid: string } }) {
  const { postid } = params;
  return (
    <>
      <div>specific post page with id: {postid}</div>

      <div className="mt-10 aspect-[21/5] w-full border border-black text-center"> GRAPH </div>
    </>
  );
}
