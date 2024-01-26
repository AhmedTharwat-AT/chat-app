import { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCamera } from "react-icons/fa";
import { updatePhoto } from "../../services/firebaseApi";
import { useQueryClient } from "@tanstack/react-query";

function UserMainInfo({ user }: any) {
  const [photoError, setPhotoError] = useState(false);
  const queryClient = useQueryClient();
  const cover = user?.cover || "/assets/person-placeholder.png";
  const photo = user?.photo || "/assets/person-placeholder.png";

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoError(false);
    const selectedFile = e.target.files?.[0] as File;
    const fileSizeInBytes = selectedFile.size; //in bytes;
    const maxSizeInBytes = 300 * 1024;
    if (fileSizeInBytes > maxSizeInBytes) {
      setPhotoError(true);
      return;
    }
    await updatePhoto(selectedFile, user);
    queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
  }

  return (
    <div>
      <div
        className={`h-40 bg-[url(${cover})] shadow-y-1 bg-cover bg-no-repeat px-5 pt-4`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-white drop-shadow-xl ">My Profile</h1>
          <div>
            <p className="cursor-pointer text-xl text-white drop-shadow-xl">
              <HiOutlineDotsVertical />
            </p>
          </div>
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
                className="relative z-10 h-full w-full cursor-pointer bg-none opacity-0"
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
