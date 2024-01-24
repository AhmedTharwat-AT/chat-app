import { useQueryClient } from "@tanstack/react-query";

import Message, { Msg } from "./Message";

interface Props {
  messages: any;
}

function Messages({ messages }: Props) {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  if (!messages) return null;

  return (
    <div className="h-[calc(100vh-156px)]  space-y-4 overflow-y-auto p-4">
      {messages.map((msg: Msg, i: number) => (
        <Message key={i} msg={msg} currUser={user.uid} />
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
