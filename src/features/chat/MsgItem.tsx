import { useRoom } from "../../context/RoomContext";

function MsgItem({ item }: { item: [string, any] }) {
  const { room, setRoom } = useRoom();
  const info = item[1];

  const isSelected = room ? (room.room == info.room ? true : false) : false;

  return (
    <div
      onClick={() => setRoom(info)}
      className={`${isSelected && "bg-[var(--color-main)] hover:bg-[var(--color-main)] "} flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-100`}
    >
      <img
        className="aspect-square h-11 w-11 rounded-full"
        src={info.photo || "https://placehold.co/200"}
      />
      <h2
        className={`${isSelected && "!text-gray-100"} text-sm capitalize tracking-wide text-gray-800`}
      >
        {info.name}
      </h2>
    </div>
  );
}

export default MsgItem;
