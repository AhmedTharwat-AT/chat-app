import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useUser from "@/features/authentication/hooks/useUser";

import { IUser } from "@/types/data.types";
import { searchUsers } from "@/services/firebaseApi";

function useSearchUsers() {
  const [query, setQuery] = useState("");
  const { data: user } = useUser();

  const friends = Object.keys(user?.friends || {});

  const {
    data: users,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchUsers(query),
    enabled: false,
    retry: 0,
  });

  const usersOutsideFriends =
    users?.filter((el: IUser) => !friends.includes(el.uid)) || [];
  const usersInsideFriends = users?.filter((el: IUser) =>
    friends.includes(el.uid),
  );

  return {
    users,
    isLoading,
    refetch,
    error,
    query,
    setQuery,
    usersOutsideFriends,
    usersInsideFriends,
  };
}

export default useSearchUsers;
