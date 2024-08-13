import { useSearchParams } from "react-router-dom";
import useUser from "../authentication/hooks/useUser";
import { divideArrayToSections, sortArrayByNames } from "../../utils/helpers";
import { IFriend } from "@/types/data.types";

import Spinner from "../../ui/Spinner";
import ContactItem from "./ContactItem";

function ContactsList() {
  const { data: user, isLoading } = useUser();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("contacts") || "";

  const friends: IFriend[] = Object.values(user?.friends || {});
  let showSections = true;

  //filter
  if (filter && user) {
    showSections = friends
      .map((el) => el.name.startsWith(filter.toLocaleLowerCase().trim()))
      .includes(true);
  }

  //divide friends to sections by their first letter
  const sections = divideArrayToSections(sortArrayByNames(friends));

  if (isLoading) return <Spinner />;

  return (
    <>
      <p
        className={`mt-5 text-sm text-gray-700 dark:text-gray-300 ${showSections ? "hidden" : "block"}`}
      >
        {filter
          ? "No contacts were found with this name!"
          : "Add contacts and start chatting now !"}
      </p>

      <div
        className={`bp:h-[calc(100vh-152px) my-3 h-[calc(100vh-208px)] space-y-6 overflow-y-auto pt-5 ${showSections ? "block" : "hidden"}`}
      >
        {sections.map(([section, values]: [string, IFriend[]]) => {
          const showSection = values
            .map((el) => el.name.startsWith(filter.toLocaleLowerCase().trim()))
            .includes(true);

          return (
            <div key={section} className={showSection ? "block" : "hidden"}>
              <div className="relative">
                <h1 className="relative z-10 mb-4 w-fit bg-white pr-5 text-sm font-semibold uppercase text-[var(--color-main)] dark:bg-[var(--darker-bg)]">
                  {section}
                </h1>
                <span className="absolute top-1/2 z-0 block h-[1px] w-full bg-gray-200 dark:bg-opacity-5"></span>
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
    </>
  );
}

export default ContactsList;
