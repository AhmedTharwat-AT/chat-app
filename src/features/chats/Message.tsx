import { formatTime } from "../../utils/helpers";

export interface Msg {
  content: string;
  id: string;
  photo: string;
  sender: string;
  sentAt: string;
}

function Message({ msg, currUser }: { msg: Msg; currUser: string }) {
  const time = formatTime(msg.sentAt);
  const you = msg.id == currUser;

  return (
    <div className={`flex items-end gap-2 ${you ? "flex-row-reverse" : ""}`}>
      <img
        className="h-10 w-10 rounded-full"
        src={msg.photo || "https://placehold.co/200"}
      />
      <div className="space-y-2">
        <p
          className={`${you ? "bg-[var(--color-chat)]" : "bg-white"} break-all rounded-sm p-3 text-base text-gray-800 shadow-md`}
        >
          {msg.content}
        </p>
        <div
          className={`${you ? "flex-row-reverse" : ""} flex items-end gap-2`}
        >
          <h2 className="max-w-[200px] truncate text-xs font-semibold uppercase text-gray-900">
            {you ? "you" : msg.sender}
          </h2>
          <p className="text-xs text-gray-700">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
