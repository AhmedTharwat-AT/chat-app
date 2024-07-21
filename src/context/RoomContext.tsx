import { IRoomType } from "@/types/data.types";
import { createContext, useState, useContext } from "react";

interface Context {
  room: IRoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<IRoomType | null>>;
}

const WindowContext = createContext<Context | null>(null);

function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<IRoomType | null>(null);

  return (
    <WindowContext.Provider value={{ room, setRoom }}>
      {children}
    </WindowContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  const context = useContext(WindowContext);
  if (!context) throw new Error("use useRoom inside the provider");
  return context;
}

export default RoomProvider;
