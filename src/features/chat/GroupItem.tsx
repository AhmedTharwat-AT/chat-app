import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRoom } from "../../context/RoomContext";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../../services/firebase";
import Status from "../../ui/Status";

function MsgItem({ item }: { item: [string, any] }) {
  const { room, setRoom } = useRoom();
  const [isOnline, setIsOnline] = useState("offline");
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
        setIsOnline("offline");
        queryClient.setQueryData(["status", item[0]], "offline");
      } else {
        setIsOnline("online");
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
        src={info.photo || "/assets/person-placeholder.png"}
      />
      <div>
        <h2
          className={`${isSelected && "!text-gray-100"} text-sm capitalize tracking-wide text-gray-800`}
        >
          {info.name}
        </h2>
        {isFriend ? <Status status={isOnline} className="text-xs" /> : null}
      </div>
    </div>
  );
}

export default MsgItem;
