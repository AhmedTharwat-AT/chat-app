import SmallSpinner from "./SmallSpinner";

function FormControls({ onCloseModel, handler, isPending, text = "Add" }: any) {
  return (
    <div className="flex gap-6">
      <button
        onClick={onCloseModel}
        className="ml-auto capitalize text-[var(--color-main-dark)] hover:underline"
      >
        close
      </button>
      <button
        onClick={handler}
        disabled={isPending}
        className="rounded-sm bg-[var(--color-main)] px-4 py-1 font-semibold capitalize text-white hover:bg-[var(--color-main-dark)] disabled:bg-gray-400"
      >
        {isPending ? <SmallSpinner color="text-white" /> : text}
      </button>
    </div>
  );
}

export default FormControls;
