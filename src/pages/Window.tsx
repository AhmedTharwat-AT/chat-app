import { useRoom } from "../context/RoomContext";

import DefaultWindow from "../ui/DefaultWindow";
import Room from "../features/chat/Room";

function Window() {
  const { room, setRoom } = useRoom();

  return (
    <section className="grow bg-gray-100 bg-[url('https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cdf9a08b200998.png')]">
      {!room ? <DefaultWindow /> : <Room roomId={room} />}
    </section>
  );
}

export default Window;
