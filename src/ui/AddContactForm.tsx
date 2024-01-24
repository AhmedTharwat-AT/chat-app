import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { searchUsers } from "../services/firebaseApi";

import { FiSearch } from "react-icons/fi";
import SmallSpinner from "./SmallSpinner";
import SearchResults from "./SearchResults";
import FormControls from "./FormControls";

interface Props {
  onClick?: () => void;
  innerRef?: React.LegacyRef<any> | undefined;
}

function AddContactForm({ onClick, innerRef }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const friends = Object.keys(user?.friends);
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query, friends),
    enabled: false,
    retry: 0,
  });

  function handleSearch() {
    if (!query) return;
    refetch();
  }

  return (
    <div
      ref={innerRef}
      className="w-full max-w-[450px]  animate-slideDown overflow-hidden overscroll-y-contain rounded bg-white shadow-md"
    >
      <div className="flex items-center justify-between bg-[var(--color-main)] p-3">
        <h2 className="font-semibold capitalize text-white">Add Contact</h2>
        <button onClick={onClick} className="text-xl text-gray-800">
          &times;
        </button>
      </div>

      <div className="space-y-4 px-3 py-4">
        <div>
          <h2 className="mb-2 text-sm capitalize text-gray-700">Enter name</h2>
          <div className="relative flex justify-center shadow">
            <input
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md bg-gray-100 px-3 py-1 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-[var(--color-main)]"
            />
            <FiSearch
              onClick={handleSearch}
              className="absolute right-3 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer p-1 text-gray-600"
            />
          </div>
          {/* results */}
          <div className="mt-3  max-h-44 overflow-y-auto rounded-md bg-gray-100 p-2 shadow">
            {isLoading ? (
              <SmallSpinner color="text-green-600" />
            ) : (
              <SearchResults
                error={error}
                data={data}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>

        <FormControls selected={selected} onClick={onClick} data={data} />
      </div>
    </div>
  );
}

export default AddContactForm;
