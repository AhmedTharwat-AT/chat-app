import ChatSearch from "../features/chats/ChatSearch";
import ContactsList from "../features/chats/ContactsList";

function Contacts() {
  return (
    <div className="flex h-full flex-col p-5">
      <ChatSearch title="contacts" />
      <ContactsList />
    </div>
  );
}

export default Contacts;
