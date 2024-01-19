import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Window from "../pages/Window";

function AppLayout() {
  return (
    <main className="flex min-h-screen w-screen">
      <Navbar />
      <section className="bp:w-80 h-full w-full">
        <Outlet />
      </section>
      <Window />
    </main>
  );
}

export default AppLayout;
