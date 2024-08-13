import ChatsList from "../features/chats/ChatsList";
import ChatHeader from "@/features/chats/ChatHeader";

function Chats() {
  return (
    <div className="flex h-full flex-col p-4">
      <ChatHeader title="chats" />
      <ChatsList />
    </div>
  );
}

export default Chats;
