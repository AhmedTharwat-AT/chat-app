import { updateUserProperty } from "../../services/firebaseApi";
import { ReactNode, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SmallSpinner from "../../ui/SmallSpinner";
import FormWrapper from "../../ui/FormWrapper";
import { IUser } from "@/types/data.types";

interface Props {
  user: IUser;
  type: "about" | "bio";
  heading: string;
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<ReactNode> | undefined;
}

function EditProfileModal({
  onCloseModel,
  type,
  heading,
  innerRef,
  user,
}: Props) {
  const [editValue, setEditValue] = useState(user[type] || "");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleEdit() {
    if (!editValue) return;
    try {
      setLoading(true);
      await updateUserProperty(user.uid, type, editValue);
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
      onCloseModel?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("error editing bio/about :" + err?.message);
      }
      console.log("error editing bio/about ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper
      onCloseModel={onCloseModel}
      heading={heading}
      innerRef={innerRef}
    >
      <div className="space-y-4 p-3">
        <div className="space-y-2">
          <label className="text-gray-700 dark:text-gray-300">
            Edit {type} text !
          </label>
          <textarea
            onChange={(e) => setEditValue(e.target.value)}
            value={editValue}
            maxLength={type == "bio" ? 80 : 200}
            className="w-full rounded bg-gray-200 px-2 py-1 text-sm focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-400"
          />
        </div>
        <div className="flex gap-6">
          <button
            onClick={onCloseModel}
            className="ml-auto capitalize text-[var(--color-main-dark)] hover:underline"
          >
            close
          </button>
          <button
            onClick={handleEdit}
            disabled={loading}
            className="rounded-sm bg-[var(--color-main)] px-4 py-1 font-semibold capitalize text-white hover:bg-[var(--color-main-dark)] disabled:bg-gray-400"
          >
            {loading ? <SmallSpinner color="text-white" /> : "edit"}
          </button>
        </div>
      </div>
    </FormWrapper>
  );
}

export default EditProfileModal;
