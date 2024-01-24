import ChatInput from "./ChatInput";
import Messages from "./Messages";
import RoomHead from "./RoomHead";
import useMessages from "./useMessages";

interface Props {
  info: any;
}

function Room({ info }: Props) {
  const { messages } = useMessages(info);

  return (
    <div className="relative h-full">
      <RoomHead />
      <Messages messages={messages} />
      <ChatInput roomId={info.room} />
    </div>
  );
}

export default Room;
