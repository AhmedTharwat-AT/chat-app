import { useQueryClient } from "@tanstack/react-query";

import Message from "./Message";

function Messages({ messages }: { messages: any }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as any;

  return (
    <div className="h-[calc(100vh-156px)] space-y-4 overflow-y-auto p-4">
      {messages.map((msg: any, i: number) => (
        <Message key={i} msg={msg} currUser={user.uid} />
      ))}
      <div></div>
    </div>
  );
}

export default Messages;
