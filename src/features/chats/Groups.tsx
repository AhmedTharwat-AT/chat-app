import { useSearchParams } from "react-router-dom";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GroupItem from "./GroupItem";
import { useState } from "react";

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
  const [searchParams] = useSearchParams();
  const [showList, setShowList] = useState(true);
  const items = Object.entries(groups);
  const filter = searchParams.get("chats") || "";
  let filterItems = [...items];

  if (filter) {
    filterItems = filterItems.filter((item) => item[1].name.includes(filter));
  }

  return (
    <div className="pt-3">
      <div className="mb-2 flex justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {type}
        </h3>
        <button onClick={() => setShowList((s) => !s)}>
          {showList ? (
            <IoIosArrowUp className=" text-xl text-gray-700 dark:text-gray-200" />
          ) : (
            <IoIosArrowDown className=" text-xl text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
      {items?.length <= 0 ? (
        <h1 className="text-center text-xs uppercase text-gray-500">
          {type} list is empty
        </h1>
      ) : showList ? (
        <div className="space-y-1">
          {filterItems.map((item) => (
            <GroupItem key={item[0]} item={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Groups;
