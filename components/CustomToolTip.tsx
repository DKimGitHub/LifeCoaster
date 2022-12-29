import { PointTooltipProps } from "@nivo/line";
import { mockData1 } from "../lib/mockData";

export default function CustomToolTip(props: PointTooltipProps) {
    const p = props.point.data;
    const data = mockData1[0].data.find(e=> e.y ===p.y)?.title;
    
  return (
    <div className="rounded-md border bg-gray-200 p-1 text-black ">
      <p>{data}</p>

    </div>
  );
}
