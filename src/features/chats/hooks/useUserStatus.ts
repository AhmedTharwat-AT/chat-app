import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { IRoomType } from "@/types/data.types";
import { rtdb } from "@/services/firebase";

function isFriendFn(item: IRoomType) {
  return item.friend_id !== undefined;
}

function useUserStatus(item: IRoomType) {
  const [status, setStatus] = useState("offline");
  const isFriend = isFriendFn(item);

  //get users status from realtime database
  useEffect(() => {
    //if its a group return
    if (!isFriend) return;

    const statusRef = ref(rtdb, "users/" + item.friend_id);
    const unsub = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || data.status == "offline") {
        setStatus("offline");
      } else {
        setStatus("online");
      }
    });

    return () => unsub();
  }, [isFriend, item]);

  return { status, isFriend };
}

export default useUserStatus;
