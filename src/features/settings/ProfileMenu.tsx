import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateImage } from "../../services/firebaseApi";
import useOutsideClicks from "../../hooks/useOutsideClicks";

import { HiOutlineDotsVertical } from "react-icons/hi";

function ProfileMenu({ user }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClicks(() => setShowMenu(false), false);
  const queryClient = useQueryClient();

  function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] as File;
    const fileSizeInBytes = selectedFile.size; //in bytes;
    const maxSizeInBytes = 500 * 1024;
    if (fileSizeInBytes > maxSizeInBytes) {
      // setPhotoError(true);
      return;
    }
    updateImage(selectedFile, user, "cover").then((res) => {
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
      setShowMenu(false);
    });
  }

  return (
    <div className="relative">
      <p
        onClick={(e) => {
          setShowMenu((s) => !s);
          e.stopPropagation();
        }}
        className="cursor-pointer text-xl text-white drop-shadow-xl"
      >
        <HiOutlineDotsVertical />
      </p>
      {showMenu && (
        <ul
          ref={ref}
          className="animate-slideTop absolute right-3 top-full w-32  divide-y rounded-md bg-white py-2 text-xs text-gray-700"
        >
          <li className="relative cursor-pointer px-3 py-1 hover:bg-gray-200">
            <input
              type="file"
              onChange={handleCover}
              className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-none opacity-0"
              accept="image/*"
            />
            Change Cover
          </li>
          <li className="cursor-pointer px-3 py-1 hover:bg-gray-200">
            Edit Bio
          </li>
          <li className="cursor-pointer px-3 py-1 hover:bg-gray-200">
            Edit About
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
