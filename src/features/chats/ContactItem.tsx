import { RoomType, useRoom } from "../../context/RoomContext";

interface Props {
  friend: RoomType;
}

function ContactItem({ friend }: Props) {
  const { setRoom } = useRoom();
  const photoDef = friend.photo || "/assets/person-placeholder.png";

  return (
    <li
      onClick={() => setRoom(friend)}
      className="flex cursor-pointer items-center gap-2"
    >
      <img
        className="aspect-square h-8 w-8 rounded-full object-cover object-center"
        src={photoDef}
      />
      <h3 className="text-sm capitalize text-gray-800 dark:text-gray-300">
        {friend.name}
      </h3>
    </li>
  );
}

export default ContactItem;
