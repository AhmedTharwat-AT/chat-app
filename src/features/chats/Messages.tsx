import { useQueryClient } from "@tanstack/react-query";

import Message, { Msg } from "./Message";
import useMessages from "./useMessages";
import useMembers from "./useMembers";

function Messages({ info }: any) {
  const { messages } = useMessages(info);
  const { members, isLoadingMembers } = useMembers(info.room);

  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);

  if (!messages || isLoadingMembers || !members) return null;

  return (
    <div className="h-[calc(100vh-156px)]  space-y-4 overflow-y-auto p-4">
      {messages?.map((msg: Msg, i: number) => (
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
