import { IMember, IMessag, IUser } from "@/types/data.types";
import { formatTime } from "../../utils/helpers";

interface Props {
  msg: IMessag;
  currUser: IUser;
  members: IMember[];
}

function Message({ msg, currUser, members }: Props) {
  const time = formatTime(msg.sentAt);
  const fromYou = msg.id == currUser.uid;
  const photo = fromYou
    ? currUser.photo
    : members.find((el) => el.id == msg.id)?.photo;

  return (
    <div
      className={`flex items-end gap-2 ${fromYou ? "flex-row-reverse" : ""}`}
    >
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={photo || "/assets/person-placeholder.png"}
      />
      <div className="space-y-2">
        <p
          className={`${fromYou ? "bg-[var(--color-chat)] dark:text-gray-300" : "bg-white dark:bg-[#333] dark:text-gray-300"} break-all rounded-sm p-3 text-gray-800 shadow-md `}
        >
          {msg.content}
        </p>
        <div
          className={`${fromYou ? "flex-row-reverse" : ""} flex items-end gap-2`}
        >
          <h2 className="max-w-[200px] truncate text-xs font-medium capitalize text-gray-900 dark:text-gray-300">
            {fromYou ? "you" : msg.sender}
          </h2>
          <p className="text-xs text-gray-700 dark:text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
