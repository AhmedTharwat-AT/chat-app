import { useRoom } from "../context/RoomContext";

import DefaultWindow from "../ui/DefaultWindow";
import Room from "../features/chat/Room";

function Window() {
  const { room, setRoom } = useRoom();

  return (
    <section
      className={`${room ? "max-bp:translate-x-0 max-bp:opacity-100  " : "max-bp:translate-x-full max-bp:opacity-0 "} z-50 grow bg-gray-100 bg-[url('https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cdf9a08b200998.png')] transition-all duration-300 max-bp:fixed max-bp:inset-0 `}
    >
      {!room ? <DefaultWindow /> : <Room info={room} setRoom={setRoom} />}
    </section>
  );
}

export default Window;
