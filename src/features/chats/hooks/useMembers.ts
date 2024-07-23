import { getMembers } from "@/services/firebaseApi";
import { useQuery } from "@tanstack/react-query";

function useMembers(roomId: string) {
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["members", roomId],
    queryFn: () => getMembers(roomId),
  });

  return { members, isLoadingMembers };
}

export default useMembers;
