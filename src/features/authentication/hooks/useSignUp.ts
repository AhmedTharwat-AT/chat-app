import { auth } from "@/services/firebase";
import { signUp } from "@/services/firebaseApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SignData } from "../SignupForm";

function useSignUp() {
  const queryClient = useQueryClient();
  const [createUserWithEmailAndPassword, _, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignData) => {
      if (!data.email || !data.password || !data.username) return;
      await createUserWithEmailAndPassword(data.email, data.password);
      await signUp(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, loading: isPending || loading, firebaseError };
}

export default useSignUp;
