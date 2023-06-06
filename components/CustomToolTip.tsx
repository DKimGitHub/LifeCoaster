import { PointTooltipProps } from "@nivo/line";
import { TooltipWrapper } from '@nivo/tooltip';
import { mockData1 } from "../lib/mockData";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function CustomToolTip(props: PointTooltipProps) {
  const p = props.point.data;
  // const data = mockData1[0].data.find(e=> e.y ===p.y)?.title;

  return (
    <TooltipWrapper anchor="left" position={[0, 0]}>
      <div
        className={pangolin.className}
        style={{
          border: "2px solid #ff297b",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          color: "#704f47",
          fontWeight: "600"
        }}>
        <span>Year: {p.xFormatted}</span>
        <br />
        <span>
          Satisfactory: {p.yFormatted}
        </span>
      </div>
    </TooltipWrapper>
  );
}
