import { GoDotFill } from "react-icons/go";

interface Props {
  status: string;
  className: string;
}

function StatusDot({ status, className = "" }: Props) {
  return status == "online" ? (
    <span className="absolute bottom-0 right-0 block rounded-full bg-white p-[0.1px]">
      <GoDotFill className={`${className} text-green-600 `} />
    </span>
  ) : (
    <span className="absolute bottom-0 right-0 block rounded-full bg-white p-[0.1px]">
      <GoDotFill className={`${className}  text-red-500 `} />
    </span>
  );
}

export default StatusDot;
