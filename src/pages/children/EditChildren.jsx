import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useEditChildrenMutation } from "../../redux/services/apiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronUpIcon } from "lucide-react";

const EditChildren = ({
  childrenData,
  setChildrenData,
  defaultParentData,
  refetch,
}) => {
  const [parentData, setParentData] = useState(null);
  const [editChildren, { isLoading }] = useEditChildrenMutation();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: childrenData?.name ?? "",
      photo: childrenData?.photo ?? null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await editChildren({ body: formData, id: childrenData._id });
    if ("data" in res) {
      refetch();
      toast.success("Children Updated successfully");
      setChildrenData(false);
    }
    if ("error" in res) {
      toast.error(res.error.data.message);
    }
  };

  useEffect(() => {
    if (defaultParentData) {
      setParentData(defaultParentData);
    }
  }, [defaultParentData]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        childrenData ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="absolute top-1/2 left-1/2  p-4 w-full max-w-2xl max-h-full z-[45] -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Children
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setChildrenData(!childrenData)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5  flex flex-wrap gap-4">
            <input
              className="w-full md:w-[48%] !h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              {...register("name", { required: true })}
            />
            <div className="w-full md:w-[48%]">
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setValue("photo", e.target.files[0]);
                }}
              />
            </div>
            <div
              className={`border overflow-hidden w-full transition-all duration-300 rounded-[8px] h-[40px] `}
            >
              <div
                className={`h-[40px] ${
                  defaultParentData ? "bg-[#999999]" : ""
                } flex py-2 px-3 justify-between cursor-pointer`}
              >
                <p className="">
                  {parentData ? parentData.name : "Select Parent"}
                </p>
                <p>
                  <ChevronUpIcon />
                </p>
              </div>
            </div>
            {watch("photo") && (
              <div className="w-full border h-[300px] overflow-hidden rounded-lg relative">
                <img
                  src={
                    childrenData.photo === watch("photo")
                      ? watch("photo")
                      : URL.createObjectURL(watch("photo"))
                  }
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "Adding..." : "Add Children"}
            </button>
            <button
              onClick={() => setChildrenData(false)}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {childrenData && (
        <div
          onClick={() => setChildrenData(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black z-40 bg-opacity-60"
        ></div>
      )}
    </div>
  );
};

EditChildren.propTypes = {
  childrenData: PropTypes.bool,
  setChildrenData: PropTypes.func,
  defaultParentData: PropTypes.object,
  refetch: PropTypes.func,
};

export default EditChildren;
