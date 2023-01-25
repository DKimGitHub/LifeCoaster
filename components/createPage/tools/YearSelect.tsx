import React, { useContext } from "react";
import Select from "@mui/material/Select";
import { Menu, MenuItem } from "@mui/material";
import { CreatePageContext } from "../../../lib/CreatePageContext";

export default function YearSelect(field: any) {
  const { nextBigEvent } = useContext(CreatePageContext);
  const start = nextBigEvent;
  const end = 2023;
  const range = Array.from(Array(end - start + 1).keys(), (x) => x + start);

  return (
    <Select
      label="Year"
      onChange={(_, value) => field.onChange(value)}
      defaultValue= {nextBigEvent + 1}
      sx={{
        color: "#704f47",
      }}>
      {range.map((i) => (
        <MenuItem style={{width: '6rem'}} key={i} value={i}>
          {i}
        </MenuItem>
      ))}
    </Select>
  );
}
