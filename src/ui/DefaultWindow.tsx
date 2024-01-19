import { BsChatSquareTextFill } from "react-icons/bs";

function DefaultWindow() {
  return (
    <div className="bp:flex hidden h-full w-full items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="w-fit rounded-full bg-green-200 p-5">
          <BsChatSquareTextFill className=" text-5xl text-[var(--color-main)]" />
        </div>
        <div>
          <h1 className="mt-2 text-lg font-semibold tracking-wide text-gray-800">
            Welcome to Chatly Chat App
          </h1>
          <p className="mt-2 w-80  text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. cum sociis natoque penatibus et
          </p>
        </div>
      </div>
    </div>
  );
}

export default DefaultWindow;
