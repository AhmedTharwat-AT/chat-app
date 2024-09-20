import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useUser from "@/features/authentication/hooks/useUser";

import { IUser } from "@/types/data.types";
import { searchUsers } from "@/services/firebaseApi";

function useSearchUsers() {
  const [query, setQuery] = useState("");
  const { data: user } = useUser();

  const friendsIds = Object.keys(user?.friends || {});

  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query),
    enabled: false,
    retry: 1,
    staleTime: 0,
  });

  const usersOutsideFriends =
    users?.filter((el: IUser) => !friendsIds.includes(el.uid)) || [];
  const resultsInsideFriends = users?.filter((el: IUser) =>
    friendsIds.includes(el.uid),
  );

  return {
    users,
    isLoading,
    refetch,
    error,
    query,
    setQuery,
    usersOutsideFriends,
    resultsInsideFriends,
  };
}

export default useSearchUsers;
