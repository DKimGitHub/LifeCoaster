import { Post, Comment, Graph, Node } from "@prisma/client";

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
  comments: Comment[];
  graph:
    | (Graph & {
        nodes: Node[];
      })
    | null;
} | null;
