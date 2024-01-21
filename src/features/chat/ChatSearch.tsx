import { useState } from "react";

import { MdOutlineAddBox } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function ChatSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl">Chats</h1>
        <MdOutlineAddBox className="aspect-square h-6 w-6 text-[var(--color-main)]" />
      </div>
      <div className="relative flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md bg-gray-100 p-2 px-2 pr-8 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
        />
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
      </div>
    </div>
  );
}

export default ChatSearch;
