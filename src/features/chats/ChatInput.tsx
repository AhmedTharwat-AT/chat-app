import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../services/firebaseApi";

import { IoMdSend } from "react-icons/io";
import { CiTimer } from "react-icons/ci";

import EmojiWrapper from "../../ui/EmojiWrapper";

interface Porps {
  roomId: string;
}

function ChatInput({ roomId }: Porps) {
  const [content, setContent] = useState("");
  const [slowDown, setSlowDown] = useState(0);
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const { mutate, isPending } = useMutation({ mutationFn: sendMessage });

  const sender = {
    id: user.uid,
    photo: user.photo,
    sender: user.name,
  };

  async function handleMessageSend() {
    if (content.length > 150 || !content || slowDown > 0) return;
    mutate(
      { roomId, data: { ...sender, content, sentAt: +new Date() } },
      {
        onSuccess: () => {
          setContent("");
          setSlowDown(10);
        },
      },
    );
  }

  useEffect(() => {
    if (slowDown == 0) return;

    const timer = setInterval(() => {
      setSlowDown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [slowDown]);

  return (
    <div className="absolute bottom-0 left-0 w-full  border-t border-gray-200 bg-gray-100 px-5 shadow-md">
      {slowDown > 0 && (
        <div className="ml-auto flex w-fit items-center gap-2 px-1 pt-2">
          <p className="text-sm capitalize tracking-wider text-gray-700">
            slowdown : {slowDown}s
          </p>
          <CiTimer />
        </div>
      )}

      <div className="flex w-full items-center  justify-between  gap-8 py-5">
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
            maxLength={150}
            className="w-full rounded-md px-4 py-2 text-sm text-gray-800 shadow-md focus:ring focus:ring-[var(--color-main)]"
          />
        </div>
        <button
          disabled={isPending || slowDown > 0}
          onClick={handleMessageSend}
          className="rounded-md bg-[var(--color-main)] p-2 hover:bg-[var(--color-main-dark)]"
        >
          <IoMdSend className="text-xl text-gray-100" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
