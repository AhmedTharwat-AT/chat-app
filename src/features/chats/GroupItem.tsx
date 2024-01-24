import { useRoom } from "../../context/RoomContext";

import StatusDot from "../../ui/StatusDot";
import useUserStatus from "./useUserStatus";

function MsgItem({ item }: { item: [string, any] }) {
  const { room, setRoom } = useRoom();
  const { isOnline, isFriend } = useUserStatus(item);
  const info = item[1];
  const isSelected = room ? (room.room == info.room ? true : false) : false;

  return (
    <div
      onClick={() => setRoom(info)}
      className={`${isSelected && "bg-[var(--color-main)] hover:!bg-[var(--color-main)] "} flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-100`}
    >
      <div className="relative">
        <img
          className="aspect-square h-10 w-10 rounded-full object-cover"
          src={info.photo || "/assets/person-placeholder.png"}
        />
        {isFriend ? (
          <StatusDot status={isOnline} className="text-[0.5rem]" />
        ) : null}
      </div>
      <div>
        <h2
          className={`${isSelected && "!text-gray-100"} text-sm capitalize tracking-wide text-gray-800`}
        >
          {info.name}
        </h2>
      </div>
    </div>
  );
}

export default MsgItem;
