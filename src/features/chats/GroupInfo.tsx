import { IGroupType } from "@/types/data.types";
import useMembers from "./hooks/useMembers";

import AddGroupMember from "./AddGroupMember";
import Model from "@/ui/Model";
import LeaveGroupModal from "./LeaveGroupModal";
import MembersSkeleton from "@/ui/MembersSkeleton";

interface Props {
  group: IGroupType;
  isPublicGroup?: boolean;
}
function GroupInfo({ group, isPublicGroup }: Props) {
  const { members, isLoadingMembers } = useMembers(group.room);

  return (
    <div className="mt-5 space-y-4 divide-y dark:divide-gray-300/10">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
          description :
        </h2>
        <p className="break-all text-sm dark:text-gray-400">
          {group?.description || "This group have no info"}
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
              {group?.name}
            </p>
          </div>

          <div>
            <h2 className="mb-2  text-xs capitalize tracking-wider text-gray-500 dark:text-gray-500">
              members
            </h2>

            <div className="max-h-96 overflow-y-auto ">
              {!isPublicGroup && <AddGroupMember groupId={group.room} />}

              {isLoadingMembers ? (
                <MembersSkeleton />
              ) : (
                members?.map((el) => (
                  <div
                    key={el.id}
                    className="flex items-center gap-2 px-2 py-1"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={el?.photo || "/assets/person-placeholder.png"}
                    />
                    <p className="break-all text-xs capitalize tracking-wider text-gray-900 dark:text-gray-400">
                      {el.name}
                    </p>
                  </div>
                ))
              )}

              {!isPublicGroup && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
