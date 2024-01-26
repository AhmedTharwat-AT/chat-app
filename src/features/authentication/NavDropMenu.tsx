import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, rtdb } from "../../services/firebase";
import { ref as reff, set } from "firebase/database";

import useOutsideClicks from "../../hooks/useOutsideClicks";

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavDropMenu({ setShowMenu }: Props) {
  const [signOut] = useSignOut(auth);
  const ref = useOutsideClicks(() => setShowMenu(false), false);

  async function handleSignout() {
    const currUser = auth.currentUser;
    const statusRef = reff(rtdb, "users/" + currUser?.uid);
    set(statusRef, {
      status: "offline",
    });
    signOut();
  }

  return (
    <ul
      ref={ref}
      className="animate-slideTop absolute -left-32 bottom-full w-32 divide-y-2 divide-gray-300 rounded-md border border-gray-300 bg-gray-100 py-2  text-sm capitalize bp:left-8"
    >
      <li className="px-3 py-1 text-gray-700 hover:bg-gray-200">
        <Link className="block w-full" to="/profile">
          profile
        </Link>
      </li>
      <li
        className="px-3 py-1 text-gray-700 hover:bg-gray-200"
        onClick={handleSignout}
      >
        log out
      </li>
    </ul>
  );
}

export default NavDropMenu;
