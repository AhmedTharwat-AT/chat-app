import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { searchUsers } from "../../services/firebaseApi";

function useSearchUsers() {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const friends = Object.keys(user?.friends);
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

  const filteredUsers =
    users?.filter((el: any) => !friends.includes(el.uid)) || [];

  return { users, isLoading, refetch, error, query, setQuery, filteredUsers };
}

export default useSearchUsers;
