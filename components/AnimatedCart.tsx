"use client"

// @ts-ignore
import * as spline from "@yr/monotone-cubic-spline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
let createInterpolant = function (xs: number[], ys: number[]) {
  let i,
    length = xs.length;

  // Deal with length issues
  if (length != ys.length) {
    throw "Need an equal count of xs and ys.";
  }
  if (length === 0) {
    return function (x: any) {
      return 0;
    };
  }
  if (length === 1) {
    // Impl: Precomputing the result prevents problems if ys is mutated later and allows garbage collection of ys
    // Impl: Unary plus properly converts values to numbers
    let result = +ys[0];
    return function (x: any) {
      return result;
    };
  }

  // Rearrange xs and ys so that xs is sorted
  let indexes = [];
  for (i = 0; i < length; i++) {
    indexes.push(i);
  }
  indexes.sort(function (a, b) {
    return xs[a] < xs[b] ? -1 : 1;
  });
  let oldXs = xs,
    oldYs = ys;
  // Impl: Creating new arrays also prevents problems if the input arrays are mutated later
  xs = [];
  ys = [];
  // Impl: Unary plus properly converts values to numbers
  for (i = 0; i < length; i++) {
    xs.push(+oldXs[indexes[i]]);
    ys.push(+oldYs[indexes[i]]);
  }

  // Get consecutive differences and slopes
  let dys = [],
    dxs = [],
    ms = [];
  for (i = 0; i < length - 1; i++) {
    let dx = xs[i + 1] - xs[i],
      dy = ys[i + 1] - ys[i];
    dxs.push(dx);
    dys.push(dy);
    ms.push(dy / dx);
  }

  // Get degree-1 coefficients
  let c1s = [ms[0]];
  for (i = 0; i < dxs.length - 1; i++) {
    let m = ms[i],
      mNext = ms[i + 1];
    if (m * mNext <= 0) {
      c1s.push(0);
    } else {
      let dx_ = dxs[i],
        dxNext = dxs[i + 1],
        common = dx_ + dxNext;
      c1s.push((3 * common) / ((common + dxNext) / m + (common + dx_) / mNext));
    }
  }
  c1s.push(ms[ms.length - 1]);

  // Get degree-2 and degree-3 coefficients
  let c2s: number[] = [],
    c3s: number[] = [];
  for (i = 0; i < c1s.length - 1; i++) {
    let c1 = c1s[i],
      m_ = ms[i],
      invDx = 1 / dxs[i],
      common_ = c1 + c1s[i + 1] - m_ - m_;
    c2s.push((m_ - c1 - common_) * invDx);
    c3s.push(common_ * invDx * invDx);
  }

  // Return interpolant function
  return function (x: number) {
    // The rightmost point in the dataset should give an exact result
    let i = xs.length - 1;
    if (x == xs[i]) {
      return ys[i];
    }

    // Search for the interval x is in, returning the corresponding y if x is one of the original xs
    let low = 0,
      mid,
      high = c3s.length - 1;
    while (low <= high) {
      mid = Math.floor(0.5 * (low + high));
      let xHere = xs[mid];
      if (xHere < x) {
        low = mid + 1;
      } else if (xHere > x) {
        high = mid - 1;
      } else {
        return ys[mid];
      }
    }
    i = Math.max(0, high);

    // Interpolate
    let diff = x - xs[i],
      diffSq = diff * diff;
    return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
  };
};

const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        grid: { display: false },
        display: false,
      },
      y: {
        type: "linear",
        grid: { display: false },
        display: false,
      },
    },
    maintainAspectRatio: false,

};
export default function AnimatedCart() {
    const interpolateFunc = createInterpolant([0, 1, 14, 20, 30], [0,8,2,10,0]);
    const dataArray = Array.from(Array(30).keys()).map(el=>({x: el, y:interpolateFunc(el)}));
     const data = {
        datasets: [
          {
            label: "Dataset 1",
            data: dataArray,
            borderColor: "hsl(0,100%,50%)",
          },
        ],
      };
    return (
  <div
    className={`relative z-10 border-4 border-solid bg-base-100 transition-transform duration-300 ease-in-out hover:translate-y-2`}>
    <Line className="h-50" data={data} options={options}/>
  </div>);
}
