import { useRoom } from "../context/RoomContext";

import DefaultWindow from "../ui/DefaultWindow";
import Room from "../features/chats/Room";

function Window() {
  const { room } = useRoom();

  return (
    <section
      className={`${room ? "max-bp:translate-x-0 max-bp:opacity-100  " : "max-bp:translate-x-full max-bp:opacity-0 "} z-50 grow bg-gray-100 bg-[url('/assets/bg-pattern.png')] transition-all duration-300 dark:bg-[var(--dark-bg)] max-bp:fixed max-bp:inset-0 `}
    >
      {!room ? <DefaultWindow /> : <Room roomInfo={room} />}
    </section>
  );
}

export default Window;
