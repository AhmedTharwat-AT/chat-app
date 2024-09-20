import { ReactNode, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addFriend } from "../../services/firebaseApi";
import { IUser } from "@/types/data.types";
import useSearchUsers from "@/features/chats/hooks/useSearchUsers";

import { FiSearch } from "react-icons/fi";
import SmallSpinner from "../../ui/SmallSpinner";
import SearchResults from "../../ui/SearchResults";
import FormControls from "../../ui/FormControls";
import FormWrapper from "../../ui/FormWrapper";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
}

function AddContactModal({ onCloseModel, innerRef }: Props) {
  const [selected, setSelected] = useState("");
  const { isLoading, refetch, error, query, setQuery, usersOutsideFriends } =
    useSearchUsers();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({ mutationFn: addFriend });

  function handleSearch() {
    if (!query) return;
    refetch();
  }

  function handleAddFriends() {
    if (!selected) return;
    const friend = usersOutsideFriends?.find(
      (el: IUser) => el.uid === selected,
    );
    const user = queryClient.getQueryData(["user"]) as IUser;
    if (!friend || !user) return;
    // add friend to the cache for later use (userInfo)
    queryClient.setQueryData(["friend", friend.uid], friend);
    // add friend to the database
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
                results={usersOutsideFriends}
                selected={selected}
                setSelected={setSelected}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
        <FormControls
          onCloseModel={onCloseModel}
          handler={handleAddFriends}
          isPending={isPending}
          disabled={!selected}
        />
      </div>
    </FormWrapper>
  );
}

export default AddContactModal;
