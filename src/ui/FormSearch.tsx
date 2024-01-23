import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchUsers } from "../services/firebaseApi";
import { FiSearch } from "react-icons/fi";

function FormSearch() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query),
    enabled: false,
    retry: 0,
  });

  function handleSearch() {
    if (!query) return;
    refetch();
  }

  return (
    <div className="relative flex justify-center">
      <input
        value={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md bg-gray-100 px-2 py-1 pr-8 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
      />
      <FiSearch
        onClick={handleSearch}
        className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-600"
      />
    </div>
  );
}

export default FormSearch;
