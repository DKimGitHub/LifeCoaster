"use client";

import { Dropdown } from "@nextui-org/react";
import { useMemo, useState } from "react";

export default function ListPageSorter({
  handleSelect,
}: {
  handleSelect: (selection: string) => void;
}) {
  const [selected, setSelected] = useState(new Set(["Recently Created"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  function onSelectionChange (keys: Set<string>) {
    setSelected(keys);
    handleSelect(Array.from(keys).join(""));
  }

  return (
    <Dropdown>
      <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="primary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        //@ts-expect-error
        onSelectionChange={onSelectionChange}>
        <Dropdown.Item key="Recently Created">Recently Created</Dropdown.Item>
        <Dropdown.Item key="Recently Updated">Recently Updated</Dropdown.Item>
        <Dropdown.Item key="Most Hearted">Most Hearted</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
