import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { FiSearch } from "react-icons/fi";
import SmallSpinner from "./SmallSpinner";
import SearchResults from "./SearchResults";
import FormControls from "./FormControls";
import useSearchUsers from "../features/chats/useSearchUsers";
import FormWrapper from "./FormWrapper";
import { addFriend } from "../services/firebaseApi";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<any> | undefined;
}

function AddContactForm({ onCloseModel, innerRef }: Props) {
  const [selected, setSelected] = useState("");
  const { isLoading, refetch, error, query, setQuery, filteredUsers } =
    useSearchUsers();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({ mutationFn: addFriend });

  function handleSearch() {
    if (!query) return;
    refetch();
  }

  function handleAddFriends() {
    if (!selected) return;
    const friend = filteredUsers?.find((el: any) => el.uid === selected);
    const user = queryClient.getQueryData(["user"]);
    if (!friend || !user) return;
    // add friend to the cache for later use (userInfo)
    queryClient.setQueryData(["friend", friend.uid], friend);
    mutate(
      { friend, user },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
          onCloseModel?.();
        },
      },
    );
  }

  return (
    <FormWrapper
      innerRef={innerRef}
      onCloseModel={onCloseModel}
      heading="Add Contact"
    >
      <div className="space-y-4 px-3 py-4">
        <div>
          <h2 className="mb-2 text-sm capitalize text-gray-700 dark:text-gray-300">
            Enter name
          </h2>
          <div className="relative flex justify-center shadow">
            <input
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              className="w-full rounded-md bg-gray-100 px-3 py-1 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-400"
            />
            <FiSearch
              onClick={handleSearch}
              className="absolute right-3 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer p-1 text-gray-600"
            />
          </div>
          {/* results */}
          <div className="mt-3  max-h-44 overflow-y-auto rounded-md bg-gray-100 p-2 shadow dark:bg-[var(--dark-bg)] dark:text-gray-400">
            {isLoading ? (
              <SmallSpinner color="text-green-600" />
            ) : (
              <SearchResults
                error={error}
                data={filteredUsers}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>
        <FormControls
          onCloseModel={onCloseModel}
          handler={handleAddFriends}
          isPending={isPending}
        />
      </div>
    </FormWrapper>
  );
}

export default AddContactForm;
