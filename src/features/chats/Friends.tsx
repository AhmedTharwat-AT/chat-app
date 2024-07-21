import { IoMdPersonAdd } from "react-icons/io";
import MsgItem from "./GroupItem";
import { FriendsType } from "@/types/data.types";

interface Props {
  friends: FriendsType;
}

function Friends({ friends }: Props) {
  const items = Object.entries(friends);

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h3 className="text-xs font-semibold uppercase text-gray-400">
          Messages
        </h3>
        <button>
          <IoMdPersonAdd className=" text-xl text-[var(--color-main)]" />
        </button>
      </div>
      {items.length <= 0 ? (
        <h1 className="text-center text-xs uppercase text-gray-500">
          friends list is empty
        </h1>
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <MsgItem key={item[0]} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Friends;
