"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const ListPageModalContext = createContext<Props>({
  visible: false,
  setVisible: () => {},
});

export default function ListPageModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <ListPageModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </ListPageModalContext.Provider>
  );
}
