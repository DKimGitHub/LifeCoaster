export type PageProps = {
    params?: any;
    children?: React.ReactNode;
  };

  export type dataType = {
    [key: string]: any;
  }
  export type eventType = {
    bigEvent: number;
    overallValue: number;
    specificEvents: {year: number, value: number, description: string}[];
  }[]

  export type nodeType = {
    xValue: number;
    yValue: number;
  }[]