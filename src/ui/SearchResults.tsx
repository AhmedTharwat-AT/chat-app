import { IUser } from "@/types/data.types";
import { IoMdClose } from "react-icons/io";
import SmallSpinner from "./SmallSpinner";

interface Props {
  results: IUser[] | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  error?: Error | null;
  noFriends?: boolean;
  isLoading?: boolean;
}

function SearchResults({
  results,
  selected,
  setSelected,
  error,
  noFriends = false,
  isLoading = false,
}: Props) {
  if (error)
    return <p className="px-2 text-sm text-red-500">Something went wrong!</p>;

  if (noFriends)
    return (
      <p className="px-2 text-sm text-red-500">please add friends first!</p>
    );

  if (isLoading)
    return (
      <div className="px-2 text-sm text-gray-500">
        <SmallSpinner color="text-[var(--color-main)]" />
      </div>
    );

  if (!results || results?.length == 0)
    return <p className="px-2 text-sm text-gray-500">no results !</p>;

  return (
    <>
      {results?.map((el) => {
        const isSelected = selected == el.uid;

        return (
          <div
            key={el.uid}
            className={`${isSelected && "bg-[var(--color-main)] hover:!bg-[var(--color-main)]"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-400/5`}
            onClick={() => setSelected(el.uid)}
          >
            <h1
              className={`${isSelected && "text-white dark:text-gray-100"} max-w-40 truncate text-sm capitalize text-gray-700 dark:text-gray-400`}
            >
              {el.name}
            </h1>
            {isSelected && (
              <IoMdClose
                onClick={(e) => {
                  setSelected("");
                  e.stopPropagation();
                }}
                className="text-lg text-white"
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default SearchResults;
