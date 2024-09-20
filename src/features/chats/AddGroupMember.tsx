import { IoMdPersonAdd } from "react-icons/io";
import Model from "../../ui/Model";
import AddMemberModal from "./AddMemberModal";

function AddGroupMember({ groupId }: { groupId: string }) {
  return (
    <Model>
      <Model.Toggle name="addMember">
        <div className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-400/15 dark:hover:bg-gray-400/10">
          <IoMdPersonAdd className="h-8 w-8 rounded-full bg-green-100 p-2 text-green-500 dark:bg-opacity-15" />
          <p className="break-all text-xs capitalize tracking-wider text-gray-900 dark:text-gray-400">
            Add Member
          </p>
        </div>
      </Model.Toggle>
      <Model.Window name="addMember">
        <AddMemberModal groupId={groupId} />
      </Model.Window>
    </Model>
  );
}

export default AddGroupMember;
