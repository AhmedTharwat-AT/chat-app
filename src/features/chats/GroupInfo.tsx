import { useQuery } from "@tanstack/react-query";
import { getMembers, getRoom } from "../../services/firebaseApi";

interface Props {
  id: string;
}
function GroupInfo({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id),
  });
  const { data: memebers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["memebers", id],
    queryFn: () => getMembers(id),
  });

  if (isLoading || isLoadingMembers) return null;

  console.log(data, id);

  return (
    <div className="mt-5 space-y-4 divide-y-2">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-700">
          description :
        </h2>
        <p className="break-all text-sm">
          {data?.description || "This group have no info"}
        </p>
      </div>
      <div className="pt-5">
        <h2 className="mb-4 text-xs font-semibold uppercase text-gray-700">
          Info :
        </h2>
        <div className="space-y-4">
          <div>
            <h2 className="mb-1  text-xs capitalize tracking-wider text-gray-500">
              name
            </h2>
            <p className="break-all text-sm capitalize tracking-wider text-gray-900">
              {data?.name}
            </p>
          </div>
          <div>
            <h2 className="mb-1  text-xs capitalize tracking-wider text-gray-500">
              members
            </h2>
            {memebers?.map((el) => (
              <p
                key={el.id}
                className="break-all text-sm capitalize tracking-wider text-gray-900"
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
