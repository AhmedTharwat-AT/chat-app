import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import ChatInput from "./ChatInput";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoom } from "../../services/firebaseApi";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import Spinner from "../../ui/Spinner";
import Messages from "./Messages";

interface Props {
  info: any;
  setRoom: React.Dispatch<React.SetStateAction<null>>;
}

function Room({ info, setRoom }: Props) {
  const photo = info?.photo || "https://placehold.co/100";
  const name = info.name;
  const { data, isLoading } = useQuery({
    queryKey: ["room", info.room],
    queryFn: () => getRoom(info.room),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", info.room), (doc) => {
      queryClient.setQueryData(["room", info.room], doc.data());
    });

    return () => unsub();
  }, [info.room, queryClient]);

  console.log(data, isLoading);

  return (
    <div className="relative h-full">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-100 bg-opacity-90 px-4 py-4 backdrop-blur-sm">
        <button onClick={() => setRoom(null)} className="py-2 text-3xl">
          <MdKeyboardArrowLeft className="text-[var(--color-main)]" />
        </button>
        <div className="flex cursor-pointer items-center gap-3">
          <img className="h-12 w-12 rounded-full" src={photo} />
          <h2 className="max-w-[200px] truncate text-lg capitalize text-gray-800">
            {name}
          </h2>
        </div>
        <button className="ml-auto px-2 py-2 text-2xl">
          <RiInformationFill className="text-gray-500" />
        </button>
      </div>
      {isLoading ? <Spinner /> : <Messages messages={data?.messages} />}
      <ChatInput />
    </div>
  );
}

export default Room;
