import Spinner from "../../ui/Spinner";
import useUser from "../authentication/useUser";
import Groups from "./Groups";
// import Friends from "./Friends";

function ChatsList() {
  const { data: user, isLoading } = useUser();
  console.log(user);

  if (isLoading) return <Spinner />;

  return (
    <div className="my-3 space-y-4 divide-y">
      <Groups type="friends" groups={user?.friends} />
      <Groups type="groups" groups={user?.groups} />
    </div>
  );
}

export default ChatsList;
