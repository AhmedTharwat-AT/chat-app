import { googleSignIn } from "@/services/firebaseApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useGoogleSignIn() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: googleSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending, error };
}

export default useGoogleSignIn;
