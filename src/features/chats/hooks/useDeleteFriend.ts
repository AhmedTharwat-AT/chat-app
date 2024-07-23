import { deleteFriend } from "@/services/firebaseApi";
import { useMutation } from "@tanstack/react-query";

function useDeleteFriend() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ friendId, roomId }: { friendId: string; roomId: string }) =>
      deleteFriend(friendId, roomId),
  });

  return { mutate, isPending, error };
}

export default useDeleteFriend;
