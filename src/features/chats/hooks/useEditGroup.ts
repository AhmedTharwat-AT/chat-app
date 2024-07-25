import { editGroup } from "@/services/firebaseApi";
import { IGroupType } from "@/types/data.types";
import { useMutation } from "@tanstack/react-query";

function useEditGroup() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      groupInfo,
      details,
    }: {
      groupInfo: IGroupType;
      details: { name?: string; description?: string; photo?: File | null };
    }) => editGroup(groupInfo, details),
  });

  return { mutate, isPending, error };
}

export default useEditGroup;
