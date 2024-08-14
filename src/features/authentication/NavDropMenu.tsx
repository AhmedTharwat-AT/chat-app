import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useQueryClient } from "@tanstack/react-query";
import useOutsideClicks from "../../hooks/useOutsideClicks";
import { setUserStatus } from "@/services/firebaseApi";

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavDropMenu({ setShowMenu }: Props) {
  const [signOut] = useSignOut(auth);
  const ref = useOutsideClicks(() => setShowMenu(false), false);
  const queryClient = useQueryClient();

  async function handleSignout() {
    const currUser = auth.currentUser;

    setUserStatus(currUser?.uid || "", "offline");
    queryClient.removeQueries({ queryKey: ["user"], exact: true });

    signOut();
  }

  return (
    <ul
      ref={ref}
      className="absolute -left-32 bottom-full z-50 w-32 animate-slideTop divide-y-2 divide-gray-300 rounded-md border border-gray-300 bg-gray-100  py-2 text-sm capitalize bp:left-8"
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
