import ChatsList from "../features/chat/ChatsList";
import ChatSearch from "../features/chat/ChatSearch";

function Chats() {
  return (
    <div className="flex h-full flex-col p-5">
      <ChatSearch />
      <ChatsList />
    </div>
  );
}

export default Chats;
