import { useQueryClient } from "@tanstack/react-query";

import Message, { Msg } from "./Message";

interface Props {
  messages: any;
  innerRef: React.RefObject<HTMLDivElement>;
}

function Messages({ messages, innerRef }: Props) {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);

  if (!messages) return null;

  return (
    <div className="h-[calc(100vh-156px)]  space-y-4 overflow-y-auto p-4">
      {messages.map((msg: Msg, i: number) => (
        <Message key={i} msg={msg} currUser={user.uid} />
      ))}
      <div ref={innerRef}></div>
    </div>
  );
}

export default Messages;
