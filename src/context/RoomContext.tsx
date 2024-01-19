import { createContext, useState, useContext } from "react";

interface Context {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

const WindowContext = createContext<Context | null>(null);

function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState("");

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
