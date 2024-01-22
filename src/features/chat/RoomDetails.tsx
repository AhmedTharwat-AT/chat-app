import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom, getUserDetails } from "../../services/firebaseApi";

function RoomDetails({ room }: any) {
  const isGroup = room.friend_id ? false : true;
  const id = isGroup ? room.room : room.friend_id;

  console.log(room);
  console.log(isGroup);
  console.log(id);

  const { data, isLoading } = useQuery({
    queryKey: isGroup ? ["room", id] : ["friend", id],
    queryFn: isGroup ? () => getRoom(id) : () => getUserDetails(id),
  });

  if (isLoading) return null;

  console.log(data);

  return createPortal(
    <div className="fixed h-screen w-96 bg-white"></div>,
    document.querySelector("body") as HTMLBodyElement,
  );
}

export default RoomDetails;
