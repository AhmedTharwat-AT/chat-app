import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/firebaseApi";

interface Props {
  id: string;
}
function UserInfo({ id }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getUserDetails(id),
  });

  if (isLoading) return null;

  console.log(data, id);

  return (
    <div className="mt-5 space-y-4 divide-y-2">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-700">
          status :
        </h2>
        <p className="break-all text-sm">
          {data.about || "This user have no info"}
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
              {data.name}
            </p>
          </div>
          <div>
            <h2 className="mb-1  text-xs capitalize tracking-wider text-gray-500">
              email
            </h2>
            <p className="break-all text-sm tracking-wider text-gray-900">
              {data.email}
            </p>
          </div>
          <div>
            <h2 className="mb-1 break-all text-xs capitalize tracking-wider text-gray-500">
              bio
            </h2>
            <p className="text-sm capitalize tracking-wider text-gray-900">
              {data.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
