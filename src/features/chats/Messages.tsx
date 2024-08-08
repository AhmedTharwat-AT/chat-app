import { useQueryClient } from "@tanstack/react-query";
import { IMessag, IRoomType, IUser } from "@/types/data.types";
import useMessages from "./hooks/useMessages";
import useMembers from "./hooks/useMembers";

import Message from "./Message";

function Messages({ roomInfo }: { roomInfo: IRoomType }) {
  const { messages } = useMessages(roomInfo);
  const { members, isLoadingMembers } = useMembers(roomInfo.room);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as IUser;

  if (!messages || isLoadingMembers || !members) return null;

  return (
    <div className=" h-[calc(100vh-156px)] space-y-4 overflow-y-auto p-4">
      {messages?.map((msg: IMessag, i: number) => (
        <Message key={i} msg={msg} currUser={user} members={members} />
      ))}
      <div
        ref={(el) => {
          //this callback get called every time this component rerenders/mounts with the el , and before rerendering/unmount with null
          el?.scrollIntoView();
        }}
      ></div>
    </div>
  );
}

export default Messages;
