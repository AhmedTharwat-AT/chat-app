import ChatHeader from "@/features/chats/ChatHeader";
import ContactsList from "../features/chats/ContactsList";

function Contacts() {
  return (
    <div className="flex h-full flex-col p-4">
      <ChatHeader title="contacts" />
      <ContactsList />
    </div>
  );
}

export default Contacts;
