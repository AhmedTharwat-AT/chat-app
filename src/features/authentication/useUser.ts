import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/firebaseApi";

function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { data, isLoading, error };
}

export default useUser;
