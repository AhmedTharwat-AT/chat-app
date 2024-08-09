import { createPortal } from "react-dom";
import { IRoomType } from "@/types/data.types";
import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "@/services/firebaseApi";

import Status from "../../ui/Status";
import Spinner from "@/ui/Spinner";

const GroupInfo = lazy(() => import("./GroupInfo"));
const UserInfo = lazy(() => import("./UserInfo"));
const EditGroupInfo = lazy(() => import("./EditGroupInfo"));

interface Props {
  room: IRoomType;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  isFriend: boolean;
}

function RoomDetails({ room, setShowInfo, status, isFriend }: Props) {
  const { data: group, isLoading } = useQuery({
    queryKey: ["group", room.room],
    queryFn: () => getRoom(room.room),
  });
  const id = isFriend ? (room.friend_id as string) : room.room;
  const photo = room?.photo || "/assets/person-placeholder.png";
  const isPublicGroup = group?.type === "public";

  if (isLoading)
    return createPortal(
      <div className="fixed bottom-0 right-0 top-0  z-50 flex h-full min-h-screen w-full  bg-white p-5 shadow-lg dark:bg-[var(--darker-bg)] sm:w-96">
        <button
          onClick={() => setShowInfo(false)}
          className="font-outline-2 absolute left-5 top-5 text-3xl text-black drop-shadow-md dark:text-white"
        >
          &times;
        </button>
        <Spinner />
      </div>,
      document.querySelector("body") as HTMLBodyElement,
    );

  if (!group) return null;

  return createPortal(
    <div className="fixed right-0 top-0 z-50 flex h-full min-h-screen w-full flex-col overflow-y-auto bg-white p-5 shadow-lg dark:bg-[var(--darker-bg)] sm:w-96">
      <div className="shadow-y-1 relative flex h-44 shrink-0 flex-col items-start overflow-hidden rounded-md p-4">
        <img
          src={photo}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => setShowInfo(false)}
            className="font-outline-2 text-3xl text-white drop-shadow-md"
          >
            &times;
          </button>

          {/* hide group edit button if group is public */}
          {!isFriend && !isPublicGroup && (
            <Suspense fallback={null}>
              <EditGroupInfo groupId={id} />
            </Suspense>
          )}
        </div>

        <div className="mt-auto">
          <h2 className="font-outline-2 font-semibold capitalize text-white  drop-shadow-md">
            {room.name}
          </h2>

          {isFriend ? (
            <Status
              status={status}
              className="text-sm capitalize tracking-wide"
            />
          ) : null}
        </div>
      </div>

      <Suspense fallback={<Spinner className=" grow" />}>
        {isFriend ? (
          <UserInfo friendId={id} />
        ) : (
          <GroupInfo group={group} isPublicGroup={isPublicGroup} />
        )}
      </Suspense>
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  );
}

export default RoomDetails;
