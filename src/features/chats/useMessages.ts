import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

function useMessages(info: any) {
  const [messages, setMessages] = useState<[] | any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rooms", info.room, "messages"),
      (querySnapshot) => {
        const msgsData: any[] = [];
        querySnapshot.forEach((doc) => {
          msgsData.push(doc.data());
        });
        msgsData.sort((a, b) => a.sentAt - b.sentAt);
        setMessages(msgsData);
      },
    );

    return () => unsub();
  }, [info.room]);

  return { messages };
}

export default useMessages;
