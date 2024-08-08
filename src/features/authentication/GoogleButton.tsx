import { FcGoogle } from "react-icons/fc";

interface Props {
  googleSignIn: () => void;
  isPending: boolean;
  text: string;
}

function GoogleButton({ googleSignIn, isPending, text }: Props) {
  return (
    <div>
      <div className="relative mt-7 w-full">
        <h3 className="relative z-20 mx-auto w-fit bg-white px-2 text-sm capitalize text-gray-800">
          {text}
        </h3>
        <span className="absolute top-1/2 z-10 h-[1px] w-full bg-gray-300"></span>
      </div>
      <button
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          googleSignIn();
        }}
        className="my-5 flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-2xl hover:bg-gray-200"
      >
        <FcGoogle />
      </button>
    </div>
  );
}

export default GoogleButton;
