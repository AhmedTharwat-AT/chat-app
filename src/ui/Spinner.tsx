import { ImSpinner9 } from "react-icons/im";

function Spinner() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 py-1">
      <ImSpinner9 className=" animate-spin text-5xl text-[var(--color-main)]" />
    </div>
  );
}

export default Spinner;
