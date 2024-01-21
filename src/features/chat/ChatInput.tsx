import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../services/firebaseApi";

import EmojiWrapper from "../../ui/EmojiWrapper";

function ChatInput({ roomId }: { roomId: string }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const { mutate, isPending } = useMutation({ mutationFn: sendMessage });
  const sender = {
    id: user.uid,
    photo: user.photo,
    sender: user.name,
  };

  async function handleMessageSend() {
    if (content.length > 100 || !content) return;
    mutate({ roomId, data: { ...sender, content, sentAt: +new Date() } });
    setContent("");
  }

  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-8 border-t border-gray-200 bg-[var(--color-bg)]  px-5 py-5">
      <EmojiWrapper setContent={setContent} />
      <div className="grow">
        <input
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMessageSend();
          }}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Type your message..."
          maxLength={100}
          className="w-full rounded-md px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring focus:ring-[var(--color-main)]"
        />
      </div>
      <button
        disabled={isPending}
        onClick={handleMessageSend}
        className="rounded-md bg-[var(--color-main)] p-2 hover:bg-[var(--color-main-dark)]"
      >
        <IoMdSend className="text-xl text-gray-100" />
      </button>
    </div>
  );
}

export default ChatInput;
