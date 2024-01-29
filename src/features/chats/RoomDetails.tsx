import { createPortal } from "react-dom";

import Status from "../../ui/Status";
import GroupInfo from "./GroupInfo";
import UserInfo from "./UserInfo";

function RoomDetails({ room, setShowInfo, isOnline, isFriend }: any) {
  const id = isFriend ? room.friend_id : room.room;
  const photo = room?.photo || "/assets/person-placeholder.png";

  return createPortal(
    <div className="fixed right-0 top-0 z-50 h-full min-h-screen w-full overflow-y-auto bg-white p-5 shadow-lg dark:bg-[var(--darker-bg)] sm:w-96">
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
          {isFriend ? (
            <Status
              status={isOnline}
              className="text-sm capitalize tracking-wide"
            />
          ) : null}
        </div>
      </div>
      {isFriend ? <UserInfo id={id} /> : <GroupInfo id={id} />}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  );
}

export default RoomDetails;
