import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { searchUsers } from "../../services/firebaseApi";
import { IUser } from "@/types/data.types";

function useSearchUsers() {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;
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
  console.log(users);
  const filteredUsers =
    users?.filter((el: IUser) => !friends.includes(el.uid)) || [];

  return { users, isLoading, refetch, error, query, setQuery, filteredUsers };
}

export default useSearchUsers;
