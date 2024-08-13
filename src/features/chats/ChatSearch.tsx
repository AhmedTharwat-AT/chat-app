import { useSearchParams } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

function ChatSearch({ title }: { title: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      searchParams.delete(title);
    } else {
      searchParams.set(title, e.target.value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="relative flex justify-center">
      <input
        value={searchParams.get(title) || ""}
        placeholder="Search here..."
        onChange={handleFilter}
        className="w-full rounded-md bg-gray-100 px-3 py-3 pr-8 text-sm focus:outline-none focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-300"
      />
      <FiSearch
        // onClick={handleFilter}
        className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer [&_circle]:text-gray-600 dark:[&_circle]:text-gray-200 [&_line]:text-gray-600 dark:[&_line]:text-gray-200"
      />
    </div>
  );
}

export default ChatSearch;
