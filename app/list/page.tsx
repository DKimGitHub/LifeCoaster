import prisma from "../../lib/prisma";


async function fetchData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return feed;
}

export default async function Page() {
  const postList = await fetchData();
  return (
    <div className="grid w-full grid-cols-2">
      {postList.map((data, index) => (
        <div className="card m-5 bg-base-100 shadow-xl">
          <div className="card-body p-6 pt-5">
            <div className="flex justify-between">
              <a href={`${data.author?.name}/${index}`} className="card-title text-2xl">{data.title} </a>
              <a href={`${data.author?.name}`} className="italic">{data.author?.name}</a>
            </div>
            <p>{data.content}</p>
            <div className="border h-48 w-full"/>
          </div>
        </div>
      ))}
    </div>
  );
}
