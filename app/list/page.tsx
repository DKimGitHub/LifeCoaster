import Link from "next/link";
import LifeChart from "../../components/LifeChart";
import prisma from "../../lib/prisma";
import styles from "./page.module.css";

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
  const postList = [1, 2, 3];
  const colorTheme = "cupcake";
  return (
    <>
      <div className="py-10 text-center text-4xl font-bold">
        THESE ARE THE LIST OF GRAPHS!!
      </div>
      <select className="select-bordered select float-right mb-5 w-full max-w-[11rem]">
        <option disabled selected>
          Sort By
        </option>
        <option>Recently Created</option>
        <option>Recently Updated</option>
        <option>Most Hearts</option>
      </select>
      <div className="mt-5 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        {postList.map((data, index) => (
          <>
            <Link href={`/p/${data}`} className="relative">
                <div
                  data-theme={colorTheme}
                  className={`chartContainer h-50 peer relative z-10 border-4 border-solid bg-base-100 transition-transform duration-300 ease-in-out hover:translate-y-2`}>
                  <LifeChart />
                </div>
                <div
                  className={`${styles.tab} absolute top-0 z-[-1] flex w-full rounded-t-md bg-accent px-2 text-accent-content transition-transform duration-300 ease-in-out peer-hover:-translate-y-4 `}>
                  <div className="flex-1">John Smith</div>{" "}
                  <div className="flex-none">{"   "} 3 hearts</div>
                </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
