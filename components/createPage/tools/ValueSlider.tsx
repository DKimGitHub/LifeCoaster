import Slider from "@mui/material/Slider";
import React from "react";
import { styled } from "@nextui-org/react";

export default function ValueSlider({
  onChange,
  defaultValue,
 
}: {
  onChange: (...event: any[]) => void;
  defaultValue: number

}) {

  const marks = [
    {
      value: 0,
      label: 0,
    },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    {
      value: 5,
      label: 5,
    },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    {
      value: 10,
      label: 10,
    },
  ];
  return (
    <Slider
      defaultValue={defaultValue}
      step={1}
      marks={marks}
      min={0}
      max={10}
      valueLabelDisplay="on"
      onChange={(_, value) => onChange (value)}
      sx={{
        color: "#704f47",
      }}
    />
  );
}
