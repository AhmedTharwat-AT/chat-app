import ChatSearch from "../features/chats/ChatSearch";
import ChatsList from "../features/chats/ChatsList";

function Contacts() {
  return (
    <div className="flex h-full flex-col p-5">
      <ChatSearch title="contacts" />
      <ChatsList />
    </div>
  );
}

export default Contacts;
