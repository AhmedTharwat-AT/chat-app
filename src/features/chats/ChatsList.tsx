import { FriendsType, GroupsType } from "@/types/data.types";
import Spinner from "../../ui/Spinner";
import useUser from "../authentication/useUser";
import Groups from "./Groups";
import { useNavigate } from "react-router-dom";

function ChatsList() {
  const { data: user, isLoading, error } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!isLoading && !user) return null;

  if (error) {
    navigate("/login");
  }

  return (
    <div className="my-3 h-[calc(100vh-208px)] space-y-4 divide-y overflow-y-auto dark:divide-gray-500/20 bp:h-[calc(100vh-152px)]">
      <Groups type="friends" groups={user?.friends as FriendsType} />
      <Groups type="groups" groups={user?.groups as GroupsType} />
    </div>
  );
}

export default ChatsList;
