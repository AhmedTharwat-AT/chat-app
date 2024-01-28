interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<any> | undefined;
  heading: string;
  children: React.ReactNode;
}

function FormWrapper({ innerRef, heading, onCloseModel, children }: Props) {
  return (
    <div
      ref={innerRef}
      className="w-full max-w-[450px]  animate-slideDown overflow-hidden overscroll-y-contain rounded bg-white shadow-md dark:bg-[var(--darker-bg)]"
    >
      <div className="flex items-center justify-between bg-[var(--color-main)] p-3">
        <h2 className="font-semibold capitalize text-white">{heading}</h2>
        <button onClick={onCloseModel} className="text-xl text-gray-800">
          &times;
        </button>
      </div>
      {children}
    </div>
  );
}

export default FormWrapper;
