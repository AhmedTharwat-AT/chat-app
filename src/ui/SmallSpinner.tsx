import { ImSpinner9 } from "react-icons/im";

function SmallSpinner() {
  return (
    <div className="flex h-full w-full animate-spin items-center justify-center py-1">
      <ImSpinner9 />
    </div>
  );
}

export default SmallSpinner;
