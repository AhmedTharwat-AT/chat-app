import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { divideArrayToSections, sortArrayByNames } from "../../utils/helpers";
import useUser from "../authentication/useUser";
import ContactItem from "./ContactItem";

function ContactsList() {
  const { data: user, isLoading } = useUser();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("contacts") || "";
  let friends: any[] = [];
  if (user && user.friends) {
    friends = Object.values(user?.friends);
  }

  //filter
  friends = friends.filter((el) => el.name.includes(filter));

  //order
  const sections = divideArrayToSections(sortArrayByNames([...friends])) as [
    string,
    any[],
  ][];

  if (isLoading) return <Spinner />;

  if (sections.length == 0 && filter)
    return (
      <p className="mt-5 text-sm text-gray-700">
        no contacts were found with this name!
      </p>
    );

  if (sections.length == 0 && !filter)
    return (
      <p className="mt-5 text-sm text-gray-700">
        Add contacts and start chatting now !
      </p>
    );

  return (
    <div className="bp:h-[calc(100vh-152px) my-3 h-[calc(100vh-208px)] space-y-6 overflow-y-auto pt-5">
      {sections.map(([section, values]) => {
        return (
          <div key={section}>
            <div className="relative">
              <h1 className="mb-4 w-fit bg-white pr-5 text-sm font-semibold uppercase text-[var(--color-main)]">
                {section}
              </h1>
              <span className="absolute top-1/2 -z-10 block h-[1px] w-full bg-gray-200"></span>
            </div>
            <ul className="space-y-4">
              {values.map((el, i) => (
                <ContactItem key={i} friend={el} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default ContactsList;
