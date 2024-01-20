import { IoMdPersonAdd } from "react-icons/io";
import MsgItem from "./MsgItem";

export interface GroupsType {
  [key: string]: {
    name: string;
    photo: string;
    room: string;
  };
}

export interface FriendsType {
  [key: string]: {
    friend_id: string;
    name: string;
    photo: string;
    room: string;
  };
}

interface Props {
  groups: GroupsType | FriendsType;
  type: string;
}

function Groups({ type, groups }: Props) {
  const items = Object.entries(groups);

  return (
    <div className="pt-3">
      <div className="mb-2 flex justify-between">
        <h3 className="text-xs font-semibold uppercase text-gray-400">
          {type}
        </h3>
        <button>
          <IoMdPersonAdd className=" text-xl text-[var(--color-main)]" />
        </button>
      </div>
      {items.length <= 0 ? (
        <h1 className="text-center text-xs uppercase text-gray-500">
          {type} list is empty
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

export default Groups;
