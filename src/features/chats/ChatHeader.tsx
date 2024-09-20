import { MdOutlineAddBox } from "react-icons/md";
import Model from "../../ui/Model";
import AddContactModal from "./AddContactModal";
import ChatSearch from "./ChatSearch";

function ChatHeader({ title }: { title: string }) {
  return (
    <div className="bg-white dark:bg-[var(--darker-bg)]">
      <Model>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl capitalize dark:text-gray-300">{title}</h1>
          <Model.Toggle name="chats">
            <MdOutlineAddBox className="aspect-square h-7 w-7 cursor-pointer rounded-md bg-[var(--color-chat)] p-1 text-[var(--color-main)] hover:bg-[var(--color-main)] [&_path]:hover:text-white" />
          </Model.Toggle>
        </div>
        <Model.Window name="chats">
          <AddContactModal />
        </Model.Window>
      </Model>
      <ChatSearch title={title} />
    </div>
  );
}

export default ChatHeader;
