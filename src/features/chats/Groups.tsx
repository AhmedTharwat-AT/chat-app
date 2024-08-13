import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GroupItem from "./GroupItem";
import { MdAdd } from "react-icons/md";
import Model from "../../ui/Model";
import GroupFrom from "../settings/GroupFrom";
import { FriendsType, GroupsType } from "@/types/data.types";

interface Props {
  groups: GroupsType | FriendsType;
  type: string;
}

function Groups({ type, groups }: Props) {
  const [searchParams] = useSearchParams();
  const [showList, setShowList] = useState(true);
  const friendsOrGroups = Object.values(groups);
  const filter = searchParams.get("chats") || "";

  let showFriendsOrGroups = true;

  if (filter) {
    showFriendsOrGroups = friendsOrGroups
      .map((el) => el.name.startsWith(filter.toLocaleLowerCase().trim()))
      .includes(true);
  }

  return (
    <div className="pt-3">
      <div className="mb-2 flex justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {type}
        </h3>

        <div className="flex items-center gap-3">
          {/* create group modal */}
          {type == "groups" && (
            <Model>
              <Model.Toggle name="group">
                <MdAdd className="w-5 cursor-pointer text-lg text-gray-700 dark:text-gray-300" />
              </Model.Toggle>
              <Model.Window name="group">
                <GroupFrom />
              </Model.Window>
            </Model>
          )}

          <button onClick={() => setShowList((s) => !s)}>
            {showList ? (
              <IoIosArrowUp className="w-8 text-xl text-gray-700 dark:text-gray-200" />
            ) : (
              <IoIosArrowDown className="w-8 text-xl text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      <h1
        className={`py-1 text-center text-xs uppercase text-gray-500 ${showFriendsOrGroups ? "hidden" : ""}`}
      >
        {type} list is empty
      </h1>

      <div className={`space-y-1 ${showList ? "" : "hidden"}`}>
        {friendsOrGroups.map((item, i) => {
          const showFriendOrGroup = item.name.startsWith(
            filter.toLocaleLowerCase().trim(),
          );

          return <GroupItem key={i} item={item} showItem={showFriendOrGroup} />;
        })}
      </div>
    </div>
  );
}

export default Groups;
