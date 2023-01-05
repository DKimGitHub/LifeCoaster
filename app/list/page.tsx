import Link from "next/link";
import prisma from "../../lib/prisma";
import styles from './page.module.css'


async function fetchData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true },
      },
      graph: true,
    },
  });
  return feed;
}

export default async function Page() {
  const postList = await fetchData();
  return (
    <div className="mt-5 grid w-full grid-cols-1 md:grid-cols-2">
      {postList.map((data, index) => (<>
        <div className={`${styles.graph} my-4 mx-2 lg:mx-4 border border-black aspect-[21/5] max-w-full`}> <div className={styles['animated-card']}> <p>  John Smith</p> </div></div>
        </>
      ))}
      {/* graph::before {
            width: 70%;
            height: 100%;
            background: #ffc107;
            transition: .5s;
            transform-origin: left;
            transform: perspective(2000px) rotateY(-90deg); */}

    </div>

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
