import useUser from "../features/authentication/useUser";

import { CiUser } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import Spinner from "../ui/Spinner";
import UserMainInfo from "../features/settings/UserMainInfo";
import { IUser } from "@/types/data.types";

function Profile() {
  const { data, isLoading } = useUser();

  const about = data?.about || `there is nothing about ${data?.name}`;

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full divide-y dark:divide-gray-500/20 ">
      <UserMainInfo user={data as IUser} />
      <div className=" overflow-y-auto px-5 py-5 ">
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">
            about :
          </h2>
          <p className="break-all text-sm text-gray-800 dark:text-gray-400">
            {about}
          </p>
        </div>

        <div className="mt-4 space-y-4 pt-5">
          <div className="flex items-center gap-4">
            <CiUser className="min-w-[16px] [&_path]:text-gray-600 dark:[&_path]:text-gray-400" />
            <h2 className="break-all text-sm capitalize text-gray-600 dark:text-gray-400">
              {data?.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <AiOutlineMessage className="min-w-[16px] [&_path]:text-gray-600 dark:[&_path]:text-gray-400" />
            <h2 className="break-all text-sm text-gray-600  dark:text-gray-400">
              {data?.email}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
