import { curveNatural } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import createStyles from "../styles/create.module.css";

export default function Graph() {
  const xScale = scaleLinear({
    domain: [0, 10],
    range: [-2, 12],
    round: true,
  });

  const yScale = scaleLinear({
    domain: [-10, 10],
    range: [-12, 12],
    round: true,
  });

  return (
    <svg className={createStyles.svg}>
      <AxisLeft stroke={"black"} tickStroke={"black"} scale={yScale} />
      <LinePath
        curve={curveNatural}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 20, y: 15 },
        ]}
        x={(d) => d.x}
        y={(d) => d.y}
        stroke={"black"}
        strokeWidth={3}
      />
    </svg>
  );
}
