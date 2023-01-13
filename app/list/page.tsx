import Link from "next/link";
import LifeChart from "../../components/ListPageGraph";
import ListPageCard from "../../components/ListPageCard";
import PageModal from "../../components/PostPage";
//import prisma from "../../lib/prisma";

// async function fetchData() {
//   const feed = await prisma.post.findMany({
//     where: { published: true },
//     // include: {
//     //   author: {
//     //     select: { name: true, },
//     //   },
//     //   graph: true,
//     // },
//   });
//   return feed;
// }

export default function Page() {
  //const postList = await fetchData();
  const postList = [1, 2, 3];
  const colorTheme = "cupcake";
  return (
    <>
      <select defaultValue="Sort By" className="select-bordered select float-right my-5 w-full max-w-[11rem]">
        <option disabled>
          Sort By
        </option> 
        <option>Recently Updated</option>
        <option>Recently Created</option>
        <option>Most Hearts</option>
      </select>


      <div className="my-5 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        {postList.map((data, index) => (
          <ListPageCard/>
        ))}
      </div>
    </>
  );
}
