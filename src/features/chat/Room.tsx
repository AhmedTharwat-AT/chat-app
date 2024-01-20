import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";

import ChatInput from "./ChatInput";

interface Props {
  info: any;
  setRoom: React.Dispatch<React.SetStateAction<null>>;
}

function Room({ info, setRoom }: Props) {
  const photo = info?.photo || "https://placehold.co/100";
  const name = info.name;

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-100 bg-opacity-90 px-4 py-4 backdrop-blur-sm">
        <button onClick={() => setRoom(null)} className="py-2 text-3xl">
          <MdKeyboardArrowLeft className="text-[var(--color-main)]" />
        </button>
        <div className="flex items-center gap-3">
          <img className="h-12 w-12 rounded-full" src={info?.photo} />
          <h2 className="max-w-[200px] truncate text-lg capitalize text-gray-800">
            {name}
          </h2>
        </div>
        <button className="ml-auto px-2 py-2 text-2xl">
          <RiInformationFill className="text-gray-500" />
        </button>
      </div>
      <ChatInput />
    </div>
  );
}

export default Room;
