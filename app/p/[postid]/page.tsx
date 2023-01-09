import LifeChart from "../../../components/LifeChart";
import Image from "next/image";
import heartIcon from "../../../public/heart.svg";

export default async function Page({ params }: { params: any }) {
    const { postid } = params;
    const colorTheme = "cupcake";
    return (
      <>
        <div className="text-3xl py-10 text-center font-semibold">John Smith's 2019 Year Coaster</div>
        <div className="flex">
        <div
                  data-theme={colorTheme}
                  className={`chartContainer h-96 w-3/4 peer relative z-10 border-4 border-solid bg-base-100`}>
                  <LifeChart />
                </div>
                <div className="w-1/4 flex flex-col"> <div className="flex justify-center"> <p className="pr-1 text-2xl">10</p> <Image src={heartIcon} alt="Heart Icon"/></div> </div>
                </div>
      </>
    );
  }
  