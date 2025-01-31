import React from "react";
import { useAddParentMutation } from "../../redux/services/apiSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const inputInfo = [
  {
    label: "Name",
    type: "text",
    id: "name",
  },
  {
    label: "Email",
    type: "email",
    id: "email",
  },
  {
    label: "Phone",
    type: "tel",
    id: "phone",
  },
  // image upload
  {
    label: "Image",
    type: "file",
    id: "photos",
  },
];

const AddParentModel = ({ refetch }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [addParent, { isLoading, isError }] = useAddParentMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      photo: "test",
    },
  });

  const onSubmit = async (data) => {
    delete data.photos;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await addParent(formData);
    if ("data" in res) {
      refetch();
      toast.success("Parent added successfully");
      setShowModal(!showModal);
    }
    console.log(res);
    if ("error" in res) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        Add Parent
      </button>

      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModal ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="absolute top-1/2 left-1/2  p-4 w-full max-w-2xl max-h-full z-[45] -translate-x-1/2 -translate-y-1/2 ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Parent
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setShowModal(!showModal)}
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
              {inputInfo.map((input) =>
                input.type === "file" ? (
                  <div key={input.id} className="w-full md:w-[48%]">
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id={input.id}
                      type="file"
                      {...register(input.id)}
                    />
                  </div>
                ) : (
                  <input
                    key={input.id}
                    type={input.type}
                    id={input.id}
                    className="w-full md:w-[48%] !h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={input.label}
                    required
                    {...register(input.id)}
                  />
                )
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoading ? "Adding..." : "Create Parent"}
              </button>
              <button
                onClick={() => setShowModal(!showModal)}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            onClick={() => setShowModal(!showModal)}
            className="fixed top-0 left-0 w-screen h-screen bg-black z-40 bg-opacity-60"
          ></div>
        )}
      </div>
    </>
  );
};

export default AddParentModel;
