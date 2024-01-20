import { useRoom } from "../../context/RoomContext";

interface Props {
  roomId: string;
}

function Room({ roomId }: Props) {
  const { setRoom } = useRoom();
  return <div onClick={() => setRoom("")}>room</div>;
}

export default Room;
