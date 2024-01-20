import Spinner from "../../ui/Spinner";
import useUser from "../authentication/useUser";
import Groups from "./Groups";
// import Friends from "./Friends";

function ChatsList() {
  const { data: user, isLoading } = useUser();
  console.log(user);

  if (isLoading) return <Spinner />;

  return (
    <div className="my-3 h-[calc(100vh-208px)] space-y-4 divide-y overflow-y-auto bp:h-[calc(100vh-152px)]">
      <Groups type="friends" groups={user?.friends} />
      <Groups type="groups" groups={user?.groups} />
    </div>
  );
}

export default ChatsList;
