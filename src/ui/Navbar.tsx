import { NavLink } from "react-router-dom";
import { useState } from "react";

import { BsChatSquareTextFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiChats } from "react-icons/pi";
import { RiContactsFill } from "react-icons/ri";
import { IoMoonOutline } from "react-icons/io5";

import NavDropMenu from "../features/authentication/NavDropMenu";
import useUser from "../features/authentication/useUser";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { data, isLoading } = useUser();
  const photo = data?.photo || "/assets/person-placeholder.png";

  if (isLoading) return null;

  return (
    <nav className=" bottom-0 left-0 w-full bg-[var(--bs-sidebar-bg)] max-bp:fixed max-bp:z-40 max-bp:h-14 bp:w-20">
      <ul className="flex h-full grow items-center justify-around gap-5 px-5 bp:flex-col bp:gap-10 bp:px-0 bp:py-6">
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
        <li className="cursor-pointer text-2xl text-gray-400 max-[400px]:text-xl bp:mt-auto">
          <IoMoonOutline />
        </li>
        <li
          onClick={(e) => {
            setShowMenu((s) => !s);
            e.stopPropagation();
          }}
          className="relative cursor-pointer"
        >
          <img
            className="aspect-square w-9 min-w-7 rounded-full border-2 border-white bg-center  object-cover max-[400px]:w-7"
            src={photo}
          />
          {showMenu ? <NavDropMenu setShowMenu={setShowMenu} /> : ""}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
