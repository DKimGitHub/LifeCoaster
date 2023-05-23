"use client";
import { Textarea, useInput } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { addComment } from "../../lib/actions";
export default function CommentTextArea({ postId }: { postId: string }) {
  const { data: session, status } = useSession();
  let [isPending, startTransition] = useTransition();

  const { value, reset, bindings } = useInput("");

  function clickHandler() {
    const temp = value;
    if (temp) {
      reset();
      /*@ts-expect-error*/
      startTransition(() => addComment(value, session.user?.email, postId));
    }
  }
  return session ? (
    <div className="m-1 flex items-center">
      <Textarea
        {...bindings}
        aria-label="Comment Field"
        className="flex-1"
        fullWidth
        placeholder="Comment..."
        minRows={1}
      />

      <button
        onClick={clickHandler}
        className="m-2 flex-none text-base font-medium leading-4">
        Post
      </button>
    </div>
  ) : (
    <div className="m-1 flex items-center">
      <Textarea
        aria-label="Comment Field"
        className="flex-1"
        fullWidth
        disabled
        placeholder="Login to Comment"
        minRows={1}
      />
      <button
        disabled
        className="m-2 flex-none text-base font-medium leading-4 text-gray-500">
        Post
      </button>
    </div>
  );
}
