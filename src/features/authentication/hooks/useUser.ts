import { getUser } from "@/services/firebaseApi";
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { data, isLoading, error };
}

export default useUser;
