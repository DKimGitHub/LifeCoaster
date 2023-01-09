import Link from "next/link";
import LifeChart from "../../components/LifeChartListPage";
import prisma from "../../lib/prisma";
import styles from './page.module.css'


async function fetchData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true, },
    //   },
    //   graph: true,
    // },
  });
  return feed;
}

export default async function Page() {
  //const postList = await fetchData();
  const postList = [1,2,3];
  return (<>
    <div className="text-4xl text-center py-10 font-bold">THESE ARE THE LIST OF GRAPHS!!</div>
    <div className="mt-5 grid w-full grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">
      {postList.map((data, index) => (<>
      <LifeChart colorTheme="cupcake"/>
        </>
      ))}

    </div>
    </>
    /* {postList.map((data, index) => (
        <div className="card m-5 bg-base-100 shadow-xl">
          <div className="card-body p-6 pt-5">
            <div className="flex justify-between">
              <Link href={`/${data.author?.name}/${index}`} className="card-title text-2xl">{data.title} </Link>
              <Link href={`/${data.author?.name}`} className="italic">{data.author?.name}</Link>
            </div>
            <p>{data.content}</p>
            <div className="border aspect-[21/5] w-full"/>
          </div>
        </div>
      ))} */
  );
}
