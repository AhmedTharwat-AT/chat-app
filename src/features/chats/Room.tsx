import { IRoomType } from "@/types/data.types";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import RoomHead from "./RoomHead";

interface Props {
  roomInfo: IRoomType;
}

function Room({ roomInfo }: Props) {
  return (
    <div className="relative h-full">
      <RoomHead />
      <Messages roomInfo={roomInfo} />
      <ChatInput roomId={roomInfo.room} />
    </div>
  );
}

export default Room;
