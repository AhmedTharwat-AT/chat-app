import { ImSpinner9 } from "react-icons/im";

interface Props {
  color: string;
}
function SmallSpinner({ color }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center py-1">
      <ImSpinner9 className={`animate-spin ${color}`} />
    </div>
  );
}

export default SmallSpinner;
