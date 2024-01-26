import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateImage } from "../../services/firebaseApi";
import useOutsideClicks from "../../hooks/useOutsideClicks";

import { HiOutlineDotsVertical } from "react-icons/hi";
import Model from "../../ui/Model";
import EditForm from "./EditForm";

function ProfileMenu({ user }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClicks(() => setShowMenu(false), false);
  const queryClient = useQueryClient();

  function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    try {
      const selectedFile = e.target.files?.[0];
      const fileSizeInBytes = selectedFile.size; //in bytes;
      const maxSizeInBytes = 500 * 1024;
      if (fileSizeInBytes > maxSizeInBytes) return;

      updateImage(selectedFile, user, "cover").then((res) => {
        queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
        setShowMenu(false);
      });
    } catch (err: any) {
      console.log("error changing cover picture :", err?.message);
    }
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
      <Model>
        {showMenu && (
          <ul
            ref={ref}
            className="animate-slideTop absolute right-3 top-full w-32  divide-y rounded-md bg-white py-2 text-xs text-gray-700"
          >
            <li className="relative cursor-pointer px-3 py-1 hover:bg-gray-200">
              <input
                type="file"
                onChange={handleCover}
                className="absolute left-0 top-0 z-10 h-full w-full  bg-none opacity-0"
                accept="image/*"
              />
              Change Cover
            </li>
            <Model.Toggle name="bio">
              <li className="cursor-pointer px-3 py-1 hover:bg-gray-200">
                Edit Bio
              </li>
            </Model.Toggle>
            <Model.Toggle name="about">
              <li className="cursor-pointer px-3 py-1 hover:bg-gray-200">
                Edit About
              </li>
            </Model.Toggle>
          </ul>
        )}
        <Model.Window name="about">
          <EditForm type="about" heading="Edit about" id={user.uid} />
        </Model.Window>
        <Model.Window name="bio">
          <EditForm type="bio" heading="Edit bio" id={user.uid} />
        </Model.Window>
      </Model>
    </div>
  );
}

export default ProfileMenu;
