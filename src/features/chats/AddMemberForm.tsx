import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupMember } from "../../services/firebaseApi";
import { IGroupType, IUser } from "@/types/data.types";
import useSearchUsers from "./hooks/useSearchUsers";
import useMembers from "./hooks/useMembers";
import useUser from "../authentication/hooks/useUser";

import { FiSearch } from "react-icons/fi";
import FormWrapper from "../../ui/FormWrapper";
import SmallSpinner from "../../ui/SmallSpinner";
import SearchResults from "../../ui/SearchResults";
import FormControls from "../../ui/FormControls";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
  groupId: string;
}

function AddMemberForm({ onCloseModel, innerRef, groupId }: Props) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string>("");
  const { isLoading, refetch, error, query, setQuery, usersInsideFriends } =
    useSearchUsers();
  const { data: user } = useUser();
  const { members } = useMembers(groupId);
  const {
    mutate,
    isPending,
    error: mutateError,
  } = useMutation({ mutationFn: addGroupMember });

  const userFriendsNames = Object.values(user?.friends || []).map(
    (el) => el.name,
  );

  //remove memebers from search result and display only users in friends list
  const memebersId = members?.map((el) => el.id);
  const dataWithNoMembers = usersInsideFriends?.filter(
    (el) => !memebersId?.includes(el.uid),
  );

  function handleSearch() {
    if (!userFriendsNames || !query) return;
    // check if query matchs with user friends
    const checkIfQueryExistInFriends = userFriendsNames
      .map((el) => el.startsWith(query.toLocaleLowerCase().trim()))
      .includes(true);

    if (checkIfQueryExistInFriends) refetch();
  }

  function handleAddMember() {
    if (!selected) return;
    const friend = dataWithNoMembers?.find((el: IUser) => el.uid === selected);
    if (!friend) return;
    // add friend to the cache for later use (userInfo)
    queryClient.setQueryData(["friend", friend.uid], friend);
    const group = queryClient.getQueryData(["group", groupId]) as IGroupType;

    mutate(
      {
        group: {
          ...group,
          id: groupId,
        },
        member: friend,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["members", groupId],
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
                noFriends={userFriendsNames.length == 0}
                data={dataWithNoMembers}
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
          disabled={userFriendsNames.length == 0 || !selected}
        />
      </div>
    </FormWrapper>
  );
}

export default AddMemberForm;
