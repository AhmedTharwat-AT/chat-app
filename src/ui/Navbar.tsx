import { BsChatSquareTextFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiChats } from "react-icons/pi";
import { RiContactsFill } from "react-icons/ri";
import { IoMoonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import NavDropMenu from "../features/authentication/navDropMenu";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className=" bottom-0 left-0 w-full bg-[var(--bs-sidebar-bg)] max-bp:fixed max-bp:h-14 bp:w-20">
      <ul className="flex h-full grow items-center justify-around gap-8 px-5 bp:flex-col bp:gap-10 bp:px-0 bp:py-6">
        <li className="hidden cursor-pointer text-2xl text-green-600 bp:block">
          <BsChatSquareTextFill />
        </li>
        <li className="h-full bp:h-auto bp:w-full ">
          <NavLink className="nav-link" to="/profile">
            <CgProfile />
          </NavLink>
        </li>
        <li className="h-full bp:h-auto bp:w-full">
          <NavLink className="nav-link" to="/chats">
            <PiChats />
          </NavLink>
        </li>
        <li className=" h-full bp:h-auto bp:w-full">
          <NavLink className="nav-link" to="/contacts">
            <RiContactsFill />
          </NavLink>
        </li>
        <li className="cursor-pointer text-2xl text-gray-400 bp:mt-auto">
          <IoMoonOutline />
        </li>
        <li
          onClick={() => setShowMenu((s) => !s)}
          className="relative cursor-pointer"
        >
          <img
            className="aspect-square w-9 min-w-9 rounded-full border-2 border-gray-100"
            src="https://placehold.co/200"
          />
          {showMenu ? <NavDropMenu /> : ""}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
