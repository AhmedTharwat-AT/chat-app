import { Suspense } from "react";
import Spinner from "./Spinner";
import { Outlet } from "react-router-dom";

function SuspendWrapper() {
  return (
    <Suspense
      fallback={
        <main className="max-w-screen flex min-h-screen w-full items-center justify-center antialiased">
          <Spinner />
        </main>
      }
    >
      <Outlet />
    </Suspense>
  );
}

export default SuspendWrapper;
