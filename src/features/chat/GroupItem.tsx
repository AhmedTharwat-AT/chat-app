import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRoom } from "../../context/RoomContext";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../../services/firebase";

function MsgItem({ item }: { item: [string, any] }) {
  const { room, setRoom } = useRoom();
  const [isOnline, setIsOnline] = useState(false);
  const queryClient = useQueryClient();
  const info = item[1];
  const isFriend = info.friend_id ? true : false;
  const isSelected = room ? (room.room == info.room ? true : false) : false;

  //get users status
  useEffect(() => {
    if (!isFriend) return;

    const statusRef = ref(rtdb, "users/" + item[0]);
    const unsub = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || data.status == "offline") {
        setIsOnline(false);
        queryClient.setQueryData(["status", item[0]], "offline");
      } else {
        setIsOnline(true);
        queryClient.setQueryData(["status", item[0]], "online");
      }
    });

    return () => unsub();
  }, [isFriend, item, queryClient]);

  return (
    <div
      onClick={() => setRoom(info)}
      className={`${isSelected && "bg-[var(--color-main)] hover:bg-[var(--color-main)] "} flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-100`}
    >
      <img
        className="aspect-square h-10 w-10 rounded-full"
        src={info.photo || "https://placehold.co/200"}
      />
      <div>
        <h2
          className={`${isSelected && "!text-gray-100"} text-sm capitalize tracking-wide text-gray-800`}
        >
          {info.name}
        </h2>
        {isFriend ? (
          isOnline ? (
            <h4 className="text-xs text-green-600"> online</h4>
          ) : (
            <h4 className="text-xs text-red-600"> offline</h4>
          )
        ) : null}
      </div>
    </div>
  );
}

export default MsgItem;
