import { createContext, useState, useContext } from "react";

export interface RoomType {
  friend_id?: string;
  name: string;
  photo: string;
  room: string;
}

interface Context {
  room: RoomType | null;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
}

const WindowContext = createContext<Context | null>(null);

function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<RoomType | null>(null);

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
