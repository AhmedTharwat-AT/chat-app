import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";

import Status from "../../ui/Status";
import GroupInfo from "./GroupInfo";
import UserInfo from "./UserInfo";

function RoomDetails({ room, setShowInfo }: any) {
  const queryClient = useQueryClient();
  const isGroup = room.friend_id ? false : true;
  const id = isGroup ? room.room : room.friend_id;
  const photo = room?.photo || "/assets/person-placeholder.png";

  let status = "";
  if (!isGroup) {
    status = queryClient.getQueryData(["status", room.friend_id]) || "";
  }

  return createPortal(
    <div className="fixed right-0 top-0 z-50 h-full min-h-screen w-full overflow-y-auto bg-white p-5 shadow-lg sm:w-96 dark:bg-[var(--darker-bg)]">
      <div className="shadow-y-1 relative flex h-44 flex-col items-start overflow-hidden rounded-md p-4">
        <img
          src={photo}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <button
          onClick={() => setShowInfo(false)}
          className="font-outline-2 text-3xl text-white drop-shadow-md"
        >
          &times;
        </button>
        <div className="mt-auto">
          <h2 className="font-outline-2 font-semibold capitalize text-white  drop-shadow-md">
            {room.name}
          </h2>
          {!isGroup ? (
            <Status
              status={status}
              className="text-sm capitalize tracking-wide"
            />
          ) : null}
        </div>
      </div>
      {isGroup ? <GroupInfo id={id} /> : <UserInfo id={id} />}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  );
}

export default RoomDetails;
