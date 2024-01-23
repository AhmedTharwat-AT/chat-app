import { IoMdClose } from "react-icons/io";

interface Props {
  data: any[] | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

function SearchResults({ data, selected, setSelected }: Props) {
  if (!data || data?.length == 0)
    return <p className="text-sm text-gray-500">no results were found !</p>;

  return (
    <>
      {data?.map((el) => {
        const isSelected = selected == el.uid;
        return (
          <div
            key={el.uid}
            className={`${isSelected && "bg-[var(--color-main)] hover:!bg-[var(--color-main)]"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-gray-200`}
            onClick={() => setSelected(el.uid)}
          >
            <h1
              className={`${isSelected && "text-white "} max-w-40 truncate text-sm capitalize text-gray-700`}
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
