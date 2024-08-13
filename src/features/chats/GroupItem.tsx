import { IFriend, IGroup } from "@/types/data.types";
import { useRoom } from "../../context/RoomContext";

import StatusDot from "../../ui/StatusDot";
import useUserStatus from "./hooks/useUserStatus";

function GroupItem({
  item,
  showItem = true,
}: {
  item: IGroup | IFriend;
  showItem?: boolean;
}) {
  const { room, setRoom } = useRoom();
  const { status, isFriend } = useUserStatus(item);
  const isSelected = room ? (room.room == item.room ? true : false) : false;

  return (
    <div
      onClick={() => setRoom(item)}
      className={`${isSelected && "bg-[var(--color-main)] hover:!bg-[var(--color-main-dark)] dark:bg-[var(--color-main-op)] "} flex cursor-pointer items-center gap-2 rounded-md p-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-400/10 ${showItem ? "block" : ""}hidden`}
    >
      <div className="relative">
        <img
          className="aspect-square h-9 w-9 rounded-full object-cover"
          src={item.photo || "/assets/person-placeholder.png"}
        />
        {isFriend ? <StatusDot status={status} className="text-sm" /> : null}
      </div>
      <div>
        <h2
          className={`${isSelected && "!text-gray-100"} text-sm capitalize tracking-wide text-gray-800 dark:text-gray-300`}
        >
          {item.name}
        </h2>
      </div>
    </div>
  );
}

export default GroupItem;
