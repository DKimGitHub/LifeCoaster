import AnimatedCart from "../components/AnimatedCart";
import ListPageGraph from "../components/ListPageGraph";
import NextUITester from "../components/NextUITester";
export default async function Home() {
  return (
    <>
      <div className="mt-4 max-w-full rounded-xl border bg-blue-200 bg-gradient-to-br from-yellow-200 p-10 text-center text-7xl font-bold text-gray-700 ">
        Project by Kimbros
      </div>
      <div
        className={`chartContainer relative z-10 h-60 border-4 border-solid bg-base-100`}>
        <ListPageGraph />
      </div>{" "}
      <AnimatedCart />
      <NextUITester />
    </>
  );
}
