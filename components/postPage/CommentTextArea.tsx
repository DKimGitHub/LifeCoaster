"use client";
import { Textarea } from "@nextui-org/react";

export default function CommentTextArea() {
  return (
    <div className="flex items-center m-1">
      <Textarea aria-label="Comment Field" className="flex-1" fullWidth placeholder="Comment..." minRows={1} />
      <button className="flex-none m-2 font-medium text-base leading-4">Post</button>
    </div>
  )
}
