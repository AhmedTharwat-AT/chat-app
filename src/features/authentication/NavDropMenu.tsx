import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import useOutsideClicks from "../../hooks/useOutsideClicks";

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavDropMenu({ setShowMenu }: Props) {
  const [signOut] = useSignOut(auth);
  const ref = useOutsideClicks(() => setShowMenu(false));

  return (
    <ul
      ref={ref}
      className="absolute -left-24 bottom-full w-24 divide-y-2 divide-gray-300 rounded-md border border-gray-300 bg-gray-100 py-2  text-sm capitalize bp:left-8"
    >
      <li className="px-3 py-1 text-gray-700 hover:bg-gray-200">
        <Link to="/profile">profile</Link>
      </li>
      <li
        className="px-3 py-1 text-gray-700 hover:bg-gray-200"
        onClick={signOut}
      >
        log out
      </li>
    </ul>
  );
}

export default NavDropMenu;
