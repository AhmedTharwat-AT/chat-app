import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Navbar from "./Navbar";
import Window from "../pages/Window";
import Spinner from "./Spinner";

function AppLayout() {
  return (
    <main className="max-w-screen flex min-h-screen w-full antialiased">
      <Navbar />
      <section className="w-full dark:bg-[var(--darker-bg)] max-bp:mb-[56px] bp:w-80">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </section>
      <Window />
    </main>
  );
}

export default AppLayout;
