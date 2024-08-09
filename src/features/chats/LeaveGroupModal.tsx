import { ReactNode } from "react";
import { useRoom } from "@/context/RoomContext";
import useLeaveGroup from "./hooks/useLeaveGroup";
import { useQueryClient } from "@tanstack/react-query";

import FormWrapper from "@/ui/FormWrapper";
import SmallSpinner from "@/ui/SmallSpinner";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
}

function LeaveGroupModal({ onCloseModel, innerRef }: Props) {
  const { mutate, isPending, error } = useLeaveGroup();
  const { room, setRoom } = useRoom();

  const queryClient = useQueryClient();

  function handleLeaveGroup() {
    if (!room) return;
    mutate(room.room, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["members", room.room] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setRoom(null);
        onCloseModel?.();
      },
    });
  }

  return (
    <FormWrapper
      innerRef={innerRef}
      onCloseModel={onCloseModel}
      heading="leave group "
    >
      <div className="p-4">
        {error && <p className="text-red-500">something went wrong!</p>}
        <p className=" text-lg font-semibold">
          Are you sure you want to leave this group?
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="capitalize hover:underline"
            onClick={onCloseModel}
            disabled={isPending}
          >
            cancel
          </button>
          <button
            onClick={handleLeaveGroup}
            disabled={isPending}
            className="w-[75px] rounded-md bg-red-500 px-2 py-1 capitalize text-white hover:bg-red-400"
          >
            {isPending ? <SmallSpinner color="text-white" /> : "leave"}
          </button>
        </div>
      </div>
    </FormWrapper>
  );
}

export default LeaveGroupModal;
