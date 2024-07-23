import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { IMessag, IRoomType } from "@/types/data.types";
import { db } from "@/services/firebase";

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
