import { BsChatSquareTextFill } from "react-icons/bs";

interface Props {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

function FormTemplate({ children, heading, subheading }: Props) {
  return (
    <div className="max-bp:flex-col relative flex min-h-screen w-screen bg-[var(--color-main)] p-7">
      <div className="bp:w-1/3 bp:pt-7 bp:px-7 px-2 py-7 pt-0 xl:w-1/4">
        <div className="flex items-center gap-5 text-white">
          <BsChatSquareTextFill className="text-2xl" />
          <h1 className="text-2xl font-semibold tracking-wide">Chatly</h1>
        </div>
        <p className="mt-2 capitalize text-gray-300">
          Chat with everyone you love
        </p>
      </div>

      <div className="flex grow flex-col items-center  rounded-2xl bg-white p-7">
        <div className="bp:mt-20 mt-5 text-center sm:mt-12">
          <h1 className="text-2xl font-semibold text-gray-600">{heading}</h1>
          <p className="mt-1 text-sm text-gray-600">{subheading}</p>
        </div>

        {/* form */}
        {children}
      </div>

      <img
        className="bp:block absolute bottom-0 left-10 hidden w-2/3 max-w-[550px] xl:max-w-[650px]"
        src="https://doot-light.react.themesbrand.com/static/media/auth-img.9302755e73810f6c27d2.png"
      />
    </div>
  );
}

export default FormTemplate;
