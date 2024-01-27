import { updateUserProperty } from "../../services/firebaseApi";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SmallSpinner from "../../ui/SmallSpinner";

interface Props {
  user: any;
  type: "about" | "bio";
  heading: string;
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<any> | undefined;
}

function EditForm({ onCloseModel, type, heading, innerRef, user }: Props) {
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
    } catch (err: any) {
      console.log("error editing bio/about :" + err?.message);
    }
  }

  return (
    <div
      ref={innerRef}
      className="w-full max-w-[450px]  animate-slideDown overflow-hidden overscroll-y-contain rounded bg-white shadow-md dark:bg-[var(--darker-bg)]"
    >
      <div className="flex items-center justify-between bg-[var(--color-main)] p-3">
        <h2 className="font-semibold capitalize text-white">{heading}</h2>
        <button onClick={onCloseModel} className="text-xl text-gray-800">
          &times;
        </button>
      </div>
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
    </div>
  );
}

export default EditForm;
