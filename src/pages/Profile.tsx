import useUser from "../features/authentication/useUser";
import { initRooms, initUsers } from "../services/firebaseApi";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import Spinner from "../ui/Spinner";

function Profile() {
  const { data, isLoading }: any = useUser();

  const cover = data?.cover || "https://placehold.co/200";
  const photo = data?.photo || "https://placehold.co/100";
  const about = data?.about || `there is nothing about ${data?.name}`;

  function addusers() {
    // initUsers();
    initRooms();
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="divide-y">
      <div
        className={`h-40 bg-[url(${cover})] bg-cover bg-no-repeat px-5 pt-4`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl">My Profile</h1>
          <p className="text-xl">
            <HiOutlineDotsVertical />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center px-3 pb-4">
        <img
          src={photo}
          className="-mt-10 h-20 w-20 rounded-full border-4 border-white"
        />
        <div className="py-2 text-center">
          <h1 className="mb-1 break-all font-semibold capitalize text-gray-800">
            {data?.name}
          </h1>
          <p className="break-all text-sm capitalize text-gray-600">
            {data?.bio}
          </p>
        </div>
      </div>
      <button onClick={addusers}>add users</button>
      <div className="overflow-y-auto px-5 py-4">
        <p className="break-all text-gray-600">{about}</p>
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-5">
            <CiUser className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm capitalize text-gray-600">
              {data.name}
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineMessage className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm  text-gray-600">{data.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
