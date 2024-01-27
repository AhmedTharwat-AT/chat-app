import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../../services/firebaseApi";
import useMembers from "./useMembers";

interface Props {
  id: string;
}
function GroupInfo({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id),
  });
  const { members, isLoadingMembers } = useMembers(id);

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
            <h2 className="mb-1  text-xs capitalize tracking-wider text-gray-500 dark:text-gray-500">
              members
            </h2>
            {members?.map((el) => (
              <p
                key={el.id}
                className="break-all text-sm capitalize tracking-wider text-gray-900 dark:text-gray-400"
              >
                {el.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
