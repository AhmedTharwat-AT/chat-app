import { HiOutlineDotsVertical } from "react-icons/hi";
import Model from "../../ui/Model";
import EditGroupModal from "./EditGroupModal";

interface Props {
  groupId: string;
}

function EditGroupInfo({ groupId }: Props) {
  return (
    <div className="relative">
      <Model>
        <Model.Toggle name="group-info">
          <p className="cursor-pointer rounded-full bg-white p-1 text-xl text-gray-900 drop-shadow-xl">
            <HiOutlineDotsVertical />
          </p>
        </Model.Toggle>

        <Model.Window name="group-info">
          <EditGroupModal groupId={groupId} />
        </Model.Window>
      </Model>
    </div>
  );
}

export default EditGroupInfo;
