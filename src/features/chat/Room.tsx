import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/firebaseApi";
import { useEffect, useRef } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
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

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", info.room],
    queryFn: () => getMessages(info.room),
    retry: 0,
  });
  const queryClient = useQueryClient();

  //listens for database changes
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rooms", info.room, "messages"),
      (querySnapshot) => {
        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        queryClient.setQueryData(["messages", info.room], messages);
        //scroll to the end of messages
        if (!msgsBot?.current) return;
        msgsBot.current?.scrollIntoView();
      },
    );

    return () => unsub();
  }, [info.room, queryClient]);

  return (
    <div className="relative h-full">
      <RoomHead />
      {isLoading ? (
        <Spinner />
      ) : (
        <Messages innerRef={msgsBot} messages={messages} />
      )}
      <ChatInput innerRef={msgsBot} roomId={info.room} />
    </div>
  );
}

export default Room;
