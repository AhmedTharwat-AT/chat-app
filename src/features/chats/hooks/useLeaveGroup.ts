import { leaveGroup } from "@/services/firebaseApi";
import { useMutation } from "@tanstack/react-query";

function useLeaveGroup() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (groupId: string) => leaveGroup(groupId),
  });

  return { mutate, isPending, error };
}

export default useLeaveGroup;
