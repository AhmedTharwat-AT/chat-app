import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../services/firebaseApi";

function useMembers(roomId: string) {
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["members", roomId],
    queryFn: () => getMembers(roomId),
  });

  return { members, isLoadingMembers };
}

export default useMembers;
