import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";

function Profile() {
  return (
    <div className="divide-y">
      <div className="h-40 bg-[url('https://placehold.co/200')] bg-cover bg-no-repeat px-5 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">My Profile</h1>
          <p className="text-xl">
            <HiOutlineDotsVertical />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center px-3 pb-4">
        <img
          src="https://placehold.co/200"
          className="-mt-12 w-24 rounded-full border-4 border-white"
        />
        <div className="py-2 text-center">
          <h1 className="mb-1 break-all font-semibold capitalize text-gray-800">
            Ahmed tharwat
          </h1>
          <p className="break-all text-sm text-gray-600">Frontend developer</p>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="break-all text-gray-600">
          there is nothing about ahmed tharwat
        </p>
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-5">
            <CiUser className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm capitalize text-gray-600">
              Ahmed tharwat
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineMessage className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm  text-gray-600">
              ahmedsarwat3000@gmail.com
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
