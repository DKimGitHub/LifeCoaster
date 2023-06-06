import React from "react";
import Select from "@mui/material/Select";
import { Menu, MenuItem } from "@mui/material";

export default function YearSelect({
  onChange,
  reverse,
  rangeInput,
  start,
  end,
  value,
}: {
  onChange: (...event: any[]) => void;
  rangeInput?: number[];
  reverse?: boolean;
  start?: number;
  end?: number;
  value: number;
}) {
  var range: number[] = [];

  if (rangeInput) {
    range = rangeInput;
  } else if (!rangeInput && start && end) {
    range = reverse
      ? Array.from(Array(end - start + 1).keys(), (x) => x + start).reverse()
      : Array.from(Array(end - start + 1).keys(), (x) => x + start);
  }
  return (
    <Select
      label="Year"
      onChange={(event, _) => {
        onChange(event.target.value);
      }}
      value={value}
      sx={{
        color: "#474239",
      }}>
      {range.map((i) => (
        <MenuItem style={{ width: "6rem", color: "#474239" }} key={i} value={i}>
          {i}
        </MenuItem>
      ))}
    </Select>
  );
}
