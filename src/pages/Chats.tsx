import ChatsList from "../features/chats/ChatsList";
import ChatSearch from "../features/chats/ChatSearch";

function Chats() {
  return (
    <div className="flex h-full flex-col p-4">
      <ChatSearch title="chats" />
      <ChatsList />
    </div>
  );
}

export default Chats;
