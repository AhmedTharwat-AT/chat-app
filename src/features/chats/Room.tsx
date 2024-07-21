import { IRoomType } from "@/types/data.types";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import RoomHead from "./RoomHead";

interface Props {
  info: IRoomType;
}

function Room({ info }: Props) {
  return (
    <div className="relative h-full">
      <RoomHead />
      <Messages info={info} />
      <ChatInput roomId={info.room} />
    </div>
  );
}

export default Room;
