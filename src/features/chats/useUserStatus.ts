import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../../services/firebase";

function useUserStatus(item: any) {
  const [isOnline, setIsOnline] = useState("offline");
  const isFriend = item[1].friend_id ? true : false;

  //get users status from realtime database
  useEffect(() => {
    //if its a group return
    if (!isFriend) return;

    const statusRef = ref(rtdb, "users/" + item[0]);
    const unsub = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || data.status == "offline") {
        setIsOnline("offline");
      } else {
        setIsOnline("online");
      }
    });

    return () => unsub();
  }, [isFriend, item]);

  return { isOnline, isFriend };
}

export default useUserStatus;
