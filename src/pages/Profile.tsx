import useUser from "../features/authentication/useUser";
import { initRooms, initUsers } from "../services/firebaseApi";

import { CiUser } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import Spinner from "../ui/Spinner";
import UserMainInfo from "../features/settings/UserMainInfo";

function Profile() {
  const { data, isLoading } = useUser();

  const about = data?.about || `there is nothing about ${data?.name}`;

  function addusers() {
    initUsers();
    // initRooms();
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="divide-y">
      <UserMainInfo user={data} />
      {/* <button onClick={addusers}>add users</button> */}
      <div className="divide-y-2 divide-gray-100 overflow-y-auto px-5 py-5">
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            about :
          </h2>
          <p className="break-all text-gray-800">{about}</p>
        </div>

        <div className="mt-4 space-y-4 pt-5">
          <div className="flex items-center gap-4">
            <CiUser className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm capitalize text-gray-600">
              {data?.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <AiOutlineMessage className="min-w-[16px] text-gray-600" />
            <h2 className="break-all text-sm  text-gray-600">{data?.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
