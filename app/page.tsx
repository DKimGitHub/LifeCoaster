import LifeChart from "../lib/LifeChart";

export default async function Home() {
  return (
    <>
      <div className="m-4 max-w-full rounded-xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
        Project by Kimbros
      </div>
      <div className="bg-white relative"><LifeChart/></div>
    </>
  );
}
