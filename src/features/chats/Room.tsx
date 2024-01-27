import ChatInput from "./ChatInput";
import Messages from "./Messages";
import RoomHead from "./RoomHead";

interface Props {
  info: any;
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
