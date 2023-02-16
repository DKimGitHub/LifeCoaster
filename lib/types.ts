export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type dataType = {
  [key: string]: any;
};
export type eventType = {
  nextYear: number;
  type: "period" | "specificYear" | null;
  period: {
    value: number;
    description: string;
  } | null;
  specificYear: {
    year: number;
    value: number;
    description: string;
  } [] | null;
}[];

export type nodeType = {
  xValue: number;
  yValue: number;
}[];
