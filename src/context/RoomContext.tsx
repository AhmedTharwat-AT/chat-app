import { createContext, useState, useContext } from "react";

interface Context {
  room: any | null;
  setRoom: React.Dispatch<React.SetStateAction<null>>;
}

const WindowContext = createContext<Context | null>(null);

function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState(null);

  return (
    <WindowContext.Provider value={{ room, setRoom }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(WindowContext);
  if (!context) throw new Error("use useRoom inside the provider");
  return context;
}

export default RoomProvider;
