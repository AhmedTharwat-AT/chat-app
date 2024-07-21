import { ReactNode, useState } from "react";
import useMembers from "./useMembers";

import { FiSearch } from "react-icons/fi";
import useSearchUsers from "./useSearchUsers";
import FormWrapper from "../../ui/FormWrapper";
import SmallSpinner from "../../ui/SmallSpinner";
import SearchResults from "../../ui/SearchResults";
import FormControls from "../../ui/FormControls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupMember } from "../../services/firebaseApi";
import { IGroupType, IUser } from "@/types/data.types";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
  id: string;
}

function AddMemberForm({ onCloseModel, innerRef, id }: Props) {
  const [selected, setSelected] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, refetch, error, query, setQuery, users } =
    useSearchUsers();
  const { members } = useMembers(id);
  const {
    mutate,
    isPending,
    error: mutateError,
  } = useMutation({ mutationFn: addGroupMember });

  //remove memebers from search result
  const memebersId = members?.map((el) => el.id);
  const data = users?.filter((el) => !memebersId?.includes(el.uid));

  function handleSearch() {
    if (!query) return;
    refetch();
  }

  function handleAddMember() {
    if (!selected) return;
    const friend = data?.find((el: IUser) => el.uid === selected);
    if (!friend) return;
    // add friend to the cache for later use (userInfo)
    queryClient.setQueryData(["friend", friend.uid], friend);
    const group = queryClient.getQueryData(["group", id]) as IGroupType;

    mutate(
      {
        group: {
          ...group,
          id,
        },
        member: friend,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["members", id],
            exact: true,
          });
          onCloseModel?.();
        },
      },
    );
  }

  if (mutateError || error) console.log(mutateError, error);

  return (
    <FormWrapper
      innerRef={innerRef}
      onCloseModel={onCloseModel}
      heading="Add Member"
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
              onChange={(e) => setQuery(e.target.value)}
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
                data={data}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>
        <FormControls
          handler={handleAddMember}
          onCloseModel={onCloseModel}
          isPending={isPending}
        />
      </div>
    </FormWrapper>
  );
}

export default AddMemberForm;
