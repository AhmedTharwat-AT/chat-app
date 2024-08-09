import useEditGroup from "./hooks/useEditGroup";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { IGroupType } from "@/types/data.types";

import FormWrapper from "@/ui/FormWrapper";
import FormControls from "@/ui/FormControls";
import { useRoom } from "@/context/RoomContext";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
  groupId: string;
}

function EditGroupModal({ groupId, onCloseModel, innerRef }: Props) {
  const queryClient = useQueryClient();
  const groupInfo = queryClient.getQueryData(["group", groupId]) as IGroupType;
  const { setRoom } = useRoom();

  const [selectedImage, setSelectedImage] = useState<File>();
  const [name, setName] = useState(groupInfo?.name);
  const [description, setDescription] = useState(groupInfo?.description);

  const { mutate, isPending, error } = useEditGroup();

  function handleEditGroup() {
    if (!groupInfo) return;
    mutate(
      {
        groupInfo,
        details: {
          name: name || "",
          description: description || "",
          photo: selectedImage || null,
        },
      },
      {
        onSuccess: () => {
          onCloseModel?.();
          queryClient.invalidateQueries({ queryKey: ["group", groupId] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setRoom(null);
        },
      },
    );
  }

  return (
    <FormWrapper
      innerRef={innerRef}
      onCloseModel={onCloseModel}
      heading="Edit Group info"
    >
      <div className=" -auto space-y-4 px-3 py-4">
        {error && <p className="text-red-500">{error.message}</p>}
        <div>
          <label className="mb-2 text-sm capitalize text-gray-700 dark:text-gray-300">
            name
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 p-2 outline-none dark:border-gray-600 dark:bg-[var(--darker-bg)] dark:text-gray-400"
            defaultValue={groupInfo?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 text-sm capitalize text-gray-700 dark:text-gray-300">
            description
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 p-2 outline-none dark:border-gray-600 dark:bg-[var(--darker-bg)] dark:text-gray-400"
            defaultValue={groupInfo?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 text-sm capitalize text-gray-700 dark:text-gray-300">
            photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2"
            onChange={(e) => setSelectedImage(e.target.files?.[0])}
          />
          <img
            className="h-40"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : groupInfo.photo
            }
          />
        </div>
        <FormControls
          handler={handleEditGroup}
          onCloseModel={onCloseModel}
          isPending={isPending}
          text="Edit"
        />
      </div>
    </FormWrapper>
  );
}

export default EditGroupModal;
