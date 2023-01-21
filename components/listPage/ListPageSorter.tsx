"use client";

import { Dropdown } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

export default function ListPageSorter({
  handleSelect,
}: {
  handleSelect: (selection: string) => void;
}) {
  const [selected, setSelected] = useState(new Set(["Recently Updated"]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  useEffect(() => {
    handleSelect(selectedValue);
  });

  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        //@ts-expect-error
        onSelectionChange={setSelected}>
        <Dropdown.Item key="Recently Updated">Recently Updated</Dropdown.Item>
        <Dropdown.Item key="Recently Created">Recently Created</Dropdown.Item>
        <Dropdown.Item key="Most Hearted">Most Hearted</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
