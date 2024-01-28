import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../services/firebaseApi";

import SmallSpinner from "../../ui/SmallSpinner";
import FormWrapper from "../../ui/FormWrapper";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  onCloseModel?: () => void;
  innerRef?: React.LegacyRef<any> | undefined;
}

function GroupFrom({ onCloseModel, innerRef }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { mutate, isPending, error } = useMutation({ mutationFn: createGroup });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  function onSubmit(data: FieldValues) {
    try {
      const selectedFile = data.photo?.[0] as File;
      const fileSizeInBytes = selectedFile.size; //in bytes;
      const maxSizeInBytes = 300 * 1024;
      if (fileSizeInBytes > maxSizeInBytes) {
        setError("photo", { message: "max photo size is 300 kb!" });
        return;
      }
      mutate(
        { details: data, user },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
            onCloseModel?.();
          },
        },
      );
    } catch (err: any) {
      console.log("error changing profile picture :", err?.message);
    }
  }

  return (
    <FormWrapper
      onCloseModel={onCloseModel}
      heading="create group"
      innerRef={innerRef}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-3">
        {error && <p className="text-xs text-red-500">{error.message}</p>}

        <div className="">
          <label className="mb-1 block text-sm capitalize  text-gray-700 dark:text-gray-300">
            name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", {
              required: "this field is required !",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Enter chars or numbers only",
              },
            })}
            minLength={3}
            maxLength={20}
            className="w-full rounded bg-gray-200 px-2 py-1 text-sm focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-400"
          />
          {errors?.name && (
            <p className="text-xs text-red-500">
              {errors?.name?.message as string}
            </p>
          )}
        </div>
        <div className="">
          <label className="mb-1 block text-sm capitalize text-gray-700  dark:text-gray-300">
            description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "this field is required !",
            })}
            minLength={3}
            maxLength={120}
            className="w-full rounded bg-gray-200 px-2 py-1 text-sm focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-400"
          />
          {errors?.description && (
            <p className="text-xs text-red-500">
              {errors?.description?.message as string}
            </p>
          )}
        </div>
        <div className="">
          <label className="mb-1 block text-sm capitalize text-gray-700  dark:text-gray-300">
            photo <span className="text-red-500">*</span>
          </label>
          <input
            {...register("photo", { required: "this field is required !" })}
            type="file"
            accept="image/*"
            className="w-full rounded px-2 py-1 text-sm focus:ring focus:ring-[var(--color-main)] dark:bg-[var(--dark-bg)] dark:text-gray-400"
          />
          {errors?.photo && (
            <p className="text-xs text-red-500">
              {errors?.photo?.message as string}
            </p>
          )}
        </div>
        <div className="flex gap-6">
          <button
            onClick={onCloseModel}
            className="ml-auto capitalize text-[var(--color-main-dark)] hover:underline"
          >
            close
          </button>
          <button
            // onClick={handleEdit}
            // disabled={loading}
            className="rounded-sm bg-[var(--color-main)] px-4 py-1 font-semibold capitalize text-white hover:bg-[var(--color-main-dark)] disabled:bg-gray-400"
          >
            {isPending ? <SmallSpinner color="text-white" /> : "create"}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}

export default GroupFrom;
