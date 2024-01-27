import { BsChatSquareTextFill } from "react-icons/bs";

function DefaultWindow() {
  return (
    <div className="hidden h-full w-full items-center justify-center bp:flex">
      <div className="flex flex-col items-center text-center">
        <div className="w-fit rounded-full bg-green-200 bg-opacity-80 p-5 dark:bg-opacity-20">
          <BsChatSquareTextFill className=" text-5xl text-[var(--color-main)]" />
        </div>
        <div>
          <h1 className="mt-2 text-xl font-bold tracking-wide text-gray-500 dark:text-gray-300">
            Welcome to Chatly Chat App
          </h1>
          <p className="mt-1 w-80 text-gray-500 dark:text-gray-400">
            Start chating now with friends and who you love , create groups for
            various subject or for work team .
          </p>
        </div>
      </div>
    </div>
  );
}

export default DefaultWindow;
