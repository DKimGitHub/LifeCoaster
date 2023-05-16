import { Post, Comment, Graph, Node, User, Event, SpecificYear, Period } from "@prisma/client";

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type dataType = {
  [key: string]: any;
};
export type FormState = {
  year: number;
  value: number;
};

export type PostDataType = Post & {
  comments: (Comment & {user:User | null})[];
  graph: (Graph & {
    event: (Event & {
        specificYear: SpecificYear[];
        period: Period | null;
    })[];
}) | null;
} | null;

export type eventType = {
  nextYear: number;
  type: "period" | "specificYear" | "year" | null;
  period: {
    value: number;
    description: string;
  };
  specificYear: {
    year: number;
    value: number;
    description: string;
  } [];
}[];

export type nodeType = {
  xValue: number;
  yValue: number;
}[];
