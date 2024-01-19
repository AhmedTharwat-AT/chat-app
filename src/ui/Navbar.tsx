import { BsChatSquareTextFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiChats } from "react-icons/pi";
import { RiContactsFill } from "react-icons/ri";
import { IoMoonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" max-bp:fixed bp:w-20 max-bp:h-14 bottom-0 left-0 w-full bg-[var(--bs-sidebar-bg)]">
      <ul className="bp:flex-col bp:py-6 bp:px-0 bp:gap-10 flex h-full grow flex-wrap items-center justify-around gap-8 px-5">
        <li className="bp:block hidden cursor-pointer text-2xl text-green-600">
          <BsChatSquareTextFill />
        </li>
        <li className="bp:w-full bp:h-auto h-full ">
          <NavLink className="nav-link" to="/profile">
            <CgProfile />
          </NavLink>
        </li>
        <li className="bp:w-full bp:h-auto h-full">
          <NavLink className="nav-link" to="/chats">
            <PiChats />
          </NavLink>
        </li>
        <li className=" bp:w-full bp:h-auto h-full">
          <NavLink className="nav-link" to="/contacts">
            <RiContactsFill />
          </NavLink>
        </li>
        <li className="bp:mt-auto cursor-pointer text-2xl text-gray-400">
          <IoMoonOutline />
        </li>
        <li className="cursor-pointer ">
          <img
            className="aspect-square w-9 min-w-9 rounded-full border-2 border-gray-100"
            src="https://placehold.co/200"
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
