import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../../services/firebaseApi";

import AddGroupMember from "./AddGroupMember";
import useMembers from "./hooks/useMembers";
import Model from "@/ui/Model";
import LeaveGroupModal from "./LeaveGroupModal";

interface Props {
  groupId: string;
}
function GroupInfo({ groupId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getRoom(groupId),
  });
  const { members, isLoadingMembers } = useMembers(groupId);

  if (isLoading || isLoadingMembers) return null;

  return (
    <div className="mt-5 space-y-4 divide-y dark:divide-gray-300/10">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
          description :
        </h2>
        <p className="break-all text-sm dark:text-gray-400">
          {data?.description || "This group have no info"}
        </p>
      </div>

      <div className="pt-5">
        <h2 className="mb-4 text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
          Info :
        </h2>

        <div className="space-y-4">
          <div>
            <h2 className="mb-1  text-xs capitalize tracking-wider text-gray-500">
              name
            </h2>
            <p className="break-all text-sm capitalize tracking-wider text-gray-900 dark:text-gray-400">
              {data?.name}
            </p>
          </div>

          <div>
            <h2 className="mb-2  text-xs capitalize tracking-wider text-gray-500 dark:text-gray-500">
              members
            </h2>

            <div className="max-h-96 overflow-y-auto ">
              <AddGroupMember groupId={groupId} />

              {members?.map((el) => (
                <div key={el.id} className="flex items-center gap-2 px-2 py-1">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={el?.photo || "/assets/person-placeholder.png"}
                  />
                  <p className="break-all text-xs capitalize tracking-wider text-gray-900 dark:text-gray-400">
                    {el.name}
                  </p>
                </div>
              ))}

              <Model>
                <Model.Toggle name="addMember">
                  <button className="mt-4 rounded-md bg-red-500 px-2 py-1 capitalize text-white hover:bg-red-400">
                    Leave group
                  </button>
                </Model.Toggle>
                <Model.Window name="addMember">
                  <LeaveGroupModal />
                </Model.Window>
              </Model>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
