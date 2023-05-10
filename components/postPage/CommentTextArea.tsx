"use client";
import { Textarea, useInput } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function CommentTextArea(postId : string) {
  //const { data: session, status } = useSession();
  const session = true; //BLUEBERRY

  const {
    value,
    bindings,
  } = useInput("");


  async function createComment() {
      // const response = await fetch(`/api/comment`, {
      //     method: 'POST',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({text: value, email: session.user.email,postId: postId,})
      //   })
      }

  return session ? (
    <form className="m-1 flex items-center">
      {/* <Textarea
              {...bindings}
        aria-label="Comment Field"
        className="flex-1"
        fullWidth
        placeholder="Comment..."
        minRows={1}
      /> */}
      <textarea/>
      <button onClick={createComment} className="m-2 flex-none text-base font-medium leading-4">
        Post
      </button>
    </form>
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
      <button disabled className="m-2 flex-none text-base font-medium leading-4 text-gray-500">
        Post
      </button>
    </div>
  );
}
