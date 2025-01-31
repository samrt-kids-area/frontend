import React, { useEffect } from "react";
import AddChildModel from "./AddChildModel";
import Loader from "../../components/Loader";
import ChildrenTable from "./ChildrenTable";
import { useGetAllChildrenQuery } from "../../redux/services/apiSlice";

const Children = () => {
  const [search, setSearch] = React.useState("");
  const { data, isLoading, isError, refetch } = useGetAllChildrenQuery(
    "search=" + search
  );

  useEffect(() => {
    refetch();
  }, [search]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        {/* add input for search and button for add */}
        <h1 className="text-3xl font-semibold dark:text-gray-800 text-gray-200">
          Children
        </h1>
      </div>
      <div className="flex !justify-between items-center w-full">
        <form className="md:w-1/2 w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search about children"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="">
          <AddChildModel refetch={refetch} />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        data && <ChildrenTable children={data.children} />
      )}
    </div>
  );
};

export default Children;
