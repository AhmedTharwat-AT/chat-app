import { useState } from "react";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function EmojiWrapper({ setContent }: Props) {
  const [showEmoji, setShowEmoji] = useState(false);

  function handleEmojiClick(data: EmojiClickData) {
    setContent((c) => c + data.emoji);
  }

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute bottom-10 left-0 max-w-[90vw]">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            style={{ width: "100% !important" }}
          />
        </div>
      )}
      <button onClick={() => setShowEmoji((s) => !s)}>
        <MdOutlineEmojiEmotions className="text-2xl text-gray-500" />
      </button>
    </div>
  );
}

export default EmojiWrapper;
