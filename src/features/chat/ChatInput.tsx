import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";

function ChatInput() {
  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-8 border-t border-gray-200 bg-[var(--color-bg)]  px-5 py-5">
      <button>
        <MdOutlineEmojiEmotions className="text-2xl text-gray-500" />
      </button>
      <div className="grow">
        <input
          type="text"
          placeholder="Type your message..."
          maxLength={100}
          className="w-full rounded-md px-4 py-2 text-sm text-gray-800 shadow-sm focus:ring focus:ring-[var(--color-main)]"
        />
      </div>
      <button className="rounded-md bg-[var(--color-main)] p-2 hover:bg-[var(--color-main-dark)]">
        <IoMdSend className="text-xl text-gray-100" />
      </button>
    </div>
  );
}

export default ChatInput;
