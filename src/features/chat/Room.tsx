import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoom } from "../../services/firebaseApi";
import { useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

import ChatInput from "./ChatInput";
import Spinner from "../../ui/Spinner";
import Messages from "./Messages";
import RoomHead from "./RoomHead";

interface Props {
  info: any;
}

function Room({ info }: Props) {
  const msgsBot = useRef<HTMLDivElement>(null);

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", info.room],
    queryFn: () => getRoom(info.room),
  });
  const queryClient = useQueryClient();

  //listens for database changes
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", info.room), (doc) => {
      queryClient.setQueryData(["room", info.room], doc.data());
      //scroll to the end of messages
      if (!msgsBot?.current) return;
      msgsBot.current?.scrollIntoView();
    });

    return () => unsub();
  }, [info.room, queryClient]);

  return (
    <div className="relative h-full">
      <RoomHead />
      {isLoading ? (
        <Spinner />
      ) : (
        <Messages innerRef={msgsBot} messages={room?.messages} />
      )}
      <ChatInput innerRef={msgsBot} roomId={info.room} />
    </div>
  );
}

export default Room;
