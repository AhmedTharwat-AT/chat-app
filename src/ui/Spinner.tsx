import { ImSpinner9 } from "react-icons/im";

function Spinner() {
  return (
    <div className="flex h-full w-full grow items-center justify-center  py-1">
      <ImSpinner9 className=" animate-spin text-5xl text-[var(--color-main)]" />
    </div>
  );
}

export default Spinner;
