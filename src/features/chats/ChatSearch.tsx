import { useState } from "react";

import { MdOutlineAddBox } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Model from "../../ui/Model";
import AddContactForm from "../../ui/AddContactForm";

function ChatSearch({ title }: { title: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get(title) || "");

  function handleFilter() {
    if (!query && searchParams.get(title)) {
      searchParams.delete(title);
    } else {
      searchParams.set(title, query);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="bg-white dark:bg-[var(--darker-bg)]">
      <Model>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl capitalize dark:text-gray-300">{title}</h1>
          <Model.Toggle name="chats">
            <MdOutlineAddBox className="aspect-square h-7 w-7 cursor-pointer rounded-md bg-[var(--color-chat)] p-1 text-[var(--color-main)] hover:bg-[var(--color-main)] [&_path]:hover:text-white" />
          </Model.Toggle>
        </div>
        <Model.Window name="chats">
          <AddContactForm />
        </Model.Window>
      </Model>
      <div className="relative flex justify-center">
        <input
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFilter();
          }}
          placeholder="Search here..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md bg-gray-100 px-3 py-3 pr-8 text-sm focus:outline-none focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-300"
        />
        <FiSearch
          onClick={handleFilter}
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer [&_circle]:text-gray-600 dark:[&_circle]:text-gray-200 [&_line]:text-gray-600 dark:[&_line]:text-gray-200"
        />
      </div>
    </div>
  );
}

export default ChatSearch;
