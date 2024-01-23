import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../services/firebaseApi";

function FormControls({ onClick, selected, data }: any) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({ mutationFn: addFriend });

  function handleAddFriends() {
    if (!selected) return;
    const friend = data?.find((el: any) => el.uid === selected);
    const user = queryClient.getQueryData(["user"]);
    if (!friend || !user) return;
    // add friend to the cache for later use (userInfo)
    queryClient.setQueryData(["friend", friend.uid], friend);
    mutate(
      { friend, user },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
          onClick();
        },
      },
    );
  }

  return (
    <div className="flex gap-3 ">
      <button
        onClick={onClick}
        className="ml-auto capitalize text-[var(--color-main-dark)] hover:underline"
      >
        close
      </button>
      <button
        onClick={handleAddFriends}
        disabled={!Boolean(selected) || isPending}
        className="rounded-sm bg-[var(--color-main)] px-3 py-1 capitalize text-white hover:bg-[var(--color-main-dark)] disabled:bg-gray-400"
      >
        Add
      </button>
    </div>
  );
}

export default FormControls;
