import { ReactNode } from "react";
import { useRoom } from "@/context/RoomContext";

import FormWrapper from "@/ui/FormWrapper";
import useDeleteFriend from "./hooks/useDeleteFriend";
import { useQueryClient } from "@tanstack/react-query";
import SmallSpinner from "@/ui/SmallSpinner";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
  friendId: string;
}

function DeleteFriendModal({ onCloseModel, innerRef, friendId }: Props) {
  const { mutate, isPending, error } = useDeleteFriend();
  const { room, setRoom } = useRoom();

  const queryClient = useQueryClient();

  function handleDeleteFriend() {
    if (!room) return;
    mutate(
      { friendId, roomId: room.room },
      {
        onSuccess: () => {
          queryClient.removeQueries({ queryKey: ["members", room.room] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setRoom(null);
          onCloseModel?.();
        },
      },
    );
  }

  console.log("errors :", error);

  return (
    <FormWrapper
      innerRef={innerRef}
      onCloseModel={onCloseModel}
      heading="Add Contact"
    >
      <div className="p-4">
        <p className=" text-lg font-semibold">
          Are you sure you want to delete this friend?
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
            onClick={handleDeleteFriend}
            disabled={isPending}
            className="rounded-md bg-red-500 px-2 py-1 capitalize text-white hover:bg-red-400"
          >
            {isPending ? <SmallSpinner color="text-green-600" /> : "delete"}
          </button>
        </div>
      </div>
    </FormWrapper>
  );
}

export default DeleteFriendModal;
