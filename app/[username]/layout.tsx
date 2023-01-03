import { PageProps } from "../../lib/types";

export default function Layout({ children, params }: PageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 rounded-2xl border border-black p-4">
        My name is {params.username}!
      </div>
      {children}
    </div>
  );
}
