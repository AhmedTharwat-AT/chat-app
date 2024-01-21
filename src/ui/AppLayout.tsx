import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Window from "../pages/Window";

function AppLayout() {
  return (
    <main className="max-w-screen flex min-h-screen w-full antialiased">
      <Navbar />
      <section className="w-full max-bp:mb-[56px] bp:w-80">
        <Outlet />
      </section>
      <Window />
    </main>
  );
}

export default AppLayout;
