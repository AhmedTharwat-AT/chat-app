import { useRoom } from "../../context/RoomContext";
import { useState } from "react";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import RoomDetails from "./RoomDetails";
import Status from "../../ui/Status";
import useUserStatus from "./useUserStatus";

function RoomHead() {
  const { room, setRoom } = useRoom();
  const [showInfo, setShowInfo] = useState(false);

  const photo = room?.photo || "/assets/person-placeholder.png";
  const name = room?.name;

  const { isOnline, isFriend } = useUserStatus(room);

  return (
    <div className="flex items-center gap-3 bg-white bg-opacity-50 px-4 py-4 shadow backdrop-blur-sm dark:bg-[var(--dark-head-bg)]">
      <button onClick={() => setRoom(null)} className="py-2 text-3xl">
        <MdKeyboardArrowLeft className="text-[var(--color-main)]" />
      </button>

      <div className="flex cursor-pointer items-center gap-3">
        <img className="h-12 w-12 rounded-full object-cover" src={photo} />
        <div>
          <h2 className="max-w-[200px] truncate text-lg font-semibold capitalize text-gray-800 dark:text-gray-300">
            {name}
          </h2>
          {isFriend ? <Status status={isOnline} className="text-xs" /> : null}
        </div>
      </div>

      <button
        onClick={() => setShowInfo((s) => !s)}
        className="ml-auto px-2 py-2 text-2xl"
      >
        <RiInformationFill className="text-gray-500" />
      </button>
      {showInfo && (
        <RoomDetails
          isOnline={isOnline}
          isFriend={isFriend}
          room={room}
          setShowInfo={setShowInfo}
        />
      )}
    </div>
  );
}

export default RoomHead;
