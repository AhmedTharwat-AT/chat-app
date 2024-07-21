import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { IMessag, IRoomType } from "@/types/data.types";

function useMessages(info: IRoomType) {
  const [messages, setMessages] = useState<[] | IMessag[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rooms", info.room, "messages"),
      (querySnapshot) => {
        const msgsData: IMessag[] = [];
        querySnapshot.forEach((doc) => {
          msgsData.push(doc.data() as IMessag);
        });
        msgsData.sort((a, b) => Number(a.sentAt) - Number(b.sentAt));
        setMessages(msgsData);
      },
    );

    return () => unsub();
  }, [info.room]);

  return { messages };
}

export default useMessages;
