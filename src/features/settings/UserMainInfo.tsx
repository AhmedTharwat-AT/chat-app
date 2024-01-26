import { useState } from "react";

import { FaCamera } from "react-icons/fa";
import { updatePhoto } from "../../services/firebaseApi";
import { useQueryClient } from "@tanstack/react-query";
import ProfileMenu from "./ProfileMenu";

function UserMainInfo({ user }: any) {
  const [photoError, setPhotoError] = useState(false);
  const queryClient = useQueryClient();
  const cover = `${user?.cover}` || "/assets/person-placeholder.png";
  const photo = user?.photo || "/assets/person-placeholder.png";

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoError(false);
    try {
      const selectedFile = e.target.files?.[0] as File;
      const fileSizeInBytes = selectedFile.size; //in bytes;
      const maxSizeInBytes = 300 * 1024;
      if (fileSizeInBytes > maxSizeInBytes) {
        setPhotoError(true);
        return;
      }
      await updatePhoto(selectedFile, user);
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
    } catch (err: any) {
      console.log("error changing profile picture :", err?.message);
    }
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${cover})`, color: "green" }}
        className={`shadow-y-1 h-40 bg-cover bg-center bg-no-repeat px-5 pt-4`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-white drop-shadow-xl ">My Profile</h1>
          <ProfileMenu user={user} />
        </div>
      </div>
      <div className="flex flex-col items-center px-3 pb-4">
        <div className="relative">
          <div className="relative">
            <img
              src={photo}
              className="-mt-10 h-20 w-20 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute bottom-1 right-0 flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white text-xl">
              <input
                type="file"
                onChange={handlePhoto}
                className="relative z-10 h-full w-full bg-none opacity-0"
                accept="image/*"
              />
              <FaCamera className="absolute text-sm text-gray-500 " />
            </div>
          </div>
          {photoError && (
            <p className=" left-24 top-4 whitespace-nowrap text-xs font-semibold text-red-500">
              Max size is 300 kb
            </p>
          )}
        </div>
        <div className="py-2 text-center">
          <h1 className="mb-1 break-all font-semibold capitalize text-gray-800">
            {user?.name}
          </h1>
          <p className="break-all text-sm capitalize text-gray-600">
            {user?.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserMainInfo;
