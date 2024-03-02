function PageNotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-main)] ">
      <div className="space-y-4 rounded-md bg-gray-100 px-12 py-7 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wider text-gray-700 sm:text-2xl">
          page not found
        </h1>
        <button
          onClick={() => {
            const originURL = window.location.origin;
            window.location.href = originURL;
          }}
          className="rounded-md bg-[var(--color-main)] px-3 py-1 text-sm font-semibold uppercase text-gray-100"
        >
          go back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
